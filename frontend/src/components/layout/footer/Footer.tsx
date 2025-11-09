import './Footer.css';
import useUsername from '../../../hooks/use-username';

export default function Footer() {

    const firstName = useUsername();

    return (
        <div className='Footer'>
            (c) copyrights Book king | you are {firstName} |Server address: {import.meta.env.VITE_REST_SERVER_URL}
        </div>
    );
}