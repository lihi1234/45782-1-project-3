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
import useUserRole from '../../hooks/use-user-role';


export default function VacationsPage() {

    useTitle('Vacation');

    const vacationService = useService(VacationService);

    const newVacation = useAppSelector(state => state.vacationSlice.newVacation);
    const vacationsPage = useAppSelector(state => state.vacationSlice.vacations);
    const dispatch = useAppDispatcher();
    // console.log(useAppSelector(state => state))

      const userRole= useUserRole();
       

    useEffect(() => {
        (async () => {
            try {
                
                if (vacationsPage.length === 0) {
                    const vacationFromServer = await vacationService.getAllVacations();
                    // console.log(vacationFromServer)
                    dispatch(init(vacationFromServer));
                }
                
            } catch (e) {
                alert(e);
            }
        })();
    }, [dispatch, vacationService, vacationsPage]);

    useEffect(() => {
        if (newVacation) {
            setTimeout(() => {
                dispatch(vacationAged());
            }, 2000);
        }
    }, [dispatch, newVacation]);

    return (
        <div className='VacationPage'>
     
                {vacationsPage.map(vacation => <Vacation
                    key={vacation.id}
                    vacation={vacation}
                    isEditAllowed={    userRole==='admin'}
                />)}
            {/* </>} */}
             {vacationsPage.length === 0 && <Spinner />}
        </div>
    );
}