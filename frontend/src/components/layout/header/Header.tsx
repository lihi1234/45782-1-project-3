import { NavLink } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import AuthContext from '../../auth/auth/AuthContext';
import useUsername from '../../../hooks/use-user-role';
import useUserRole from '../../../hooks/use-user-role';

export default function Header() {
    const authContext = useContext(AuthContext);
    const role = useUserRole();
    const firstName = useUsername();

    function logout() {
        authContext?.newJwt('');
    }

    return (
        <div className='Header'>
            <div className='title'>Book-king</div>
            <nav>
                <NavLink to="/vacations">Vacations</NavLink> |
                {role=='admin'&&<NavLink to="/new-vacation">Add vacation</NavLink>} |
                {/* {role=='admin'&&<NavLink to="/vacations/edit/:id">Edit vacation</NavLink>} | */}
                {role=='admin'&&<NavLink to="/report">Reports</NavLink>} 




            </nav>
            <div>
                welcome {firstName} | <button onClick={logout}>logout</button>
            </div>
        </div>
    );
}