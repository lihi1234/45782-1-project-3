import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Like from "../../models/Likes";
import Vacation from "../../models/Vacation";

export async function newLike(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {

    try {

        const { vacationId } = req.params
        const { userId } = req
        const newLike = await Like.create({ ...req.body })
        await newLike.reload({
            include: [User, Vacation]
        })
        res.json(newLike)
    } catch (e) {
        next(e)
    }

}