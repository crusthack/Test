"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { loadAllCats } from "@/lib/catsLoader";
import CatDetailDialog from "@/components/cat/CatDetailDialog";
import CatsTable from "@/components/cat/CatsTable";
import UnifiedFiltersPanel from "@/components/common/UnifiedFiltersPanel";
import type { Cat } from "@/types/cat";

const FILTER_RARITY_OPTIONS = [
  { value: "all", label: "전체", color: "gray" as const },
  { value: "기본", label: "기본", color: "red" as const },
  { value: "Ex", label: "Ex", color: "orange" as const },
  { value: "레어", label: "레어", color: "yellow" as const },
  { value: "슈퍼레어", label: "슈퍼레어", color: "green" as const },
  { value: "울트라슈퍼레어", label: "울트라슈퍼레어", color: "blue" as const },
  { value: "레전드레어", label: "레전드레어", color: "purple" as const },
];

const FILTER_TARGET_OPTIONS = [
  { value: "all", label: "전체", color: "gray" as const },
  { value: "Red", label: "빨간적", color: "red" as const },
  { value: "Floating", label: "떠있는적", color: "green" as const },
  { value: "Black", label: "검은적", color: "black" as const },
  { value: "Metal", label: "메탈적", color: "slate" as const },
  { value: "Angel", label: "천사", color: "yellow" as const },
  { value: "Alien", label: "에이리언", color: "sky" as const },
  { value: "Zombie", label: "좀비", color: "purple" as const },
  { value: "Relic", label: "고대종", color: "emerald" as const },
  { value: "Demon", label: "악마", color: "blue-900" as const },
  { value: "White", label: "무속성", color: "stone" as const },
];

const FILTER_EFFECT_OPTIONS = [
  { group: "1", value: "all", label: "전체" },
  { group: "1", value: "Slow", label: "느리게 한다" },
  { group: "1", value: "Stop", label: "멈춘다" },
  { group: "1", value: "Knockback", label: "날려버린다" },
  { group: "1", value: "Weak", label: "공격력 다운" },
  { group: "2", value: "MassiveDamage", label: "초 데미지" },
  { group: "2", value: "InsaneDamage", label: "극 데미지" },
  { group: "2", value: "Good", label: "엄청 강하다" },
  { group: "2", value: "Resistant", label: "맷집 좋다" },
  { group: "2", value: "InsanelyTough", label: "초 맷집" },
  { group: "2", value: "Curse", label: "저주" },
  { group: "2", value: "ImuATK", label: "공격 무효" },
  { group: "2", value: "Only", label: "타겟 한정" },
];

const FILTER_ABILITY_OPTIONS = [
  { group: "1", value: "all", label: "전체" },
  { group: "1", value: "none", label: "없음" },
  { group: "1", value: "AtkUp", label: "공격력 업" },
  { group: "1", value: "LETHAL", label: "살아남는다" },
  { group: "1", value: "BaseDestroyer", label: "성 파괴가 특기" },
  { group: "2", value: "Critical", label: "크리티컬" },
  { group: "2", value: "MetalKiller", label: "메탈 킬러" },
  { group: "2", value: "ZombieKiller", label: "좀비 킬러" },
  { group: "2", value: "SoulStrike", label: "영혼 공격" },
  { group: "2", value: "BarrierBreak", label: "베리어 브레이커" },
  { group: "2", value: "ShieldBreak", label: "쉴드 브레이커" },
  { group: "2", value: "StrickAttack", label: "혼신의 일격" },
  { group: "2", value: "Bounty", label: "격파시 머니 up" },
  { group: "2", value: "Metallic", label: "메탈" },
  { group: "2", value: "WaveBlocker", label: "파동삭제" },
  { group: "3", value: "MiniWave", label: "소파동" },
  { group: "3", value: "Wave", label: "파동 공격" },
  { group: "3", value: "MiniVolcano", label: "소열파" },
  { group: "3", value: "Volcano", label: "열파 공격" },
  { group: "3", value: "VolcanoCounter", label: "열파 카운터" },
  { group: "3", value: "Blast", label: "폭파 공격" },
  { group: "3", value: "WaveBlocker", label: "파동스토퍼" },
  { group: "3", value: "Summon", label: "소환" },
  { group: "4", value: "ColosusSlayer", label: "초생명체 특효" },
  { group: "4", value: "BehemothSlayer", label: "초수 특효" },
  { group: "4", value: "SageHunter", label: "초현자 특효" },
  { group: "5", value: "ImuWeak", label: "공격력 다운 무효" },
  { group: "5", value: "ImuKB", label: "날려버린다 무효" },
  { group: "5", value: "ImuStop", label: "움직임을 멈춘다 무효" },
  { group: "5", value: "ImuSlow", label: "움직임을 느리게 한다 무효" },
  { group: "5", value: "ImuWarp", label: "워프 무효" },
  { group: "5", value: "ImuCurse", label: "고대의 저주 무효" },
  { group: "5", value: "ImuPoison", label: "독 데미지 무효" },
  { group: "5", value: "ImuWave", label: "파동 데미지 무효" },
  { group: "5", value: "ImuVolcano", label: "열파 데미지 무효" },
  { group: "5", value: "ImuBlast", label: "폭파 데미지 무효" },
  { group: "6", value: "weaken_resist", label: "공격력 다운 저항" },
  { group: "6", value: "stop_resist", label: "움직임을 멈춘다 저항" },
  { group: "6", value: "slow_resist", label: "움직임을 느리게 한다 저항" },
  { group: "6", value: "knockback_resist", label: "날려버린다 저항" },
  { group: "6", value: "wave_resist", label: "파동 데미지 저항" },
  { group: "6", value: "mini_wave_resist", label: "열파 데미지 저항" },
  { group: "6", value: "warp_resist", label: "워프 저항" },
  { group: "6", value: "curse_resist", label: "고대의 저주 저항" },
  { group: "6", value: "poison_resist", label: "독 데미지 저항" },
  { group: "7", value: "hp_up", label: "기본 체력 업" },
  { group: "7", value: "atk_base_up", label: "기본 공격력 업" },
  { group: "7", value: "speed_up", label: "이동 속도 업" },
  { group: "7", value: "knockback_up", label: "넉백 횟수 증가" },
  { group: "7", value: "cost_down", label: "생산 코스트 할인" },
  { group: "7", value: "production_up", label: "생산 스피드 업" },
  { group: "7", value: "tba_down", label: "공격 간격 단축" },
];

const FILTER_ATTACKTYPE_OPTIONS = [
  { value: "all", label: "전체", color: "gray" as const },
  { value: "single", label: "단일 공격", color: "blue" as const },
  { value: "range", label: "범위 공격", color: "green" as const },
  { value: "long", label: "원거리 공격", color: "purple" as const },
  { value: "omni", label: "전방위 공격", color: "red" as const },
];

const RARITY_COLOR_MAP: Record<string, string> = {
  기본: "bg-gray-400 text-white",
  EX: "bg-yellow-300 text-black",
  레어: "bg-blue-500 text-white",
  슈퍼레어: "bg-green-500 text-white",
  울트라슈퍼레어: "bg-red-600 text-white",
  레전드레어: "bg-purple-800 text-white",
};

const TARGET_COLOR_MAP: Record<string, string> = {
  Red: "bg-red-500 text-white",
  Floating: "bg-green-500 text-white",
  Black: "bg-black text-white",
  Metal: "bg-slate-400 text-white",
  Angel: "bg-yellow-300 text-black",
  Alien: "bg-sky-400 text-white",
  Zombie: "bg-purple-600 text-white",
  Relic: "bg-emerald-700 text-white",
  Demon: "bg-blue-900 text-white",
  White: "bg-stone-400 text-black",
};

// ============================================================
// 클라이언트 컴포넌트
// ============================================================

export default function CatPage({cata}: {cata: Cat[]}) {
  const [cats, setCats] = useState<Cat[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string[]>(["all"]);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(["all"]);
  const [targetFilterMode, setTargetFilterMode] = useState<"OR" | "AND">("OR");
  const [selectedEffects, setSelectedEffects] = useState<string[]>(["all"]);
  const [effectFilterMode, setEffectFilterMode] = useState<"OR" | "AND">("AND");
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>(["all"]);
  const [abilityFilterMode, setAbilityFilterMode] = useState<"OR" | "AND">("AND");
  const [selectedAttackTypes, setSelectedAttackTypes] = useState<string[]>(["all"]);
  const [attackTypeFilterMode, setAttackTypeFilterMode] = useState<"OR" | "AND">("AND");
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(30);

  // SSR 방지: useEffect에서 데이터 로드
  useEffect(() => {
    const loadCats = async () => {
      try {
        const loadedCats = await cata;
        setCats(loadedCats);
      } catch (error) {
        console.error("Failed to load cats:", error);
      }
    };
    loadCats();
  }, []);

  const toggleMulti = useCallback(
    (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      setter((prev: string[]) => {
        if (value === "all") return ["all"];
        const cleaned = prev.filter((v) => v !== "all");
        if (cleaned.includes(value)) {
          const next = cleaned.filter((v) => v !== value);
          return next.length === 0 ? ["all"] : next;
        }
        return [...cleaned, value];
      });
    },
    []
  );
  const getRarityColor = useCallback((rarity: string): string => {
    return RARITY_COLOR_MAP[rarity] ?? "bg-gray-300 text-black";
  }, []);

  const getTargetColor = useCallback((target: string): string => {
    return TARGET_COLOR_MAP[target] ?? "bg-gray-200 text-gray-600";
  }, []);

  const getEffectColor = useCallback((effect: string): string => {
    return "bg-gray-200 text-gray-600";
  }, []);

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => {
      const matchesSearch =
        cat.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.Descriptiont ?? "").includes(searchTerm);

      const matchesRarity =
        selectedRarity.includes("all") || selectedRarity.includes(cat.Rarity);

      const matchesTarget =
        selectedTargets.includes("all") ||
        (targetFilterMode === "OR"
          ? selectedTargets.some((t) => cat.Targets.includes(t as any))
          : selectedTargets.every((t) => cat.Targets.includes(t as any)));

      const matchesEffect =
        selectedEffects.includes("all") ||
        (effectFilterMode === "OR"
          ? selectedEffects.some((e) => cat.Affects.includes(e as any))
          : selectedEffects.every((e) => cat.Affects.includes(e as any)));

      const matchesAbility =
        selectedAbilities.includes("all") ||
        (abilityFilterMode === "OR"
          ? selectedAbilities.some((a) => cat.Abilities.includes(a as any))
          : selectedAbilities.every((a) => cat.Abilities.includes(a as any)));

      const matchesAttackType =
        selectedAttackTypes.includes("all") ||
        (attackTypeFilterMode === "OR"
          ? selectedAttackTypes.some((t) => cat.AttackType.includes(t as any))
          : selectedAttackTypes.every((t) => cat.AttackType.includes(t as any)));

      return (
        matchesSearch &&
        matchesRarity &&
        matchesTarget &&
        matchesEffect &&
        matchesAbility &&
        matchesAttackType
      );
    });
  }, [
    cats,
    searchTerm,
    selectedRarity,
    selectedTargets,
    targetFilterMode,
    selectedEffects,
    effectFilterMode,
    selectedAbilities,
    abilityFilterMode,
    selectedAttackTypes,
    attackTypeFilterMode,
  ]);

  const handleCatSelect = useCallback((cat: Cat) => {
    setSelectedCat(cat);
    setCurrentLevel(30);
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      <UnifiedFiltersPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        rarities={FILTER_RARITY_OPTIONS}
        selectedRarity={selectedRarity}
        setSelectedRarity={setSelectedRarity}
        targets={FILTER_TARGET_OPTIONS}
        selectedTargets={selectedTargets}
        setSelectedTargets={setSelectedTargets}
        targetFilterMode={targetFilterMode}
        setTargetFilterMode={setTargetFilterMode}
        effects={FILTER_EFFECT_OPTIONS}
        selectedEffects={selectedEffects}
        setSelectedEffects={setSelectedEffects}
        effectFilterMode={effectFilterMode}
        setEffectFilterMode={setEffectFilterMode}
        abilities={FILTER_ABILITY_OPTIONS}
        selectedAbilities={selectedAbilities}
        setSelectedAbilities={setSelectedAbilities}
        abilityFilterMode={abilityFilterMode}
        setAbilityFilterMode={setAbilityFilterMode}
        attackTypes={FILTER_ATTACKTYPE_OPTIONS}
        selectedAttackTypes={selectedAttackTypes}
        setSelectedAttackTypes={setSelectedAttackTypes}
        attackTypeFilterMode={attackTypeFilterMode}
        setAttackTypeFilterMode={setAttackTypeFilterMode}
        toggleMulti={toggleMulti}
      />

      <CatsTable
        cats={filteredCats}
        onSelect={handleCatSelect}
        getRarityColor={getRarityColor}
        getTargetColor={getTargetColor}
        getEffectColor={getEffectColor}
      />

      <CatDetailDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedCat={selectedCat}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />
    </div>
  );
}
