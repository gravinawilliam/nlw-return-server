import { Request, Response } from 'express';

import { HttpRequest } from '@shared/interfaces/http-request.interface';
import { HttpResponse } from '@shared/interfaces/http-response.interface';
import { HttpStatusCodeUtil } from '@shared/utils/http-status-code.util';

interface IController {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export const adapterRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      headers: request.headers,
      query: request.query
    };

    const { data, statusCode } = await controller.handle(httpRequest);
    if (statusCode >= HttpStatusCodeUtil.OK && statusCode <= 399) {
      response.status(statusCode).json(data);
    } else {
      response.status(statusCode).json({
        error: data.message
      });
    }
  };
};
