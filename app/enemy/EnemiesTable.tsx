"use client";

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

import type { Enemy } from "@/types/common";

interface Props {
  enemies: Enemy[];
  onSelect: (enemy: Enemy) => void;
  getAttributeColor: (attr: string) => string;
  getEffectColor: (effect: string) => string;
}

export default function EnemiesTable({
  enemies,
  onSelect,
  getAttributeColor,
  getEffectColor,
}: Props) {
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
              <TableHead className="w-20">HP</TableHead>
              <TableHead className="w-20">공격력</TableHead>
              <TableHead className="w-20">사거리</TableHead>
              <TableHead className="w-20">속도</TableHead>
              <TableHead className="w-20">넉백</TableHead>
              <TableHead className="w-20">배율</TableHead>
              <TableHead className="w-60">능력</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {enemies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center text-gray-500 py-8">
                  검색 결과가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              enemies.map((enemy: Enemy) => (
                <TableRow
                  key={enemy.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onSelect(enemy)}
                >
                  <TableCell>{enemy.id}</TableCell>

                  <TableCell>
                    <div>
                      <div>{enemy.nameKo}</div>
                      <div className="text-gray-500">{enemy.name}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(enemy.attributes ?? ["없음"]).map((attr: string, i: number) => (
                        <Badge key={i} className={getAttributeColor(attr)}>
                          {attr}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(enemy.effects ?? ["없음"]).map((eff: string, i: number) => (
                        <Badge key={i} className={getEffectColor(eff)}>
                          {eff}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>{enemy.hp.toLocaleString()}</TableCell>
                  <TableCell>{enemy.attack.toLocaleString()}</TableCell>
                  <TableCell>{enemy.range}</TableCell>
                  <TableCell>{enemy.speed}</TableCell>
                  <TableCell>{enemy.knockbackCount}회</TableCell>
                  <TableCell>{enemy.magnification}%</TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(enemy.abilities ?? ["없음"]).map((ab: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {ab}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
