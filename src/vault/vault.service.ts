import { Injectable } from '@nestjs/common';
import { SyncVaultDto } from './dto/sync-vault.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';

@Injectable()
export class VaultService {
  constructor(private prisma: PrismaService) {}

  async handleVaultInitialization(createVaultInput: CreateVaultDto) {
    const { email } = createVaultInput;

    const existingVault = await this.prisma.vault.findUnique({
      where: { email },
    });

    if (existingVault) {
      return {
        status: 'existing',
        id: existingVault.id,
      };
    }

    const newVault = await this.prisma.vault.create({
      data: { email },
    });

    return {
      status: 'created',
      id: newVault.id,
    };
  }

  async getVaultFiles(vaultId: string, since: Date) {
    const files = await this.prisma.file.findMany({
      where: {
        vaultId,
        updatedAt: {
          gte: since,
        },
      },
      select: { path: true, content: true },
    });

    return { files, serverTimestampNow: new Date() };
  }

  async syncFilesToVault(vaultId: string, files: SyncVaultDto['files']) {
    await this.prisma.$transaction([
      this.prisma.file.deleteMany({ where: { vaultId } }),
      this.prisma.file.createMany({
        data: files.map((file) => ({
          vaultId,
          path: file.path,
          content: file.content,
        })),
      }),
    ]);

    return { success: true, fileCount: files.length };
  }
}
