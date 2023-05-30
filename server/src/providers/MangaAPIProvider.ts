import axios, { AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { MangaSchema, CreateMangaDTO } from '../schemas/CreateMangaDTO';
import { MangaByIdSchema, MangaByIdDTO } from '../schemas/SearchMangaDetailsDTO';
import { MangaSearchResultSchema, MangaSearchResultDTO } from '../schemas/SearchMangaDTO';
import { TopMangaSchema, TopMangaDTO } from '../schemas/TopMangaDTO';
import { CreateMangaService } from '../services/createManga/CreateMangaService';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


import * as dotenv from 'dotenv';

dotenv.config();

class MangaAPIProvider {
  private client = axios.create({
    baseURL: 'https://myanimelist.p.rapidapi.com',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST
    }
  });
  
  public async searchMangaByName(name: string, limit?: number) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/search/${name}${limit ? '/' + limit : ''}`
    };
    try {
      const response = await this.client.request(options);
      const parsedData = response.data.map((item: MangaSearchResultDTO) => MangaSearchResultSchema.parse(item));
      return parsedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // handle validation error
        console.error(error.errors);
      } else {
        throw error;
      }
    }
  }

  public async getMangaById(id: string) {
    // Check if manga is in the database
    const existingManga = await prisma.manga.findUnique({ where: { id } });
  
    if (existingManga) {
      return existingManga;
    }
  
    // If manga doesn't exist in the database, fetch it from the API
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/${id}`
    };
  
    try {
      const response = await this.client.request(options);
      const parsedData = MangaSchema.parse(response.data);

      //save manga to database
      const createMangaService = new CreateMangaService();
      const savedManga = await createMangaService.execute(parsedData, id);
  
      return savedManga;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error', error);
        throw new Error('Invalid data');
      } else {
        throw error;
      }
    }
  }
  
  public async getTopManga(type: 'all' | 'manga' | 'doujin' | 'manhwa' | 'manhua' | 'favorite' | 'bypopularity' = 'all') {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/top/${type}`
    };
    try {
      const response = await this.client.request(options);
      const parsedData = TopMangaSchema.parse(response.data);
      return parsedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // handle validation error
        console.error('Validation error', error);
        throw new Error('Invalid data');
      } else {
        throw error;
      }
    }
  }

  public async getMangaRecommendations(id: string) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/recommendations/${id}`
    };
  
    try {
      const response = await this.client.request(options);
      let recommendations = response.data.map((item: any) => item.manga_id.toString());
  
      if (!Array.isArray(recommendations)) {
        recommendations = [recommendations];
      }
  
      const updatedRecs: any[] = []; 
  
      for (const recId of recommendations) {
        // Use getMangaById which already handles checking database and saving if not present
        const manga = await this.getMangaById(recId);
        updatedRecs.push(manga);
      }
  
      return updatedRecs;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error', error);
        throw new Error('Invalid data');
      } else {
        throw error;
      }
    }
  }
  
}

export { MangaAPIProvider };
