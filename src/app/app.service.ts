import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private API_PATH = 'https://robomatic-ai.p.rapidapi.com/api';
  constructor(private httpClient: HttpClient) {}

  requestApi(message: string): Observable<any> {
    const data = new HttpParams()
      .set('in', message)
      .set('op', 'in')
      .set('cbot', '1')
      .set('SessionID', 'RapidAPI1')
      .set('cbid', '1')
      .set('key', 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP')
      .set('ChatSource', 'RapidAPI')
      .set('duration', '1');

    const myHeaders = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '384c0a3f76mshc3607e387041829p1b16a3jsnd83dc21c25fc',
      'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com',
    });

    return this.httpClient
      .post<any>(this.API_PATH, data, {
        headers: myHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response) => response.out)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(
      `Name: ${error.name} \n` +
        `Message: ${error.message} \n` +
        `Returned code: ${error.status} \n`
    );
    return throwError('Something bad happened; please try difrent query ;).');
  }
}
