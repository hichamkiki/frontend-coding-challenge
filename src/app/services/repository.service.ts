import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Repository } from '../models/repository';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private httpClient: HttpClient) {}

  /** Get the most starred github repos created in the last 30 days. */
  getRepos(page: number, lastMonth: string): Observable<Repository[]> {
    const reqHeader = new HttpHeaders({ Authorization: 'token 61e3ef3995e223874192459a8d83300d684ce1f9' });
    return this.httpClient.get<Repository[]>(
      environment.apiUrl + '?q=created:>' + lastMonth + '&sort=stars&order=desc&per_page=100&page=' + page, { headers: reqHeader })
      .pipe(map((data) => {
        const results = data['items'].map(
          ({
            name,
            description,
            stargazers_count,
            open_issues_count,
            created_at,
            owner
          }) => ({
            name,
            description,
            stargazers_count,
            open_issues_count,
            created_at,
            owner: {
              avatar_url: owner.avatar_url,
              login: owner.login,
            },
          })
        );
        return results;
        }), catchError(error => {
          return of();
        })
      );
  }
}
