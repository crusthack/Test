"use client";

import { useState } from "react";

import type { _Stage } from "@/types/stage";
import type { Enemy } from "@/types/enemy";
import StageFilters from "./StageFilters";
import StageTable from "./StageTable";
import StageDetailDialog from "./StageDetailDialog";
import EnemyDetailDialog from "@/components/enemy/EnemyDetailDialog";

interface StagePageProps {
	stages: _Stage[];
	enemies: Enemy[];
}

export default function StagePage({ stages, enemies }: StagePageProps) {
	const [selectedStage, setSelectedStage] = useState<_Stage | null>(null);
	const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
	const [isEnemyDialog, setIsEnemyDialog] = useState(false);
	const [enemyMultiplier, setEnemyMultiplier] = useState(100);

	return (
		<div className="space-y-6">
			<StageFilters />

			<StageTable
				stages={stages}
				enemies={enemies}
				onSelectStage={setSelectedStage}
			/>

			<StageDetailDialog
				stage={selectedStage}
				enemies={enemies}
				onSelectEnemy={(enemy: Enemy, mult: number) => {
					setSelectedEnemy(enemy);
					setEnemyMultiplier(mult);
					setIsEnemyDialog(true);
				}}
				onOpenChange={(open: boolean) => {
					if (!open) {
						setSelectedStage(null);
						setIsEnemyDialog(false);
					}
				}}
			/>

			<EnemyDetailDialog
				isOpen={isEnemyDialog}
				onOpenChange={setIsEnemyDialog}
				enemy={selectedEnemy}
			/>
		</div>
	);
}
