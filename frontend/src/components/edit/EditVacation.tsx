

import { useNavigate, useParams } from 'react-router-dom';
import './EditVacation.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useService from '../../hooks/use-service';
import VacationService from '../../services/auth-aware/VacationService';
// import type VacationDraft from '../../models/vacation-draft';
import { useAppDispatcher, useAppSelector } from '../../redux/hooks';
import { init, updateVacation } from '../../redux/vacation-slice';
import Spinner from '../common/spinner/Spinner';
import SpinnerButton from '../common/spinner-button/SpinnerButton';

// Form type with string dates for HTML input
export type VacationFormValues = {
    destination: string;
    description: string;
    startedAt: string; // string for <input type="date">
    endedAt: string;   // string for <input type="date">
    price: number;
    image: FileList | null;
};

export default function EditVacation() {
    const { id } = useParams<'id'>();
    const navigate = useNavigate();
    const dispatch = useAppDispatcher();
    const vacationService = useService(VacationService);

    const vacation = useAppSelector(state =>
        state.vacationSlice.vacations.find(v => v.id === id)
    );

    const { register, handleSubmit, reset, formState } = useForm<VacationFormValues>({
        defaultValues: {
            destination: '',
            description: '',
            startedAt: '',
            endedAt: '',
            price: 0,
            image: null
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [preview, setPreview] = useState<string | null>(vacation?.imageUrl|| null);

    // Fetch vacations if not loaded yet
    useEffect(() => {
        if (!vacation) {
            vacationService.getAllVacations().then(vacationsFromServer => {
                dispatch(init(vacationsFromServer));
            });
        }
    }, [vacation, vacationService, dispatch]);

    // Reset form when vacation is ready
    useEffect(() => {
        if (!vacation) return;

        const draft: VacationFormValues = {
            description: vacation.description,
            destination: vacation.destination,
            startedAt: new Date(vacation.startedAt).toISOString().split('T')[0],
            endedAt: new Date(vacation.endedAt).toISOString().split('T')[0],
            price: vacation.price,
            image: null
        };

        reset(draft);
        setIsReady(true);
    }, [vacation, reset]);

    
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };
    
    async function submit(formValues: VacationFormValues) {
        try {
            setIsSubmitting(true);
            const updatedVacation = await vacationService.updateVacation(id!, formValues);
            dispatch(updateVacation(updatedVacation));
            navigate('/vacations');
        } catch (e) {
            alert(e);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='EditVacation'>
            {!isReady && <Spinner />}

            {isReady && (
                <form onSubmit={handleSubmit(submit)}>
                    <input
                        placeholder='add destination'
                        {...register('destination', {
                            required: { value: true, message: 'destination is required' },
                            minLength: { value: 2, message: 'Title must be at least 2 characters long' }
                        })}
                    />
                    <div className='formError'>{formState.errors.destination?.message}</div>

                    <textarea
                        placeholder='add description'
                        {...register('description', {
                            required: { value: true, message: 'vacation description is required' },
                            minLength: { value: 10, message: 'vacation description must be at least 10 characters long' }
                        })}
                    ></textarea>
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


                    {/* {vacation?.imageUrl && (
                        <div className="current-image">
                            <p>Current image:</p>
                            <img src={vacation.imageUrl} alt={vacation.destination} />
                        </div>
                    )} */}


                    <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={(e) => {
                        register("image").onChange(e);
                        handleImageChange(e);
                    }}
                />
                <div className='formError'>{formState.errors.image?.message}</div>
                {preview && (
                    <img
                        src={preview}
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px",
                        }}
                    />
                )}

                    <SpinnerButton
                        buttonText='Update Vacation'
                        loadingText='updating vacation'
                        isSubmitting={isSubmitting}
                    />
                </form>
            )}
        </div>
    );
}

