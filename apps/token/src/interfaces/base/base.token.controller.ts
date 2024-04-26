import { IBaseTokenController } from './base.token.controller.interface';
import { IBaseTokenService } from './base.token.service.interface';
import { TokenAndIdDto } from '../../dto/token-and-id.dto';
import { PayloadAndIdDto } from '../../dto/payload-and-id.dto';

export abstract class BaseTokenController implements IBaseTokenController {
  protected constructor(protected readonly tokenService: IBaseTokenService) {}

  async signAndPush(obj: PayloadAndIdDto): Promise<string> {
    return await this.tokenService.signAndPush(obj.payload, obj.id);
  }

  async signAndClear(obj: PayloadAndIdDto): Promise<string> {
    return await this.tokenService.signAndClear(obj.payload, obj.id);
  }

  async decode(token: string): Promise<object> {
    return await this.tokenService.decode(token);
  }

  async remove(obj: TokenAndIdDto): Promise<boolean> {
    return await this.tokenService.remove(obj.token, obj.id);
  }

  async verify(obj: TokenAndIdDto): Promise<boolean> {
    await this.tokenService.verify(obj.token, obj.id);
    return true;
  }

  async verifyAndClear(obj: TokenAndIdDto): Promise<boolean> {
    await this.tokenService.verifyAndClear(obj.token, obj.id);
    return true;
  }

  async verifyAndRemove(obj: TokenAndIdDto): Promise<boolean> {
    await this.tokenService.verifyAndRemove(obj.token, obj.id);
    return true;
  }
}
