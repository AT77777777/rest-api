import { Injectable } from '@nestjs/common';
import { JwtConfig } from '../../../config/config.type';
import { RedisService } from '../../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async saveToken(token: string, userId: string): Promise<void> {
    const key = this.getKey(userId);

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
  }

  public async isAccessTokenExist(
    userId: string,
    token: string,
  ): Promise<boolean> {
    const key = this.getKey(userId);

    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteToken(userId: string): Promise<void> {
    const key = this.getKey(userId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string): string {
    return `ACCESS_TOKEN:${userId}`;
  }
}
