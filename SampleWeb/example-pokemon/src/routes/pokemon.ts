import { Router, Request, Response } from 'express';
import { PokemonService, PokemonQuery } from '../services/pokemonService';
import { getDatabase } from '../database/connection';

const router = Router();
const pokemonService = new PokemonService(getDatabase());

router.get('/', async (req: Request, res: Response) => {
    try {
        const query: PokemonQuery = {
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            search: req.query.search as string,
            type: req.query.type as string,
            sortBy: req.query.sortBy as 'id' | 'name' | 'pokedex_number',
            sortOrder: req.query.sortOrder as 'ASC' | 'DESC'
        };

        const result = await pokemonService.getAllPokemon(query);

        res.json({
            success: true,
            data: result.pokemon,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: Math.ceil(result.total / result.limit)
            }
        });
    } catch (error) {
        console.error('포켓몬 목록 조회 실패:', error);
        res.status(500).json({
            success: false,
            error: '포켓몬 목록을 조회하는 중 오류가 발생했습니다.'
        });
    }
});

export default router;