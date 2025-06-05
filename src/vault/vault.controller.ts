import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
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

  @Get(':vaultId/files')
  async getVaultFiles(
    @Param('vaultId') vaultId: string,
    @Query('since') since: Date,
  ) {
    return this.vaultService.getVaultFiles(vaultId, since);
  }

  @Post(':vaultId/files')
  async syncVaultFiles(
    @Param('vaultId') vaultId: string,
    @Body() body: SyncVaultDto,
  ) {
    return this.vaultService.syncFilesToVault(vaultId, body.files);
  }
}
