import { Module } from '@nestjs/common';
import { RecruitmentService } from './services/recruitment.service';
import { RecruitmentController } from './controllers/recruitment.controller';
import { recruitmentRepository } from './repositories/recruitment.repository';
import { RecruitmentProfile } from './shared/recueritment.profile';
import { RECRUITMENT_SERVICE } from './constants/services';

@Module({
  providers: [
    ...recruitmentRepository,
    RecruitmentProfile,
    {
      useClass: RecruitmentService,
      provide: RECRUITMENT_SERVICE
    }
    
  ],
  controllers: [RecruitmentController]
})
export class RecruitmentModule {}
