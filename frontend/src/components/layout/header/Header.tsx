import { NavLink } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import AuthContext from '../../auth/auth/AuthContext';
import useUsername from '../../../hooks/use-username';

export default function Header() {
    const authContext = useContext(AuthContext);

    const firstName = useUsername();

    function logout() {
        authContext?.newJwt('');
    }

    return (
        <div className='Header'>
            <div className='title'>Book-king</div>
            <nav>
                <NavLink to="/vacations">Vacations</NavLink> |
                 {/* <NavLink to="/feed">Feed</NavLink> */}

            </nav>
            <div>
                welcome {firstName} | <button onClick={logout}>logout</button>
            </div>
        </div>
    );
}