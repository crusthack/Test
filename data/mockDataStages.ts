import { Stage } from '@/types';

export const stages: Stage[] = [
  // 세계편 - 1장
  {
    id: 1,
    name: 'Korea',
    nameKo: '한국',
    difficulty: '★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'baseHp', triggerValue: 99 }
    ],
    baseHp: 10000,
    deployLimit: 1000,
    time: 60,
    mapType: '세계편',
    mapStage: '1장'
  },
  {
    id: 2,
    name: 'Japan',
    nameKo: '일본',
    difficulty: '★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'baseHp', triggerValue: 50 }
    ],
    baseHp: 12000,
    deployLimit: 1000,
    time: 90,
    mapType: '세계편',
    mapStage: '1장'
  },
  {
    id: 3,
    name: 'France',
    nameKo: '프랑스',
    difficulty: '★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 10 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'baseHp', triggerValue: 30 }
    ],
    baseHp: 15000,
    deployLimit: 1200,
    time: 120,
    mapType: '세계편',
    mapStage: '1장'
  },
  // 세계편 - 2장
  {
    id: 4,
    name: 'South Korea',
    nameKo: '대한민국',
    difficulty: '★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 15 },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'baseHp', triggerValue: 50 }
    ],
    baseHp: 30000,
    deployLimit: 1500,
    time: 150,
    mapType: '세계편',
    mapStage: '2장'
  },
  {
    id: 5,
    name: 'United States',
    nameKo: '미국',
    difficulty: '★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'time', triggerValue: 20 },
      { name: 'Koala', nameKo: '코알라', triggerType: 'baseHp', triggerValue: 40 }
    ],
    baseHp: 35000,
    deployLimit: 1600,
    time: 180,
    mapType: '세계편',
    mapStage: '2장'
  },
  {
    id: 6,
    name: 'Brazil',
    nameKo: '브라질',
    difficulty: '★★',
    enemies: [
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 0 },
      { name: 'Koala', nameKo: '코알라', triggerType: 'baseHp', triggerValue: 60 }
    ],
    baseHp: 32000,
    deployLimit: 1500,
    time: 100,
    mapType: '세계편',
    mapStage: '2장'
  },
  // 세계편 - 3장
  {
    id: 7,
    name: 'Egypt',
    nameKo: '이집트',
    difficulty: '★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 20 },
      { name: 'Koala', nameKo: '코알라', triggerType: 'baseHp', triggerValue: 70 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'baseHp', triggerValue: 30 }
    ],
    baseHp: 50000,
    deployLimit: 2000,
    mapType: '세계편',
    mapStage: '3장'
  },
  {
    id: 8,
    name: 'Australia',
    nameKo: '호주',
    difficulty: '★★★',
    enemies: [
      { name: 'Koala', nameKo: '코알라', triggerType: 'time', triggerValue: 0 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'time', triggerValue: 25 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'baseHp', triggerValue: 40 }
    ],
    baseHp: 55000,
    deployLimit: 2100,
    mapType: '세계편',
    mapStage: '3장'
  },
  // 미래편 - 1장
  {
    id: 9,
    name: 'EoC Moon',
    nameKo: '미래의 달',
    difficulty: '★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 15 }
    ],
    baseHp: 40000,
    deployLimit: 1800,
    mapType: '미래편',
    mapStage: '1장'
  },
  {
    id: 10,
    name: 'Future Korea',
    nameKo: '미래 한국',
    difficulty: '★★★',
    enemies: [
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'baseHp', triggerValue: 60 }
    ],
    baseHp: 45000,
    deployLimit: 1900,
    mapType: '미래편',
    mapStage: '1장'
  },
  {
    id: 11,
    name: 'Future Japan',
    nameKo: '미래 일본',
    difficulty: '★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'time', triggerValue: 20 },
      { name: 'Koala', nameKo: '코알라', triggerType: 'baseHp', triggerValue: 45 }
    ],
    baseHp: 42000,
    deployLimit: 1850,
    mapType: '미래편',
    mapStage: '1장'
  },
  // 미래편 - 2장
  {
    id: 12,
    name: 'Future France',
    nameKo: '미래 프랑스',
    difficulty: '★★★★',
    enemies: [
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'time', triggerValue: 30 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'baseHp', triggerValue: 50 }
    ],
    baseHp: 70000,
    deployLimit: 2500,
    mapType: '미래편',
    mapStage: '2장'
  },
  {
    id: 13,
    name: 'Future Brazil',
    nameKo: '미래 브라질',
    difficulty: '★★★★',
    enemies: [
      { name: 'Koala', nameKo: '코알라', triggerType: 'time', triggerValue: 0 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'time', triggerValue: 25 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'baseHp', triggerValue: 35 }
    ],
    baseHp: 75000,
    deployLimit: 2600,
    mapType: '미래편',
    mapStage: '2장'
  },
  // 미래편 - 3장
  {
    id: 14,
    name: 'The Moon',
    nameKo: '달나라',
    difficulty: '★★★★★',
    enemies: [
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'baseHp', triggerValue: 100 }
    ],
    baseHp: 80000,
    deployLimit: 3000,
    mapType: '미래편',
    mapStage: '3장'
  },
  {
    id: 15,
    name: 'Future Egypt',
    nameKo: '미래 이집트',
    difficulty: '★★★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 20 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'baseHp', triggerValue: 60 }
    ],
    baseHp: 100000,
    deployLimit: 3200,
    mapType: '미래편',
    mapStage: '3장'
  },
  // 우주편 - 1장
  {
    id: 16,
    name: 'Cosmic Space',
    nameKo: '우주 공간',
    difficulty: '★★★★',
    enemies: [
      { name: 'Alien Doge', nameKo: '에일리언 독', triggerType: 'time', triggerValue: 0 },
      { name: 'Alien Snache', nameKo: '에일리언 스네이크', triggerType: 'time', triggerValue: 20 }
    ],
    baseHp: 60000,
    deployLimit: 2200,
    mapType: '우주편',
    mapStage: '1장'
  },
  {
    id: 17,
    name: 'Mars Colony',
    nameKo: '화성 기지',
    difficulty: '★★★★',
    enemies: [
      { name: 'Alien Koala', nameKo: '에일리언 코알라', triggerType: 'time', triggerValue: 0 },
      { name: 'Alien Kangaroo', nameKo: '에일리언 캥거루', triggerType: 'baseHp', triggerValue: 70 }
    ],
    baseHp: 65000,
    deployLimit: 2300,
    mapType: '우주편',
    mapStage: '1장'
  },
  // 우주편 - 2장
  {
    id: 18,
    name: 'Jupiter Belt',
    nameKo: '목성 벨트',
    difficulty: '★★★★★',
    enemies: [
      { name: 'Alien Doge', nameKo: '에일리언 독', triggerType: 'time', triggerValue: 0 },
      { name: 'Alien Those Guys', nameKo: '에일리언 그놈들', triggerType: 'baseHp', triggerValue: 50 }
    ],
    baseHp: 90000,
    deployLimit: 3000,
    mapType: '우주편',
    mapStage: '2장'
  },
  {
    id: 19,
    name: 'Saturn Ring',
    nameKo: '토성 고리',
    difficulty: '★★★★★',
    enemies: [
      { name: 'Alien Kangaroo', nameKo: '에일리언 캥거루', triggerType: 'time', triggerValue: 0 },
      { name: 'Alien Koala', nameKo: '에일리언 코알라', triggerType: 'time', triggerValue: 30 }
    ],
    baseHp: 95000,
    deployLimit: 3100,
    mapType: '우주편',
    mapStage: '2장'
  },
  // 우주편 - 3장
  {
    id: 20,
    name: 'Walk of Fame',
    nameKo: '명예의 전당',
    difficulty: '★★★★★★',
    enemies: [
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'baseHp', triggerValue: 100 }
    ],
    baseHp: 150000,
    deployLimit: 3500,
    mapType: '우주편',
    mapStage: '3장'
  },
  {
    id: 21,
    name: 'Nebula System',
    nameKo: '성운 시스템',
    difficulty: '★★★★★★',
    enemies: [
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Alien Doge', nameKo: '에일리언 독', triggerType: 'time', triggerValue: 0 }
    ],
    baseHp: 160000,
    deployLimit: 3600,
    mapType: '우주편',
    mapStage: '3장'
  },
  {
    id: 22,
    name: 'Black Hole',
    nameKo: '블랙홀',
    difficulty: '★★★★★★★',
    enemies: [
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Alien Those Guys', nameKo: '에일리언 그놈들', triggerType: 'time', triggerValue: 30 }
    ],
    baseHp: 200000,
    deployLimit: 4000,
    mapType: '우주편',
    mapStage: '3장'
  },
  // 마계편 - 1장
  {
    id: 23,
    name: 'Dark Gate',
    nameKo: '어둠의 문',
    difficulty: '★★★★★',
    enemies: [
      { name: 'Hell Doge', nameKo: '마계 독', triggerType: 'time', triggerValue: 0 },
      { name: 'Hell Snache', nameKo: '마계 스네이크', triggerType: 'time', triggerValue: 25 }
    ],
    baseHp: 110000,
    deployLimit: 3300,
    mapType: '마계편',
    mapStage: '1장'
  },
  {
    id: 24,
    name: 'Demon Castle',
    nameKo: '마왕성',
    difficulty: '★★★★★',
    enemies: [
      { name: 'Hell Koala', nameKo: '마계 코알라', triggerType: 'time', triggerValue: 0 },
      { name: 'Hell Kangaroo', nameKo: '마계 캥거루', triggerType: 'baseHp', triggerValue: 65 }
    ],
    baseHp: 120000,
    deployLimit: 3400,
    mapType: '마계편',
    mapStage: '1장'
  },
  // 마계편 - 2장
  {
    id: 25,
    name: 'Hell Valley',
    nameKo: '지옥 계곡',
    difficulty: '★★★★★★',
    enemies: [
      { name: 'Hell Those Guys', nameKo: '마계 그놈들', triggerType: 'time', triggerValue: 0 },
      { name: 'Hell Guys', nameKo: '마계 벽돌', triggerType: 'time', triggerValue: 35 }
    ],
    baseHp: 180000,
    deployLimit: 3800,
    mapType: '마계편',
    mapStage: '2장'
  },
  {
    id: 26,
    name: 'Inferno Pit',
    nameKo: '불지옥',
    difficulty: '★★★★★★',
    enemies: [
      { name: 'Hell Doge', nameKo: '마계 독', triggerType: 'time', triggerValue: 0 },
      { name: 'Hell Kangaroo', nameKo: '마계 캥거루', triggerType: 'baseHp', triggerValue: 55 }
    ],
    baseHp: 190000,
    deployLimit: 3900,
    mapType: '마계편',
    mapStage: '2장'
  },
  // 마계편 - 3장
  {
    id: 27,
    name: 'Devil Tower',
    nameKo: '악마의 탑',
    difficulty: '★★★★★★★',
    enemies: [
      { name: 'Hell Those Guys', nameKo: '마계 그놈들', triggerType: 'time', triggerValue: 0 },
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'baseHp', triggerValue: 100 }
    ],
    baseHp: 250000,
    deployLimit: 4200,
    mapType: '마계편',
    mapStage: '3장'
  },
  {
    id: 28,
    name: 'Jail Break Tunnel',
    nameKo: '탈옥 터널',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 40 }
    ],
    baseHp: 500000,
    deployLimit: 4500,
    mapType: '마계편',
    mapStage: '3장'
  },
  {
    id: 29,
    name: 'Abyss Core',
    nameKo: '심연의 핵',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Hell Those Guys', nameKo: '마계 그놈들', triggerType: 'time', triggerValue: 20 }
    ],
    baseHp: 550000,
    deployLimit: 4600,
    mapType: '마계편',
    mapStage: '3장'
  },
  // 레전드 스토리
  {
    id: 30,
    name: 'Legend Begins',
    nameKo: '전설의 시작',
    difficulty: '★★★★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0, starMultipliers: { star1: 100, star2: 200, star3: 300, star4: 500 } },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 30, starMultipliers: { star1: 150, star2: 300, star3: 450, star4: 750 } },
      { name: 'Koala', nameKo: '코알라', triggerType: 'baseHp', triggerValue: 65, starMultipliers: { star1: 120, star2: 240, star3: 360, star4: 600 } }
    ],
    baseHp: 140000,
    deployLimit: 3600,
    mapType: '레전드 스토리'
  },
  {
    id: 31,
    name: 'Ancient Ruins',
    nameKo: '고대 유적',
    difficulty: '★★★★★★',
    enemies: [
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'time', triggerValue: 0, starMultipliers: { star1: 110, star2: 220, star3: 330, star4: 550 } },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'baseHp', triggerValue: 70, starMultipliers: { star1: 130, star2: 260, star3: 390, star4: 650 } }
    ],
    baseHp: 145000,
    deployLimit: 3700,
    mapType: '레전드 스토리'
  },
  {
    id: 32,
    name: 'Hero Trial',
    nameKo: '영웅의 시련',
    difficulty: '★★★★★★★',
    enemies: [
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'baseHp', triggerValue: 100, starMultipliers: { star1: 200, star2: 400, star3: 600, star4: 1000 } },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'time', triggerValue: 0, starMultipliers: { star1: 150, star2: 300, star3: 450, star4: 750 } }
    ],
    baseHp: 220000,
    deployLimit: 4100,
    mapType: '레전드 스토리'
  },
  {
    id: 33,
    name: 'Dragon Lair',
    nameKo: '용의 둥지',
    difficulty: '★★★★★★★',
    enemies: [
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'baseHp', triggerValue: 100, starMultipliers: { star1: 250, star2: 500, star3: 750, star4: 1250 } },
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0, starMultipliers: { star1: 100, star2: 200, star3: 300, star4: 500 } }
    ],
    baseHp: 230000,
    deployLimit: 4200,
    mapType: '레전드 스토리'
  },
  {
    id: 34,
    name: 'Mythical Path',
    nameKo: '신화의 길',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100, starMultipliers: { star1: 300, star2: 600, star3: 900, star4: 1500 } },
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'time', triggerValue: 45, starMultipliers: { star1: 200, star2: 400, star3: 600, star4: 1000 } }
    ],
    baseHp: 300000,
    deployLimit: 4400,
    mapType: '레전드 스토리'
  },
  {
    id: 35,
    name: 'No Plan A',
    nameKo: '계획이 없다',
    difficulty: '★★★★★★★★★★',
    enemies: [
      { name: 'R.Ost', nameKo: '알오스트', triggerType: 'baseHp', triggerValue: 100, starMultipliers: { star1: 500, star2: 1000, star3: 1500, star4: 2500 } }
    ],
    baseHp: 1000000,
    deployLimit: 5000,
    mapType: '레전드 스토리'
  },
  {
    id: 36,
    name: 'Ultimate Challenge',
    nameKo: '궁극의 도전',
    difficulty: '★★★★★★★★★★',
    enemies: [
      { name: 'R.Ost', nameKo: '알오스트', triggerType: 'baseHp', triggerValue: 100, starMultipliers: { star1: 500, star2: 1000, star3: 1500, star4: 2500 } },
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'time', triggerValue: 60, starMultipliers: { star1: 400, star2: 800, star3: 1200, star4: 2000 } }
    ],
    baseHp: 1200000,
    deployLimit: 5200,
    mapType: '레전드 스토리'
  },
  // 신 레전드 스토리
  {
    id: 37,
    name: 'New Dawn',
    nameKo: '새로운 시작',
    difficulty: '★★★★★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0, starMultipliers: { star1: 120, star2: 240, star3: 360, star4: 600 } },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 35, starMultipliers: { star1: 180, star2: 360, star3: 540, star4: 900 } },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'baseHp', triggerValue: 60, starMultipliers: { star1: 140, star2: 280, star3: 420, star4: 700 } }
    ],
    baseHp: 170000,
    deployLimit: 3800,
    mapType: '신 레전드 스토리'
  },
  {
    id: 38,
    name: 'Rising Heroes',
    nameKo: '떠오르는 영웅들',
    difficulty: '★★★★★★★',
    enemies: [
      { name: 'Koala', nameKo: '코알라', triggerType: 'time', triggerValue: 0, starMultipliers: { star1: 150, star2: 300, star3: 450, star4: 750 } },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'time', triggerValue: 30, starMultipliers: { star1: 160, star2: 320, star3: 480, star4: 800 } },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'baseHp', triggerValue: 55, starMultipliers: { star1: 130, star2: 260, star3: 390, star4: 650 } }
    ],
    baseHp: 175000,
    deployLimit: 3900,
    mapType: '신 레전드 스토리'
  },
  {
    id: 39,
    name: 'Epic Battle',
    nameKo: '서사시의 전투',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'time', triggerValue: 40, starMultipliers: { star1: 250, star2: 500, star3: 750, star4: 1250 } },
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'baseHp', triggerValue: 100, starMultipliers: { star1: 300, star2: 600, star3: 900, star4: 1500 } }
    ],
    baseHp: 260000,
    deployLimit: 4300,
    mapType: '신 레전드 스토리'
  },
  {
    id: 40,
    name: 'Titan War',
    nameKo: '타이탄 전쟁',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Those Guys', nameKo: '그놈��', triggerType: 'time', triggerValue: 0 }
    ],
    baseHp: 270000,
    deployLimit: 4400,
    mapType: '신 레전드 스토리'
  },
  {
    id: 41,
    name: 'Heaven Gate',
    nameKo: '천국의 문',
    difficulty: '★★★★★★★★★',
    enemies: [
      { name: 'R.Ost', nameKo: '알오스트', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'time', triggerValue: 50 }
    ],
    baseHp: 400000,
    deployLimit: 4700,
    mapType: '신 레전드 스토리'
  },
  {
    id: 42,
    name: 'God Realm',
    nameKo: '신의 영역',
    difficulty: '★★★★★★★★★★',
    enemies: [
      { name: 'R.Ost', nameKo: '알오스트', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'time', triggerValue: 60 },
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'time', triggerValue: 120 }
    ],
    baseHp: 1500000,
    deployLimit: 5500,
    mapType: '신 레전드 스토리'
  },
  // 레전드 스토리 0
  {
    id: 43,
    name: 'Zero Point',
    nameKo: '제로 포인트',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 40 },
      { name: 'Koala', nameKo: '코알라', triggerType: 'baseHp', triggerValue: 65 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'baseHp', triggerValue: 40 }
    ],
    baseHp: 200000,
    deployLimit: 4000,
    mapType: '레전드 스토리 0'
  },
  {
    id: 44,
    name: 'Origin Story',
    nameKo: '기원의 이야기',
    difficulty: '★★★★★★★★',
    enemies: [
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '벽돌', triggerType: 'baseHp', triggerValue: 55 }
    ],
    baseHp: 210000,
    deployLimit: 4100,
    mapType: '레전드 스토리 0'
  },
  {
    id: 45,
    name: 'Chaos Theory',
    nameKo: '혼돈 이론',
    difficulty: '★★★★★★★★★',
    enemies: [
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'time', triggerValue: 50 },
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'baseHp', triggerValue: 100 }
    ],
    baseHp: 320000,
    deployLimit: 4500,
    mapType: '레전드 스토리 0'
  },
  {
    id: 46,
    name: 'Void Space',
    nameKo: '공허의 공간',
    difficulty: '★★★★★★★★★',
    enemies: [
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'time', triggerValue: 45 }
    ],
    baseHp: 330000,
    deployLimit: 4600,
    mapType: '레전드 스토리 0'
  },
  {
    id: 47,
    name: 'Primordial Chaos',
    nameKo: '태초의 혼돈',
    difficulty: '★★★★★★★★★★',
    enemies: [
      { name: 'R.Ost', nameKo: '알오스트', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'time', triggerValue: 70 }
    ],
    baseHp: 500000,
    deployLimit: 4900,
    mapType: '레전드 스토리 0'
  },
  {
    id: 48,
    name: 'Absolute Zero',
    nameKo: '절대 영도',
    difficulty: '★★★★★★★★★★',
    enemies: [
      { name: 'R.Ost', nameKo: '알오스트', triggerType: 'baseHp', triggerValue: 100 },
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'time', triggerValue: 80 },
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'time', triggerValue: 140 },
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'time', triggerValue: 200 }
    ],
    baseHp: 2000000,
    deployLimit: 6000,
    mapType: '레전드 스토리 0'
  },
  {
    id: 49,
    name: 'Endless Invasion',
    nameKo: '끝없는 침공',
    difficulty: '★★★★★★★★★★',
    enemies: [
      { name: 'Doge', nameKo: '독', triggerType: 'time', triggerValue: 0 },
      { name: 'Snache', nameKo: '스네이크', triggerType: 'time', triggerValue: 15 },
      { name: 'Those Guys', nameKo: '그놈들', triggerType: 'time', triggerValue: 30 },
      { name: 'Koala', nameKo: '코알라', triggerType: 'time', triggerValue: 45 },
      { name: 'Kangaroo', nameKo: '캥거루', triggerType: 'baseHp', triggerValue: 90 },
      { name: 'Alien Doge', nameKo: '에일리언 독', triggerType: 'baseHp', triggerValue: 80 },
      { name: 'Hell Snache', nameKo: '마계 스네이크', triggerType: 'baseHp', triggerValue: 70 },
      { name: 'Bun Bun', nameKo: '번번', triggerType: 'baseHp', triggerValue: 60 },
      { name: 'Teacher Bun Bun', nameKo: '선생 번번', triggerType: 'baseHp', triggerValue: 50 },
      { name: 'Cli-One', nameKo: '클라이원', triggerType: 'time', triggerValue: 100 }
    ],
    baseHp: 2500000,
    deployLimit: 6500,
    mapType: '레전드 스토리 0'
  }
];
