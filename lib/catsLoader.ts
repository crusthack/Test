import { loadAllCats } from "./loadcats"; 
import { cat } from "@/types/cat";

// ID에 해당하는 1~4폼 유닛만 골라 반환
export function loadCatsById(id: number): cat[] {
    const all = loadAllCats();
    return all.filter(c => c.Id === id);
}
