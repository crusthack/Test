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

  attackTypes: any[];
  selectedAttackTypes: string[];
  setSelectedAttackTypes: (v: string[]) => void;
  attackTypeFilterMode: "OR" | "AND";
  setAttackTypeFilterMode: (v: "OR" | "AND") => void;

  getColorClasses: (color: string, isSelected: boolean) => string;
  toggleMulti: (value: string, setter: any) => void;
}

export default function FiltersPanel(props: FiltersPanelProps) {
  const {
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

    attackTypes,
    selectedAttackTypes,
    setSelectedAttackTypes,
    attackTypeFilterMode,
    setAttackTypeFilterMode,

    getColorClasses,
    toggleMulti,
  } = props;

  return (
    <>
      <Input
        type="text"
        placeholder="캐릭터 이름 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <Card className="p-6">
        <div className="w-full space-y-6">

          {/* ===================================================== */}
          {/* ⭐ 등급 필터 */}
          {/* ===================================================== */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>등급 필터</h3>
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>

                <button
                  onClick={() => setTargetFilterMode("OR")}
                  className={`px-3 py-.5 rounded-md border ${targetFilterMode === "OR"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  OR
                </button>

                <button
                  onClick={() => setTargetFilterMode("AND")}
                  className={`px-3 py-.5 rounded-md border ${targetFilterMode === "AND"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                >
                  AND
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {targets.map((t) => (
                <button
                  key={t.value}
                  onClick={() => toggleMulti(t.value, setSelectedTargets)}
                  className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                    t.color,
                    selectedTargets.includes(t.value)
                  )}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

        {/* ===================================================== */}
        {/* ⭐ 타겟 필터 */}
        {/* ===================================================== */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3>타겟 필터</h3>

            <div className="flex gap-2 items-center">
              <span className="text-gray-600">필터 모드:</span>

              <button
                onClick={() => setTargetFilterMode("OR")}
                className={`px-3 py-.5 rounded-md border ${targetFilterMode === "OR"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
              >
                OR
              </button>

              <button
                onClick={() => setTargetFilterMode("AND")}
                className={`px-3 py-.5 rounded-md border ${targetFilterMode === "AND"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
              >
                AND
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {targets.map((t) => (
              <button
                key={t.value}
                onClick={() => toggleMulti(t.value, setSelectedTargets)}
                className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                  t.color,
                  selectedTargets.includes(t.value)
                )}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================== */}
        {/* ⭐ 효과 필터 */}
        {/* ===================================================== */}
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
            effects.reduce((acc: any, eff) => {
              acc[eff.group] ||= [];
              acc[eff.group].push(eff);
              return acc;
            }, {})
          ).map(([group, list]: any) => (
            <div key={group} className="mb-4">
              <div className="flex flex-wrap gap-3">
                {list.map((e: any) => (
                  <button
                    key={e.value}
                    onClick={() => toggleMulti(e.value, setSelectedEffects)}
                    className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${selectedEffects.includes(e.value)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                      }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ===================================================== */}
        {/* ⭐ 공격 타입 필터 */}
        {/* ===================================================== */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3>공격 타입 필터</h3>

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
            {attackTypes.map((atk) => (
              <button
                key={atk.value}
                onClick={() => toggleMulti(atk.value, setSelectedAttackTypes)}
                className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${getColorClasses(
                  atk.color,
                  selectedAttackTypes.includes(atk.value)
                )}`}
              >
                {atk.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================== */}
        {/* ⭐ 능력 필터 */}
        {/* ===================================================== */}
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
            abilities.reduce((acc: any, ab) => {
              acc[ab.group] ||= [];
              acc[ab.group].push(ab);
              return acc;
            }, {})
          ).map(([group, list]: any) => (
            <div key={group} className="mb-4">
              <div className="flex flex-wrap gap-3">
                {list.map((ab: any) => (
                  <button
                    key={ab.value}
                    onClick={() => toggleMulti(ab.value, setSelectedAbilities)}
                    className={`px-4 py-.5 rounded-lg border-2 whitespace-nowrap transition-all ${selectedAbilities.includes(ab.value)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                      }`}
                  >
                    {ab.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </Card >
    </>
  );
}
