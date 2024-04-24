import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IBaseTokenService } from './base.token.service.interface';
import { Entity, Repository } from 'redis-om';
import { v4 as uuid } from 'uuid';
import { ITokenPayload } from '../token-payload.interface';
import { IAbstractTokens } from './base.abstract.tokens.interface';
import { BadRequestException } from '@nestjs/common';

export abstract class BaseTokenService implements IBaseTokenService {
  abstract signOptions: JwtSignOptions;

  protected constructor(
    protected readonly jwtService: JwtService,
    protected readonly repository: Repository,
  ) {}

  async getEntityById(id: string): Promise<Entity> {
    return await this.repository.fetch(id);
  }

  getEntityData(entity: Entity): IAbstractTokens {
    return entity as unknown as IAbstractTokens;
  }

  async sign(payload: any): Promise<{ token: string; uuid: string }> {
    const tokenUuid = uuid();

    return {
      token: this.jwtService.sign(
        { ...payload, uuid: tokenUuid },
        this.signOptions,
      ),
      uuid: tokenUuid,
    };
  }

  async signAndPush(payload: any, id: string): Promise<string> {
    const { token, uuid } = await this.sign(payload);
    const savedTokensUuidEntity = await this.getEntityById(id);
    const savedTokensUuidData = this.getEntityData(savedTokensUuidEntity);

    savedTokensUuidData.uuids.push(uuid);
    await this.repository.save(savedTokensUuidEntity);

    return token;
  }

  async signAndClear(payload: any, id: string): Promise<string> {
    const { token, uuid } = await this.sign(payload);
    const savedTokensUuidEntity = await this.getEntityById(id);
    const savedTokensUuidData = this.getEntityData(savedTokensUuidEntity);

    savedTokensUuidData.uuids = [uuid];
    await this.repository.save(savedTokensUuidEntity);

    return token;
  }

  async verify(token: string, id: string): Promise<void> {
    const savedTokensUuid = await this.getEntityById(id);
    const savedTokensUuidData = this.getEntityData(savedTokensUuid);

    try {
      const payload: ITokenPayload = this.jwtService.verify(
        token,
        this.signOptions,
      );

      if (!savedTokensUuidData.uuids.includes(payload.uuid)) throw Error();
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }

  async verifyAndClear(token: string, id: string): Promise<void> {
    const savedTokensUuid = await this.getEntityById(id);
    const savedTokensUuidData = this.getEntityData(savedTokensUuid);

    try {
      const payload: ITokenPayload = this.jwtService.verify(
        token,
        this.signOptions,
      );

      if (!savedTokensUuidData.uuids.includes(payload.uuid)) throw new Error();

      savedTokensUuidData.uuids = [];
      await this.repository.save(savedTokensUuid);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }

  async verifyAndRemove(token: string, id: string): Promise<void> {
    const savedTokensUuid = await this.getEntityById(id);
    const savedTokensUuidData = this.getEntityData(savedTokensUuid);

    try {
      const payload: ITokenPayload = this.jwtService.verify(
        token,
        this.signOptions,
      );

      if (!savedTokensUuidData.uuids.includes(payload.uuid)) throw new Error();

      savedTokensUuidData.uuids = savedTokensUuidData.uuids.filter(
        (uuid) => uuid !== payload.uuid,
      );
      await this.repository.save(savedTokensUuid);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }
}
