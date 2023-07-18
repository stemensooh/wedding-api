import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log('exception', exception.getResponse());

    return response.status(status).send(exception.getResponse());
    // response
    //   .status(status)
    //   .send({
    //     statusCode: status,
    //     timestamp: new Date().toISOString(),
    //     messager: exception.getResponse(),
    //   });
  }
}