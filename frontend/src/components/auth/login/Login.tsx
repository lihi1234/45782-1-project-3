import { useContext, useState } from 'react';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import './Login.css';
import { useForm } from 'react-hook-form';
import type LoginModel from '../../../models/login';
import authService from '../../../services/auth';
import AuthContext from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { register, handleSubmit } = useForm<LoginModel>();

    const authContext = useContext(AuthContext);
      const navigate = useNavigate(); // <-- initialize navigate


    async function submit(login: LoginModel) {
        try {
            setIsSubmitting(true);
            const { jwt } = await authService.login(login);
            authContext?.newJwt(jwt);
        } catch (e) {
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    }


    const goToSignup = () => {
        navigate('/signup'); 
    };

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>

                <input placeholder='email' {...register('email')} />
                <input placeholder='password' type="password" {...register('password')} />
                <SpinnerButton
                    buttonText='Login'
                    loadingText='logging in'
                    isSubmitting={isSubmitting}
                />
                <button type="button" onClick={goToSignup}>signup</button>
            </form>
        </div>
    );
}