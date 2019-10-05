import { Module, Global } from '@nestjs/common';
import { GlobalErrorHandler } from './GlobalErrorHandler';

@Global()
@Module({
  imports: [],
  providers: [GlobalErrorHandler],
  exports: [GlobalErrorHandler]
})
export class GlobalErrorHandlerModule {}

export { GlobalErrorHandler } from './GlobalErrorHandler';
