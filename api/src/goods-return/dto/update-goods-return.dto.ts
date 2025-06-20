import { PartialType } from '@nestjs/swagger';
import { CreateGoodsReturnDto } from './create-goods-return.dto';

export class UpdateGoodsReturnDto extends PartialType(CreateGoodsReturnDto) {}
