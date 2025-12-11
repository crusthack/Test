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

const mapTypeFromId = (id: number | undefined) => {
	if (id === 9) return "세계편";
	if (id === 4) return "미래편 1장";
	if (id === 5) return "미래편 2장";
	if (id === 6) return "미래편 3장";
	if ([11, 12, 13, 14, 15, 16].includes(Number(id))) return "특수편";
	return "기타";
};

export default function StageTable({ stages, enemies, onSelectStage }: any) {
	return (
		<Card className="p-6">
			<div className="overflow-x-auto w-full min-w-0">
				<Table className="w-full table-fixed text-left">
					<TableHeader>
						<TableRow>
								<TableHead className="w-14 text-center">맵 번호</TableHead>
								<TableHead className="w-20">맵 종류</TableHead>
								<TableHead className="w-20">맵/스테이지</TableHead>
								<TableHead className="w-16">통솔력</TableHead>
								<TableHead className="w-30">이름</TableHead>
								<TableHead>출몰 적</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{stages.map((st: any) => {
							const uniqueEnemyIds = Array.from(new Set((st.Enemies || []).map((e: any) => e.EnemyId))) as number[];
							// Exclude enemy with ID 23 from display
							const shown = uniqueEnemyIds.filter(id => id !== 23);

							return (
								<TableRow
									key={st.Code ?? `${st.StoryId}-${st.MapId}-${st.StageId}`}
									className="cursor-pointer hover:bg-gray-50"
									onClick={() => onSelectStage(st)}
								>
									<TableCell className="text-center">{st.StageId + 1}</TableCell>
									<TableCell>{st.mapType ?? mapTypeFromId(st.MapId)}</TableCell>
									<TableCell>{st.mapStage ?? (typeof st.StageId !== "undefined" ? `#${st.StageId}` : "—")}</TableCell>
									<TableCell>{typeof st.energy !== "undefined" ? st.energy : (st.Settings && st.Settings.length ? st.Settings[0] : "—")}</TableCell>
									<TableCell>
										<div className="font-semibold">{st.Name}</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-0.5 items-start">
											{shown.map((id: number, i: number) => {
												const en = enemies.find((x: any) => x.Id === id);
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
