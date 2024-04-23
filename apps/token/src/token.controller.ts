import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern({ cmd: 'tokenTest' })
  async tokenTest() {
    console.log('here');
    const a = await this.tokenService.test();
    console.log(a);
    return a;
  }
}
