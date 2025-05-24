import { PickType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsNotEmpty } from 'class-validator';

export class RenameFileDto extends PickType(CreateFileDto, ['path']) {
  @IsNotEmpty()
  newPath: string;
}
