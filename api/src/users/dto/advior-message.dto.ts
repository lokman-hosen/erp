import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserSendMessageDto {
    @IsNumber()
    @IsNotEmpty()
    advisor_id: number;

    @IsString()
    @IsNotEmpty()
    message: string;
    user_id?: number
}