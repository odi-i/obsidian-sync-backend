import { PickType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PickType(CreateFileDto, [
  'path',
  'content',
]) {}
