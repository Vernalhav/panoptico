import { Controller, Get } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topicos')
export class TopicsController {
  constructor(private topicService: TopicService) {}

  @Get()
  async getAll() {
    return await this.topicService.getAll();
  }
}
