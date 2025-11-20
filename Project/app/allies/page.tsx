"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Card from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { allyCats } from '@/data/mockData';
import type { Cat } from '@/types';

export default function AllyCatsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['all']);
  const [targetFilterMode, setTargetFilterMode] = useState<'OR' | 'AND'>('OR');
  const [selectedEffects, setSelectedEffects] = useState<string[]>(['all']);
  const [effectFilterMode, setEffectFilterMode] = useState<'OR' | 'AND'>('OR');
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(30);

  const rarities = [
    { value: 'all', label: '전체', color: 'gray' },
    { value: 'Normal', label: '기본', color: 'red' },
    { value: 'Special', label: 'Ex', color: 'orange' },
    { value: 'Rare', label: '레어', color: 'yellow' },
    { value: 'Super Rare', label: '슈퍼레어', color: 'green' },
    { value: 'Uber Super Rare', label: '울트라슈퍼레어', color: 'blue' },
    { value: 'Legend Rare', label: '레전드레어', color: 'purple' }
  ];

  const targets = [
    { value: 'all', label: '전체', color: 'gray' },
    { value: '빨간적', label: '빨간적', color: 'red' },
    { value: '떠있는적', label: '떠있는적', color: 'sky' },
    { value: '메탈적', label: '메탈적', color: 'slate' },
    { value: '무속성적', label: '무속성적', color: 'orange' },
    { value: '천사적', label: '천사적', color: 'yellow' },
    { value: '흑적', label: '흑적', color: 'zinc' },
    { value: '좀비적', label: '좀비적', color: 'purple' },
    { value: '에일리언적', label: '에일리언적', color: 'green' },
    { value: '없음', label: '없음', color: 'stone' }
  ];

  const effects = [
    { value: 'all', label: '전체', color: 'gray' },
    { value: '느리게한다', label: '느리게한다', color: 'blue' },
    { value: '멈추게한다', label: '멈추게한다', color: 'red' },
    { value: '공격력다운', label: '공격력다운', color: 'orange' },
    { value: '없음', label: '없음', color: 'stone' }
  ];

  const handleTargetToggle = (targetValue: string) => {
    if (targetValue === 'all') {
      setSelectedTargets(['all']);
    } else {
      setSelectedTargets((prev) => {
        const filtered = prev.filter(t => t !== 'all');
        if (filtered.includes(targetValue)) {
          const newTargets = filtered.filter(t => t !== targetValue);
          return newTargets.length === 0 ? ['all'] : newTargets;
        } else {
          return [...filtered, targetValue];
        }
      });
    }
  };

  const handleEffectToggle = (effectValue: string) => {
    if (effectValue === 'all') {
      setSelectedEffects(['all']);
    } else {
      setSelectedEffects((prev) => {
        const filtered = prev.filter(e => e !== 'all');
        if (filtered.includes(effectValue)) {
          const newEffects = filtered.filter(e => e !== effectValue);
          return newEffects.length === 0 ? ['all'] : newEffects;
        } else {
          return [...filtered, effectValue];
        }
      });
    }
  };

  const filteredCats = allyCats.filter((cat) => {
    // 이름 필터
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.nameKo.includes(searchTerm);
    // 레어도 필터
    const matchesRarity = selectedRarity === 'all' || cat.rarity === selectedRarity;
    
    // 대상 속성 필터
    let matchesTarget = false;
    if (selectedTargets.includes('all')) {
      matchesTarget = true;
    } else {
      const catTargets = cat.targetAttributes as string[];
      if (targetFilterMode === 'OR') {
        matchesTarget = selectedTargets.some(target => catTargets.includes(target));
      } else {
        matchesTarget = selectedTargets.every(target => catTargets.includes(target));
      }
    }

    // 효과 필터
    let matchesEffect = false;
    if (selectedEffects.includes('all')) {
      matchesEffect = true;
    } else {
      const catEffects = cat.effects as string[];
      if (effectFilterMode === 'OR') {
        matchesEffect = selectedEffects.some(effect => catEffects.includes(effect));
      } else {
        matchesEffect = selectedEffects.every(effect => catEffects.includes(effect));
      }
    }
    
    return matchesSearch && matchesRarity && matchesTarget && matchesEffect;
  });

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: Record<string, { selected: string; hover: string }> = {
      gray: { selected: 'bg-gray-500 text-white border-gray-500', hover: 'hover:bg-gray-100 hover:border-gray-400' },
      red: { selected: 'bg-red-500 text-white border-red-500', hover: 'hover:bg-red-100 hover:border-red-400' },
      orange: { selected: 'bg-orange-500 text-white border-orange-500', hover: 'hover:bg-orange-100 hover:border-orange-400' },
      yellow: { selected: 'bg-yellow-500 text-white border-yellow-500', hover: 'hover:bg-yellow-100 hover:border-yellow-400' },
      green: { selected: 'bg-green-500 text-white border-green-500', hover: 'hover:bg-green-100 hover:border-green-400' },
      blue: { selected: 'bg-blue-500 text-white border-blue-500', hover: 'hover:bg-blue-100 hover:border-blue-400' },
      purple: { selected: 'bg-purple-500 text-white border-purple-500', hover: 'hover:bg-purple-100 hover:border-purple-400' },
      sky: { selected: 'bg-sky-500 text-white border-sky-500', hover: 'hover:bg-sky-100 hover:border-sky-400' },
      slate: { selected: 'bg-slate-500 text-white border-slate-500', hover: 'hover:bg-slate-100 hover:border-slate-400' },
      zinc: { selected: 'bg-zinc-800 text-white border-zinc-800', hover: 'hover:bg-zinc-100 hover:border-zinc-400' },
      stone: { selected: 'bg-stone-400 text-white border-stone-400', hover: 'hover:bg-stone-100 hover:border-stone-400' }
    };
    
    const colors = colorMap[color] || colorMap.gray;
    return isSelected ? colors.selected : `bg-white border-gray-300 ${colors.hover}`;
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      'Normal': 'bg-gray-500',
      'Special': 'bg-blue-500',
      'Rare': 'bg-yellow-500',
      'Super Rare': 'bg-purple-500',
      'Uber Super Rare': 'bg-red-500',
      'Legend Rare': 'bg-pink-500'
    };
    return colors[rarity] || 'bg-gray-500';
  };

  const getTargetColor = (target: string | undefined) => {
    const colors: Record<string, string> = {
      '빨간적': 'bg-red-500 text-white',
      '떠있는적': 'bg-sky-500 text-white',
      '메탈적': 'bg-gray-400 text-white',
      '무속성적': 'bg-orange-500 text-white',
      '천사적': 'bg-yellow-400 text-black',
      '흑적': 'bg-black text-white',
      '좀비적': 'bg-purple-600 text-white',
      '에일리언적': 'bg-green-500 text-white',
      '없음': 'bg-gray-200 text-gray-600'
    };
    return colors[target || '없음'] || 'bg-gray-200 text-gray-600';
  };

  const getEffectColor = (effect: string | undefined) => {
    const colors: Record<string, string> = {
      '느리게한다': 'bg-blue-500 text-white',
      '멈추게한다': 'bg-red-500 text-white',
      '공격력다운': 'bg-orange-500 text-white',
      '없음': 'bg-gray-200 text-gray-600'
    };
    return colors[effect || '없음'] || 'bg-gray-200 text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-600 mb-2">아군 캐릭터 목록</h2>
        <p className="text-gray-600">냥코대전쟁의 모든 아군 캐릭터 정보를 확인하세요</p>
      </div>

      <Input
        type="text"
        placeholder="캐릭터 이름으로 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4">등급 필터</h3>
            <div className="flex flex-wrap gap-3">
              {rarities.map((rarity) => (
                <button
                  key={rarity.value}
                  onClick={() => setSelectedRarity(rarity.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${getColorClasses(
                    rarity.color,
                    selectedRarity === rarity.value
                  )}`}
                >
                  {rarity.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>타겟 속성 필터 (복수 선택 가능)</h3>
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>
                <button
                  onClick={() => setTargetFilterMode('OR')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    targetFilterMode === 'OR'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  OR
                </button>
                <button
                  onClick={() => setTargetFilterMode('AND')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    targetFilterMode === 'AND'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
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
                  onClick={() => handleTargetToggle(target.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${getColorClasses(
                    target.color,
                    selectedTargets.includes(target.value)
                  )}`}
                >
                  {target.label}
                </button>
              ))}
            </div>
            {selectedTargets.length > 1 && !selectedTargets.includes('all') && (
              <p className="text-gray-600 mt-2">
                {targetFilterMode === 'OR' 
                  ? '선택한 속성 중 하나라도 가진 캐릭터를 표시합니다'
                  : '선택한 모든 속성을 가진 캐릭터만 표시합니다'}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>효과 필터 (복수 선택 가능)</h3>
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>
                <button
                  onClick={() => setEffectFilterMode('OR')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    effectFilterMode === 'OR'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  OR
                </button>
                <button
                  onClick={() => setEffectFilterMode('AND')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    effectFilterMode === 'AND'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  AND
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {effects.map((effect) => (
                <button
                  key={effect.value}
                  onClick={() => handleEffectToggle(effect.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${getColorClasses(
                    effect.color,
                    selectedEffects.includes(effect.value)
                  )}`}
                >
                  {effect.label}
                </button>
              ))}
            </div>
            {selectedEffects.length > 1 && !selectedEffects.includes('all') && (
              <p className="text-gray-600 mt-2">
                {effectFilterMode === 'OR' 
                  ? '선택한 효과 중 하나라도 가진 캐릭터를 표시합니다'
                  : '선택한 모든 효과를 가진 캐릭터만 표시합니다'}
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>등급</TableHead>
                <TableHead>타겟</TableHead>
                <TableHead>효과</TableHead>
                <TableHead>HP</TableHead>
                <TableHead>공격력</TableHead>
                <TableHead>사거리</TableHead>
                <TableHead>속도</TableHead>
                <TableHead>코스트</TableHead>
                <TableHead>재사용</TableHead>
                <TableHead>특수능력</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center text-gray-500 py-8">
                    검색 결과가 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                filteredCats.map((cat) => (
                  <TableRow 
                    key={cat.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedCat(cat);
                      setCurrentLevel(30);
                      setIsDialogOpen(true);
                    }}
                  >
                    <TableCell>{cat.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{cat.nameKo}</div>
                        <div className="text-gray-500">{cat.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRarityColor(cat.rarity)}>{cat.rarity}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(cat.targetAttributes || ['없음']).map((target, idx) => (
                          <Badge key={idx} className={getTargetColor(target)}>
                            {target}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(cat.effects || ['없음']).map((effect, idx) => (
                          <Badge key={idx} className={getEffectColor(effect)}>
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{cat.hp.toLocaleString()}</TableCell>
                    <TableCell>{cat.attack.toLocaleString()}</TableCell>
                    <TableCell>{cat.range}</TableCell>
                    <TableCell>{cat.speed}</TableCell>
                    <TableCell>{cat.cost}</TableCell>
                    <TableCell>{cat.recharge}초</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {cat.abilities.map((ability, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {ability}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-4 bg-blue-50">
        <p className="text-blue-800">
          <span className="font-medium">API 엔드포인트:</span> GET /api/cats/allies?rarity={selectedRarity}&targets={selectedTargets.join(',')}&targetMode={targetFilterMode}&effects={selectedEffects.join(',')}&effectMode={effectFilterMode}
        </p>
        <p className="text-blue-600 mt-2">총 {filteredCats.length}개의 캐릭터</p>
      </Card>

      {/* Character Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCat && (() => {
            const baseLevel = selectedCat.baseLevel || 1;
            const levelDiff = currentLevel - baseLevel;
            const calculatedHP = selectedCat.hp + (levelDiff * (selectedCat.hpPerLevel || 0));
            const calculatedAttack = selectedCat.attack + (levelDiff * (selectedCat.attackPerLevel || 0));
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-blue-600">
                        {selectedCat.nameKo} ({selectedCat.name})
                      </DialogTitle>
                      <DialogDescription>
                        캐릭터 상세 정보
                      </DialogDescription>
                    </div>
                    
                    {/* Level Control */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">레벨</span>
                      <button
                        onClick={() => setCurrentLevel(Math.max(1, currentLevel - 10))}
                        className="w-10 h-8 rounded bg-white border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors flex items-center justify-center text-xs"
                      >
                        -10
                      </button>
                      <button
                        onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
                        className="w-8 h-8 rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        min="1"
                        max="999"
                        value={currentLevel}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setCurrentLevel(Math.max(1, Math.min(999, value)));
                          }
                        }}
                        className="w-16 h-8 text-center px-2"
                      />
                      <button
                        onClick={() => setCurrentLevel(Math.min(999, currentLevel + 1))}
                        className="w-8 h-8 rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setCurrentLevel(Math.min(999, currentLevel + 10))}
                        className="w-10 h-8 rounded bg-white border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors flex items-center justify-center text-xs"
                      >
                        +10
                      </button>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 mb-1">ID</p>
                      <p>{selectedCat.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">등급</p>
                      <Badge className={getRarityColor(selectedCat.rarity)}>
                        {selectedCat.rarity}
                      </Badge>
                    </div>
                  </div>

                {/* Target Attributes */}
                <div>
                  <p className="text-gray-600 mb-2">타겟 속성</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCat.targetAttributes || ['없음']).map((target, idx) => (
                      <Badge key={idx} className={getTargetColor(target)}>
                        {target}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Effects */}
                <div>
                  <p className="text-gray-600 mb-2">효과</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCat.effects || ['없음']).map((effect, idx) => (
                      <Badge key={idx} className={getEffectColor(effect)}>
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>

                  {/* Stats */}
                  <div className="border-t pt-4">
                    <h4 className="mb-4">스탯 정보 (레벨 {currentLevel})</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">HP</p>
                        <p className="text-red-600">{Math.round(calculatedHP).toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">공격력</p>
                        <p className="text-orange-600">{Math.round(calculatedAttack).toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">사거리</p>
                        <p className="text-blue-600">{selectedCat.range}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">속도</p>
                        <p className="text-green-600">{selectedCat.speed}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">코스트</p>
                        <p className="text-yellow-600">{selectedCat.cost}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">재사용 시간</p>
                        <p className="text-purple-600">{selectedCat.recharge}초</p>
                      </div>
                    </div>
                  </div>

                  {/* Abilities */}
                  <div className="border-t pt-4">
                    <h4 className="mb-3">특수능력</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCat.abilities.map((ability, idx) => (
                        <Badge key={idx} variant="outline" className="px-3 py-1">
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
