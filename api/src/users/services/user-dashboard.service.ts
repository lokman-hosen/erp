import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import EmailService from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';

@Injectable()
export class UserDashBoardService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) { }

    async getUser(id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } })
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        delete user['password']
        return user
    }


    async updateUserProfile(data: any, id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } });

        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const req = await this.prismaService.user.update({
            where: { id: user.id },
            data: data
        })
        if (req === null) {
            throw new HttpException("User update failed", HttpStatus.NOT_FOUND)
        }
        delete req['password']
        return req
    }



    async updateUserPassword(data: UpdatePasswordDto, id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } })
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const password_match = await bcrypt.compare(data.current_password, user.password)
        if (!password_match) {
            throw new HttpException("Password did not match", HttpStatus.UNAUTHORIZED)
        }
        const hash = await bcrypt.hash(data?.new_password?.toString(), 10)
        const req = await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: hash }
        })
        if (req === null) {
            throw new HttpException("User update failed", HttpStatus.NOT_FOUND)
        }
        delete req['password']
        return req
    }

}
