import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import aichanpc from '../assets/aichan.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const createUserFormSchema = z.object({
    email: z.string()
        .nonempty('O E-mail é obrigatório')
        .email('O E-mail é inválido'),
    password: z.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .max(20, 'A senha deve ter no máximo 20 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function Login( { setLoggedUser }: { setLoggedUser: React.Dispatch<React.SetStateAction<string>> } ) {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm <CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })

    const getUser = async (data: CreateUserFormData) => {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            console.error('Failed to create user');
        } else {
            const responseData = await response.json();
            const user = JSON.stringify(responseData, null, 2);
            setUser(user);
            setLoggedUser(user);
            navigate('/dashboard'); // Redirect to dashboard
        }
    };
    
  return (
    <section className='h-screen min-w-full flex flex-col bg-[#f6f8ff] flex-wrap md:max-w-2xl max-w-md md:min-w-full md:min-h-full'>    
        <div className='md:min-w-[40%] md:min-h-full '>
            <img src={aichanpc} alt="Aichan" className='w-screen h-[125px] object-cover md:h-full md:w-[100%]' />
        </div>
        <main className='md:min-w-[60%] md:min-h-full flex items-center'>
        <form className='w-full max-w-md mt-[10px] mx-auto flex flex-col gap-7 items-center justify-center md:max-w-xl' onSubmit={handleSubmit(getUser)}>
                <div className='text-[36px] font-bold flex items-center justify-center flex-col mt-[50px] md:mt-0'>
                    <h1>ACESSE A </h1>
                    <h1 className='text-[#5800FF]'>YOMU MANGA</h1>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='uppercase font-bold px-2'>Email</label>
                    <input
                        type="email"
                        className='min-w-[340px] h-[50px] bg-white shadow-sm shadow-[#5800FF] rounded-xl py-2 px-3 focus:outline-none text-sm placeholder-slate-300 placeholder:text-sm md:min-w-[500px]'
                        placeholder='Digite seu email'
                        {...register('email')}
                    />
                    {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='uppercase font-bold px-2'>Senha</label>
                    <input
                        type="password"
                        className='min-w-[340px] h-[50px] bg-white shadow-sm shadow-[#5800FF] rounded-xl py-2 px-3 focus:outline-none placeholder-slate-300 placeholder:text-sm md:min-w-[500px]'
                        placeholder='Digite sua senha'
                        {...register('password')}
                    />
                    {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
                </div>

                <button type="submit" className='min-w-[340px] h-[50px] mt-[55px] bg-[#5800FF] rounded-2xl font-bold text-white uppercase text-center py-3 md:min-w-[500px]'>Salvar</button>
                <Link to="/SignIn" className='min-w-[340px] h-[50px] mt-[-20px] rounded-2xl font-bold text-[#5800FF] uppercase text-center py-3 md:min-w-[500px]'>Criar conta</Link>
            </form>
        </main>
    </section>
  )
}

export default Login
