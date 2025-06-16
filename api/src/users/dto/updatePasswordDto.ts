import { IsNotEmpty } from "class-validator";

export class UpdatePasswordDto {
  @IsNotEmpty()
  new_password: string;
  @IsNotEmpty()
  current_password: string;
}
