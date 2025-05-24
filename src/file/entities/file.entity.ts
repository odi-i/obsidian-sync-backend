import { Vault } from 'src/vault/entities/vault.entity';

export class File {
  id: string;
  path: string;
  content: string;
  timestamp: Date;
  vaultId: Vault;

  updatedAt: Date;
}
