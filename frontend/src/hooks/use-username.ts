import { useContext, useMemo } from "react";
import AuthContext from "../components/auth/auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function useUsername() {
    const authContext = useContext(AuthContext);

    const firstName = useMemo(() => {
        const { firstName } = jwtDecode<{ firstName: string }>(authContext!.jwt);
        return firstName;
    }, [authContext]);

    return firstName;

}