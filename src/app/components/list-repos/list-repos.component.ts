
import { Component, OnInit } from '@angular/core';
import { Repository } from './../../models/repository';
import { RepositoryService } from './../../services/repository.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-repos',
  templateUrl: './list-repos.component.html',
  styleUrls: ['./list-repos.component.css']
})
export class ListReposComponent implements OnInit {

  // Varaibles omponent
  repos: Repository[] = [];
  page = 1;
  dateLastRepo: string;
  lastMonth = moment().subtract(30, 'days').format('YYYY-MM-DD');
  isLoading: boolean;

  constructor(private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.getRepos();
  }

  /** get All first page's repositories  */
  getRepos() {
    this.isLoading = true;
    this.repositoryService.getRepos(this.page, this.lastMonth).subscribe(data => {
      this.repos = [...this.repos, ...data];
    }, (error) => {

    }, () => {
      /** if condition : reset page and creation date */
      if ((this.page % 10) === 0) {
        const length = this.repos.length;
        this.page = 1;
        this.lastMonth = moment(this.repos[length - 1]['created_at']).format('YYYY-MM-DD');
      } else {
        this.page++;
      }
      this.isLoading = false;
    });
  }

  /** Paginate the next page */
  loadRepos() {
    if (!this.isLoading) {
      this.getRepos();
    }
  }

}
