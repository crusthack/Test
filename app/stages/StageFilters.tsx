"use client";

import { Input } from "@/components/ui/input";
import Card from "@/components/ui/card";

export default function StageFilters({
	search,
	setSearch,
	mapType,
	setMapType,
	chapter,
	setChapter,
}: any) {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-green-600 mb-2">스테이지 정보</h2>
				<p className="text-gray-600">냥코 스테이지 검색</p>
			</div>

			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="적 이름으로 검색…"
				className="max-w-md"
			/>

			<Card className="p-6">
				<div className="space-y-4">
					<div>
						<h3 className="mb-2">맵 종류</h3>
						<div className="flex gap-2 flex-wrap">
							{["all", "세계편", "미래편", "우주편"].map((m) => (
								<button
									key={m}
									onClick={() => setMapType(m)}
									className={`px-4 py-2 rounded-lg border ${
										mapType === m ? "bg-green-500 text-white" : ""
									}`}
								>
									{m}
								</button>
							))}
						</div>
					</div>

					<div>
						<h3 className="mb-2">장</h3>
						<div className="flex gap-2 flex-wrap">
							{["all", "1장", "2장", "3장"].map((m) => (
								<button
									key={m}
									onClick={() => setChapter(m)}
									className={`px-4 py-2 rounded-lg border ${
										chapter === m ? "bg-blue-500 text-white" : ""
									}`}
								>
									{m}
								</button>
							))}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
