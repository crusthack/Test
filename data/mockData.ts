import { Enemy, MonthlyMission } from '@/types/common';
import { stages } from '@/data/mockDataStages';

export const enemies: Enemy[] = [
  {
    id: 1,
    name: 'Doge',
    nameKo: '독',
    hp: 100,
    attack: 150,
    range: 140,
    speed: 10,
    knockbackCount: 1,
    abilities: [],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  },
  {
    id: 2,
    name: 'Snache',
    nameKo: '스네이크',
    hp: 200,
    attack: 300,
    range: 140,
    speed: 6,
    knockbackCount: 1,
    abilities: [],
    magnification: 100,
    attributes: ['빨강'],
    effects: ['없음']
  },
  {
    id: 3,
    name: 'Those Guys',
    nameKo: '그놈들',
    hp: 100,
    attack: 100,
    range: 110,
    speed: 5,
    knockbackCount: 1,
    abilities: ['다수 출현'],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  },
  {
    id: 4,
    name: 'Bun Bun',
    nameKo: '번번',
    hp: 80000,
    attack: 4000,
    range: 240,
    speed: 8,
    knockbackCount: 3,
    abilities: ['강력한 공격', '넉백 3회'],
    magnification: 100,
    attributes: ['빨강'],
    effects: ['느리게한다']
  },
  {
    id: 5,
    name: 'Teacher Bun Bun',
    nameKo: '선생 번번',
    hp: 200000,
    attack: 8000,
    range: 240,
    speed: 10,
    knockbackCount: 3,
    abilities: ['빠른 공격', '강력한 공격'],
    magnification: 100,
    attributes: ['빨강'],
    effects: ['멈추게한다']
  },
  {
    id: 6,
    name: 'Cli-One',
    nameKo: '클라이원',
    hp: 777777,
    attack: 12000,
    range: 400,
    speed: 4,
    knockbackCount: 10,
    abilities: ['장거리 공격', '웨이브 공격'],
    magnification: 100,
    attributes: ['에일리언'],
    effects: ['공격력다운']
  },
  {
    id: 7,
    name: 'R.Ost',
    nameKo: '알오스트',
    hp: 3000000,
    attack: 25000,
    range: 500,
    speed: 2,
    knockbackCount: 1,
    abilities: ['초장거리', '독 면역', '격퇴 면역'],
    magnification: 100,
    attributes: ['에일리언', '좀비'],
    effects: ['느리게한다', '공격력다운']
  },
  {
    id: 8,
    name: 'Koala',
    nameKo: '코알라',
    hp: 300,
    attack: 350,
    range: 140,
    speed: 8,
    knockbackCount: 1,
    abilities: [],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  },
  {
    id: 9,
    name: 'Kangaroo',
    nameKo: '캥거루',
    hp: 450,
    attack: 500,
    range: 160,
    speed: 12,
    knockbackCount: 2,
    abilities: ['빠른 이동'],
    magnification: 100,
    attributes: ['빨강'],
    effects: ['없음']
  },
  {
    id: 10,
    name: 'Alien Doge',
    nameKo: '에일리언 독',
    hp: 150,
    attack: 200,
    range: 140,
    speed: 10,
    knockbackCount: 1,
    abilities: ['에일리언'],
    magnification: 100,
    attributes: ['에일리언'],
    effects: ['없음']
  },
  {
    id: 11,
    name: 'Alien Snache',
    nameKo: '에일리언 스네이크',
    hp: 280,
    attack: 400,
    range: 140,
    speed: 6,
    knockbackCount: 1,
    abilities: ['에일리언'],
    magnification: 100,
    attributes: ['에일리언'],
    effects: ['없음']
  },
  {
    id: 12,
    name: 'Alien Koala',
    nameKo: '에일리언 코알라',
    hp: 420,
    attack: 450,
    range: 140,
    speed: 8,
    knockbackCount: 1,
    abilities: ['에일리언'],
    magnification: 100,
    attributes: ['에일리언'],
    effects: ['없음']
  },
  {
    id: 13,
    name: 'Alien Kangaroo',
    nameKo: '에일리언 캥거루',
    hp: 550,
    attack: 600,
    range: 160,
    speed: 12,
    knockbackCount: 2,
    abilities: ['빠른 이동', '에일리언'],
    magnification: 100,
    attributes: ['에일리언'],
    effects: ['없음']
  },
  {
    id: 14,
    name: 'Alien Those Guys',
    nameKo: '에일리언 그놈들',
    hp: 140,
    attack: 130,
    range: 110,
    speed: 5,
    knockbackCount: 1,
    abilities: ['다수 출현', '에일리언'],
    magnification: 100,
    attributes: ['에일리언'],
    effects: ['없음']
  },
  {
    id: 15,
    name: 'Hell Doge',
    nameKo: '마계 독',
    hp: 180,
    attack: 250,
    range: 140,
    speed: 10,
    knockbackCount: 1,
    abilities: ['마계'],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  },
  {
    id: 16,
    name: 'Hell Snache',
    nameKo: '마계 스네이크',
    hp: 350,
    attack: 500,
    range: 140,
    speed: 6,
    knockbackCount: 1,
    abilities: ['마계'],
    magnification: 100,
    attributes: ['빨강'],
    effects: ['없음']
  },
  {
    id: 17,
    name: 'Hell Koala',
    nameKo: '마계 코알라',
    hp: 500,
    attack: 550,
    range: 140,
    speed: 8,
    knockbackCount: 1,
    abilities: ['마계'],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  },
  {
    id: 18,
    name: 'Hell Kangaroo',
    nameKo: '마계 캥거루',
    hp: 650,
    attack: 750,
    range: 160,
    speed: 12,
    knockbackCount: 2,
    abilities: ['빠른 이동', '마계'],
    magnification: 100,
    attributes: ['빨강'],
    effects: ['없음']
  },
  {
    id: 19,
    name: 'Hell Those Guys',
    nameKo: '마계 그놈들',
    hp: 160,
    attack: 150,
    range: 110,
    speed: 5,
    knockbackCount: 1,
    abilities: ['다수 출현', '마계'],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  },
  {
    id: 20,
    name: 'Hell Guys',
    nameKo: '마계 벽돌',
    hp: 180,
    attack: 160,
    range: 110,
    speed: 5,
    knockbackCount: 1,
    abilities: ['다수 출현', '마계'],
    magnification: 100,
    attributes: ['무속성'],
    effects: ['없음']
  }
];

// stages는 ./mockDataStages.ts에서 import됨
export { stages };

export const monthlyMissions: MonthlyMission = {
  month: '2025년 11월',
  missions: [
    {
      id: 1,
      description: 'Clear 10 stages',
      descriptionKo: '스테이지 10개 클리어',
      reward: '냥캔 30개',
      completed: false
    },
    {
      id: 2,
      description: 'Defeat 100 enemies',
      descriptionKo: '적 100마리 처치',
      reward: '레어 티켓 1개',
      completed: false
    },
    {
      id: 3,
      description: 'Watch 5 ads',
      descriptionKo: '광고 5개 시청',
      reward: '냥캔 50개',
      completed: false
    },
    {
      id: 4,
      description: 'Upgrade 3 cats to level 10',
      descriptionKo: '냥코 3마리 레벨 10으로 업그레이드',
      reward: 'XP 10000',
      completed: false
    },
    {
      id: 5,
      description: 'Complete daily missions 7 days',
      descriptionKo: '일일 미션 7일 완료',
      reward: '레어 티켓 2개',
      completed: false
    }
  ]
};
