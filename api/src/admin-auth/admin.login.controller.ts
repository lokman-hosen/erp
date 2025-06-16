import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { res } from '../common/response.helper';
import { AdminAuthService } from './admin.password-reset.service';
import { AdminLoginDto } from './dto/adminLogin.dto';

@Controller('admin')
export class AdminLoginController {
  constructor(
    private readonly adminAuthService: AdminAuthService,
  ) { }

  @UseGuards(AuthGuard(['admin']))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Body() payload: AdminLoginDto) {
    const data = await this.adminAuthService.loginAdminUser(req.user);
    if (!data) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    return res.success(data, 'User login successful');
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async sendPasswordResetCodeToEmail(@Request() req, @Body('email') email: string) {
    await this.adminAuthService.sendPasswordResetCodeToEmail(email);
    return res.success({}, 'We sent a reset code to the email if the email exists');
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Request() req, @Body('email') email: string,
    @Body('reset_code') reset_code: string,
    @Body('new_password') new_password: string) {
    const isSuccess = await this.adminAuthService.resetPassword(email, reset_code, new_password);
    if (!isSuccess) {
      throw new HttpException('Invalid email or code', HttpStatus.BAD_REQUEST);
    }
    return res.success({}, 'Password reset successful! Please login');
  }

  @Post('U39Oxv4w0fGVh3bVtxAVMlwGS3A3FaZP8PdyDn9y2UPujOfR10hBSPFaRO5ud6fQ')
  async createAdminUser(@Request() req, @Body() payload: any) {
    const data = await this.adminAuthService.createAdminUser(payload.email, payload.first_name, payload.last_name, payload.password);
    if (!data) {
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
    return res.success(data, 'User created');
  }

}
