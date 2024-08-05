import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Session } from 'inspector';
import { Request } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { STATUS_CODES } from 'http';
import { response } from 'express';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const sessionID = request.session.userID;
    if (!sessionID) {
      console.log('pleaase log in');
      return false;
    } else {
      console.log(sessionID);
      return true;
    }
  },
);
