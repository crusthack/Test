import { loadAllStages } from "@/lib/stageLoader";
import { loadAllEnemies } from "@/lib/enemyLoader";
import StagePage from "./StagePage";

export default function Page() {
  const stages = loadAllStages(); // server-side file read
  const enemies = loadAllEnemies();

  return <StagePage stages={stages} enemies={enemies} />;
}