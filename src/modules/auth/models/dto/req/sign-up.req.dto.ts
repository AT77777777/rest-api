import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class SignUpReqDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 250)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;
  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(0, 250)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  password: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Type(() => String)
  name?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @Length(0, 50)
  age?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  bio?: string;
}
