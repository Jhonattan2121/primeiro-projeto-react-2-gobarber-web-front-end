/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {useRef, useCallback} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {useAuth} from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from "../../assets/logo.svg";

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content , Background } from './styles';

interface SigninFormData {
    email: string;
    password: string;
}


const Signin: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const {signIn} = useAuth();

    


    const handleSubmit = useCallback(async (data: SigninFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                .required('E-mail obrigatorio')
                .email('Digite um e-mail valido'),
                password: Yup.string()
                .required('Senha Obrigatoria')
                
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password,
            });

        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            }
            
        }
    }, 
    [signIn],
    );

    return(
    <Container>
        <Content>
            <img src={logoImg} alt="Gobarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faca seu logon</h1>

                <Input name='email' icon={FiMail} placeholder='E-mail' />
                <Input name='password' 
                icon={FiLock} 
                type="password" 
                placeholder='Senha'/>

                <Button type='submit'>Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>
            <a href="login">
                <FiLogIn />
                Criar uma conta </a>
        </Content>
        <Background />
    </Container>
    );
};

export default Signin;