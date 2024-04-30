import { Controller, Inject } from '@nestjs/common';
import { BaseTokenController } from '../../interfaces/base/base.token.controller';
import { IBaseTokenController } from '../../interfaces/base/base.token.controller.interface';
import { IBaseTokenService } from '../../interfaces/base/base.token.service.interface';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadAndIdDto } from '../../interfaces/dto/payload-and-id.dto';
import { TokenAndIdDto } from '../../interfaces/dto/token-and-id.dto';

@Controller()
export class TicketScanTokensController
  extends BaseTokenController
  implements IBaseTokenController
{
  constructor(
    @Inject('scanService')
    private readonly ticketScanTokensService: IBaseTokenService,
  ) {
    super(ticketScanTokensService);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'sign' })
  async simpleSign(payload: any): Promise<string> {
    return await super.simpleSign(payload);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'signAndPush' })
  async signAndPush(obj: PayloadAndIdDto): Promise<string> {
    return await super.signAndPush(obj);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'signAndClear' })
  async signAndClear(obj: PayloadAndIdDto): Promise<string> {
    return await super.signAndClear(obj);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'decode' })
  async decode(token: string): Promise<object> {
    return await super.decode(token);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'remove' })
  async remove(obj: TokenAndIdDto): Promise<boolean> {
    return await super.remove(obj);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'simpleVerify' })
  async simpleVerify(token: string): Promise<object> {
    return await super.simpleVerify(token);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'verify' })
  async verify(obj: TokenAndIdDto): Promise<object> {
    return await super.verify(obj);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'verifyAndClear' })
  async verifyAndClear(obj: TokenAndIdDto): Promise<object> {
    return await super.verifyAndClear(obj);
  }

  @MessagePattern({ role: 'ticket', token: 'scan', cmd: 'verifyAndRemove' })
  async verifyAndRemove(obj: TokenAndIdDto): Promise<object> {
    return await super.verifyAndRemove(obj);
  }
}
