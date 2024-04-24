export interface IBaseTokenService {
  // sign(payload: any): Promise<string>;
  // verify(token: string): Promise<boolean>;
  //
  // getByEntityId(entityId: string): Promise<any>
  // aggregateEntityId(id: number): string
  //
  // push(entityId: string, uuid: string)
  // clear(entityId: string)
  // remove(uuid: string)
  signAndPush(payload: any, id: string): Promise<string>;
  signAndClear(payload: any, id: string): Promise<string>;
  // signAndRemove(payload: any, id: string): Promise<string>;

  verify(token: string, id: string): Promise<boolean>;
  verifyAndClear(token: string, id: string): Promise<boolean>;
  verifyAndRemove(token: string, id: string): Promise<boolean>;
}
