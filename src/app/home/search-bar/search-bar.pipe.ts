import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBar'
})
export class SearchBarPipe implements PipeTransform {

  transform(jobs: any[], searchText: string): any[] {
    if (!jobs) return [];
    if (!searchText) return jobs;

    searchText = searchText.toLowerCase();

    return jobs.filter(job => {
      return job.job_name.toLowerCase().includes(searchText);
    });
  }

}
