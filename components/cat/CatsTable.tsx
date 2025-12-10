"use client";

import { useMemo } from "react";
import Card from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Cat as Cat } from "@/types/cat";
import { TARGET_KO, AFFECT_KO, ABILITY_KO, toKo } from "@/lib/translationMaps";
import { getRarityColor as defaultGetRarityColor, getTargetColor as defaultGetTargetColor, getEffectColor as defaultGetEffectColor } from "@/lib/colorUtils";

interface Props {
  cats: Cat[];
  onSelect: (cat: Cat) => void;

  getRarityColor?: (rarity: string) => string;
  getTargetColor?: (target: string) => string;
  getEffectColor?: (effect: string) => string;
}

export default function CatsTable({
  cats,
  onSelect,
  getRarityColor = defaultGetRarityColor,
  getTargetColor = defaultGetTargetColor,
  getEffectColor = defaultGetEffectColor,
}: Props) {
  // 테이블 행의 렌더링 부분을 useMemo로 최적화
  const tableRows = useMemo(
    () =>
      cats.map((cat) => (
        <TableRow
          key={`${cat.Id}-${cat.Form}`}
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => onSelect(cat)}
        >
          <TableCell>{cat.Id}</TableCell>

          <TableCell>
            <div className="font-semibold">{cat.Name}</div>
          </TableCell>

          <TableCell>
            <Badge className={getRarityColor(cat.Rarity)}>
              {cat.Rarity}
            </Badge>
          </TableCell>

          <TableCell>
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(cat.Targets) ? cat.Targets : []).map((t, i) => (
                <Badge key={i} className={getTargetColor(String(t))}>
                  {toKo(TARGET_KO, t as any)}
                </Badge>
              ))}
            </div>
          </TableCell>

          <TableCell>
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(cat.Affects) ? cat.Affects : []).map((e, i) => (
                <Badge key={i} className={getEffectColor(String(e))}>
                  {toKo(AFFECT_KO, e as any)}
                </Badge>
              ))}
            </div>
          </TableCell>

          <TableCell>
            <div className="flex flex-wrap gap-1">
              {(Array.isArray(cat.Abilities) ? cat.Abilities : []).map((ab, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {toKo(ABILITY_KO, ab as any)}
                </Badge>
              ))}
            </div>
          </TableCell>
        </TableRow>
      )),
    [cats, onSelect, getRarityColor, getTargetColor, getEffectColor]
  );

  return (
    <Card className="p-6">
      <div className="overflow-x-auto w-full min-w-0">
        <Table className="w-full table-fixed text-left">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-40">이름</TableHead>
              <TableHead className="w-32">등급</TableHead>
              <TableHead className="w-48">타겟</TableHead>
              <TableHead className="w-48">효과</TableHead>
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
