import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
    
const createUserFormSchema = z.object({
    email: z.string()
        .nonempty('O E-mail é obrigatório')
        .email('O E-mail é inválido'),
    password: z.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .max(20, 'A senha deve ter no máximo 20 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>


function LoginForm() {
    const [output, setOutput] = useState('');
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm <CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })

    function createUser (data: any) {
        setOutput(JSON.stringify(data, null, 2))
    }

  return (
    <section className='h-screen flex flex-col '>
        <form className='flex flec-col gap-4 w-full max-w-xs' onSubmit={handleSubmit(createUser)}>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    className='border border-[#101A36] shadow-sm rounded h-10 px-4 py-2'
                    {...register('email')}
                />
                {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    className='border border-[#101A36] shadow-sm rounded h-10 px-4 py-2'
                    {...register('password')}
                />
                {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            </div>

            <button type="submit" className='bg-[#101A36] text-white rounded h-10 hover:bg-[#101A36] transition-colors duration-200'>Salvar</button>
            <pre>{output}</pre>
        </form>
    </section>
  )
}

export default LoginForm