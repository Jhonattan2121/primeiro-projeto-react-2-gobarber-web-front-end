import React, {useRef, useCallback} from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content , Background , AnimationContainer} from './styles';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import {useAuth} from '../../hooks/Auth';
import logoImg from "../../assets/logo.svg";
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import { Link , useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/Toast';

interface SigninFormData {
    email: string;
    password: string;
}


const Signin: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {signIn} = useAuth();
    const { addToast } = useToast();

    const history = useHistory();

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

            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/Dashboard');
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
            }
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais '
            });
        }
    }, 
    [signIn, addToast , history],
    );

    return(
    <Container>
        <Content>
            <AnimationContainer>
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
            <Link to="/signup">
                <FiLogIn />
                Criar uma conta </Link>
                </AnimationContainer>
        </Content>
        <Background />
    </Container>
    );
};

export default Signin;