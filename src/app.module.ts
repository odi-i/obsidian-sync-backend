import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileModule } from './file/file.module';
import { VaultModule } from './vault/vault.module';

@Module({
  imports: [FileModule, VaultModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
