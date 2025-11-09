import type Like from "./like";
import type Signup from "./signup";



export default interface User extends Signup {
    id: string,
    vacationLiked: Like[]
}