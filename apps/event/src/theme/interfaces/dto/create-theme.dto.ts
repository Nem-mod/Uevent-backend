import {IsNotEmpty, IsString} from "class-validator";

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  name: string
}