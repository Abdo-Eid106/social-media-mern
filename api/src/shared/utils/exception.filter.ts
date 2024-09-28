import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const contextType = host.getType();

    if (contextType === 'http') {
      const response = host.switchToHttp().getResponse();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        message: `${status}`.startsWith('4')
          ? exception.message
          : 'something went wrong',
      });
    } else {
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(
        {
          statusCode: status,
          message: `${status}`.startsWith('4')
            ? exception.message
            : 'something went wrong',
          error: exception.name,
        },
        status,
      );
    }
  }
}
