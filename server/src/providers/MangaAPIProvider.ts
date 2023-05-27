import axios, { AxiosRequestConfig } from 'axios';
import { CreateMangaDTO, MangaSchema } from '../schemas/CreateMangaDTO';
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

  private parseResponseData(data: any): CreateMangaDTO {
    const result = MangaSchema.safeParse(data);

    if (!result.success) {
      throw new Error(`Invalid response data: ${result.error}`);
    }

    return result.data;
  }

  public async getMangaById(id: string): Promise<CreateMangaDTO> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/${id}`
    };
    try {
      const response = await this.client.request(options);
      return this.parseResponseData(response.data);
    } catch (error) {
      throw error;
    }
  }

  public async searchMangaByName(name: string, limit?: number): Promise<CreateMangaDTO> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/search/${name}${limit ? '/' + limit : ''}`
    };
    try {
      const response = await this.client.request(options);
      return this.parseResponseData(response.data);
    } catch (error) {
      throw error;
    }
  }

  public async getMangaRecommendations(id: string): Promise<CreateMangaDTO> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/recommendations/${id}`
    };
    try {
      const response = await this.client.request(options);
      return this.parseResponseData(response.data);
    } catch (error) {
      throw error;
    }
  }

  public async getTopManga(type: 'all' | 'manga' | 'doujin' | 'manhwa' | 'manhua' | 'favorite' | 'bypopularity' = 'all'): Promise<CreateMangaDTO> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/top/${type}`
    };
    try {
      const response = await this.client.request(options);
      return this.parseResponseData(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export default new MangaAPIProvider();



/*
import axios, { AxiosRequestConfig } from 'axios';
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

  public async getMangaById(id: string) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/${id}`
    };
    try {
      const response = await this.client.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async searchMangaByName(name: string, limit?: number) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/search/${name}${limit ? '/' + limit : ''}`
    };
    try {
      const response = await this.client.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getMangaRecommendations(id: string) {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/recommendations/${id}`
    };
    try {
      const response = await this.client.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getTopManga(type: 'all' | 'manga' | 'doujin' | 'manhwa' | 'manhua' | 'favorite' | 'bypopularity' = 'all') {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/manga/top/${type}`
    };
    try {
      const response = await this.client.request(options);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new MangaAPIProvider();
*/