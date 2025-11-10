import { useNavigate } from 'react-router-dom';
import './vacation.css';
import { useAppDispatcher } from '../../redux/hooks'
import {deleteVacation } from '../../redux/vacation-slice';
import type VacationModel from '../../models/vacation';
import useService from '../../hooks/use-service';

import VacationService from '../../services/auth-aware/VacationService';

interface VacationProps {
    vacation: VacationModel,
    isEditAllowed: boolean,
    isNew?: boolean
}

export default function Vacation(props: VacationProps) {

    const {
        id,
        destination,
        description,
        startedAt,
        endedAt,
        price,
        imageUrl,
        userLikes
    } = props.vacation;

    const { isEditAllowed, isNew } = props;

    const navigate = useNavigate();

    const dispatch = useAppDispatcher();

    const vacationService = useService(VacationService)

    async function removeMe() {
        try {
            if (confirm('are you sure?')) {
                await vacationService.delete(id);
                dispatch(deleteVacation(id));
            }
        } catch (e) {
            alert(e);
        }
    }

    function editMe() {
        navigate(`/profile/edit/${id}`);
    }

    const className = `Vacation ${isNew ? 'new-vacation' : ''}`;

    return (
        <div className={className}>
            <div><h3>{destination}</h3></div>
                       <div>{userLikes.length}</div>

            <div>{(new Date(startedAt)).toLocaleDateString()} to {(new Date(endedAt)).toLocaleDateString()}</div>
            <div>{description}</div>
            <div>{price}</div>
            {imageUrl && <div><img src={imageUrl} /></div>}
            {/* conditional rendering (render something depending on a boolean value):  */}
            {isEditAllowed && <div>
                <button onClick={removeMe}>Delete</button><button onClick={editMe}>Edit</button>
            </div>}



        </div>
    );
}

