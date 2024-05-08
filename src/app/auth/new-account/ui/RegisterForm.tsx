'use client';

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [errorMessage, setErrorMessage] = useState('');

    const onSumbit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { name, email, password } = data;
        const resp = await registerUser(name, email, password);
        if (!resp.ok) {
            setErrorMessage(resp.message);
            return
        }

        await login(email.toLowerCase(), password);

        window.location.replace('/');

    }

    return (
        <form onSubmit={handleSubmit(onSumbit)} autoComplete="off" className="flex flex-col">

            {errors.name && <span className="text-red-500">*El nombre es obligatorio</span>}
            <label htmlFor="email">Nombre Completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })} />

            {errors.email && <span className="text-red-500">*El correo electrónico es obligatorio y debe de ser un correo valido</span>}
            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />

            {errors.password && <span className="text-red-500">*La contraseña es obligatoria</span>}
            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true })} />

            <span className="text-red-500">{errorMessage}</span>
            <button

                className="btn-primary">
                Crear cuenta
            </button>


        </form>
    )
}
