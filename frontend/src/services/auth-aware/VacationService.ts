import type VacationDraft from "../../models/vacation-draft";
import type Vacation from "../../models/vacation";
import AuthAware from "./AuthAware";
import type Like from "../../models/like";

export default class VacationService extends AuthAware {

    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`/vacations`);
        return response.data;
    }

    async delete(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete(`/vacations/${id}`);
        return response.data;
    }


    
async newVacation(draft: VacationDraft): Promise<Vacation> {
  const formData = new FormData();

  formData.append("destination", draft.destination);
  formData.append("description", draft.description);
  formData.append("startedAt", draft.startedAt.toString());
  formData.append("endedAt", draft.endedAt.toString());
  formData.append("price", String(draft.price));

  const fileList = draft.image as unknown as FileList | undefined;
  if (fileList && fileList[0]) {
    formData.append("image", fileList[0]); // חייב להיות "image"
  }

  const response = await this.axiosInstance.post<Vacation>(
    "/vacations",
    formData
    // בלי headers – axios מזהה FormData לבד
  );

  return response.data;
}
    // async newVacation(draft: VacationDraft): Promise<Vacation> {
    //     const response = await this.axiosInstance.post<Vacation>(`/vacations`, draft, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     return response.data;
    // }
    async toggleLike(vacationId: string) {
        const response = await this.axiosInstance.post<Like>(`/vacations/${vacationId}/like`);
        return response.data;
    }

    // async getPost(id: string): Promise<Post> {
    //     const response = await this.axiosInstance<Post>(`/profile/${id}`);
    //     return response.data;
    // }

    async updateVacation(id: string, draft: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.patch<Vacation>(`/vacations/${id}`, draft);
        return response.data;
    }
}