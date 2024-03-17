import { Injectable } from '@nestjs/common';

@Injectable()
export class DayCareService {
  constructor() {}

  public async getDayCare(): Promise<any> {
    return 'hello';
  }
}
