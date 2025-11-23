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

export default function StageTable({ stages, enemies, onSelectStage }: any) {
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>기지 HP</TableHead>
              <TableHead>출몰 적</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stages.map((st: any) => (
              <TableRow
                key={st.StageId}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onSelectStage(st)}
              >
                <TableCell>{st.StageId}</TableCell>
                <TableCell>{st.Name}</TableCell>
                <TableCell>{st.CastleHealth}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {st.Enemies.slice(0, 5).map((e: any, i: number) => {
                      const en = enemies.find((x: any) => x.Id === e.EnemyId);
                      if (!en) return null;

                      return (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {en.Name}
                        </Badge>
                      );
                    })}
                    {st.Enemies.length > 5 && (
                      <span className="text-gray-500 text-xs">
                        + {st.Enemies.length - 5} more…
                      </span>
                    )}
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
