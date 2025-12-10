"use client";

import { Input } from "@/components/ui/input";
import Card from "@/components/ui/card";

interface FiltersPanelProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;

  attributes: any[];
  selectedAttributes: string[];
  setSelectedAttributes: (v: string[]) => void;
  attributeFilterMode: "OR" | "AND";
  setAttributeFilterMode: (v: "OR" | "AND") => void;

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

  attackTypes: any[];
  selectedAttackTypes: string[];
  setSelectedAttackTypes: (v: string[]) => void;
  attackTypeFilterMode: "OR" | "AND";
  setAttackTypeFilterMode: (v: "OR" | "AND") => void;

  getColorClasses: (color: string, isSelected: boolean) => string;
  toggleMulti: (value: string, setter: any) => void;
}

export default function EnemyFiltersPanel({
  searchTerm,
  setSearchTerm,

  attributes,
  selectedAttributes,
  setSelectedAttributes,
  attributeFilterMode,
  setAttributeFilterMode,

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

  attackTypes,
  selectedAttackTypes,
  setSelectedAttackTypes,
  attackTypeFilterMode,
  setAttackTypeFilterMode,

  getColorClasses,
  toggleMulti,
}: FiltersPanelProps) {
  return (
    <>
      <Input
        type="text"
        placeholder="적 이름으로 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <Card className="p-6">
        <div className="w-full space-y-6">

          {/* 속성 필터 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>속성 필터</h3>

              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setAttributeFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${attributeFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setAttributeFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${attributeFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  AND
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {attributes.map((attr) => (
                <button
                  key={attr.value}
                  onClick={() => toggleMulti(attr.value, setSelectedAttributes)}
                  className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                    attr.color,
                    selectedAttributes.includes(attr.value)
                  )}`}
                >
                  {attr.label}
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
                  className={`px-3 py-.5 rounded-md border ${effectFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setEffectFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${effectFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  AND
                </button>
              </div>
            </div>

            {Object.entries(
              effects.reduce((acc: any, effect) => {
                const g = effect.group || "기타";
                if (!acc[g]) acc[g] = [];
                acc[g].push(effect);
                return acc;
              }, {})
            ).map(([groupName, items]: [string, any]) => (
              <div key={groupName} className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {items.map((effect: any) => (
                    <button
                      key={effect.value}
                      onClick={() => toggleMulti(effect.value, setSelectedEffects)}
                      className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${selectedEffects.includes(effect.value)
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
          {/* ⭐ 공격 타입 필터 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>공격 타입</h3>

              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setAttackTypeFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${attackTypeFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setAttackTypeFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${attackTypeFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  AND
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {attackTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => toggleMulti(type.value, setSelectedAttackTypes)}
                  className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                    type.color,
                    selectedAttackTypes.includes(type.value)
                  )}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          {/* 능력 필터 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>능력 필터</h3>

              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setAbilityFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${abilityFilterMode === "OR"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setAbilityFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${abilityFilterMode === "AND"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  AND
                </button>
              </div>
            </div>

            {Object.entries(
              abilities.reduce((acc: any, ability) => {
                const g = ability.group || "기타";
                if (!acc[g]) acc[g] = [];
                acc[g].push(ability);
                return acc;
              }, {})
            ).map(([groupName, items]: [string, any]) => (
              <div key={groupName} className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {items.map((ability: any) => (
                    <button
                      key={ability.value}
                      onClick={() =>
                        toggleMulti(ability.value, setSelectedAbilities)
                      }
                      className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${selectedAbilities.includes(ability.value)
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
