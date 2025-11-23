import StagePage from "./StagePage";
import { loadAllStages } from "@/lib/stageLoader";
import { loadAllEnemies } from "@/lib/enemyLoader";

export default function Page() {
  const stages = loadAllStages();   // fs 사용 OK
  const enemies = loadAllEnemies(); // fs 사용 OK

  return (
    <StagePage
      stages={stages}
      enemies={enemies}
    />
  );
}
