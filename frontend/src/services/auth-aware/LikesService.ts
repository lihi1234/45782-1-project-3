import AuthAware from "./AuthAware";
// import type User from "../../models/user";
import type Like from "../../models/like";
import type User from "../../models/user";

export default class LikesService extends AuthAware {

    async add(like: Like): Promise<boolean> {
        console.log(like)
        const { data } = await this.axiosInstance.post<boolean>(`/likes/add/`, like);
        return data;
    }

     async remove(like: Like): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/likes/remove/`, like);
        return data;
    }

    async getAllUsers(): Promise<User[]> {
            const response = await this.axiosInstance.get<User[]>(`/likes/users`);
            return response.data;
        }

    

}
