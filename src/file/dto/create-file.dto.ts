import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  vaultId: string;

  @IsNotEmpty()
  path: string;

  content?: string;
}
