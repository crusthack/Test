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

const mapTypeFromId = (id: number | undefined) => {
    if (id === 9) return "세계편";
    if ([3, 4, 5].includes(Number(id))) return "미래편";
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
								<TableHead className="w-8 text-center">ID</TableHead>
								<TableHead className="w-40">맵 종류</TableHead>
								<TableHead className="w-36">맵/스테이지</TableHead>
								<TableHead className="w-16">에너지</TableHead>
								<TableHead className="w-72">이름</TableHead>
								<TableHead>출몰 적</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{stages.map((st: any) => (
							<TableRow
								key={st.Code ?? `${st.StoryId}-${st.MapId}-${st.StageId}`}
								className="cursor-pointer hover:bg-gray-50"
								onClick={() => onSelectStage(st)}
							>
								<TableCell className="text-center">{st.StageId}</TableCell>
								<TableCell>{st.mapType ?? mapTypeFromId(st.MapId)}</TableCell>
								<TableCell>{st.mapStage ?? (typeof st.StageId !== "undefined" ? `#${st.StageId}` : "—")}</TableCell>
								<TableCell>{typeof st.energy !== "undefined" ? st.energy : (st.Settings && st.Settings.length ? st.Settings[0] : "—")}</TableCell>
								<TableCell>
									<div className="font-semibold">{st.Name}</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1">
										{st.Enemies.slice(0, 5).map((e: any, i: number) => {
											const en = enemies.find((x: any) => x.Id === e.EnemyId);
											if (!en) return null;

											return (
												<Badge key={`${e.EnemyId}-${i}`} variant="secondary" className="text-xs">
													{en.Name}
												</Badge>
											);
										})}
										{st.Enemies.length > 5 && (
											<span className="text-gray-500 text-xs">+ {st.Enemies.length - 5} more…</span>
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
