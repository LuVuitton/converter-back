import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll( @Request() req) {
    return this.historyService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto, @Request() req) {
    return this.historyService.create(createHistoryDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
