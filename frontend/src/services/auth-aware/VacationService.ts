import type VacationDraft from "../../models/vacation-draft";
import type Vacation from "../../models/vacation";
import AuthAware from "./AuthAware";
// import type Like from "../../models/like";
import type { VacationFormValues } from "../../components/edit/EditVacation";

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
    
   

    async updateVacation(id: string, formValues: VacationFormValues): Promise<Vacation> {
    const formData = new FormData();

    formData.append("destination", formValues.destination);
    formData.append("description", formValues.description);
    formData.append("startedAt", formValues.startedAt);
    formData.append("endedAt", formValues.endedAt);
    formData.append("price", String(formValues.price));

    // רק אם המשתמש העלה תמונה חדשה
    if (formValues.image && formValues.image[0]) {
        formData.append("image", formValues.image[0]);
    }

    const response = await this.axiosInstance.put<Vacation>(
        `/vacations/${id}`,
        formData
        // לא צריך headers – axios יודע לבד שזה FormData
    );

    return response.data;
}

}