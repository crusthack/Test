"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import type { Stage } from "@/lib/stageLoader";
import type { Enemy } from "@/types/enemy";

export interface StageDetailDialogProps {
	stage: Stage | null;
	enemies: Enemy[];
	onSelectEnemy: (enemy: Enemy, mult: number) => void;
	onOpenChange: (open: boolean) => void;
}

export default function StageDetailDialog({
	stage,
	enemies,
	onSelectEnemy,
	onOpenChange,
}: StageDetailDialogProps) {
	if (!stage) return null;

	const isOpen = !!stage;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-green-600">
						{stage.Name ?? stage.Code}
					</DialogTitle>
				</DialogHeader>

				{/* 스테이지 기본 정보 */}
				<div className="grid grid-cols-2 gap-4 my-4">
					<div>
						<p className="text-gray-500">ID</p>
						<p>{stage.MapId}</p>
					</div>

					<div>
						<p className="text-gray-500">기지 HP</p>
						<p>{stage.CastleHealth}</p>
					</div>

					<div>
						<p className="text-gray-500">길이</p>
						<p>{stage.Length}</p>
					</div>
				</div>

				{/* 적 리스트 */}
				<h3 className="text-green-600 mb-2">출몰 적</h3>

				<div className="space-y-2">
					{stage.Enemies.map((line, i) => {
						const en = enemies.find((e) => e.Id === line.EnemyId);
						if (!en) return null;

						const mult = line.Magnification ?? 100;

						return (
							<div
								key={`${en.Id}-${i}`}
								className="cursor-pointer"
								onClick={() => onSelectEnemy(en, mult)}
							>
								<Card className="p-6 hover:bg-gray-50">
									<div className="flex items-center gap-4">
										{en.Image ? (
											<img src={en.Image} alt={en.Name} className="w-12 h-12 object-contain rounded bg-white" />
										) : (
											<div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded text-xs text-gray-400">No</div>
										)}

										<div className="flex-1">
											<div className="font-medium">{en.Name}</div>
											<div className="text-gray-500 text-sm">ID {en.Id}</div>
										</div>

										<Badge variant="outline">{mult}%</Badge>
									</div>
								</Card>
							</div>
						);
					})}
				</div>
			</DialogContent>
		</Dialog>
	);
}
