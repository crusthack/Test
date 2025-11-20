import { Router, Request, Response } from 'express';
import pokemonRoutes from './pokemon';

const router = Router();
router.use('/pokemon', pokemonRoutes);

// 헬스 체크
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API 정보
router.get('/info', (_req: Request, res: Response) => {
  res.json({
    name: 'Express.js 5.0 TypeScript API',
    version: '1.0.0',
    description: 'TypeScript 기반 Express.js 5.0 API 서버',
    endpoints: {
      health: '/api/health',
      info: '/api/info',
    },
  });
});

export default router;