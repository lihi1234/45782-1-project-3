import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacation";
import Like from "../../models/Likes";




export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({ include: [Like] })
        res.json(vacations)
    } catch (e) {
        next(e)
    }
}

export async function createVacation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("INSIDE createVacation, BODY:", req.body);
    console.log("INSIDE createVacation, imageUrl:", req.imageUrl);

    const { destination, description, startedAt, endedAt, price } = req.body;

    const imageUrl = req.imageUrl ?? null;

    const vacation = await Vacation.create({
      destination,
      description,
      startedAt,
      endedAt,
      price,
      imageUrl,
    });

    // ⬅⬅⬅ הכי חשוב – פה הבקשה מסתיימת
    return res.status(201).json(vacation);
  } catch (e) {
    next(e);
  }
}



export async function updateVacation(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);

    if (!vacation) {
      return res.status(404).json({ error: "Vacation not found" });
    }

    // מגיעים מה-body (אם זה לא multipart עם קובץ)
    const { destination, description, imageUrl, price, endedAt, startedAt } = req.body;

    // מגיע מה-fileUploader אם הועלה קובץ
    const uploadedImageUrl = (req as any).imageUrl;

    // נעדיף את מה שהגיע מה-upload, ואם אין – מה-body
    const finalImageUrl = uploadedImageUrl ?? imageUrl;

    console.log("body.imageUrl:", imageUrl);
    console.log("req.imageUrl (from upload):", uploadedImageUrl);
    console.log("finalImageUrl:", finalImageUrl);

    if (destination !== undefined) {
      vacation.destination = destination;
    }

    if (description !== undefined) {
      vacation.description = description;
    }

    if (startedAt !== undefined) {
      vacation.startedAt = new Date(startedAt);
    }

    if (endedAt !== undefined) {
      vacation.endedAt = new Date(endedAt);
    }

    if (price !== undefined) {
      vacation.price = price;
    }

    if (finalImageUrl !== undefined) {
      vacation.imageUrl = finalImageUrl;
    }

    console.log("after vacation.imageUrl:", vacation.imageUrl);
    console.log("changed imageUrl?", vacation.changed("imageUrl"));

    await vacation.save();
    return res.json(vacation);
  } catch (e) {
    next(e);
  }
}
// export async function updateVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
//     try {
//         const vacation = await Vacation.findByPk(req.params.id);
//         if (!vacation) {
//             return res.status(404).json({ error: 'Vacation not found' });
//         }
//         const { destination, description, imageUrl, price, endedAt, startedAt } = req.body
//         vacation.destination = destination
//         vacation.description = description
//         vacation.startedAt = startedAt
//         vacation.endedAt = endedAt
//         vacation.price = price
//         vacation.imageUrl = imageUrl

//         await vacation.save()
//         res.json(vacation)
//     } catch (e) {
//         next(e)
//     }
// }

export async function deleteVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const deletedRows = await Vacation.destroy({ where: { id } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ success: true })
    } catch (e) {
        next(e)
    }
}



