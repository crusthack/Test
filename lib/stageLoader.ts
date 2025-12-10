"use server";

// lib/stageLoader.ts
import { promises as fs } from "fs";
import * as path from "path";

// -------------------------------------------------------------
// 타입 정의
// -------------------------------------------------------------
export interface StageEnemyLine {
  Raw: number[];          // 디버그용 전체 숫자 배열

  EnemyId: number;        // 적 ID
  Amount: number;         // 0이면 무한
  SpawnTime: number;      // 스폰 시간 (*2)
  RespawnMin: number;     // 재생산 최소 쿨타임 (*2)
  RespawnMax: number;     // 재생산 최대 쿨타임 (*2)
  SpawnCondition: number; // 성 체력 퍼센티지
  MinLayer: number;       // 최소 레이어
  MaxLayer: number;       // 최대 레이어
  KillCount: number;      // 킬 카운트
  Magnification: number;  // 10번째 값, 배율 정보
}

export interface Stage {
  StoryId: number;      // 3 (CH 스토리)
  MapId: number;        // 3,4,5,9 ...
  StageId: number;      // 0~N
  Code: string;         // "003-009-023" 같은 형식

  Name: string;         // 스테이지 이름 (StageName.txt 기반)

  // stageNormal*.csv 에서 읽은 6개 값 그대로
  Settings: number[];

  // 첫 줄 헤더 (맵 기본 정보)
  Length: number;        // 맵 길이
  CastleHealth: number;  // 성 체력
  MinSpawn: number;      // 최소 재생산시간
  MaxSpawn: number;      // 최대 재생산시간
  Background: number;    // 배경/배경음악 ID
  MaxUnit: number;       // 최대 유닛 수
  CastleId: number;      // 원본 그대로 저장
  TimeLimit: number;     // 제한 시간 (0이면 없음)
  BossGuard: boolean;    // 보스 보호 여부

  // 실제 적 스폰 정보
  Enemies: StageEnemyLine[];
}

// -------------------------------------------------------------
// 경로 상수
// -------------------------------------------------------------
const BASE = process.cwd();

// stageNormal 계열
const STAGE_NORMAL_DIR = path.join(BASE, "data/Stage/CH/stageNormal");

// 세계편 (맵 9) 스테이지 csv
const WORLD_STAGE_DIR = path.join(BASE, "data/Stage/CH/stage");
// ItF 계열 (맵 3,4,5) 스테이지 csv
const WORLD_W_STAGE_DIR = path.join(BASE, "data/Stage/CH/stageW");

// 이름 파일
const STAGE_NAME_FILE = path.join(BASE, "data/StageName.txt");

// CH 스토리 ID
const STORY_ID = 3;

// 어떤 stageNormal이 어떤 맵 ID를 담당하는지 설정
const NORMAL_FILES: { file: string; mapId: number; type: "world" | "worldW" }[] = [
  { file: "stageNormal0.csv",   mapId: 9, type: "world"  }, // 세계편
  { file: "stageNormal1_0.csv", mapId: 3, type: "worldW" }, // 1장
  { file: "stageNormal1_1.csv", mapId: 4, type: "worldW" }, // 2장
  { file: "stageNormal1_2.csv", mapId: 5, type: "worldW" }, // 3장
];

// -------------------------------------------------------------
// 유틸
// -------------------------------------------------------------
const safeTrim = (v: any) => (typeof v === "string" ? v.trim() : "");
const toInt = (s: string, def = 0) => {
  const n = parseInt(safeTrim(s), 10);
  return Number.isNaN(n) ? def : n;
};

// -------------------------------------------------------------
// StageName.txt 로딩
//   => "003-009-000  한국" 형태 전부 Map<코드, 이름> 으로 저장
// -------------------------------------------------------------
async function loadStageNames(): Promise<Map<string, string>> {
  const raw = (await fs.readFile(STAGE_NAME_FILE, "utf8")).replace(/\r/g, "");
  const map = new Map<string, string>();

  for (const line of raw.split("\n")) {
    const pure = safeTrim(line);
    if (!pure) continue;

    const parts = pure.split(/\s+/);
    if (parts.length < 2) continue;

    const code = parts[0]; // "003-009-000"
    const name = parts.slice(1).join(" "); // 나머지 전부 이름

    // 코드 형식만 간단히 검증
    if (!/^\d{3}-\d{3}(-\d{3})?$/.test(code)) continue;

    map.set(code, name);
  }

  return map;
}

// -------------------------------------------------------------
// stageNormal*.csv 읽기
//   각 줄에서 숫자 6개를 Settings로 사용
// -------------------------------------------------------------
async function loadStageNormalFile(filePath: string): Promise<number[][]> {
  try {
    await fs.access(filePath);
  } catch {
    return [];
  }

  const raw = (await fs.readFile(filePath, "utf8")).replace(/\r/g, "");
  const out: number[][] = [];

  for (const line of raw.split("\n")) {
    const pure = safeTrim(line.split("//")[0]);
    if (!pure) continue;

    const parts = pure.split(",").map((x) => safeTrim(x)).filter((x) => x);
    if (parts.length < 6) continue; // 헤더(-1,-1,-1 등) 스킵

    out.push(parts.slice(0, 6).map((v) => toInt(v, 0)));
  }

  return out;
}

// -------------------------------------------------------------
// 세계편: data/Stage/CH/stage/stageXX.csv 파싱
//   - 1줄 헤더(9개 이상 값)
//   - 이후 적 라인(최소 9개 값)
//   - 10번째 값이 없으면 배율은 100으로 처리
// -------------------------------------------------------------
async function parseWorldStageCsv(stageId: number): Promise<{
  header: {
    length: number;
    castleHealth: number;
    minSpawn: number;
    maxSpawn: number;
    background: number;
    maxUnit: number;
    castleId: number;
    timeLimit: number;
    bossGuard: boolean;
  };
  enemies: StageEnemyLine[];
}> {
  const file = path.join(WORLD_STAGE_DIR, `stage${stageId.toString().padStart(2, "0")}.csv`);

  const defaultHeader = {
    length: 3000,
    castleHealth: 60000,
    minSpawn: 1,
    maxSpawn: 1,
    background: 0,
    maxUnit: 8,
    castleId: 0,
    timeLimit: 0,
    bossGuard: false,
  };

  try {
    await fs.access(file);
  } catch {
    return { header: defaultHeader, enemies: [] };
  }

  const raw = (await fs.readFile(file, "utf8")).replace(/\r/g, "");
  const lines = raw.split("\n");

  let header = defaultHeader;
  let readHeader = false;
  const enemies: StageEnemyLine[] = [];

  for (const line of lines) {
    const pure = safeTrim(line.split("//")[0]);
    if (!pure || !pure.includes(",")) continue;

    const parts = pure.split(",").map((x) => safeTrim(x));
    const nums = parts.map((x) => toInt(x, 0));

    if (!readHeader) {
      // 헤더: 최소 9개 있다고 보고 처리
      header = {
        length: nums[0] ?? defaultHeader.length,
        castleHealth: nums[1] ?? defaultHeader.castleHealth,
        minSpawn: nums[2] ?? defaultHeader.minSpawn,
        maxSpawn: nums[3] ?? defaultHeader.maxSpawn,
        background: nums[4] ?? defaultHeader.background,
        maxUnit: nums[5] ?? defaultHeader.maxUnit,
        castleId: nums[6] ?? defaultHeader.castleId,
        timeLimit: nums[7] ?? defaultHeader.timeLimit,
        bossGuard: (nums[8] ?? 0) === 1,
      };
      readHeader = true;
      continue;
    }

    if (pure.startsWith("0,")) break;

    while (nums.length < 9) nums.push(0);

    const magnification = nums.length > 9 ? nums[9] : 100; // 추가 값이 없으면 100%

    enemies.push({
      Raw: nums.slice(),
      EnemyId: nums[0],
      Amount: nums[1],
      SpawnTime: nums[2] * 2,
      RespawnMin: nums[3] * 2,
      RespawnMax: nums[4] * 2,
      SpawnCondition: nums[5],
      MinLayer: nums[6],
      MaxLayer: nums[7],
      KillCount: nums[8],
      Magnification: magnification,
    });
  }

  return { header, enemies };
}

// -------------------------------------------------------------
// ItF 계열: data/Stage/CH/stageW/stageWMM_SS.csv 파싱
//   - 1줄 헤더(10개 이상 값)
//   - 이후 적 라인(최소 10개 값)
//   - 10번째 값(인덱스 9)는 배율 정보
// -------------------------------------------------------------
async function parseWorldWStageCsv(mapId: number, stageId: number): Promise<{
  header: {
    length: number;
    castleHealth: number;
    minSpawn: number;
    maxSpawn: number;
    background: number;
    maxUnit: number;
    castleId: number;
    timeLimit: number;
    bossGuard: boolean;
  };
  enemies: StageEnemyLine[];
}> {
  const file = path.join(
    WORLD_W_STAGE_DIR,
    `stageW${mapId.toString().padStart(2, "0")}_${stageId
      .toString()
      .padStart(2, "0")}.csv`
  );

  const defaultHeader = {
    length: 3000,
    castleHealth: 60000,
    minSpawn: 1,
    maxSpawn: 1,
    background: 0,
    maxUnit: 8,
    castleId: 0,
    timeLimit: 0,
    bossGuard: false,
  };

  try {
    await fs.access(file);
  } catch {
    return { header: defaultHeader, enemies: [] };
  }

  const raw = (await fs.readFile(file, "utf8")).replace(/\r/g, "");
  const lines = raw.split("\n");

  let header = defaultHeader;
  let readHeader = false;
  const enemies: StageEnemyLine[] = [];

  for (const line of lines) {
    const pure = safeTrim(line.split("//")[0]);
    if (!pure || !pure.includes(",")) continue;

    const parts = pure.split(",").map((x) => safeTrim(x));
    const nums = parts.map((x) => toInt(x, 0));

    if (!readHeader) {
      // 예: 4000,4000,1,1,15,5,0,0,0,0
      while (nums.length < 10) nums.push(0);

      header = {
        length: nums[0] ?? defaultHeader.length,
        castleHealth: nums[1] ?? defaultHeader.castleHealth,
        minSpawn: nums[2] ?? defaultHeader.minSpawn,
        maxSpawn: nums[3] ?? defaultHeader.maxSpawn,
        background: nums[4] ?? defaultHeader.background,
        maxUnit: nums[5] ?? defaultHeader.maxUnit,
        castleId: nums[6] ?? defaultHeader.castleId,
        timeLimit: nums[7] ?? defaultHeader.timeLimit,
        bossGuard: (nums[8] ?? 0) === 1,
      };
      readHeader = true;
      continue;
    }

    if (pure.startsWith("0,")) break;

    while (nums.length < 10) nums.push(0);

    const magnification = nums[9]; // 10번째 값 = 배율 정보

    enemies.push({
      Raw: nums.slice(),
      EnemyId: nums[0],
      Amount: nums[1],
      SpawnTime: nums[2] * 2,
      RespawnMin: nums[3] * 2,
      RespawnMax: nums[4] * 2,
      SpawnCondition: nums[5],
      MinLayer: nums[6],
      MaxLayer: nums[7],
      KillCount: nums[8],
      Magnification: magnification,
    });
  }

  return { header, enemies };
}

// -------------------------------------------------------------
// 메인: 전체 스테이지 로드
//   - stageNormal0 + 세계편 stage/*.csv
//   - stageNormal1_0/1_1/1_2 + stageW/*.csv
// -------------------------------------------------------------
export async function loadAllStages(): Promise<Stage[]> {
  const nameMap = await loadStageNames();
  const stages: Stage[] = [];

  for (const entry of NORMAL_FILES) {
    const normalPath = path.join(STAGE_NORMAL_DIR, entry.file);
    const settingsList = await loadStageNormalFile(normalPath);

    for (let stageId = 0; stageId < settingsList.length; stageId++) {
      const settings = settingsList[stageId];

      const mapId = entry.mapId;
      const storyId = STORY_ID;

      const code = `${storyId.toString().padStart(3, "0")}-${mapId
        .toString()
        .padStart(3, "0")}-${stageId.toString().padStart(3, "0")}`;

      const name = nameMap.get(code) ?? `Stage ${code}`;

      const parsed =
        entry.type === "world"
          ? await parseWorldStageCsv(stageId)
          : await parseWorldWStageCsv(mapId, stageId);

      stages.push({
        StoryId: storyId,
        MapId: mapId,
        StageId: stageId,
        Code: code,
        Name: name,

        Settings: settings,

        Length: parsed.header.length,
        CastleHealth: parsed.header.castleHealth,
        MinSpawn: parsed.header.minSpawn,
        MaxSpawn: parsed.header.maxSpawn,
        Background: parsed.header.background,
        MaxUnit: parsed.header.maxUnit,
        CastleId: parsed.header.castleId,
        TimeLimit: parsed.header.timeLimit,
        BossGuard: parsed.header.bossGuard,

        Enemies: parsed.enemies,
      });
    }
  }

  return stages;
}
