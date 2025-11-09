import type User from "./user"
import type Vacation from "./vacation-draft"


export default interface Like {
  user:User,
  vacation: Vacation
};