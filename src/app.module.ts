import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configConstants } from './common/config-constants';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/users/user.module';
import { SharedModule } from './common/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>(configConstants.database.url)}/${configService.get<string>(configConstants.database.name)}`
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }
