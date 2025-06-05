import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RenameFileDto } from './dto/rename-file.dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async createFile({ vaultId, path }: CreateFileDto) {
    const existing = await this.prisma.file.findFirst({
      where: {
        vaultId,
        path,
      },
    });

    if (existing) {
      throw new ConflictException('File already exists');
    }

    return this.prisma.file.create({
      data: {
        path,
        vaultId,
      } as Prisma.FileUncheckedCreateInput,
    });
  }

  async modifyContent(vaultId: string, { path, content }: UpdateFileDto) {
    return this.prisma.file.updateMany({
      where: {
        vaultId,
        path,
      },
      data: {
        content,
      },
    });
  }

  async rename(vaultId: string, { path, newPath }: RenameFileDto) {
    return this.prisma.file.updateMany({
      where: {
        vaultId,
        path,
      },
      data: {
        path: newPath,
      },
    });
  }

  async remove(path: string, vaultId: string) {
    return this.prisma.file.deleteMany({
      where: {
        vaultId,
        path,
      },
    });
  }
}
