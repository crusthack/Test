"use server";
import { promises as fs } from "fs";
import * as path from "path";
import { Cat, trait, attackType, affect, ability } from "@/types/cat";

// 경로 설정
const UNIT_DIR = "./data/cat/unit";                     // 유닛 스탯
const NAME_FILE = "./data/cat/UnitName.txt";            // 유닛 이름
const DESC_FILE = "./data/cat/UnitExplanation.txt";     // 유닛 설명
const RARE_FILE = "./data/cat/unitbuy.csv";             // 유닛 레어도
const LV_FILE = "./data/cat/unitlevel.csv";             // 유닛 레벨 정보

// ──────────────────────────────────────────────
// 캐시 저장 변수들
// ──────────────────────────────────────────────
let cacheNames: Map<number, string[]> | null = null;
let cacheDescriptions: Map<number, string[]> | null = null;
let cacheBuyData: Map<number, { rarity: string, maxlevel: number, maxpluslevel: number }> | null = null;
let cacheLevelData: Map<number, number[]> | null = null;
let cacheUnits: Cat[] | null = null;
let cachePostFrame: Map<string, number> = new Map(); // key = "id-form"

// ──────────────────────────────────────────────
// 유닛 설명 로드 + 캐싱
// ──────────────────────────────────────────────
async function loadDescriptions(): Promise<Map<number, string[]>> {
    if (cacheDescriptions) return cacheDescriptions;

    const txt = (await fs.readFile(DESC_FILE, "utf8")).replace(/\r/g, "");
    const map = new Map<number, string[]>();

    const lines = txt.split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

    for (const line of lines) {
        const cols = line.split("\t");
        if (cols.length < 2) continue;

        const num = parseInt(cols[0]);
        const descList = cols.slice(1).map((s) => s.trim());
        map.set(num, descList);
    }

    cacheDescriptions = map;
    return map;
}

// ──────────────────────────────────────────────
// 유닛 이름 로드 + 캐싱
// ──────────────────────────────────────────────
async function loadUnitNames(): Promise<Map<number, string[]>> {
    if (cacheNames) return cacheNames;

    const txt = (await fs.readFile(NAME_FILE, "utf8")).replace(/\r/g, "");
    const map = new Map<number, string[]>();

    const lines = txt.split("\n").filter((l) => l.trim().length > 0);

    for (const line of lines) {
        const cols = line.split("\t");
        if (cols.length < 2) continue;

        const num = parseInt(cols[0]);
        const names = cols.slice(1).filter((n) => n.length > 0);
        map.set(num, names);
    }

    cacheNames = map;
    return map;
}

// ──────────────────────────────────────────────
// trait / ability / affect / attackType
// ──────────────────────────────────────────────
const traitMap: Record<number, trait> = {
    10: "Red",
    16: "Floating",
    17: "Black",
    18: "Metal",
    19: "White",
    20: "Angel",
    21: "Alien",
    22: "Zombie",
    78: "Relic",
    96: "Demon",
};

export async function getAffects(values: number[]): Promise<affect[]> {
    const out: affect[] = [];
    const add = (cond: boolean, name: affect) => cond && out.push(name);

    add(values[27] > 0, "Slow");
    add(values[25] > 0, "Stop");
    add(values[24] > 0, "Knockback");
    add(values[37] > 0, "Weak");
    add(values[30] > 0, "MassiveDamage");
    add(values[81] > 0, "InsaneDamage");
    add(values[23] > 0, "Good");
    add(values[29] > 0, "Resistant");
    add(values[80] > 0, "InsanelyTough");
    add(values[92] > 0, "Curse");
    add(values[32] > 0, "Only");
    add(values[75] > 0, "Warp");
    add(values[84] > 0, "ImuATK");

    return out;
}

export async function getAbilities(values: number[]): Promise<ability[]> {
    const out: ability[] = [];
    const add = (cond: boolean, name: ability) => cond && out.push(name);

    add(values[40] > 0, "AtkUp");
    add(values[42] > 0, "LETHAL");
    add(values[34] > 0, "BaseDestroyer");
    add(values[31] > 0, "Critical");
    add(values[112] > 0, "MetalKiller");
    add(values[52] > 0, "ZombieKiller");
    add(values[98] > 0, "SoulStrike");
    add(values[70] > 0, "BarrierBreak");
    add(values[95] > 0, "ShieldBreak");
    add(values[82] > 0, "StrickAttack");
    add(values[33] > 0, "Bounty");
    add(values[43] > 0, "Metallic");

    add(values[94] > 0, "MiniWave");
    add(values[35] > 0 && values[94] === 0, "Wave");

    add(values[108] > 0, "MiniVolcano");
    add(values[86] > 0 && values[108] === 0, "Volcano");
    add(values[109] > 0, "VolcanoCounter");
    add(values[113] > 0, "Blast");

    add(values[47] > 0, "WaveBlocker");
    add(values[110] > 0, "Summon");
    add(values[97] > 0, "ColosusSlayer");
    add(values[105] > 0, "BehemothSlayer");
    add(values[111] > 0, "SageHunter");

    add(values[51] > 0, "ImuWeak");
    add(values[48] > 0, "ImuKB");
    add(values[49] > 0, "ImuStop");
    add(values[50] > 0, "ImuSlow");
    add(values[75] > 0, "ImuWarp");
    add(values[79] > 0, "ImuCurse");
    add(values[90] > 0, "ImuPoison");
    add(values[46] > 0, "ImuWave");
    add(values[91] > 0, "ImuVolcano");
    add(values[116] > 0, "ImuBlast");

    return out;
}
// isrange 12, ldr 45
function getAttackTypes(values: number[]): attackType[] {
    const out: attackType[] = [];
    if (values[12] === 1) out.push("range");

    const ldr = values[45];
    if (ldr !== 0) out.push(ldr < 0 ? "omni" : "long");

    if (out.length === 0) out.push("single");
    return out;
}

// ──────────────────────────────────────────────
// 유닛 레어도 / MaxLevel 데이터
// ──────────────────────────────────────────────
async function loadUnitBuy(id: number): Promise<{ rarity: string; maxlevel: number; maxpluslevel: number }> {
    // 캐시 맵 생성
    if (!cacheBuyData) cacheBuyData = new Map();

    if (cacheBuyData.has(id)) return cacheBuyData.get(id)!;

    try {
        await fs.access(RARE_FILE);
    } catch {
        const def = { rarity: "undefined", maxlevel: 0, maxpluslevel: 0 };
        cacheBuyData.set(id, def);
        return def;
    }

    const lines = (await fs.readFile(RARE_FILE, "utf8"))
        .replace(/\r/g, "")
        .split("\n")
        .filter((l) => l.trim().length > 0);

    const line = lines[id];
    if (!line) {
        const def = { rarity: "undefined", maxlevel: 0, maxpluslevel: 0 };
        cacheBuyData.set(id, def);
        return def;
    }

    const values = line.split(",");
    const code = Number(values[13]);

    const rarityMap: Record<number, string> = {
        0: "기본",
        1: "Ex",
        2: "레어",
        3: "슈퍼레어",
        4: "울트라슈퍼레어",
        5: "레전드레어",
    };

    const res = {
        rarity: rarityMap[code] ?? "undefined",
        maxlevel: Number(values[50]) || 0,
        maxpluslevel: Number(values[51]) || 0,
    };

    cacheBuyData.set(id, res);
    return res;
}

// ──────────────────────────────────────────────
// 유닛 레벨 데이터
// ──────────────────────────────────────────────
async function loadUnitLevelData(id: number): Promise<number[]> {
    if (!cacheLevelData) cacheLevelData = new Map();

    if (cacheLevelData.has(id)) return cacheLevelData.get(id)!;

    try {
        await fs.access(LV_FILE);
    } catch {
        return [];
    }

    const lines = (await fs.readFile(LV_FILE, "utf8"))
        .replace(/\r/g, "")
        .split("\n")
        .filter((l) => l.trim().length > 0);

    const line = lines[id];
    const arr = line.split(",").map((n) => Number(n));

    cacheLevelData.set(id, arr);
    return arr;
}

// ──────────────────────────────────────────────
// 애니메이션 후딜 프레임 계산 + 캐싱
// ──────────────────────────────────────────────
async function loadPostFRame(id: number, form: number, postFrame: number): Promise<number> {
    const key = `${id}-${form}`;
    if (cachePostFrame.has(key)) return cachePostFrame.get(key)!;

    if (!id || !form) return 0;

    const formMap: Record<number, string> = { 1: "f", 2: "c", 3: "s", 4: "u" };
    const c = formMap[form];

    const dir = path.join(UNIT_DIR, id.toString().padStart(3, "0"));
    const animPath = path.join(dir, `${id.toString().padStart(3, "0")}_${c}02.maanim`);

    try {
        await fs.access(animPath);
    } catch {
        cachePostFrame.set(key, 0);
        return 0;
    }

    const lines = (await fs.readFile(animPath, "utf8"))
        .replace(/\r/g, "")
        .split("\n")
        .filter((l) => l.trim().length > 0);

    let maxValue = 0;

    for (const line of lines) {
        const parts = line.split(",").map(Number);
        if (parts.length === 4 && parts.every(n => !isNaN(n))) {
            const f = parts[0];
            if (f > maxValue) maxValue = f;
        }
    }

    const result = maxValue ? maxValue - postFrame + 1 : 0;

    cachePostFrame.set(key, result);
    return result;
}

// ──────────────────────────────────────────────
// CSV 하나 파싱
// ──────────────────────────────────────────────
async function asyncLoadOneCSV(num: number, form: number, name: string, descMap: Map<number, string[]>): Promise<Cat | null> {
    const { rarity, maxlevel, maxpluslevel } = await loadUnitBuy(num);

    const dir = path.join(UNIT_DIR, num.toString().padStart(3, "0"));
    const csvPath = path.join(dir, `unit${num.toString().padStart(3, "0")}.csv`);

    try {
        await fs.access(csvPath);
    } catch {
        return null;
    }

    const lines = (await fs.readFile(csvPath, "utf8"))
        .replace(/\r/g, "")
        .split("\n")
        .filter((l) => l.trim().length > 0);

    if (form >= lines.length) return null;

    const line = lines[form];
    const pure = line.split("//")[0].trim();
    const values = pure.split(",").map(v => parseInt(v.trim()));

    while (values.length < 120) values.push(0);

    const traits: trait[] = [];
    for (const idx in traitMap) {
        const i = Number(idx);
        if (values[i] === 1) traits.push(traitMap[i]);
    }

    const descList = descMap.get(num) ?? [];
    const description = descList[form] ?? "";

    const imageurl = `https://battlecats-db.imgs-server.com/u${(num + 1).toString().padStart(3, "0")}-${form + 1}.png`;

    let as = await getAbilities(values);

    return {
        Id: num,
        Name: name,
        Form: form + 1,
        Descriptiont: description,
        Image: imageurl,
        Rarity: rarity,

        Targets: traits,
        AttackType: getAttackTypes(values),
        Affects: await getAffects(values),
        Abilities: as,

        Price: values[6],
        Hp: values[0],
        Atk: values[3],
        Speed: values[2],
        Heatback: values[1],
        Tba: values[4] * 2,
        PreAttackFrame: values[13],
        postAttackFrame: await loadPostFRame(num, form + 1, values[13]),
        RespawnHalf: values[7] * 2,
        Range: values[5],
        Width: values[9],
        MaxLevel: maxlevel,
        PlusLevel: maxpluslevel,

        levelData: await loadUnitLevelData(num)
    };
}

// ──────────────────────────────────────────────
// 전체 유닛 로드 + 캐싱
// ──────────────────────────────────────────────
export async function loadAllCats(): Promise<Cat[]> {
    if (cacheUnits) return cacheUnits;

    const nameMap = await loadUnitNames();
    const descMap = await loadDescriptions();

    const arr: Cat[] = [];

    for (const [num, names] of nameMap.entries()) {
        for (let form = 0; form < names.length; form++) {
            const c = await asyncLoadOneCSV(num, form, names[form], descMap);
            if (c) arr.push(c);
        }
    }

    cacheUnits = arr;
    return arr;
}

// ID에 해당하는 1~4폼 유닛만 골라 반환
export async function loadCatsById(id: number): Promise<Cat[]> {
    const all = await loadAllCats();
    return all.filter(c => c.Id === id);
}