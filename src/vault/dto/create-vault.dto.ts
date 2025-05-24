import { IsEmail } from 'class-validator';

export class CreateVaultDto {
  @IsEmail()
  email: string;
}
