import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
    const {type} = useParams()
    const [formType, setFormType] = useState(type==='register'?type:'login')
    const toggleFormType = () => {
        setFormType(prevState=>prevState==='register'?'login':'register')
    }
    return (
<div className="container mt-5">
    <div className="row">
        <div className='col-md-6 offset-md-3 shadow p-4'>
            {formType==='register'? 
            <>
            <h3 className='mb-5 pl-10'>Регистрация</h3>
                <RegisterForm/>
                    <p>Уже зарегистрированы? 
                        <a role='button' onClick={toggleFormType} >Войти</a>
                    </p>
                </>
                :<> 
                <h3 className='mb-5'>Авторизация</h3>
                <LoginForm/>
                    <p>Еще нет аккаунта? 
                        <a role='button' onClick={toggleFormType}>Регистрация</a>
                    </p>
             </>}
        </div>
    </div>
</div>
)}
    
export default Login;