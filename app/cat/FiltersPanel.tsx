"use client";

import { Input } from "@/components/ui/input";
import Card from "@/components/ui/card";

interface FiltersPanelProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;

  rarities: any[];
  selectedRarity: string[];
  setSelectedRarity: (v: string[]) => void;

  targets: any[];
  selectedTargets: string[];
  setSelectedTargets: (v: string[]) => void;
  targetFilterMode: "OR" | "AND";
  setTargetFilterMode: (v: "OR" | "AND") => void;

  effects: any[];
  selectedEffects: string[];
  setSelectedEffects: (v: string[]) => void;
  effectFilterMode: "OR" | "AND";
  setEffectFilterMode: (v: "OR" | "AND") => void;

  abilities: any[];
  selectedAbilities: string[];
  setSelectedAbilities: (v: string[]) => void;
  abilityFilterMode: "OR" | "AND";
  setAbilityFilterMode: (v: "OR" | "AND") => void;

  getColorClasses: (color: string, isSelected: boolean) => string;
  toggleMulti: (value: string, setter: any) => void;
}

export default function FiltersPanel({
  searchTerm,
  setSearchTerm,

  rarities,
  selectedRarity,
  setSelectedRarity,

  targets,
  selectedTargets,
  setSelectedTargets,
  targetFilterMode,
  setTargetFilterMode,

  effects,
  selectedEffects,
  setSelectedEffects,
  effectFilterMode,
  setEffectFilterMode,

  abilities,
  selectedAbilities,
  setSelectedAbilities,
  abilityFilterMode,
  setAbilityFilterMode,

  getColorClasses,
  toggleMulti,
}: FiltersPanelProps) {
  return (
    <>
      <Input
        type="text"
        placeholder="캐릭터 이름으로 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <Card className="p-6">
        <div className="w-full space-y-6">

          {/* 등급 필터 */}
          <div>
            <h3 className="mb-4">등급 필터</h3>
            <div className="flex flex-wrap gap-3">
              {rarities.map((rarity) => (
                <button
                  key={rarity.value}
                  onClick={() => toggleMulti(rarity.value, setSelectedRarity)}
                  className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                    rarity.color,
                    selectedRarity.includes(rarity.value)
                  )}`}
                >
                  {rarity.label}
                </button>
              ))}
            </div>
          </div>

          {/* 타겟 필터 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>타겟 속성</h3>

              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setTargetFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${
                    targetFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setTargetFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${
                    targetFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  AND
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {targets.map((target) => (
                <button
                  key={target.value}
                  onClick={() => toggleMulti(target.value, setSelectedTargets)}
                  className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                    target.color,
                    selectedTargets.includes(target.value)
                  )}`}
                >
                  {target.label}
                </button>
              ))}
            </div>
          </div>

          {/* 효과 필터 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>효과 필터</h3>

              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setEffectFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${
                    effectFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setEffectFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${
                    effectFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  AND
                </button>
              </div>
            </div>

            {/* 🔥 그룹 단위 묶기 */}
            {Object.entries(
              effects.reduce((acc: any, effect) => {
                const g = effect.group || "기타";
                if (!acc[g]) acc[g] = [];
                acc[g].push(effect);
                return acc;
              }, {})
            ).map(([groupName, items]: any) => (
              <div key={groupName} className="mb-4">

                <div className="flex flex-wrap gap-3">
                  {items.map((effect: any) => (
                    <button
                      key={effect.value}
                      onClick={() =>
                        toggleMulti(effect.value, setSelectedEffects)
                      }
                      className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${
                        selectedEffects.includes(effect.value)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      {effect.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 능력 필터 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>능력 필터</h3>

              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setAbilityFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${
                    abilityFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setAbilityFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${
                    abilityFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  AND
                </button>
              </div>
            </div>

            {/* 🔥 그룹 단위 묶기 */}
            {Object.entries(
              abilities.reduce((acc: any, ability) => {
                const g = ability.group || "기타";
                if (!acc[g]) acc[g] = [];
                acc[g].push(ability);
                return acc;
              }, {})
            ).map(([groupName, items]: any) => (
              <div key={groupName} className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {items.map((ability: any) => (
                    <button
                      key={ability.value}
                      onClick={() =>
                        toggleMulti(ability.value, setSelectedAbilities)
                      }
                      className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${
                        selectedAbilities.includes(ability.value)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      {ability.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
