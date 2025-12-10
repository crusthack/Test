"use client";

import { useState } from "react";
import type { Enemy } from "@/types/enemy";

import EnemyFiltersPanel from "./EnemyFiltersPanel";
import EnemiesTable from "./EnemiesTable";
import EnemyDetailDialog from "./EnemyDetailDialog";

export default function EnemyCatsPage({ enemies }: { enemies: Enemy[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(["all"]);
  const [attributeFilterMode, setAttributeFilterMode] = useState<"OR" | "AND">("OR");

  const [selectedEffects, setSelectedEffects] = useState<string[]>(["all"]);
  const [effectFilterMode, setEffectFilterMode] = useState<"OR" | "AND">("AND");

  const [selectedAttackTypes, setSelectedAttackTypes] = useState<string[]>(["all"]);
  const [attackTypeFilterMode, setAttackTypeFilterMode] = useState<"OR" | "AND">("AND");

  const [selectedAbilities, setSelectedAbilities] = useState<string[]>(["all"]);
  const [abilityFilterMode, setAbilityFilterMode] = useState<"OR" | "AND">("AND");

  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const effects = [
    { group: "1", value: "all", label: "전체" },
    { group: "1", value: "Slow", label: "느리게 한다" },
    { group: "1", value: "Stop", label: "멈춘다" },
    { group: "1", value: "Knockback", label: "날려버린다" },
    { group: "1", value: "Weak", label: "공격력 다운" },
    { group: "1", value: "Curse", label: "저주" },
    { group: "1", value: "ImuATK", label: "공격 무효" },
    { group: "1", value: "Warp", label: "워프" },
    { group: "1", value: "rWarp", label: "역워프" },
    { group: "1", value: "Poison", label: "독공격" },
  ];

  const abilities = [
    { group: "1", value: "all", label: "전체" },
    { group: "1", value: "AtkUp", label: "공격력 업" },
    { group: "1", value: "LETHAL", label: "살아남는다" },
    { group: "1", value: "BaseDestroyer", label: "성 파괴가 특기" },
    { group: "1", value: "Critical", label: "크리티컬" },
    { group: "1", value: "StrickAttack", label: "혼신의 일격" },
    { group: "1", value: "Glass", label: "유리공격" },

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

    { group: "4", value: "Colosus", label: "초생명체" },
    { group: "4", value: "Behemoth", label: "초수" },
    { group: "4", value: "Sage", label: "초현자" },

    { group: "5", value: "ImuWeak", label: "공격력 다운 무효" },
    { group: "5", value: "ImuKB", label: "날려버린다 무효" },
    { group: "5", value: "ImuStop", label: "멈춘다 무효" },
    { group: "5", value: "ImuSlow", label: "느리게 무효" },
    { group: "5", value: "ImuWarp", label: "워프 무효" },
    { group: "5", value: "ImuCurse", label: "저주 무효" },
    { group: "5", value: "ImuWave", label: "파동 무효" },
    { group: "5", value: "ImuVolcano", label: "열파 무효" },
    { group: "5", value: "ImuBlast", label: "폭파 무효" },
  ];

  /* ⭐ AttackType 필터 옵션 */
  const attackTypes = [
    { value: "all", label: "전체", color: "gray" },
    { value: "single", label: "단일 공격", color: "blue" },
    { value: "range", label: "범위 공격", color: "green" },
    { value: "long", label: "원거리 공격", color: "purple" },
    { value: "omni", label: "전방위 공격", color: "red" },
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

    // ⭐ AttackType 필터
    const matchesAttackType =
      selectedAttackTypes.includes("all") ||
      (attackTypeFilterMode === "OR"
        ? selectedAttackTypes.some((v) => enemy.AttackType.includes(v as any))
        : selectedAttackTypes.every((v) => enemy.AttackType.includes(v as any)));

    return (
      matchesSearch &&
      matchesAttribute &&
      matchesEffect &&
      matchesAbility &&
      matchesAttackType
    );
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
      blue: { selected: "bg-blue-500 text-white border-blue-500", hover: "hover:bg-blue-100 hover:border-blue-400" },
      green: { selected: "bg-green-500 text-white border-green-500", hover: "hover:bg-green-100 hover:border-green-400" },
      red2: { selected: "bg-red-700 text-white border-red-700", hover: "hover:bg-red-100 hover:border-red-400" },
      purple2: { selected: "bg-purple-700 text-white border-purple-700", hover: "hover:bg-purple-100 hover:border-purple-400" },
    };

    const c = colorMap[color] || colorMap.gray;
    return isSelected ? c.selected : `bg-white border-gray-300 ${c.hover}`;
  };

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
        attackTypes={attackTypes}                       // ⭐ 추가
        selectedAttackTypes={selectedAttackTypes}
        setSelectedAttackTypes={setSelectedAttackTypes}
        attackTypeFilterMode={attackTypeFilterMode}
        setAttackTypeFilterMode={setAttackTypeFilterMode}
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
        enemy={selectedEnemy}
      />
    </div>
  );
}
