import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { SyncVaultDto } from './dto/sync-vault.dto';

@Controller('vaults')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post()
  async create(@Body() createVaultInput: CreateVaultDto) {
    return this.vaultService.handleVaultInitialization(createVaultInput);
  }

  @Get(':id/files')
  async getVaultFiles(@Param('id') id: string) {
    return this.vaultService.getVaultFiles(id);
  }

  @Post(':id/files')
  async syncVaultFiles(
    @Param('id') id: string,
    @Body()
    body: SyncVaultDto,
  ) {
    return this.vaultService.syncFilesToVault(id, body.files);
  }
}
