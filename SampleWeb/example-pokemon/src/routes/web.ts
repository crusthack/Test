import { Router, Request, Response } from 'express';
import { PokemonService } from '../services/pokemonService';
import { getDatabase } from '../database/connection';

const router = Router();
const pokemonService = new PokemonService(getDatabase());

// 홈페이지
router.get('/', (_req: Request, res: Response) => {
    res.render('index', {
        title: '포켓몬 API - 홈'
    });
});

// 포켓몬 목록 페이지
router.get('/pokemon', async (req: Request, res: Response) => {
    try {
        const query = {
            page: req.query.page ? parseInt(req.query.page as string) : 1,
            limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
            search: req.query.search as string,
            type: req.query.type as string,
            sortBy: req.query.sortBy as 'id' | 'name' | 'pokedex_number',
            sortOrder: req.query.sortOrder as 'ASC' | 'DESC'
        };

        const result = await pokemonService.getAllPokemon(query);

        res.render('pokemon', {
            title: '포켓몬 목록',
            pokemon: result.pokemon,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: Math.ceil(result.total / result.limit)
            },
            query: query
        });
    } catch (error) {
        console.error('포켓몬 목록 조회 실패:', error);
        res.status(500).render('error', {
            title: '서버 오류',
            error: '포켓몬 목록을 불러오는 중 오류가 발생했습니다.'
        });
    }
});

export default router;