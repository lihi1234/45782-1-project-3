
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import config from "config";
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";

declare global {
  namespace Express {
    interface Request {
      imageUrl?: string;
    }
  }
}

export default async function fileUploader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    if (!req.files || !req.files.image) {
      return next(); // אין תמונה – ממשיכים הלאה, בלי imageUrl
    }

    const { mimetype, data, name } = req.files.image as UploadedFile;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: config.get<string>("s3.bucket"),
        Key: `${randomUUID()}${extname(name)}`,
        ContentType: mimetype,
        Body: data,
      },
    });

    const result: any = await upload.done();

    // נשמור את ה-URL המלא – הכי נוח לפרונט
    req.imageUrl = result.Location as string;

    return next();
  } catch (err) {
    console.error("fileUploader error:", err);
    return next(err);
  }
}
