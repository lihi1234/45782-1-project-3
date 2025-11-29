import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Like from "../../models/Likes";
import Vacation from "../../models/Vacation";




interface NewLikeBody {
  userId: string;
  vacationId: string;
}

export async function newLike(
  req: Request<NewLikeBody>,
  res: Response,
  next: NextFunction
) {
  try {
    // console.log("req.body in /likes/add:", req.body);

    const { userId, vacationId } = req.body;

    if (!userId || !vacationId) {
      return res
        .status(400)
        .json({ message: "userId and vacationId are required" });
    }

    const newLike = await Like.create({
      userId,
      vacationId,
    });

    // await newLike.reload({
    //   include: [User, Vacation],
    // });

    return res.status(201).json(newLike);
  } catch (e) {
    next(e);
  }
}


export async function deleteLike(req: Request<NewLikeBody>, res: Response, next: NextFunction) {

     try {
            // const { id } = req.params
                const { userId, vacationId } = req.body;

            const deletedRows = await Like.destroy({ where: {userId, vacationId } })
            if (deletedRows === 0) return next({
                status: 404,
                message: 'yo bro, da racord u wana dalete as not yar'
            })
            res.json({ success: true })
        } catch (e) {
            next(e)
        }

}

export async function getAllUsers(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {

    try {
            const users = await User.findAll()
            res.json(users)
        } catch (e) {
            next(e)
        }

}