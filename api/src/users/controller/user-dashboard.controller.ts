/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { res } from "src/common/response.helper";
import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";

import { UpdatePasswordDto } from "../dto/updatePasswordDto";
import { UserDashBoardService } from "../services/user-dashboard.service";

@UseGuards(JwtAuthGuard)
@Controller('user-profile')
export class UserDashBoardController {
    constructor(
        private readonly userDashboardService: UserDashBoardService
    ) { }
    @Get('user')
    async recommendedCommunities(@Req() req) {
        const { id } = req.user;
        const response = await this.userDashboardService.getUser(+id)
        return res.success(response);
    }

    @Patch('update')
    async updateUserProfile(@Req() req, @Body() data) {
        const { id } = req.user;
        const response = await this.userDashboardService.updateUserProfile(data, Number(id))
        return res.success(response)
    }

    @Patch('update-password')
    async updateUserPassword(@Req() req, @Body() data: UpdatePasswordDto) {
        const { id } = req.user
        const response = await this.userDashboardService.updateUserPassword(data, Number(id))
        return res.success(response)
    }
}