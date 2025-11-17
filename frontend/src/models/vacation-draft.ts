import type Like from "./like"


export default interface VacationDraft  {
    image: File
    startedAt: Date,
    endedAt: Date,
    destination: string,
    description: string,
    price: number,
    likes: Like[]
}