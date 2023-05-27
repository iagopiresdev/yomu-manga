import axios from 'axios';
import * as dotenv from "dotenv";

dotenv.config();

class MangaService {
    async execute (manga: string){
        try{
            const response = await axios.request({
                method: 'GET',
                url: `https://myanimelist.p.rapidapi.com/manga/search/${manga}/6`,
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': process.env.RAPID_API_HOST
                }
            })
            return response.data;
        }catch(err){
            console.log(err)
        }
    }
}

export { MangaService }
