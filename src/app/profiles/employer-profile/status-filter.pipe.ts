import { Pipe, PipeTransform } from '@angular/core';
import { JobApplication } from 'src/app/jobs/jobApplication';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(jobsApplications: JobApplication[], ...statuses: string[]): JobApplication[] {
    if (!jobsApplications)
      return [];
    if (!statuses)
      return jobsApplications;

    return jobsApplications.filter(application => {
      return statuses.indexOf(application.status) >= 0;
    })
  }
}
