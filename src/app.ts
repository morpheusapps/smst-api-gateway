import { Module } from '@nestjs/common';
import { GlobalErrorHandlerModule } from './domain/error';
import { HealthModule } from './domain/health';
import { AuthModule } from './domain/auth';

@Module({
  imports: [GlobalErrorHandlerModule, HealthModule, AuthModule]
})
export class ApplicationModule {}
