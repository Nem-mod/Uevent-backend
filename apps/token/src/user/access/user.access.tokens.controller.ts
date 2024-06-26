import { Controller, Inject } from '@nestjs/common';
import { BaseTokenController } from '../../interfaces/base/base.token.controller';
import { IBaseTokenController } from '../../interfaces/base/base.token.controller.interface';
import { IBaseTokenService } from '../../interfaces/base/base.token.service.interface';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadAndIdDto } from '../../interfaces/dto/payload-and-id.dto';
import { TokenAndIdDto } from '../../interfaces/dto/token-and-id.dto';

@Controller()
export class UserAccessTokensController
  extends BaseTokenController
  implements IBaseTokenController
{
  constructor(
    @Inject('accessService')
    private readonly userAccessTokensService: IBaseTokenService,
  ) {
    super(userAccessTokensService);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'sign' })
  async simpleSign(payload: any): Promise<string> {
    return await super.simpleSign(payload);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'signAndPush' })
  async signAndPush(obj: PayloadAndIdDto): Promise<string> {
    return await super.signAndPush(obj);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'signAndClear' })
  async signAndClear(obj: PayloadAndIdDto): Promise<string> {
    return await super.signAndClear(obj);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'decode' })
  async decode(token: string): Promise<object> {
    return await super.decode(token);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'remove' })
  async remove(obj: TokenAndIdDto): Promise<boolean> {
    return await super.remove(obj);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'simpleVerify' })
  async simpleVerify(token: string): Promise<object> {
    return await super.simpleVerify(token);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'verify' })
  async verify(obj: TokenAndIdDto): Promise<object> {
    return await super.verify(obj);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'verifyAndClear' })
  async verifyAndClear(obj: TokenAndIdDto): Promise<object> {
    return await super.verifyAndClear(obj);
  }

  @MessagePattern({ role: 'user', token: 'access', cmd: 'verifyAndRemove' })
  async verifyAndRemove(obj: TokenAndIdDto): Promise<object> {
    return await super.verifyAndRemove(obj);
  }
}
