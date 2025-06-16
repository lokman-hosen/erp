/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

// import { JwtSignService } from "src/auth/jwt.sign.service";
import EmailService from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { OtpLoginDto } from './dto/loginUser.dto';
import { JwtSignService } from './jwt.sign.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly jwtSignService: JwtSignService,
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) { }

  // async loginUser(phone: string): Promise<any> {
  //   return true
  // }

  /*
  * call FCM api to verify phone number
  * */
  async verifyPhoneNumber(phone: string, idToken: string): Promise<any> {
    if (process.env.NODE_ENV === 'development') return true;

    const payload = { idToken };

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.configService.get('fcm_web_api_key')}`;

    try {
      const response = await fetch(url, options)
      // console.log(response.status);
      if (response.status !== 200) {
        return false;
      }
      const jsonResponse = await response.json();
      // console.log('JSON response', jsonResponse);
      /*
      * JSON response
       {
          kind: 'identitytoolkit#GetAccountInfoResponse',
          users: [
            {
              localId: '1rLn4hbmukaXGD3DkkESG7sRQ873',
              providerUserInfo: [Array],
              lastLoginAt: '1690798443234',
              createdAt: '1689935976388',
              phoneNumber: '+8801345678912',
              lastRefreshAt: '2023-07-31T10:14:05.695473Z'
            }
          ]
        }
      * */
      if (jsonResponse?.users && jsonResponse.users.length
        && jsonResponse.users[0].phoneNumber === phone) {
        return true;
      }

      return false;
    } catch (err) {
      console.log('ERROR', err);
      return false;
    }

    return false;

  }


  async verifyOtp(payload: OtpLoginDto): Promise<any> {
    const otpNumber = await this.prismaService.otpVerification.findFirst({ where: { phone: payload?.phone, otp: payload?.otp } });

    if (otpNumber === null) {
      throw new HttpException("This user is not valid user", HttpStatus.NOT_ACCEPTABLE)
    }

    const user = await this.prismaService.user.findFirst({ where: { phone: otpNumber?.phone } });


    // registration User
    if (!user) {
      const hash = await bcrypt.hash(payload.otp.toString(), 10)

      try {
        const newUser = await this.prismaService.user.create({
          data: {
            password: hash,
            phone: payload.phone,
            is_verified: true
          }
        });
        const access_token = await this.jwtSignService.signJwt({ email: user?.email, phone: user?.phone, id: user?.id })

        delete newUser['password']
        return {
          ...newUser,
          access_token,
        }
      } catch (error) {
        throw new HttpException("User creation failed", HttpStatus.BAD_REQUEST)
      }

    }

    if (user && !user.is_verified) {
      throw new HttpException("This user is not verified", HttpStatus.NOT_ACCEPTABLE);
    }

    // login User
    if (user) {
      const access_token = await this.jwtSignService.signJwt({ email: user?.email, phone: user?.phone, id: user?.id })
      delete user['password']
      return {
        ...user,
        access_token,
      }
    }
  }
}
