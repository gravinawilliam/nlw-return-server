import nodemailer from 'nodemailer';

import { ServerError } from '@domain/entities/errors/server.error';
import { ISendEmailProvider, SendEmailProviderDTO } from '@domain/providers/emails/send-email.provider';
import { failure, success } from '@shared/utils/either.util';

export class MailtrapEmailProvider implements ISendEmailProvider {
  public async sendEmail(parameters: SendEmailProviderDTO.Parameters): SendEmailProviderDTO.Result {
    try {
      const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '952f9969fed37d',
          pass: '25391009b6590e'
        }
      });

      await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'William Gravina <dev.gravinawilliam@gmail.com>',
        subject: parameters.subject,
        html: parameters.body
      });

      return success({ isSuccess: true });
    } catch (error: any) {
      return failure(new ServerError(error));
    }
  }
}
