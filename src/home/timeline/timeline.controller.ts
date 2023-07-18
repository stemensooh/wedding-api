import { Controller } from '@nestjs/common';
import { Public } from 'src/core/constants/jwt.secret';

@Public()
@Controller('timeline')
export class TimelineController {}
