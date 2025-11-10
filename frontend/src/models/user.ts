import type Like from "./like";
import type { Role } from "./signup";
import type Signup from "./signup";



export default interface User extends Signup {
    id: string,
    vacationLiked: Like[],
     role: Role
}