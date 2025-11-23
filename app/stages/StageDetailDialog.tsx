"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Card from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StageDetailDialog({
  stage,
  enemies,
  onSelectEnemy,
  onOpenChange,
}: any) {
  if (!stage) return null;

  return (
    <Dialog open={!!stage} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-600">{stage.Name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">ID</p>
              <p>{stage.StageId}</p>
            </div>
            <div>
              <p className="text-gray-600">기지 HP</p>
              <p>{stage.CastleHealth}</p>
            </div>
          </div>

          <h3 className="text-green-600 mt-4">출몰 적</h3>

          <div className="space-y-2">
            {stage.Enemies.map((line: any, i: number) => {
              const en = enemies.find((e: any) => e.Id === line.EnemyId);
              if (!en) return null;

              const mult = line.Magnification ?? 100;

              return (
                <Card
                  key={i}
                  className="p-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => onSelectEnemy(en, mult)}
                >
                  <div className="flex justify-between">
                    <span>{en.Name}</span>
                    <Badge variant="outline">{mult}%</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
