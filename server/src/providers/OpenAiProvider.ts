
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';


dotenv.config();

export class OpenAiProvider {

    private axiosInstance;
    
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
    }

    public async getMangaListRecomendation(mangaList: string) {
        const userMessage = `say that is based on his list of mangas : (create a recomendation phrase): ${mangaList}(choose one of the mangas)  because .`;

        try{
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    prompt: userMessage,
                    max_tokens: 40,
                    temperature: 0.9,
                }
                )
            });
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    public async getRecommendation(userMangaList: string, newChapters: string) {
        const systemMessage = 'You are a knowledgeable AI assistant with an extensive database of manga and the ability to recommend what manga a user should read next.';
        const userMessage = `The user has been reading these manga: ${userMangaList}. The new chapters released are: ${newChapters}.`;
        const assistantMessage = 'Based on the user\'s reading history and the new chapters available, which manga do you recommend they read next and why?';

        console.log('IN OPENAI PROVIDER')
        
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: systemMessage},
                {role: 'user', content: userMessage},
                {role: 'assistant', content: assistantMessage},
            ],
            max_tokens: 100,
        };
        
        try {
            const response = await this.axiosInstance.post('', data);
            console.log('answer?')
            console.log(response.data.choices[0].message.content);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error(error);   
        }
    }

    public async getChatAnswer(question: string, context: string) {
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'You are a knowledgeable AI assistant with an extensive database of manga.'},
                {role: 'user', content: context},
                {role: 'assistant', content: question},
            ],
            max_tokens: 400,
        };
        
        try {
            const response = await this.axiosInstance.post('', data);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error(error);
        }
    }
}



/*

import { Configuration, OpenAIApi } from "openai";

export class OpenAiProvider {
    private openai: OpenAIApi;

    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.openai = new OpenAIApi(configuration);
    }

    public async getRecommendation(userMangaList: string, newChapters: string) {
        const systemMessage = 'You are a knowledgeable AI assistant with an extensive database of manga and the ability to recommend what manga a user should read next.';
        const userMessage = `The user has been reading these manga: ${userMangaList}. The new chapters released are: ${newChapters}.`;
        const assistantMessage = 'Based on the user\'s reading history and the new chapters available, which manga do you recommend they read next and why?';
        
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: systemMessage},
                {role: 'user', content: userMessage},
                {role: 'assistant', content: assistantMessage},
            ],
            max_tokens: 500,
        };
        
        try {
            const response = await this.openai.createCompletion(data);
            console.log(response.data.choices[0]);
            return response.data.choices[0];
        } catch (error) {
            console.error(error);
        }
    }

    public async getChatAnswer(question: string, context: string) {
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {role: 'system', content: 'You are a knowledgeable AI assistant with an extensive database of manga.'},
                {role: 'user', content: context},
                {role: 'assistant', content: question},
            ],
            max_tokens: 150,
        };
        
        try {
            const response = await this.openai.createCompletion(data);
            return response.data.choices[0];
        } catch (error) {
            console.error(error);
        }
    }
}
*/
