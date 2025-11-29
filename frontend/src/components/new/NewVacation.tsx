import { useForm } from 'react-hook-form';
// import type PostDraft from '../../../models/post-draft';
import './NewVacation.css';
import SpinnerButton from '../common/spinner-button/SpinnerButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type VacationDraft from '../../models/vacation-draft';
import { useAppDispatcher } from '../../redux/hooks';
// import { newPost } from '../../../redux/profile-slice';
import useService from '../../hooks/use-service';
import VacationService from '../../services/auth-aware/VacationService';
import { newVacation } from '../../redux/vacation-slice';
// import ProfileService from '../../../services/auth-aware/ProfileService';

export default function NewVacation() {

    const { register, handleSubmit, reset, formState } = useForm<VacationDraft>();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useAppDispatcher();

    const vacationService = useService(VacationService);
        const navigate = useNavigate();


    async function submit(draft: VacationDraft) {
  try {
    setIsSubmitting(true);
    const vacation = await vacationService.newVacation(draft);
    reset();
    dispatch(newVacation(vacation));
    navigate("/vacations");
  } catch (e) {
    alert(e);
  } finally {
    setIsSubmitting(false);
  }
}


    return (
        <div className='NewVacation'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="add destination" {...register('destination', {
                    required: {
                        value: true,
                        message: 'destination is required'
                    }
                })} />
                <div className='formError'>{formState.errors.destination?.message}</div>
                <textarea placeholder='add description' {...register('description', {
                    required: {
                        value: true,
                        message: 'description is required'
                    },
                    minLength: {
                        value: 10,
                        message: 'description must be at least 10 characters long'
                    }
                })}></textarea>
                <div className='formError'>{formState.errors.description?.message}</div>



                    <input
                        type='date'
                        {...register('startedAt', { required: { value: true, message: 'start is required' } })}
                    />
                    <div className='formError'>{formState.errors.startedAt?.message}</div>

                    <input
                        type='date'
                        {...register('endedAt', { required: { value: true, message: 'end is required' } })}
                    />
                    <div className='formError'>{formState.errors.endedAt?.message}</div>

                    <input
                        type='number' step="0.01"
                        {...register('price', {
                            required: { value: true, message: 'price is required' },
                            min: { value: 0, message: 'price must be positive' }
                        })}
                    />
                    <div className='formError'>{formState.errors.price?.message}</div>

                <input type="file" {...register('image')}/>
                    <div className='formError'>{formState.errors.image?.message}</div>


                <SpinnerButton
                    buttonText='Add Vacation'
                    loadingText='adding vacation'
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
}