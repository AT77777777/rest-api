export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
