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

// export async function createVacation(req: Request, res: Response, next: NextFunction) {

//     // const upload = multer({
//     //     storage: multer.diskStorage({
//     //         destination: "uploads",
//     //         filename: (req, file, cb) => {
//     //             const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     //             const ext = path.extname(file.originalname);
//     //             cb(null, uniqueSuffix + ext);
//     //         },
//     //     }),
//     // });


//     // upload.single("image"), // השם "image" חייב להתאים ל-name של ה-input בצד לקוח
//         async (req, res, next) => {
//             try {
//                 const { destination, description, startedAt, endedAt, price } = req.body;

//                 let imageUrl: string | null = null;
//                 if (req.file) {
//                     // אם את רוצה URL יחסי:
//                     imageUrl = `/uploads/${req.file.filename}`;
//                 }

//                 const vacation = await Vacation.create({
//                     destination,
//                     description,
//                     startedAt,
//                     endedAt,
//                     price,
//                     imageUrl, // נשמר ב-DB
//                 });

//                 res.status(201).json(vacation);
//             } catch (e) {
//                 next(e);
//             }
//         }

//     // try {
//     //     const newVacation = await Vacation.create({ ...req.body })
//     //     // await newVacation.reload(postIncludes)
//     //     res.json(newVacation)
//     // } catch (e) {
//     //     next(e)
//     // }
// }

export async function updateVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findByPk(req.params.id);
        if (!vacation) {
            return res.status(404).json({ error: 'Vacation not found' });
        }
        const { destination, description, imageUrl, price, endedAt, startedAt } = req.body
        vacation.destination = destination
        vacation.description = description
        vacation.startedAt = startedAt
        vacation.endedAt = endedAt
        vacation.price = price
        vacation.imageUrl = imageUrl

        await vacation.save()
        res.json(vacation)
    } catch (e) {
        next(e)
    }
}

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



