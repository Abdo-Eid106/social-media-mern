import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  exceptionFactory: (errors: ValidationError[]) => {
    const firstErrorMessage = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat()[0];
    return new BadRequestException(firstErrorMessage);
  },
});
