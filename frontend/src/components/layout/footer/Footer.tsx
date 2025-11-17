import './Footer.css';
import useUsername from '../../../hooks/use-user-role';

export default function Footer() {
    const firstName = useUsername();

    return (
        <div className="Footer">
            <span>© Book King</span>
            <span>You are: {firstName}</span>
            <span>Server: {import.meta.env.VITE_REST_SERVER_URL}</span>
        </div>
    );
}
