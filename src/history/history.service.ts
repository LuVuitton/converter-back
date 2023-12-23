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
    try {
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

  async remove(historyItemID: number, user: User) {
    try {
      const history = await this.historyRepository.findOne({
        where: { historyItemID, user: { userID: user.userID } },
      });

      if (!history) {
        throw new HttpException(
          'History not found or does not belong to the user',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.historyRepository.remove(history);
      return {
        userID: user.userID,
        message: `History #${historyItemID} has been removed`,
      };
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to remove history entry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
