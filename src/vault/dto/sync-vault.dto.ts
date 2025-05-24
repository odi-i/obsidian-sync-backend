import { File } from '../../file/entities/file.entity';

export class SyncVaultDto {
  files: Pick<File, 'path' | 'content'>[];
}
