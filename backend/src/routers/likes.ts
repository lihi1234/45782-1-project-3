import { Router } from "express";
import { deleteLike, getAllUsers, newLike } from "../controllers/likes/controller";


const router = Router()

router.post('/add', newLike)
router.post('/remove', deleteLike)
router.get('/users', getAllUsers)

export default router