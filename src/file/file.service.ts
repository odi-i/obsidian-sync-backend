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
    const existing = await this.prisma.file.findUnique({
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
        timestamp: new Date(),
      } as Prisma.FileUncheckedCreateInput,
    });
  }

  async modifyContent(vaultId: string, { path, content }: UpdateFileDto) {
    return await this.prisma.file.update({
      where: {
        vaultId,
        path,
      },
      data: {
        content,
        timestamp: new Date(),
      },
    });
  }

  async rename(vaultId: string, { path, newPath }: RenameFileDto) {
    return await this.prisma.file.update({
      where: {
        vaultId,
        path,
      },
      data: {
        path: newPath,
        timestamp: new Date(),
      },
    });
  }

  async remove(path: string, vaultId: string) {
    return await this.prisma.file.delete({
      where: {
        vaultId,
        path,
      },
    });
  }
}
