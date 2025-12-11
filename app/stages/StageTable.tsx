"use client";

import Card from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { _Stage } from "@/types/stage";
import type { Enemy } from "@/types/enemy";

interface StageTableProps {
	stages: _Stage[];
	enemies: Enemy[];
	onSelectStage: (s: _Stage) => void;
}

const mapTypeFromId = (id: number | undefined) => {
	if (id === 9) return "세계편";
	if (id === 3) return "미래편 1장";
	if (id === 4) return "미래편 2장";
	if (id === 5) return "미래편 3장";
    if (id === 6) return "우주편 1장";
    if (id === 7) return "우주편 2장";
    if (id === 8) return "우주편 3장";
	if ([11, 12, 13, 14, 15, 16].includes(Number(id))) return "특수편";
	return "기타";
};

export default function StageTable({ stages, enemies, onSelectStage }: StageTableProps) {
	// ensure 세계편 (MapId === 9) appears first, then sort by StoryId, MapId, StageId
	const sortedStages = [...stages].sort((a, b) => {
		if ((a.MapId ?? 0) === 9 && (b.MapId ?? 0) !== 9) return -1;
		if ((b.MapId ?? 0) === 9 && (a.MapId ?? 0) !== 9) return 1;
		const sa = (a.StoryId ?? 0) - (b.StoryId ?? 0);
		if (sa !== 0) return sa;
		const ma = (a.MapId ?? 0) - (b.MapId ?? 0);
		if (ma !== 0) return ma;
		return (a.StageId ?? 0) - (b.StageId ?? 0);
	});

	return (
		<Card className="p-6">
			<div className="overflow-x-auto w-full min-w-0">
				<Table className="w-full table-fixed text-left">
					<TableHeader>
						<TableRow>
								<TableHead className="w-14 text-center">맵 번호</TableHead>
								<TableHead className="w-20">맵 종류</TableHead>
								<TableHead className="w-40">스테이지 이름</TableHead>
								<TableHead className="w-16">통솔력</TableHead>
								<TableHead>출몰 적</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
					{sortedStages.map((st, idx) => {
						const uniqueEnemyIds = Array.from(new Set((st.Enemies || []).map((e: any) => e.enemyId).filter(Boolean))) as number[];
						// show sorted by enemy id ascending, excluding id 23
						const shown = uniqueEnemyIds
							.filter(id => id !== 23)
							.sort((a, b) => Number(a) - Number(b));

						return (
							<TableRow
								key={`${st.StoryId}-${st.MapId}-${st.StageId}-${idx}`}
								className="cursor-pointer hover:bg-gray-50"
								onClick={() => onSelectStage(st)}
							>
								<TableCell className="text-center">{(st.StageId ?? 0) + 1}</TableCell>
								<TableCell>{mapTypeFromId(st.MapId)}</TableCell>
								<TableCell>
									<div className="font-semibold">{st.StageName ?? st.StageName}</div>
								</TableCell>
								<TableCell>{typeof st.Energy !== "undefined" ? st.Energy : "—"}</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-0.5 items-start">
										{shown.map((id: number, i: number) => {
											const en = enemies.find((x) => x.Id === id || x.Id === Number(id));
											if (!en) return null;

											return (
												<div key={`${id}-${i}`} className="flex flex-col items-center justify-start w-28">
													<div className="w-20 h-8">
														{en.Image ? (
															<img src={en.Image} alt={en.Name} className="w-full h-full object-contain rounded bg-white" />
														) : (
															<div className="w-full h-full bg-gray-100 flex items-center justify-center rounded text-xs text-gray-400">No</div>
														)}
													</div>
													<div className="text-black text-sm mt-1 text-center truncate w-full px-1">{en.Name}</div>
												</div>
											);
										})}
									</div>
								</TableCell>
							</TableRow>
						);
					})}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
}
