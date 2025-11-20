import { DatabaseConnection } from '../database/connection';

export interface Pokemon {
    id: number;
    pokedex_number: string;
    name: string;
    description: string;
    types: string;
    height: number;
    category: string;
    weight: number;
    gender: string;
    abilities: string;
}

export interface PokemonQuery {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    sortBy?: 'id' | 'name' | 'pokedex_number';
    sortOrder?: 'ASC' | 'DESC';
}

export class PokemonService {
    private db: DatabaseConnection;

    constructor(database: DatabaseConnection) {
        this.db = database;
    }

    async getAllPokemon(query: PokemonQuery = {}): Promise<{ pokemon: Pokemon[]; total: number; page: number; limit: number }> {
        const {
            page = 1,
            limit = 20,
            search = '',
            type = '',
            sortBy = 'id',
            sortOrder = 'ASC'
        } = query;

        const offset = (page - 1) * limit;

        // WHERE 조건 구성
        let whereConditions: string[] = [];
        let params: any[] = [];

        if (search) {
            whereConditions.push('(name LIKE ? OR description LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }

        if (type) {
            whereConditions.push('types LIKE ?');
            params.push(`%${type}%`);
        }

        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

        // 전체 개수 조회
        const countSql = `SELECT COUNT(*) as total FROM pokemon ${whereClause}`;
        const countResult = await this.db.get(countSql, params);
        const total = countResult.total;

        // 데이터 조회
        const sql = `
      SELECT id, pokedex_number, name, description, types, height, category, weight, gender, abilities
      FROM pokemon 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

        const pokemon = await this.db.query(sql, [...params, limit, offset]);

        return {
            pokemon,
            total,
            page,
            limit
        };
    }
}

export default PokemonService;