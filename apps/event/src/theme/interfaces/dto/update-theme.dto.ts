import {CreateThemeDto} from "./create-theme.dto";
import {PartialType} from "@nestjs/swagger";

export class UpdateThemeDto extends PartialType(CreateThemeDto) {}