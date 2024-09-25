import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CredentialsDto} from "./dtos/credentials.dto";
import {FullUserDto} from "./dtos/full-user.dto";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';
  private userKey = 'user';
  private _user: FullUserDto | null = null;

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem(this.userKey);

    if (storedUser) {
      this._user = JSON.parse(storedUser);
    }
  }

  isLoggedIn(): boolean {
    return this._user !== null;
  }

  get user() {
    if (this.isLoggedIn()) {
      return this._user;
    } else {
      throw new Error("User is not logged in");
    }
  }

  login(credentialsDto: CredentialsDto): Observable<FullUserDto> {
    return this.httpClient.post<FullUserDto>(`${this.baseUrl}/users/login`, credentialsDto)
      .pipe(
        tap(response => this.saveUser(response)),
        catchError(error => throwError(() => error))
      );
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this._user = null;
  }

  private saveUser(fullUserDto: FullUserDto) {
    localStorage.setItem(this.userKey, JSON.stringify(fullUserDto));
    this._user = fullUserDto;
  }
}
