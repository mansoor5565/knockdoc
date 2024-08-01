import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationError,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Doctor } from "src/doctor/doctor.entity";
import { ImageUploadDto } from "./dto/image-upload.dto";
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeneralService {
  constructor(
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      // Define the destination folder and file name
      const uploadFolder = './uploads';
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
      }

      // Generate a unique file name
      const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
      const fileExtension = path.extname(file.originalname);
      const uniqueFileName = `${uniqueSuffix}${fileExtension}`;
      const filePath = path.join(uploadFolder, uniqueFileName);

      // Save the file locally
      fs.writeFileSync(filePath, file.buffer);

      // Alternatively, you could upload the file to cloud storage here

      // Return the file path or URL
      return uniqueFileName; // Or return the URL if uploaded to cloud storage
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }


}
