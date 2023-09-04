import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private readonly http: HttpClient) {}

    checkNickname(nickname: string): Observable<boolean> {
        const params = new HttpParams().set('nickname', nickname);

        return this.http.get<boolean>(`check-nickname`, {
            params,
        });
    }

    checkEmail(nickname: string): Observable<boolean> {
        const params = new HttpParams().set('email', nickname);

        return this.http.get<boolean>(`check-email`, {
            params,
        });
    }
}
