"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Card from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Dog } from 'lucide-react';
import { enemies } from '@/data/mockData';
import type { Enemy } from '@/types';

export default function EnemyCatsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(['all']);
  const [attributeFilterMode, setAttributeFilterMode] = useState<'OR' | 'AND'>('OR');
  const [selectedEffects, setSelectedEffects] = useState<string[]>(['all']);
  const [effectFilterMode, setEffectFilterMode] = useState<'OR' | 'AND'>('OR');
  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMagnification, setCurrentMagnification] = useState(100);

  const attributes = [
    { value: 'all', label: '전체', color: 'gray' },
    { value: '빨강', label: '빨강', color: 'red' },
    { value: '떠있음', label: '떠있음', color: 'blue' },
    { value: '메탈', label: '메탈', color: 'gray' },
    { value: '무속성', label: '무속성', color: 'slate' },
    { value: '천사', label: '천사', color: 'yellow' },
    { value: '흑', label: '흑', color: 'purple' },
    { value: '좀비', label: '좀비', color: 'green' },
    { value: '에일리언', label: '에일리언', color: 'cyan' },
    { value: '없음', label: '없음', color: 'gray' }
  ];

  const effects = [
    { value: 'all', label: '전체', color: 'gray' },
    { value: '느리게한다', label: '느리게한다', color: 'blue' },
    { value: '멈추게한다', label: '멈추게한다', color: 'purple' },
    { value: '공격력다운', label: '공격력다운', color: 'orange' },
    { value: '없음', label: '없음', color: 'gray' }
  ];

  const getAttributeColor = (attribute: string) => {
    const colorMap: { [key: string]: string } = {
      '빨강': 'bg-red-100 text-red-800',
      '떠있음': 'bg-blue-100 text-blue-800',
      '메탈': 'bg-gray-400 text-white',
      '무속성': 'bg-slate-200 text-slate-800',
      '천사': 'bg-yellow-100 text-yellow-800',
      '흑': 'bg-purple-100 text-purple-800',
      '좀비': 'bg-green-100 text-green-800',
      '에일리언': 'bg-cyan-100 text-cyan-800',
      '없음': 'bg-gray-100 text-gray-600'
    };
    return colorMap[attribute] || 'bg-gray-100 text-gray-600';
  };

  const getEffectColor = (effect: string) => {
    const colorMap: { [key: string]: string } = {
      '느리게한다': 'bg-blue-100 text-blue-700',
      '멈추게한다': 'bg-purple-100 text-purple-700',
      '공격력다운': 'bg-orange-100 text-orange-700',
      '없음': 'bg-gray-100 text-gray-600'
    };
    return colorMap[effect] || 'bg-gray-100 text-gray-600';
  };

  // 속성별 텍스트 색상 매핑
  const getAttributeTextColor = (attr: string) => {
    const colorMap: Record<string, string> = {
      '빨강': 'text-red-600',
      '떠있음': 'text-sky-500',
      '메탈': 'text-gray-500',
      '무속성': 'text-gray-700',
      '천사': 'text-yellow-500',
      '흑': 'text-purple-600',
      '좀비': 'text-green-600',
      '에일리언': 'text-pink-500',
      '없음': 'text-gray-600'
    };
    return colorMap[attr] || 'text-gray-600';
  };

  // 속성별 배지 스타일 (이름 옆 배지용)
  const getAttributeBadgeStyle = (attr: string) => {
    const styleMap: Record<string, string> = {
      '빨강': 'bg-red-100 text-red-700 border-red-300',
      '떠있음': 'bg-sky-100 text-sky-700 border-sky-300',
      '메탈': 'bg-gray-100 text-gray-700 border-gray-300',
      '무속성': 'bg-gray-50 text-gray-600 border-gray-200',
      '천사': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      '흑': 'bg-purple-100 text-purple-700 border-purple-300',
      '좀비': 'bg-green-100 text-green-700 border-green-300',
      '에일리언': 'bg-pink-100 text-pink-700 border-pink-300',
      '없음': 'bg-gray-50 text-gray-500 border-gray-200'
    };
    return styleMap[attr] || 'bg-gray-100 text-gray-600';
  };

  // 이름 색상 결정 (속성 개수에 따라)
  const getNameColor = (attributes?: string[]) => {
    if (!attributes || attributes.length === 0 || attributes.includes('없음')) {
      return 'text-gray-700';
    }
    const validAttrs = attributes.filter(a => a !== '없음');
    if (validAttrs.length === 0) return 'text-gray-700';
    if (validAttrs.length === 1) return getAttributeTextColor(validAttrs[0]);
    // 여러 속성이면 무지개색 그라데이션
    return 'bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent';
  };

  const toggleAttribute = (value: string) => {
    if (value === 'all') {
      setSelectedAttributes(['all']);
    } else {
      const newSelection = selectedAttributes.includes('all')
        ? [value]
        : selectedAttributes.includes(value)
          ? selectedAttributes.filter(a => a !== value)
          : [...selectedAttributes, value];
      setSelectedAttributes(newSelection.length === 0 ? ['all'] : newSelection);
    }
  };

  const toggleEffect = (value: string) => {
    if (value === 'all') {
      setSelectedEffects(['all']);
    } else {
      const newSelection = selectedEffects.includes('all')
        ? [value]
        : selectedEffects.includes(value)
          ? selectedEffects.filter(e => e !== value)
          : [...selectedEffects, value];
      setSelectedEffects(newSelection.length === 0 ? ['all'] : newSelection);
    }
  };

  const filteredEnemies = enemies.filter((enemy) => {
    const matchesSearch = enemy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          enemy.nameKo.includes(searchTerm);

    if (!matchesSearch) return false;

    // Attributes filter
    if (!selectedAttributes.includes('all')) {
      const enemyAttributes = enemy.attributes || ['없음'];
      if (attributeFilterMode === 'OR') {
        if (!selectedAttributes.some(attr => enemyAttributes.includes(attr as any))) {
          return false;
        }
      } else {
        if (!selectedAttributes.every(attr => enemyAttributes.includes(attr as any))) {
          return false;
        }
      }
    }

    // Effects filter
    if (!selectedEffects.includes('all')) {
      const enemyEffects = enemy.effects || ['없음'];
      if (effectFilterMode === 'OR') {
        if (!selectedEffects.some(eff => enemyEffects.includes(eff as any))) {
          return false;
        }
      } else {
        if (!selectedEffects.every(eff => enemyEffects.includes(eff as any))) {
          return false;
        }
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Dog className="w-8 h-8 text-red-600" />
        <div>
          <h2 className="text-red-600 mb-2">적 캐릭터 목록</h2>
          <p className="text-gray-600">냥코대전쟁의 모든 적 캐릭터 정보를 확인하세요</p>
        </div>
      </div>

      <Input
        type="text"
        placeholder="적 이름으로 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>속성 필터 (복수 선택 가능)</h3>
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">필터 모드:</span>
                <button
                  onClick={() => setAttributeFilterMode('OR')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    attributeFilterMode === 'OR'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50'
                  }`}
                >
                  OR
                </button>
                <button
                  onClick={() => setAttributeFilterMode('AND')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    attributeFilterMode === 'AND'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50'
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
                  onClick={() => toggleAttribute(attr.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedAttributes.includes(attr.value)
                      ? `bg-${attr.color}-500 text-white border-${attr.color}-500`
                      : `bg-white border-gray-300 hover:bg-${attr.color}-100 hover:border-${attr.color}-400`
                  }`}
                >
                  {attr.label}
                </button>
              ))}
            </div>
            {selectedAttributes.length > 1 && !selectedAttributes.includes('all') && (
              <p className="text-gray-600 mt-2">
                {attributeFilterMode === 'OR' 
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
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50'
                  }`}
                >
                  OR
                </button>
                <button
                  onClick={() => setEffectFilterMode('AND')}
                  className={`px-3 py-1 rounded-md border transition-all ${
                    effectFilterMode === 'AND'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50'
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
                  onClick={() => toggleEffect(effect.value)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedEffects.includes(effect.value)
                      ? `bg-${effect.color}-500 text-white border-${effect.color}-500`
                      : `bg-white border-gray-300 hover:bg-${effect.color}-100 hover:border-${effect.color}-400`
                  }`}
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
                <TableHead>속성</TableHead>
                <TableHead>효과</TableHead>
                <TableHead>HP</TableHead>
                <TableHead>공격력</TableHead>
                <TableHead>사거리</TableHead>
                <TableHead>속도</TableHead>
                <TableHead>넉백</TableHead>
                <TableHead>배율</TableHead>
                <TableHead>특수능력</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnemies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center text-gray-500 py-8">
                    검색 결과가 없습니다
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnemies.map((enemy) => (
                  <TableRow 
                    key={enemy.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedEnemy(enemy);
                      setCurrentMagnification(enemy.magnification);
                      setIsDialogOpen(true);
                    }}
                  >
                    <TableCell>{enemy.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className={getNameColor(enemy.attributes)}>{enemy.nameKo}</div>
                        <div className="text-gray-500">{enemy.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(enemy.attributes || ['없음']).map((attr, idx) => (
                          <Badge key={idx} className={getAttributeColor(attr)}>
                            {attr}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(enemy.effects || ['없음']).map((effect, idx) => (
                          <Badge key={idx} className={getEffectColor(effect)}>
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{enemy.hp.toLocaleString()}</TableCell>
                    <TableCell>{enemy.attack.toLocaleString()}</TableCell>
                    <TableCell>{enemy.range}</TableCell>
                    <TableCell>{enemy.speed}</TableCell>
                    <TableCell>{enemy.knockbackCount}회</TableCell>
                    <TableCell>{enemy.magnification}%</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {enemy.abilities.length > 0 ? (
                          enemy.abilities.map((ability, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {ability}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-400">없음</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-4 bg-red-50">
        <p className="text-red-800">
          <span className="font-medium">API 엔드포인트:</span> GET /api/enemies?attributes={selectedAttributes.join(',')}&attributeMode={attributeFilterMode}&effects={selectedEffects.join(',')}&effectMode={effectFilterMode}
        </p>
        <p className="text-red-600 mt-2">총 {filteredEnemies.length}개의 적</p>
      </Card>

      {/* Enemy Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEnemy && (() => {
            const calculatedHP = selectedEnemy.hp * (currentMagnification / 100);
            const calculatedAttack = selectedEnemy.attack * (currentMagnification / 100);
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DialogTitle className={getNameColor(selectedEnemy.attributes)}>
                          {selectedEnemy.nameKo}
                        </DialogTitle>
                        {selectedEnemy.attributes && selectedEnemy.attributes.filter(a => a !== '없음').length > 0 && (
                          <div className="flex gap-1">
                            {selectedEnemy.attributes.filter(a => a !== '없음').map((attr, i) => (
                              <Badge key={i} variant="outline" className={`text-xs ${getAttributeBadgeStyle(attr)}`}>
                                {attr}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <DialogDescription>
                        {selectedEnemy.name}
                      </DialogDescription>
                    </div>
                    
                    {/* Magnification Control */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">배율</span>
                      <Input
                        type="number"
                        min="1"
                        value={currentMagnification}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 1) {
                            setCurrentMagnification(value);
                          }
                        }}
                        className="w-20 h-8 text-center px-2"
                      />
                      <span className="text-gray-600 text-sm">%</span>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 mb-1">ID</p>
                      <p>{selectedEnemy.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">기본 배율</p>
                      <p>{selectedEnemy.magnification}%</p>
                    </div>
                  </div>

                  {/* Effects */}
                  <div>
                    <p className="text-gray-600 mb-2">효과</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedEnemy.effects || ['없음']).map((effect, idx) => (
                        <Badge key={idx} className={getEffectColor(effect)}>
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="border-t pt-4">
                    <h4 className="mb-4">스탯 정보 (배율 {currentMagnification}%)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">HP</p>
                        <p className="text-red-600">{Math.round(calculatedHP).toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">기본: {selectedEnemy.hp.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">공격력</p>
                        <p className="text-orange-600">{Math.round(calculatedAttack).toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">기본: {selectedEnemy.attack.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">사거리</p>
                        <p className="text-blue-600">{selectedEnemy.range}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">속도</p>
                        <p className="text-green-600">{selectedEnemy.speed}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600">넉백</p>
                        <p className="text-purple-600">{selectedEnemy.knockbackCount}회</p>
                      </div>
                    </div>
                  </div>

                  {/* Abilities */}
                  <div className="border-t pt-4">
                    <h4 className="mb-3">특수능력</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEnemy.abilities.length > 0 ? (
                        selectedEnemy.abilities.map((ability, idx) => (
                          <Badge key={idx} variant="outline" className="px-3 py-1">
                            {ability}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-400">없음</span>
                      )}
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
