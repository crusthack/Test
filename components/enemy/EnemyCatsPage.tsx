"use client";

import { useState } from "react";
import type { Enemy } from "@/types/enemy";

import EnemyFiltersPanel from "./FiltersPanelEnemy";
import EnemiesTable from "./EnemiesTable";
import EnemyDetailDialog from "./EnemyDetailDialog";

export default function EnemyCatsPage({ enemies }: { enemies: Enemy[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(["all"]);
  const [attributeFilterMode, setAttributeFilterMode] = useState<"OR" | "AND">("OR");

  const [selectedEffects, setSelectedEffects] = useState<string[]>(["all"]);
  const [effectFilterMode, setEffectFilterMode] = useState<"OR" | "AND">("OR");

  const [selectedAbilities, setSelectedAbilities] = useState<string[]>(["all"]);
  const [abilityFilterMode, setAbilityFilterMode] = useState<"OR" | "AND">("OR");

  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMagnification, setCurrentMagnification] = useState(100);


  /* ------------------ 필터 옵션 ------------------ */

  const attributes = [
    { value: 'all', label: '전체', color: 'gray' },
    { value: 'Red', label: '빨간적', color: 'red' },
    { value: 'Floating', label: '떠있는적', color: 'green' },
    { value: 'Black', label: '검은적', color: 'black' },
    { value: 'Metal', label: '메탈적', color: 'slate' },
    { value: 'Angel', label: '천사', color: 'yellow' },
    { value: 'Alien', label: '에이리언', color: 'sky' },
    { value: 'Zombie', label: '좀비', color: 'purple' },
    { value: 'Relic', label: '고대종', color: 'emerald' },
    { value: 'Demon', label: '악마', color: 'blue-900' },
    { value: 'White', label: '무속성', color: 'stone' }
  ];

  // export type affect =
  //   | "Knockback"       // 20 날려버린다 확률
  //   | "Stop"            // 21 멈춘다 확률 22 - 시간
  //   | "Slow"            // 23 느리게한다 확률 24 - 시간
  //   | "Weak"            // 29 공다 확률 38 시간 30 배율
  //   | "Curse"           // 73 고대의 저주 확률 74 - 시간
  //   | "Warp"            // 65 워프  66 워프 시간 67, 68 워프거리(2개 있는 이유 모르겟음 다 값 같은데) 워프거리가 음수면 역워프
  //   | "rWarp"
  //   | "ImuATK"          // 84 공격무효 확률
  //   | "Poison"          // 독 공격
  //   ;
  const effects = [
    { group: "1", value: "all", label: "전체" },
    { group: "1", value: "Slow", label: "움직임을 느리게 한다" },
    { group: "1", value: "Stop", label: "움직임을 멈춘다" },
    { group: "1", value: "Knockback", label: "날려버린다" },
    { group: "1", value: "Weak", label: "공격력다운" },
    { group: "1", value: "Curse", label: "저주" },
    { group: "1", value: "ImuATK", label: "공격 무효" },
    { group: "1", value: "Warp", label: "워프" },
    { group: "1", value: "rWarp", label: "역워프" },
    { group: "1", value: "Poision", label: "독공격" },
  ];

  const abilities = [
    { group: "1", value: "all", label: "전체" },
    { group: "1", value: "AtkUp", label: "공격력 업" },
    { group: "1", value: "LETHAL", label: "살아남는다" },
    { group: "1", value: "BaseDestroyer", label: "성 파괴가 특기" },
    { group: "1", value: "Critical", label: "크리티컬" },
    { group: "1", value: "StrickAttack", label: "혼신의 일격" },
    { group: "1", value: "Glass", label: "유리" },
    
    { group: "2", value: "MiniWave", label: "소파동" },
    { group: "2", value: "Wave", label: "파동 공격" },
    { group: "2", value: "MiniVolcano", label: "소열파" },
    { group: "2", value: "Volcano", label: "열파 공격" },
    { group: "2", value: "VolcanoCounter", label: "열파 카운터" },
    { group: "2", value: "Blast", label: "폭파 공격" },
    { group: "2", value: "WaveBlocker", label: "파동스토퍼" },
    { group: "2", value: "Barrier", label: "베리어" },
    { group: "2", value: "DevilShield", label: "악마쉴드" },
    { group: "2", value: "DeathVolcano", label: "순교" },
    { group: "2", value: "Burrow", label: "버로우" },
    { group: "2", value: "Rebirth", label: "부활" },


    { group: "3", value: "single", label: "개체공격" },
    { group: "3", value: "aoe", label: "범위공격" },
    { group: "3", value: "ld", label: "원거리공격" },
    { group: "3", value: "omni", label: "전방위공격" },

    { group: "4", value: "Colosus", label: "초생명체" },
    { group: "4", value: "Behemoth", label: "초수" },
    { group: "4", value: "Sage", label: "초현자" },

    { group: "5", value: "ImuWeak", label: "공격력 다운 무효" },
    { group: "5", value: "ImuKB", label: "날려버린다 무효" },
    { group: "5", value: "ImuStop", label: "멈춘다 무효" },
    { group: "5", value: "ImuSlow", label: "움직임을 느리게 한다 무효" },
    { group: "5", value: "ImuWarp", label: "워프 무효" },
    { group: "5", value: "ImuCurse", label: "저주 무효" },
    { group: "5", value: "ImuWave", label: "파동 무효" },
    { group: "5", value: "ImuVolcano", label: "열파 무효" },
    { group: "5", value: "ImuBlast", label: "폭파 무효" },
  ];

  /* ------------------ 토글 유틸 ------------------ */

  const toggleMulti = (value: string, setter: any) => {
    setter((prev: string[]) => {
      if (value === "all") return ["all"];

      const withoutAll = prev.filter((v) => v !== "all");

      if (withoutAll.includes(value)) {
        const next = withoutAll.filter((v) => v !== value);
        return next.length === 0 ? ["all"] : next;
      }

      return [...withoutAll, value];
    });
  };

  /* ------------------ 필터링 ------------------ */
  const filteredEnemies = enemies.filter((enemy) => {
    const matchesSearch =
      enemy.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enemy.Descriptiont.includes(searchTerm);

    const matchesAttribute =
      selectedAttributes.includes("all") ||
      (attributeFilterMode === "OR"
        ? selectedAttributes.some((v) => enemy.Targets.includes(v as any))
        : selectedAttributes.every((v) => enemy.Targets.includes(v as any)));

    const matchesEffect =
      selectedEffects.includes("all") ||
      (effectFilterMode === "OR"
        ? selectedEffects.some((v) => enemy.Affects.includes(v as any))
        : selectedEffects.every((v) => enemy.Affects.includes(v as any)));

    const matchesAbility =
      selectedAbilities.includes("all") ||
      (abilityFilterMode === "OR"
        ? selectedAbilities.some((v) => enemy.Abilities.includes(v as any))
        : selectedAbilities.every((v) => enemy.Abilities.includes(v as any)));


    return matchesSearch && matchesAttribute && matchesEffect && matchesAbility;
  });

  /* ------------------ 색상 유틸 ------------------ */

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: Record<string, { selected: string; hover: string }> = {
      gray: { selected: "bg-gray-500 text-white border-gray-500", hover: "hover:bg-gray-100 hover:border-gray-400" },
      red: { selected: "bg-red-500 text-white border-red-500", hover: "hover:bg-red-100 hover:border-red-400" },
      sky: { selected: "bg-sky-500 text-white border-sky-500", hover: "hover:bg-sky-100 hover:border-sky-400" },
      slate: { selected: "bg-slate-500 text-white border-slate-500", hover: "hover:bg-slate-100 hover:border-slate-400" },
      yellow: { selected: "bg-yellow-500 text-white border-yellow-500", hover: "hover:bg-yellow-100 hover:border-yellow-400" },
      purple: { selected: "bg-purple-500 text-white border-purple-500", hover: "hover:bg-purple-100 hover:border-purple-400" },
      emerald: { selected: "bg-emerald-600 text-white border-emerald-600", hover: "hover:bg-emerald-100 hover:border-emerald-400" },
      cyan: { selected: "bg-cyan-500 text-white border-cyan-500", hover: "hover:bg-cyan-100 hover:border-cyan-400" },
      stone: { selected: "bg-stone-500 text-white border-stone-500", hover: "hover:bg-stone-100 hover:border-stone-400" },
    };

    const c = colorMap[color] || colorMap.gray;
    return isSelected ? c.selected : `bg-white border-gray-300 ${c.hover}`;
  };

  const getAttributeColor = (attr: string) => ({
    빨강: "bg-red-500 text-white",
    떠있음: "bg-sky-500 text-white",
    메탈: "bg-slate-500 text-white",
    무속성: "bg-stone-400 text-black",
    천사: "bg-yellow-400 text-black",
    흑: "bg-purple-600 text-white",
    좀비: "bg-emerald-700 text-white",
    에일리언: "bg-cyan-500 text-white",
    없음: "bg-gray-200 text-gray-600",
  }[attr] || "bg-gray-200 text-gray-600");

  const getEffectColor = (effect: string) => ({
    느리게한다: "bg-blue-500 text-white",
    멈추게한다: "bg-purple-500 text-white",
    공격력다운: "bg-orange-500 text-white",
    없음: "bg-gray-200 text-gray-600",
  }[effect] || "bg-gray-200 text-gray-600");

  return (
    <div className="space-y-6">
      <EnemyFiltersPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        attributes={attributes}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        attributeFilterMode={attributeFilterMode}
        setAttributeFilterMode={setAttributeFilterMode}
        effects={effects}
        selectedEffects={selectedEffects}
        setSelectedEffects={setSelectedEffects}
        effectFilterMode={effectFilterMode}
        setEffectFilterMode={setEffectFilterMode}
        abilities={abilities}
        selectedAbilities={selectedAbilities}
        setSelectedAbilities={setSelectedAbilities}
        abilityFilterMode={abilityFilterMode}
        setAbilityFilterMode={setAbilityFilterMode}
        getColorClasses={getColorClasses}
        toggleMulti={toggleMulti}
      />

      <EnemiesTable
        enemies={filteredEnemies}
        onSelect={(enemy) => {
          setSelectedEnemy(enemy);
          setIsDialogOpen(true);
        }}
      />

      <EnemyDetailDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        enemy={selectedEnemy}               // ✔ 변경됨
      />
    </div>
  );
}
