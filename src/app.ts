import { Module } from '@nestjs/common';
import { GlobalErrorHandlerModule } from './domain/error';
import { HealthModule } from './domain/health';

@Module({
  imports: [GlobalErrorHandlerModule, HealthModule]
})
export class ApplicationModule {}
