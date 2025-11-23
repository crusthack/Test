"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Enemy } from "@/types/common";

interface EnemyDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;

  enemy: Enemy | null;
  magnification: number;
  setMagnification: (value: number) => void;
}

export default function EnemyDetailDialog({
  isOpen,
  onOpenChange,
  enemy,
  magnification,
  setMagnification,
}: EnemyDetailDialogProps) {
  if (!enemy) return null;

  const calcHP = Math.round(enemy.hp * (magnification / 100));
  const calcATK = Math.round(enemy.attack * (magnification / 100));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {enemy.nameKo}{" "}
            <span className="text-gray-500 text-sm">{enemy.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-gray-600 text-sm">ID</p>
              <p>{enemy.id}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">기본 배율</p>
              <p>{enemy.magnification}%</p>
            </div>
          </div>

          {/* 효과 */}
          <div>
            <p className="text-gray-600 text-sm mb-1">효과</p>
            <div className="flex flex-wrap gap-2">
              {(enemy.effects ?? ["없음"]).map((eff: string, idx: number) => (
                <Badge key={idx}>{eff}</Badge>
              ))}
            </div>
          </div>

          {/* 스탯 */}
          <div>
            <p className="font-semibold mb-2">
              스탯 (배율 {magnification}% 기준)
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-600">HP</p>
                <p className="text-red-600 text-lg font-bold">
                  {calcHP.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  기본: {enemy.hp.toLocaleString()}
                </p>
              </div>

              <div className="p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-600">공격력</p>
                <p className="text-orange-600 text-lg font-bold">
                  {calcATK.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  기본: {enemy.attack.toLocaleString()}
                </p>
              </div>

              <div className="p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-600">사거리</p>
                <p>{enemy.range}</p>
              </div>

              <div className="p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-600">속도</p>
                <p>{enemy.speed}</p>
              </div>

              <div className="p-3 rounded bg-gray-50">
                <p className="text-sm text-gray-600">넉백</p>
                <p>{enemy.knockbackCount}회</p>
              </div>
            </div>
          </div>

          {/* 능력 */}
          <div>
            <p className="text-gray-600 text-sm mb-1">능력</p>
            <div className="flex flex-wrap gap-2">
              {(enemy.abilities ?? ["없음"]).map((ab: string, idx: number) => (
                <Badge variant="outline" key={idx}>
                  {ab}
                </Badge>
              ))}
            </div>
          </div>

          {/* 배율 입력 */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">배율</span>
            <Input
              type="number"
              value={magnification}
              min={1}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) setMagnification(Math.max(1, val));
              }}
              className="w-20 text-center"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
