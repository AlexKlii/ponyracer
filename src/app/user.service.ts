import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './models/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${environment.base_url}/api/users`, body);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.base_url}/api/users/authentication`, credentials)
      .pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
  }

  storeLoggedInUser(user: UserModel): void {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value) as UserModel;
      this.userEvents.next(user);
    }
  }
}
