import { useContext, useState } from 'react';
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import './Signup.css';
import { useForm } from 'react-hook-form';
import authService from '../../../services/auth';
import AuthContext from '../auth/AuthContext';
import type SignupModel from '../../../models/signup';

export default function Signup() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { register, handleSubmit } = useForm<SignupModel>();

    const authContext = useContext(AuthContext);

    async function submit(signup: SignupModel) {
        try {
            setIsSubmitting(true);
            const { jwt } = await authService.signup(signup);
            authContext?.newJwt(jwt);
        } catch (e) {
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='Signup'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='first name' {...register('firstName')} />
                <input placeholder='last name' {...register('lastName')} />
                <input placeholder='email' {...register('email')} />
                <input placeholder='password' type="password" {...register('password')} />
                <SpinnerButton
                    buttonText='Signup'
                    loadingText='signing up'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
}