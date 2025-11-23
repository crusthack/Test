// app/cat/page.tsx
import { loadAllCats } from "@/lib/loadcats";
import AllyCatsPage from "./AllyCatsPage";

export default async function Page() {
  const cats = await loadAllCats();

  return <AllyCatsPage cats={cats} />;
}
