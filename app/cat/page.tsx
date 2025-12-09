// app/cat/page.tsx
import { loadAllCats } from "@/lib/catsLoader";
import AllyCatsPage from "../../components/cat/AllyCatsPage";

export default async function Page() {
  const cats = await loadAllCats();

  return <AllyCatsPage cats={cats} />;
}
