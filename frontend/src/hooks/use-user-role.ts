import { useContext, useMemo } from "react";
import AuthContext from "../components/auth/auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function useUserRole() {
    const authContext = useContext(AuthContext);

    const role = useMemo(() => {
        const { role } = jwtDecode<{ role: string }>(authContext!.jwt);
        return role;
    }, [authContext]);

    return role;

}