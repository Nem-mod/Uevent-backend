import {PartialType} from "@nestjs/swagger";
import {UpdateThemeDto} from "./update-theme.dto";

export class FullThemeDto extends PartialType(UpdateThemeDto) {
  id?: number
}