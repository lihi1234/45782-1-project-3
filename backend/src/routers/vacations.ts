import { Router } from "express";
// import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import validation from "../middlewares/validation";
// import { getPostValidator, newPostValidator, updatePostValidator } from "../controllers/profile/validator";
import paramValidation from "../middlewares/param-validation";
import enforceAuth from "../middlewares/enforce-auth";
import { createVacation, deleteVacation, getAllVacations, updateVacation } from "../controllers/vacations/controller";
import { newVacationValidator, updateVacationValidator , newPostImageValidator} from "../controllers/vacations/validator";
import fileUploader from "../middlewares/file-uploader";
import fileValidation from "../middlewares/file-validation";

const router = Router()

router.get('/', getAllVacations)
router.delete('/:id', deleteVacation)
//  validation(newVacationValidator), fileValidation(newPostImageValidator) 
router.post('/', fileUploader, createVacation)
// router.post('/',validation(newVacationValidator), createVacation)
router.patch('/:id', validation(updateVacationValidator),updateVacation)



export default router