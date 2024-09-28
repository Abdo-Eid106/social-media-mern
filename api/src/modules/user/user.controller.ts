import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CloudinaryService } from 'src/shared/upload/cloudinary.service';
import { UserService } from './user.service';
import { currentUser } from 'src/shared/decorators/current-user.decorator';
import { IPayloud } from 'src/shared/interfaces/payloud.interface';

@Controller()
export class UserController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
  ) {}

  @Post('profilephoto')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user: IPayloud,
  ) {
    if (!file) throw new BadRequestException('File is required');
    const photo = await this.cloudinaryService.uploadImage(file);
    await this.userService.update(user.id, { profilePhoto: photo.url });
    return photo;
  }

  @Post('coverphoto')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCoverPhoto(
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user: IPayloud,
  ) {
    if (!file) throw new BadRequestException('File is required');
    const photo = await this.cloudinaryService.uploadImage(file);
    await this.userService.update(user.id, { coverPhoto: photo.url });
    return photo;
  }
}
