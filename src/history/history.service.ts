import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { User } from 'src/users/users.service';

@Injectable()
export class HistoryService {
  constructor(
    @Inject('HISTORY_REPOSITORY')
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto, user: User) {
    try {
      const newHistory = await this.historyRepository.save({
        ...createHistoryDto,
        user,
      });
      return newHistory;
    } catch (error) {
      throw new HttpException(
        'Failed to create history entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(user: User) {
    console.log(user.userID);

    try {
      // const histories = await this.historyRepository.find({
      //   // where: { user: user.userID },
      //   where: { userID: user.userID },
      // });

      const histories = await this.historyRepository
        .createQueryBuilder('history')
        .where('history.userID = :userID', { userID: user.userID })
        .getMany();

      return {
        userID: user.userID,
        totalCount: histories.length,
        histories,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch history entries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
