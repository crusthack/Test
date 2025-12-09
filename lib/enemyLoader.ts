// lib/enemyLoader.ts
import * as fs from "fs";
import * as path from "path";

import { unit as Enemy, trait, affect, ability, attackType } from "@/types/cat";

// -------------------------------------------------------------
// 파일 경로
// -------------------------------------------------------------
const ENEMY_CSV = path.join(process.cwd(), "data/t_unit.csv");
const ENEMY_NAME_FILE = path.join(process.cwd(), "data/EnemyName.txt");
const ENEMY_DESC_FILE = path.join(process.cwd(), "data/EnemyExplanation.txt");

// -------------------------------------------------------------
// 안전한 trim
// -------------------------------------------------------------
const safeTrim = (v: any) =>
  typeof v === "string" ? v.trim() : "";

// -------------------------------------------------------------
// EnemyName: 인덱스 +2 매칭
// -------------------------------------------------------------
function loadEnemyNames(): Map<number, string> {
  const raw = fs.readFileSync(ENEMY_NAME_FILE, "utf8").replace(/\r/g, "");
  const map = new Map<number, string>();

  for (const line of raw.split("\n")) {
    if (!line.includes("\t")) continue;

    const [left, name] = line.split("\t");
    const baseId = parseInt(safeTrim(left));
    if (isNaN(baseId)) continue;

    map.set(baseId + 2, safeTrim(name));
  }
  return map;
}

// -------------------------------------------------------------
// EnemyExplanation: 인덱스 +2 매칭
// -------------------------------------------------------------
function loadEnemyDescriptions(): Map<number, string> {
  const raw = fs.readFileSync(ENEMY_DESC_FILE, "utf8").replace(/\r/g, "");
  const map = new Map<number, string>();

  for (const line of raw.split("\n")) {
    if (!line.includes("\t")) continue;

    const parts = line.split("\t");
    const baseId = parseInt(safeTrim(parts[0]));
    if (isNaN(baseId)) continue;

    const desc = safeTrim(parts.slice(1).join("\t"));
    map.set(baseId + 2, desc);
  }
  return map;
}

// -------------------------------------------------------------
// trait: cat 기준 trait만 사용
// -------------------------------------------------------------
const traitMap: Record<number, trait> = {
  10: "Red",
  13: "Floating",
  14: "Black",
  15: "Metal",
  16: "White",
  17: "Angel",
  18: "Alien",
  19: "Zombie",
  // --- Enemy only traits (표시 안 함) ---
  // 48: Witch
  // 49: Base
  // 71: EVA
  // 72: Relic
  // 93: Demon
  // 94: Baron
  // 101: Beast
  // 104: Sage
};

// -------------------------------------------------------------
// affect
// -------------------------------------------------------------
function getEnemyAffects(v: number[]): affect[] {
  const out: affect[] = [];
  const add = (c: boolean, a: affect) => c && out.push(a);

  add(v[27] > 0, "Slow");
  add(v[25] > 0, "Stop");
  add(v[24] > 0, "Knockback");
  add(v[37] > 0, "Weak");
  add(v[30] > 0, "MassiveDamage");
  add(v[81] > 0, "InsaneDamage");
  add(v[23] > 0, "Good");
  add(v[29] > 0, "Resistant");
  add(v[80] > 0, "InsanelyTough");
  add(v[92] > 0, "Curse");
  add(v[32] > 0, "Only");
  add(v[75] > 0, "Warp");
  add(v[84] > 0, "ImuATK");

  return out;
}

// -------------------------------------------------------------
// abilities
// -------------------------------------------------------------
function getEnemyAbilities(v: number[]): ability[] {
  const out: ability[] = [];
  const add = (c: boolean, a: ability) => c && out.push(a);

  add(v[40] > 0, "AtkUp");
  add(v[42] > 0, "LETHAL");
  add(v[34] > 0, "BaseDestroyer");
  add(v[31] > 0, "Critical");
  add(v[112] > 0, "MetalKiller");
  add(v[52] > 0, "ZombieKiller");
  add(v[98] > 0, "SoulStrike");
  add(v[70] > 0, "BarrierBreak");
  add(v[95] > 0, "ShieldBreak");
  add(v[82] > 0, "StrickAttack");
  add(v[33] > 0, "Bounty");
  add(v[43] > 0, "Metallic");
  add(v[94] > 0, "MiniWave");
  add(v[35] > 0 && v[94] === 0, "Wave");
  add(v[108] > 0, "MiniVolcano");
  add(v[86] > 0 && v[108] === 0, "Volcano");
  add(v[109] > 0, "VolcanoCounter");
  add(v[113] > 0, "Blast");
  add(v[47] > 0, "WaveBlocker");
  add(v[110] > 0, "Summon");
  add(v[97] > 0, "ColosusSlayer");
  add(v[105] > 0, "BehemothSlayer");
  add(v[111] > 0, "SageHunter");
  add(v[51] > 0, "ImuWeak");
  add(v[48] > 0, "ImuKB");
  add(v[49] > 0, "ImuStop");
  add(v[50] > 0, "ImuSlow");
  add(v[75] > 0, "ImuWarp");
  add(v[79] > 0, "ImuCurse");
  add(v[90] > 0, "ImuPoison");
  add(v[46] > 0, "ImuWave");
  add(v[91] > 0, "ImuVolcano");
  add(v[116] > 0, "ImuBlast");

  return out;
}

// -------------------------------------------------------------
// attackType
// -------------------------------------------------------------
function getEnemyAttackTypes(v: number[]): attackType[] {
  const out: attackType[] = [];

  if (v[11] === 1) out.push("range");

  const ldr = v[36];
  if (ldr !== 0) out.push(ldr < 0 ? "omni" : "long");

  if (out.length === 0) out.push("single");

  return out;
}

// -------------------------------------------------------------
// 메인 enemy 파서
// -------------------------------------------------------------
export function loadAllEnemies(): Enemy[] {
  const names = loadEnemyNames();
  const descs = loadEnemyDescriptions();

  const raw = fs.readFileSync(ENEMY_CSV, "utf8").replace(/\r/g, "");
  const lines = raw.split("\n").filter((l) => safeTrim(l).length > 0);

  const out: Enemy[] = [];

  for (let row = 0; row < lines.length; row++) {
    const pure = safeTrim(lines[row].split("//")[0]);
    const v = pure.split(",").map((x) => parseInt(safeTrim(x)) || 0);

    while (v.length < 120) v.push(0);

    const id = row + 2;

    // 🔥 이름이 빈칸이면 건너뛰기
    const name = names.get(id)?.trim() ?? "";
    if (name.length === 0) continue;

    out.push({
      Id: id,
      Name: name,
      Descriptiont: descs.get(id) ?? "",
      Form: 0,
      Image: "",
      Rarity: "unknown",

      Targets: Object.keys(traitMap)
        .map((k) => parseInt(k))
        .filter((idx) => v[idx] === 1)
        .map((idx) => traitMap[idx]),

      AttackType: getEnemyAttackTypes(v),
      Affects: getEnemyAffects(v),
      Abilities: getEnemyAbilities(v),

      Hp: v[0],
      Heatback: v[1],
      Speed: v[2],
      Atk: v[3],
      Tba: v[4] * 2,
      Range: v[5],
      Price: v[6],
      Width: v[8],
      PreAttackFrame: v[12],
      postAttackFrame: 0,
      RespawnHalf: 0,
    });
  }

  return out;
}
