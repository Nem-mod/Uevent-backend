import { PayloadAndIdDto } from '../../dto/payload-and-id.dto';
import { TokenAndIdDto } from '../../dto/token-and-id.dto';

export interface IBaseTokenController {
  signAndPush(obj: PayloadAndIdDto): Promise<string>;
  signAndClear(obj: PayloadAndIdDto): Promise<string>;
  decode(token: string): Promise<object>;
  remove(obj: TokenAndIdDto): Promise<boolean>;
  verify(obj: TokenAndIdDto): Promise<boolean>;
  verifyAndClear(obj: TokenAndIdDto): Promise<boolean>;
  verifyAndRemove(obj: TokenAndIdDto): Promise<boolean>;
}
