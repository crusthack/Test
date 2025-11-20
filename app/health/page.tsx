"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, Server, Database, Wifi, RefreshCw } from 'lucide-react';

export default function HealthPage() {
  const [lastChecked, setLastChecked] = useState(new Date());
  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = () => {
    setIsChecking(true);
    setTimeout(() => {
      setLastChecked(new Date());
      setIsChecking(false);
    }, 1000);
  };

  const services = [
    {
      name: 'API Server',
      status: 'operational',
      uptime: 99.98,
      responseTime: '45ms',
      icon: Server,
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: 99.95,
      responseTime: '12ms',
      icon: Database,
    },
    {
      name: 'CDN',
      status: 'operational',
      uptime: 99.99,
      responseTime: '8ms',
      icon: Wifi,
    },
  ];

  const endpoints = [
    { name: 'GET /api/cats/allies', status: 'ok', latency: 45 },
    { name: 'GET /api/enemies', status: 'ok', latency: 38 },
    { name: 'GET /api/stages', status: 'ok', latency: 52 },
    { name: 'GET /api/missions/monthly', status: 'ok', latency: 41 },
    { name: 'GET /api/search', status: 'ok', latency: 67 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Activity className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-green-600 mb-2">API Health Check</h2>
            <p className="text-gray-600">시스템 상태 및 성능 모니터링</p>
          </div>
        </div>
        <Button onClick={checkHealth} disabled={isChecking} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          새로고침
        </Button>
      </div>

      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-green-900">전체 시스템 상태</h3>
            <p className="text-green-600">모든 시스템이 정상 작동 중입니다</p>
          </div>
          <Badge className="bg-green-600 text-lg px-4 py-2">Operational</Badge>
        </div>
        <div className="text-sm text-green-700">
          마지막 확인: {lastChecked.toLocaleString('ko-KR')}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.name} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
                <div>
                  <h4>{service.name}</h4>
                  <Badge className="bg-green-600 mt-1">{service.status}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">가동률</span>
                    <span>{service.uptime}%</span>
                  </div>
                  <Progress value={service.uptime} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">응답 시간</span>
                  <span className="text-green-600">{service.responseTime}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="mb-4">엔드포인트 상태</h3>
        <div className="space-y-3">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <code className="text-sm">{endpoint.name}</code>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{endpoint.latency}ms</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  {endpoint.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4">시스템 메트릭</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">CPU 사용률</span>
              <span>24%</span>
            </div>
            <Progress value={24} className="h-2" />
            <div className="flex justify-between">
              <span className="text-gray-600">메모리 사용률</span>
              <span>56%</span>
            </div>
            <Progress value={56} className="h-2" />
            <div className="flex justify-between">
              <span className="text-gray-600">디스크 사용률</span>
              <span>38%</span>
            </div>
            <Progress value={38} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">24시간 통계</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">총 요청 수</span>
              <span>1,245,678</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">성공률</span>
              <span className="text-green-600">99.97%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">평균 응답 시간</span>
              <span>48ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">오류 수</span>
              <span className="text-red-600">374</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-blue-50">
        <p className="text-blue-800">
          <span className="font-medium">API 엔드포인트:</span> GET /api/health
        </p>
      </Card>
    </div>
  );
}
