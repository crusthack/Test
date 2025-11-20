"use client";

import Card from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, BookOpen, Zap } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-blue-600 mb-2">API 문서</h2>
          <p className="text-gray-600">냥코대전쟁 API 사용 가이드</p>
        </div>
      </div>

      <Card className="p-6 bg-blue-50">
        <div className="space-y-2">
          <h3 className="text-blue-900">Base URL</h3>
          <code className="block bg-white p-3 rounded border">
            https://api.battlecats.example.com/v1
          </code>
        </div>
      </Card>

      <Tabs defaultValue="allies" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="allies">아군</TabsTrigger>
          <TabsTrigger value="enemies">적</TabsTrigger>
          <TabsTrigger value="stages">스테이지</TabsTrigger>
          <TabsTrigger value="missions">미션</TabsTrigger>
        </TabsList>

        <TabsContent value="allies" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">GET</Badge>
              <code>/api/cats/allies</code>
            </div>
            <p className="text-gray-600 mb-4">모든 아군 캐릭터 목록을 가져옵니다.</p>
            
            <h4 className="mb-2">Query Parameters</h4>
            <div className="space-y-2 mb-4">
              <div className="flex gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded">rarity</code>
                <span className="text-gray-600">- 등급별 필터 (Normal, Rare, Super Rare, etc.)</span>
              </div>
              <div className="flex gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded">limit</code>
                <span className="text-gray-600">- 결과 수 제한 (기본값: 100)</span>
              </div>
            </div>

            <h4 className="mb-2">Response Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
{`{
  "data": [
    {
      "id": 1,
      "name": "Cat",
      "nameKo": "냥코",
      "rarity": "Normal",
      "hp": 300,
      "attack": 100,
      "range": 140,
      "speed": 10,
      "cost": 75,
      "recharge": 2.03,
      "abilities": ["빠른 생산"]
    }
  ],
  "total": 8,
  "page": 1
}`}
            </pre>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">GET</Badge>
              <code>/api/cats/allies/{'{id}'}</code>
            </div>
            <p className="text-gray-600">특정 아군 캐릭터 정보를 가져옵니다.</p>
          </Card>
        </TabsContent>

        <TabsContent value="enemies" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">GET</Badge>
              <code>/api/enemies</code>
            </div>
            <p className="text-gray-600 mb-4">모든 적 캐릭터 목록을 가져옵니다.</p>
            
            <h4 className="mb-2">Query Parameters</h4>
            <div className="space-y-2 mb-4">
              <div className="flex gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded">search</code>
                <span className="text-gray-600">- 이름으로 검색</span>
              </div>
            </div>

            <h4 className="mb-2">Response Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
{`{
  "data": [
    {
      "id": 1,
      "name": "Doge",
      "nameKo": "독",
      "hp": 100,
      "attack": 150,
      "range": 140,
      "speed": 10,
      "knockbackCount": 1,
      "abilities": [],
      "magnification": 100
    }
  ],
  "total": 7
}`}
            </pre>
          </Card>
        </TabsContent>

        <TabsContent value="stages" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">GET</Badge>
              <code>/api/stages</code>
            </div>
            <p className="text-gray-600 mb-4">모든 스테이지 정보를 가져옵니다.</p>
            
            <h4 className="mb-2">Query Parameters</h4>
            <div className="space-y-2 mb-4">
              <div className="flex gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded">difficulty</code>
                <span className="text-gray-600">- 난이도별 필터</span>
              </div>
              <div className="flex gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded">minEnergy</code>
                <span className="text-gray-600">- 최소 에너지 필터</span>
              </div>
            </div>

            <h4 className="mb-2">Response Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
{`{
  "data": [
    {
      "id": 1,
      "name": "Korea",
      "nameKo": "한국",
      "difficulty": "★",
      "energy": 20,
      "xp": 1500,
      "enemies": ["독", "스네이크"],
      "baseHp": 10000,
      "rewards": ["냥캔 30개"]
    }
  ],
  "total": 6
}`}
            </pre>
          </Card>
        </TabsContent>

        <TabsContent value="missions" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-green-600">GET</Badge>
              <code>/api/missions/monthly</code>
            </div>
            <p className="text-gray-600 mb-4">현재 월간 미션 목록을 가져옵니다.</p>

            <h4 className="mb-2">Response Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
{`{
  "month": "2025년 11월",
  "missions": [
    {
      "id": 1,
      "description": "Clear 10 stages",
      "descriptionKo": "스테이지 10개 클리어",
      "reward": "냥캔 30개",
      "completed": false
    }
  ]
}`}
            </pre>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-blue-600">POST</Badge>
              <code>/api/missions/{'{id}'}/complete</code>
            </div>
            <p className="text-gray-600">미션 완료 상태를 업데이트합니다.</p>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-yellow-600" />
          <h3>Rate Limiting</h3>
        </div>
        <div className="space-y-2 text-gray-700">
          <p>• 분당 최대 60 요청</p>
          <p>• 시간당 최대 1000 요청</p>
          <p>• 초과 시 429 Too Many Requests 반환</p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4">인증</h3>
        <p className="text-gray-600 mb-4">API 키를 헤더에 포함하여 요청하세요:</p>
        <code className="block bg-gray-100 p-3 rounded">
          Authorization: Bearer YOUR_API_KEY_HERE
        </code>
      </Card>
    </div>
  );
}
