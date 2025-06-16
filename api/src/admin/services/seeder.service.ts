/* eslint-disable max-len */
import { Injectable } from "@nestjs/common";

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeederService {
    constructor(private readonly prismaService: PrismaService) { }

    async seederExecute(model: string) {
    
        if (model === "setting") {
            await this.prismaService.setting.deleteMany({ where: {} });
            return await this.prismaService.setting.createMany({
                data: [
                    {
                        key: 'email',
                        value: 'tuition@provider.com',

                    },
                    {
                        key: 'phone',
                        value: '34523523',
                    },
                    {
                        key: 'desc',
                        value: 'We are an online tuition service that empowers GCSE and A Level students to achieve grades 6-9 at GCSE and B-A* grades at A Level so that they can progress to the colleges, universities, apprenticeships and careers of their dreams.',
                    },
                    {
                        key: 'instagram',
                        value: 'https://instagram.com',
                    },
                    {
                        key: 'facebook',
                        value: 'https://facebook.com',
                    },
                    {
                        key: 'youtube',
                        value: 'https://youtube.com',
                    },
                    {
                        key: 'tiktok',
                        value: 'https://tiktok.com',
                    },
                    {
                        key: 'terms_condition',
                        value: 'value of terms & condition',
                    },
                    {
                        key: 'privacy_policy',
                        value: 'value of privacy policy',
                    },
                    {
                        key: 'vixion',
                        value: 'https://vixion.com',
                    },
                    {
                        key: 'brand_name',
                        value: 'espd',
                    },
                    {
                        key: 'brand_url',
                        value: 'https://espd.school',
                    },
                ],
                skipDuplicates: true,
            });
        }


    }
}


