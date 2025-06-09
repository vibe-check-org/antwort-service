import { Antwort } from '../../antwort/model/entity/antwort.entity.js';
import { DbPopulateService } from './db-populate.service.js';
import { DevController } from './dev.controller.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Antwort])],
    controllers: [DevController],
    providers: [DbPopulateService],
    exports: [DbPopulateService],
})
export class DevModule {}
