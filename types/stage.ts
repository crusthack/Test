export interface Stage {
  id: number;
  name: string;
  nameKo: string;
  difficulty: string;
  enemies: StageEnemySpawnData[];
  baseHp: number;
  deployLimit: number; // 통솔력
  energy?: number; // 스테이지 진입 통솔력
  time?: number; // 스테이지 제한 시간 (초)
  mapType: '세계편' | '미래편' | '우주편' | '마계편' | '레전드 스토리' | '신 레전드 스토리' | '레전드 스토리 0';
  mapStage?: '1장' | '2장' | '3장';
}

export interface StageEnemySpawnData {
  name: string;
  nameKo: string;
  triggerType: 'time' | 'baseHp';
  triggerValue: number; // seconds for time, percentage for baseHp
  starMultipliers?: {
    star1: number;
    star2: number;
    star3: number;
    star4: number;
  };
}

// 세계편, 미래편, 우주편, 마계편, 레전드 스토리, 신 레전드 스토리, 레전드 스토리 0만 처리
// 세계편은 1 2 3장 구분 없이 배율만 바뀜
// 파일 구조
// Stage/CH에 세계편 우주편 미래편 정보있음
// Stage/CH/stageNormal에 각 장에 대한 메타정보(스테이지 목록, 통솔력, 획득Xp,...)
// Stage/CH/stage 세계편, stageW 미래편, stageSpace 우주편
// 첫번째 행 파싱 정보(util/stage/Stage.java)
// 맵 길이, 성 체력, 최소 스폰, 최대 스폰, bgm, max, 시간제한, ...
// 적 등장 정보