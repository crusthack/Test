"use client";

import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Enemy } from "@/types/enemy";

/* ---------------------- 한글 변환 ---------------------- */

const targetKo: Record<string, string> = {
  Red: "빨간적",
  Floating: "떠있는적",
  Black: "검은적",
  Metal: "메탈적",
  White: "무속성",
  Angel: "천사",
  Alien: "에이리언",
  Zombie: "좀비",
  Relic: "고대종",
  Demon: "악마",
};

const affectKo: Record<string, string> = {
  Slow: "느리게 한다",
  Stop: "멈춘다",
  Knockback: "날려버린다",
  Weak: "공격력 다운",
  Curse: "저주",
  Warp: "워프",
  rWarp: "역워프",
  ImuATK: "공격 무효",
  Poison: "독 공격",
};

const abilityKo: Record<string, string> = {
  Critical: "크리티컬",
  StrickAttack: "혼신의 일격",
  Wave: "파동 공격",
  MiniWave: "소파동",
  Volcano: "열파 공격",
  Blast: "폭파 공격",
  Barrier: "베리어",
  LETHAL: "살아남는다",
  AtkUp: "공격력 업",
  BaseDestroyer: "성 파괴가 특기",
  Burrow: "버로우",
  Rebirth: "부활",
  DevilShield: "악마 실드",
  DeathVolcano: "순교",
  Colosus: "초생명체",
  Behemoth: "초수",
  Sage: "초현자",
  VolcanoCounter: "열파 카운터",
  WaveBlocker: "파동 삭제",
  Glass: "유리 공격",

  ImuKB: "날려버린다 무효",
  ImuStop: "멈춘다 무효",
  ImuSlow: "느리게 한다 무효",
  ImuWeak: "공격력 다운 무효",
  ImuWarp: "워프 무효",
  ImuCurse: "저주 무효",
  ImuWave: "파동 데미지 무효",
  ImuVolcano: "열파 데미지 무효",
  ImuBlast: "폭파 데미지 무효",
};


/* ---------------------- 유틸 ---------------------- */

function toKo(map: Record<string, string>, key: string) {
  return map[key] ?? key;
}

const getTargetColor = (t: string) => ({
  Red: "bg-red-500 text-white",
  Floating: "bg-sky-400 text-white",
  Black: "bg-black text-white",
  Metal: "bg-slate-600 text-white",
  Angel: "bg-yellow-400 text-black",
  Alien: "bg-blue-500 text-white",
  Zombie: "bg-purple-600 text-white",
  Relic: "bg-emerald-700 text-white",
  Demon: "bg-red-800 text-white",
  White: "bg-stone-400 text-black",
}[t] || "bg-gray-200 text-gray-700");

const getEffectColor = (e: string) => ({
  Slow: "bg-blue-500 text-white",
  Stop: "bg-purple-600 text-white",
  Knockback: "bg-orange-500 text-white",
  Weak: "bg-amber-500 text-white",
  Curse: "bg-indigo-600 text-white",
  Warp: "bg-cyan-500 text-white",
  ImuATK: "bg-gray-700 text-white",
  Poison: "bg-green-700 text-white",
}[e] || "bg-gray-200 text-gray-700");

/* ---------------------- 테이블 ---------------------- */

export default function EnemiesTable({
  enemies,
  onSelect,
}: {
  enemies: Enemy[];
  onSelect: (enemy: Enemy) => void;
}) {
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed text-left">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-40">이름</TableHead>
              <TableHead className="w-40">속성</TableHead>
              <TableHead className="w-40">효과</TableHead>
              <TableHead className="w-60">능력</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {enemies.map((enemy) => (
              <TableRow
                key={`${enemy.Id}`}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onSelect(enemy)}
              >
                <TableCell>{enemy.Id}</TableCell>

                <TableCell>
                  <div className="font-semibold">{enemy.Name}</div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {enemy.Targets.map((t, i) => (
                      <Badge key={i} className={getTargetColor(t)}>
                        {toKo(targetKo, t)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {enemy.Affects.map((e, i) => {
                      if (e === "rWarp") return null;
                      return (
                        <Badge key={i} className={getEffectColor(e)}>
                          {toKo(affectKo, e)}
                        </Badge>
                      );
                    })}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {enemy.Abilities.map((ab, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {toKo(abilityKo, ab)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
