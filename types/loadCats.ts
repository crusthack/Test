import fs from "fs";
import path from "path";

import { cat, trait, attackType, affect, ability } from "./cat.js"; // 네가 만든 타입들

const UNIT_DIR = path.join(process.cwd(), "data/unit");

// 숫자목록만 파싱 + //주석 무시
function parseCsvLine(line: string): number[] {
  // // 시작 코멘트 제거
  const cleaned = line.split("//")[0].trim();
  if (!cleaned.length) return [];

  return cleaned
    .split(",")
    .map(v => v.trim())
    .map(v => (v === "" ? 0 : Number(v)));
}

// Trait 추출 (TB_ 비트 마스크 기반)
function extractTraits(arr: number[]): trait[] {
  const res: trait[] = [];

  const mapping: { [k in trait]: number } = {
    Red: 10,
    Floating: 16,
    Black: 17,
    Metal: 18,
    White: 19,
    Angel: 20,
    Alien: 21,
    Zombie: 22,
    Relic: 78,
    Demon: 96,
  };

  for (const t in mapping) {
    const idx = mapping[t as trait];
    if (arr[idx] === 1) res.push(t as trait);
  }
  return res;
}

// 공격 타입
function extractAttackType(arr: number[]): attackType[] {
  const list: attackType[] = [];

  const isRange = arr[12] === 1;
  const lds0 = arr[44] ?? 0;
  const ldr0 = arr[45] ?? 0;

  if (isRange) list.push("range");
  else list.push("single");

  if (ldr0 < 0) list.push("omni");
  else if (ldr0 > 0) list.push("long");

  return list;
}

// affect
function extractAffects(arr: number[]): affect[] {
  const out: affect[] = [];

  if (arr[27] > 0) out.push("Slow");
  if (arr[25] > 0) out.push("Stop");
  if (arr[24] > 0) out.push("Knockback");
  if (arr[37] > 0) out.push("Weak");
  if (arr[30] === 1) out.push("MassiveDamage");
  if (arr[81] === 1) out.push("InsaneDamage");
  if (arr[23] === 1) out.push("Good");
  if (arr[29] === 1) out.push("Resistant");
  if (arr[80] === 1) out.push("InsanelyTough");
  if (arr[92] > 0) out.push("Curse");
  if (arr[32] === 1) out.push("Only");
  if (arr[75] > 0) out.push("Warp");
  if (arr[84] > 0) out.push("ImuATK");

  return out;
}

// abilities
function extractAbilities(arr: number[]): ability[] {
  const A: ability[] = [];

  // 공격계
  if (arr[40] > 0) A.push("AtkUp");
  if (arr[42] > 0) A.push("LETHAL");
  if (arr[34] === 300) A.push("BaseDestroyer");
  if (arr[31] > 0) A.push("Critical");

  if (arr[112] > 0) A.push("MetalKiller");
  if (arr[52] === 1) A.push("ZombieKiller");
  if (arr[98] === 1) A.push("SoulStrike");
  if (arr[70] > 0) A.push("BarrierBreak");
  if (arr[95] > 0) A.push("ShieldBreak");
  if (arr[82] > 0) A.push("StrickAttack");
  if (arr[33] === 1) A.push("Bounty");
  if (arr[43] === 1) A.push("Metallic");

  // 파동/열파
  if (arr[94] === 1) A.push("MiniWave");
  else if (arr[35] > 0) A.push("Wave");

  if (arr[108] === 1) A.push("MiniVolcano");
  else if (arr[86] > 0) A.push("Volcano");

  if (arr[109] === 1) A.push("VolcanoCounter");
  if (arr[113] > 0) A.push("Blast");
  if (arr[47] === 1) A.push("WaveBlocker");

  // 특효/소환
  if (arr[110] !== -1) A.push("Summon");
  if (arr[97] === 1) A.push("ColosusSlayer");
  if (arr[105] === 1) A.push("BehemothSlayer");

  // 면역
  if (arr[51] === 1) A.push("ImuWeak");
  if (arr[48] === 1) A.push("ImuKB");
  if (arr[49] === 1) A.push("ImuStop");
  if (arr[50] === 1) A.push("ImuSlow");
  if (arr[75] === 1) A.push("ImuWarp");
  if (arr[79] === 1) A.push("ImuCurse");
  if (arr[90] === 1) A.push("ImuPoison");
  if (arr[46] === 1) A.push("ImuWave");
  if (arr[91] === 1) A.push("ImuVolcano");
  if (arr[116] === 1) A.push("ImuBlast");

  return A;
}

export function loadAllCats(): cat[] {
  const result: cat[] = [];

  const folders = fs.readdirSync(UNIT_DIR);

  for (const f of folders) {
    if (!/^\d{3}$/.test(f)) continue; // 001, 002 같은 폴더만

    const csvPath = path.join(UNIT_DIR, f, `unit${f}.csv`);
    if (!fs.existsSync(csvPath)) continue;

    const raw = fs.readFileSync(csvPath, "utf8").split("\n");

    raw.forEach((line, formIdx) => {
      const arr = parseCsvLine(line);
      if (arr.length === 0) return;

      const id = Number(f);
      const form = formIdx + 1;

      const catObj: cat = {
        Id: id,
        form,
        image: null,
        rarity: "normal", // 나중에 rarity table과 매핑 필요함
        targets: extractTraits(arr),
        attackType: extractAttackType(arr),
        affects: extractAffects(arr),
        abilities: extractAbilities(arr),

        price: arr[6],
        hp: arr[0],
        atk: arr[3],
        speed: arr[2],
        heatback: arr[1],
        tba: arr[4] * 2,
        preattackframe: arr[13],
        respawnHalf: arr[7] * 2,
        range: arr[5],
        width: arr[9],
      };

      result.push(catObj);
    });
  }

  return result;
}
