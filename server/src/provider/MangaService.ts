import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

interface MangaData {
    id: number;
    title: string;
    description: string;
    author: string;
    status: string;
    image: string;
}

class MangaService {
    private baseUrl = 'https://myanimelist.p.rapidapi.com';
    private headers = {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
    };

    public async getManga(mangaName: string): Promise<MangaData> {
        const response = await fetch(`${this.baseUrl}/manga/search/${mangaName}`, { method: 'GET', headers: this.headers });
        const data = await response.json() as MangaData[];
        return data[0]; // assuming the search result is an array and you want the first result
    }

    // Add other methods here like searchManga, getTopMangas, getPopularMangas etc.
}

export default new MangaService();
