import { z } from 'zod';
import express from 'express';
import { mangaRoute, postRoute, userRoute } from './routes/index';

const app = express();

//zod faz validacao de tipos em runtime
const userSchema = z.object({
    nome: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    age: z.number().min(18, { message: 'Idade deve ser maior que 18 anos' })
});

//typescript faz validacao de tipos em compile time
interface Userr {
    nome: string;
    age: number;
}

type User = z.infer<typeof userSchema>;

function saveUser(user: Userr) {
    //valida os dadods do objeto user
    const userValidated = userSchema.parse(user);
    console.log(userValidated);
}

saveUser({
    nome: 'Iago',
    age: 10
    }
);



app.use(express.json());
app.use('/user', userRoute);
app.use('/manga', mangaRoute);
app.use('/post', postRoute);

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});


