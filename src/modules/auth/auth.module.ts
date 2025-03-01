import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';
import { AuthCacheService } from './services/auth-cache-service';
import { TokenService } from './services/token.service';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Module({
  imports: [JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    JwtRefreshGuard,
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [],
})
export class AuthModule {}
