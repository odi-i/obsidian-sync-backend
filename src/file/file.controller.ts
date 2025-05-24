import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.createFile(createFileDto);
  }

  @Patch(':vaultId/modify-content')
  update(
    @Param('vaultId') vaultId: string,
    @Body() updateFileDto: UpdateFileDto,
  ) {
    return this.fileService.modifyContent(vaultId, updateFileDto);
  }

  @Patch(':vaultId/rename')
  rename(
    @Param('vaultId') vaultId: string,
    @Body() updateFileDto: RenameFileDto,
  ) {
    return this.fileService.rename(vaultId, updateFileDto);
  }

  @Delete(':path')
  remove(@Param('path') path: string, @Headers('vault-id') vaultId: string) {
    const decodedPath = decodeURIComponent(path);

    return this.fileService.remove(decodedPath, vaultId);
  }
}
