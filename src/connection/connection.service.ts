import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionService {
  constructor(private readonly em: EntityManager) {}

  public async getConnection({ rawQuery }: { rawQuery: string }): Promise<any> {
    const connection = this.em.getConnection();

    const queryResult = await connection.execute(rawQuery);

    return queryResult;
  }
}
