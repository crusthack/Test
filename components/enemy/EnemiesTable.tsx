"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Enemy } from "@/types/enemy";
import { TARGET_KO, AFFECT_KO, ABILITY_KO, toKo } from "@/lib/translationMaps";
import { getTargetColor as defaultGetTargetColor, getEffectColor as defaultGetEffectColor } from "@/lib/colorUtils";

const getTargetColor = defaultGetTargetColor;
const getEffectColor = defaultGetEffectColor;

export default function EnemiesTable({
  enemies,
  onSelect,
}: {
  enemies: Enemy[];
  onSelect: (enemy: Enemy) => void;
}) {
  const tableRows = useMemo(
    () =>
      enemies.map((enemy) => (
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
              {(Array.isArray(enemy.Targets) ? enemy.Targets : []).map((t, i) => (
                <Badge key={i} className={getTargetColor(String(t))}>
                  {toKo(TARGET_KO, t as any)}
                </Badge>
              ))}
            </div>
          </TableCell>

          <TableCell>
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(enemy.Affects) ? enemy.Affects : []).map((e, i) => {
                if (e === "rWarp") return null;
                return (
                  <Badge key={i} className={getEffectColor(String(e))}>
                    {toKo(AFFECT_KO, e as any)}
                  </Badge>
                );
              })}
            </div>
          </TableCell>

          <TableCell>
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(enemy.Abilities) ? enemy.Abilities : []).map((ab, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {toKo(ABILITY_KO, ab as any)}
                </Badge>
              ))}
            </div>
          </TableCell>
        </TableRow>
      )),
    [enemies, onSelect]
  );

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
            {tableRows}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
