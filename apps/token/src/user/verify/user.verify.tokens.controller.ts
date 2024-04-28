import { BaseTokenController } from '../../interfaces/base/base.token.controller';
import { IBaseTokenController } from '../../interfaces/base/base.token.controller.interface';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadAndIdDto } from '../../interfaces/dto/payload-and-id.dto';
import { IBaseTokenService } from '../../interfaces/base/base.token.service.interface';
import { TokenAndIdDto } from '../../interfaces/dto/token-and-id.dto';

@Controller()
export class UserVerifyTokensController
  extends BaseTokenController
  implements IBaseTokenController
{
  constructor(
    @Inject('verifyService')
    private readonly userVerifyTokensService: IBaseTokenService,
  ) {
    super(userVerifyTokensService);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'signAndPush' })
  async signAndPush(obj: PayloadAndIdDto): Promise<string> {
    return await super.signAndPush(obj);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'signAndClear' })
  async signAndClear(obj: PayloadAndIdDto): Promise<string> {
    return await super.signAndClear(obj);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'decode' })
  async decode(token: string): Promise<object> {
    return await super.decode(token);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'remove' })
  async remove(obj: TokenAndIdDto): Promise<boolean> {
    return await super.remove(obj);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'verify' })
  async verify(obj: TokenAndIdDto): Promise<true> {
    return await super.verify(obj);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'verifyAndClear' })
  async verifyAndClear(obj: TokenAndIdDto): Promise<true> {
    return await super.verifyAndClear(obj);
  }

  @MessagePattern({ role: 'user', token: 'verify', cmd: 'verifyAndRemove' })
  async verifyAndRemove(obj: TokenAndIdDto): Promise<true> {
    return await super.verifyAndRemove(obj);
  }
}
