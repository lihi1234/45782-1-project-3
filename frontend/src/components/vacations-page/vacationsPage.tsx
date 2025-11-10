import { useEffect } from 'react';
import './vacationsPage.css';
import useTitle from '../../hooks/use-title';
import useService from '../../hooks/use-service';
import VacationService from '../../services/auth-aware/VacationService';
import { useAppDispatcher, useAppSelector } from '../../redux/hooks';
// import { init } from '../../redux/followers-slice';
import Spinner from '../common/spinner/Spinner';
import { init, vacationAged } from '../../redux/vacation-slice';
import Vacation from '../vacation/vacation';
// import Vacation from '../../models/vacation'
// import Post from '../post/Post';
// // import NewPost from '../new/NewPost';
// import Spinner from '../../../common/spinner/Spinner';
// import useTitle from '../../../hooks/use-title';
// import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
// import { init, postAged } from '../../../redux/profile-slice';
// import useService from '../../../hooks/use-service';
// import ProfileService from '../../../services/auth-aware/ProfileService';

export default function VacationsPage() {

    useTitle('Vacation');

    const vacationService = useService(VacationService);

    const newVacation = useAppSelector(state => state.vacationSlice.newVacation);
    const vacationsPage = useAppSelector(state => state.vacationSlice.vacations);
    const dispatch = useAppDispatcher();

    useEffect(() => {
        (async () => {
            try {
                if(vacationsPage){
                if (vacationsPage.length === 0) {
                    const vacationFromServer = await vacationService.getAllVacations();
                    dispatch(init(vacationFromServer));
                }
                }
            } catch (e) {
                alert(e);
            }
        })();
    }, [dispatch, vacationsPage.length]);

    useEffect(() => {
        if (newVacation) {
            setTimeout(() => {
                dispatch(vacationAged());
            }, 2000);
        }
    }, [dispatch, newVacation]);

    return (
        <div className='VacationPage'>
            {/* {vacationsPage.length > 0 && <>
                <NewPost />
                {newPost && <Post
                    key={newPost.id}
                    post={newPost}
                    isEditAllowed={true}
                    isNew={true}
                />} */}
                {vacationsPage.map(vacation => <Vacation
                    key={vacation.id}
                    vacation={vacation}
                    isEditAllowed={false}
                />)}
            {/* </>} */}
             {vacationsPage.length === 0 && <Spinner />}
        </div>
    );
}