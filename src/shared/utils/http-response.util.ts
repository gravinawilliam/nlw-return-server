import { HttpResponse } from '../interfaces/http-response.interface';
import { HttpStatusCodeUtil } from './http-status-code.util';

export const created = (data: unknown): HttpResponse => ({
  statusCode: HttpStatusCodeUtil.CREATED,
  data: data
});

export const ok = (data: unknown): HttpResponse => ({
  statusCode: HttpStatusCodeUtil.OK,
  data: data
});
