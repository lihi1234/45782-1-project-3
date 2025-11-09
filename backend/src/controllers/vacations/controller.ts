import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacation";
import Like from "../../models/Likes";


export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({include: [Like]})
        res.json(vacations)
    } catch (e) {
        next(e)
    }
}

export async function createVacation(req: Request, res: Response, next: NextFunction) {

    try {
        const newVacation = await Vacation.create({ ...req.body })
        // await newVacation.reload(postIncludes)
        res.json(newVacation)
    } catch (e) {
        next(e)
    }
}

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