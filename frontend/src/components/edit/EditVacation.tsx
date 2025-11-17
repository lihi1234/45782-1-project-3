

import { useNavigate, useParams } from 'react-router-dom';
import './EditVacation.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useService from '../../hooks/use-service';
import VacationService from '../../services/auth-aware/VacationService';
import type VacationDraft from '../../models/vacation-draft';
import { useAppDispatcher, useAppSelector } from '../../redux/hooks';
import { init, updateVacation } from '../../redux/vacation-slice';
import Spinner from '../common/spinner/Spinner';
import SpinnerButton from '../common/spinner-button/SpinnerButton';

// Form type with string dates for HTML input
type VacationFormValues = {
    destination: string;
    description: string;
    startedAt: string; // string for <input type="date">
    endedAt: string;   // string for <input type="date">
    price: number;
    image: File;
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
            image: undefined
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReady, setIsReady] = useState(false);

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
            image: vacation.image
        };

        reset(draft);
        setIsReady(true);
    }, [vacation, reset]);

    // Convert string dates back to Date before submitting
    async function submit(formValues: VacationFormValues) {
        const draft: VacationDraft = {
            ...formValues,
            startedAt: new Date(formValues.startedAt),
            endedAt: new Date(formValues.endedAt),
            likes: vacation!.likes
        };

        try {
            setIsSubmitting(true);
            const updatedVacation = await vacationService.updateVacation(id!, draft);
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

                <input type="file" {...register('image')}/>
                    <div className='formError'>{formState.errors.image?.message}</div>

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




// import { useNavigate, useParams } from 'react-router-dom';
// import './EditVacation.css';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import useService from '../../hooks/use-service';
// import VacationService from '../../services/auth-aware/VacationService';
// import type VacationDraft from '../../models/vacation-draft';
// import { useAppDispatcher, useAppSelector } from '../../redux/hooks';
// import { init } from '../../redux/vacation-slice';
// import Spinner from '../common/spinner/Spinner';
// import SpinnerButton from '../common/spinner-button/SpinnerButton';

// export default function EditVacation() {
//   const { id } = useParams<'id'>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatcher();
//   const vacationService = useService(VacationService);

//   // Get vacation from Redux
//   const vacation = useAppSelector(state =>
//     state.vacationSlice.vacations.find(v => v.id === id)
//   );

//   const { register, handleSubmit, reset, formState } = useForm<VacationDraft>({
//     defaultValues: {
//       destination: '',
//       description: '',
//       startedAt: new Date(),
//       endedAt: new Date(),
//       price: 0,
//       imageUrl: ''
//     }
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isReady, setIsReady] = useState(false);

//   // Fetch vacations if not loaded yet
//   useEffect(() => {
//     if (!vacation) {
//       vacationService.getAllVacations().then(vacationsFromServer => {
//         dispatch(init(vacationsFromServer));
//       });
//     }
//   }, [vacation, vacationService, dispatch]);

//   // Reset form when vacation is ready
//   useEffect(() => {
//     if (!vacation) return;

//     const draft = {
//       description: vacation.description,
//       destination: vacation.destination,
//       startedAt: new Date(vacation.startedAt).toISOString().split('T')[0],
//       endedAt: new Date(vacation.endedAt).toISOString().split('T')[0],
//       price: vacation.price,
//       imageUrl: vacation.imageUrl
//     };

//     reset(draft);
//     setIsReady(true);
//   }, [vacation, reset]);

//   async function submit(draft: VacationDraft) {
//     try {
//       setIsSubmitting(true);
//       await vacationService.updateVacation(id!, draft);
//       navigate('/vacations');
//     } catch (e) {
//       alert(e);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className='EditVacation'>
//       {!isReady && <Spinner />}

//       {isReady && (
//         <form onSubmit={handleSubmit(submit)}>
//           <input
//             placeholder='add destination'
//             {...register('destination', {
//               required: { value: true, message: 'destination is required' },
//               minLength: { value: 2, message: 'Title must be at least 2 characters long' }
//             })}
//           />
//           <div className='formError'>{formState.errors.destination?.message}</div>

//           <textarea
//             placeholder='add description'
//             {...register('description', {
//               required: { value: true, message: 'vacation description is required' },
//               minLength: { value: 10, message: 'vacation description must be at least 10 characters long' }
//             })}
//           ></textarea>
//           <div className='formError'>{formState.errors.description?.message}</div>

//           <input
//             type='date'
//             {...register('startedAt', { required: { value: true, message: 'start is required' } })}
//           />
//           <div className='formError'>{formState.errors.startedAt?.message}</div>

//           <input
//             type='date'
//             {...register('endedAt', { required: { value: true, message: 'end is required' } })}
//           />
//           <div className='formError'>{formState.errors.endedAt?.message}</div>

//           <input
//             type='float'
//             {...register('price', {
//               required: { value: true, message: 'price is required' },
//               min: { value: 0, message: 'price must be positive' }
//             })}
//           />
//           <div className='formError'>{formState.errors.price?.message}</div>

//           <input type='url' {...register('imageUrl')} />
//           <div className='formError'>{formState.errors.imageUrl?.message}</div>

//           <SpinnerButton
//             buttonText='Update Vacation'
//             loadingText='updating vacation'
//             isSubmitting={isSubmitting}
//           />
//         </form>
//       )}
//     </div>
//   );
// }


// import { useNavigate, useParams } from 'react-router-dom';
// import './EditVacation.css';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import useService from '../../hooks/use-service';
// import VacationService from '../../services/auth-aware/VacationService';
// import type VacationDraft from '../../models/vacation-draft';
// import { useAppDispatcher, useAppSelector } from '../../redux/hooks';
// import { init } from '../../redux/vacation-slice';
// import Spinner from '../common/spinner/Spinner';
// import SpinnerButton from '../common/spinner-button/SpinnerButton';

// export default function EditVacation() {

//     const vacationService = useService(VacationService);

//     const { id } = useParams<'id'>();

//     const { register, handleSubmit, reset, formState } = useForm<VacationDraft>({
//         defaultValues: {
//             destination: "",
//             description: "",
//             startedAt: undefined,
//             endedAt: undefined,
//             price: 0,
//             imageUrl: ""
//         }
//     });
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [isReady, setIsReady] = useState<boolean>(false);

//     const vacation = useAppSelector(state => state.vacationSlice.vacations.find(v => v.id === id));
//     const dispatch = useAppDispatcher();

//     const navigate = useNavigate();

//     useEffect(() => {
//         (async () => {
//             // const post = await profileService.getPost(id!)
//             if (!vacation) {
//                 // const vacationsFromServer = await vacationService.getAllVacations();
//                 // dispatch(init(vacationsFromServer));
//                 return;
//             } else {
//                 const { description, destination, startedAt, endedAt, price, imageUrl } = vacation;
//                 // const draft = { description, destination, startedAt, endedAt, price, imageUrl };
//                 const draft = {
//                     description,
//                     destination,
//                     startedAt: new Date(startedAt).toISOString().split('T')[0],
//                     endedAt: new Date(endedAt).toISOString().split('T')[0],
//                     price,
//                     imageUrl
//                 };

//                 reset(draft);
//                 setIsReady(true);
//             }
//         })();

//     }, [dispatch, id, vacation, reset, vacationService]);

//     async function submit(draft: VacationDraft) {
//         try {
//             setIsSubmitting(true);
//             await vacationService.updateVacation(id!, draft);
//             navigate('/vacations');
//         } catch (e) {
//             alert(e);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }

//     return (
//         <div className='EditVacation'>

//             {!isReady && <Spinner />}

//             {isReady && <>
//                 <form onSubmit={handleSubmit(submit)}>
//                     <input placeholder="add destination" {...register('destination', {
//                         required: {
//                             value: true,
//                             message: 'destination is required'
//                         },
//                         minLength: {
//                             value: 2,
//                             message: 'Title must be at least 2 characters long'
//                         }
//                     })} />
//                     <div className='formError'>{formState.errors.destination?.message}</div>

//                     <textarea placeholder='add description' {...register('description', {
//                         required: {
//                             value: true,
//                             message: 'vacation description is required'
//                         },
//                         minLength: {
//                             value: 10,
//                             message: 'vacation description  must be at least 10 characters long'
//                         }
//                     })}></textarea>
//                     <div className='formError'>{formState.errors.description?.message}</div>


//                     <input type='date' {...register('startedAt', {
//                         required: {
//                             value: true,
//                             message: 'start is required'
//                         }
//                     })}></input>
//                     <div className='formError'>{formState.errors.startedAt?.message}</div>


//                     <input type='date' {...register('endedAt', {
//                         required: {
//                             value: true,
//                             message: 'end is required'
//                         }
//                     })}></input>
//                     <div className='formError'>{formState.errors.endedAt?.message}</div>


//                     <input type='number' {...register('price', {
//                         required: {
//                             value: true,
//                             message: 'price is required'
//                         }, min: {
//                             value: 0,
//                             message: 'price must be positive'
//                         }
//                     })}></input>
//                     <div className='formError'>{formState.errors.price?.message}</div>

//                     <input type='url' {...register('imageUrl')}></input>
//                     <div className='formError'>{formState.errors.imageUrl?.message}</div>


//                     <SpinnerButton
//                         buttonText='Update Vacation'
//                         loadingText='updating vacation'
//                         isSubmitting={isSubmitting}
//                     />
//                 </form>
//             </>}

//         </div>
//     );
// }
