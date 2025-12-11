"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import type { _Stage } from "@/types/stage";
import type { Enemy } from "@/types/enemy";

export interface StageDetailDialogProps {
	stage: _Stage | null;
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
						{stage.StageName ?? `Stage ${stage.StageId}`}
					</DialogTitle>
				</DialogHeader>

				{/* 스테이지 기본 정보 */}
				<div className="grid grid-cols-2 gap-4 my-4">
					<div>
						<p className="text-gray-500">ID</p>
						<p>{stage.StageId}</p>
					</div>

					<div>
						<p className="text-gray-500">통솔력</p>
						<p>{typeof stage.Energy !== 'undefined' ? stage.Energy : '—'}</p>
					</div>

					<div>
						<p className="text-gray-500">맵</p>
						<p>{stage.MapName ?? stage.StoryName ?? '—'}</p>
					</div>
				</div>

				{/* 적 리스트 (간단 표시) */}
				<h3 className="text-green-600 mb-2">출몰 적</h3>

				<div className="space-y-2">
					{stage.Enemies && stage.Enemies.length > 0 ? (
						// sort spawn entries by enemyId ascending for display
						[...stage.Enemies]
							.slice()
							.sort((a, b) => (Number(a.enemyId ?? 0) - Number(b.enemyId ?? 0)))
							.map((s, i) => {
								const en = s.enemyId ? enemies.find((e) => e.Id === s.enemyId) : null;
								const mult = s.magnification ?? 100;

								return (
									<div key={i} className="cursor-pointer" onClick={() => en && onSelectEnemy(en, mult)}>
										<Card className="p-4 hover:bg-gray-50">
											<div className="flex items-center gap-4">
												{en && en.Image ? (
													<img src={en.Image} alt={en.Name} className="w-12 h-12 object-contain rounded bg-white" />
												) : (
													<div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded text-xs text-gray-400">No</div>
												)}

												<div className="flex-1">
													<div className="font-medium">{en ? en.Name : (s.nameKo ?? s.name ?? `Enemy ${s.enemyId ?? i}`)}</div>
													<div className="text-gray-500 text-sm">{s.triggerType === 'baseHp' ? `성 HP ${s.triggerValue}%` : `시간 ${s.triggerValue}s`}</div>
												</div>

												<Badge variant="outline">{mult}%</Badge>
											</div>
										</Card>
									</div>
								);
							})
					) : (
						<div className="text-gray-500">출몰 적 정보 없음</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
