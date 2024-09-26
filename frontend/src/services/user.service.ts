import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CredentialsDto} from "./dtos/credentials.dto";
import {FullUserDto} from "./dtos/full-user.dto";
import {catchError, Observable, tap, throwError} from "rxjs";
import { CompanyDto } from "./dtos/company.dto";
import { Announcement } from "src/app/home/announcements/announcements.component";
import { RequestAnnouncementDto, ResponseAnnouncementDto } from "./dtos/announcement.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';
  private userKey = 'user';
  private selectedCompanyKey = 'selectedCompany'
  private _user: FullUserDto | null = null;

  private _selectedCompany: number | null = null;
  selectedCompanyChange: EventEmitter<number | null> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem(this.userKey);
    const storedCompany = localStorage.getItem(this.selectedCompanyKey);

    if (storedCompany) {
      this._selectedCompany = JSON.parse(storedCompany);
    }

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

  get usersCompanies(): CompanyDto[] {
    try {
      const user = this.user;
      return user?.companies || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

   get selectedCompany() {
    if (this._selectedCompany) {
      return this._selectedCompany;
    } else {
      throw new Error("No Selected Company");
    }
  }


  login(credentialsDto: CredentialsDto): Observable<FullUserDto> {
    return this.httpClient.post<FullUserDto>(`${this.baseUrl}/users/login`, credentialsDto)
    .pipe(
      tap(response => this.saveUser(response)),
      catchError(error => throwError(() => error))
    );
  }

  getAnnouncements(companyId: number): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(`${this.baseUrl}/company/${companyId}/announcements`);
  }

  getCompanyUsers(companyId: number): Observable<FullUserDto[]> {
    return this.httpClient.get<FullUserDto[]>(`${this.baseUrl}/company/${companyId}/users`)
  }

  setSelectedCompany(company: number) {
    this._selectedCompany = company;
    localStorage.setItem(this.selectedCompanyKey, JSON.stringify(company));
    this.selectedCompanyChange.emit(company);
  }

  postAnnouncement(requestAnnouncementDto: RequestAnnouncementDto): Observable<ResponseAnnouncementDto[]> {
    return this.httpClient.post<ResponseAnnouncementDto[]>(`${this.baseUrl}/company/1/announcements`, requestAnnouncementDto)
  }

  logout() {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.selectedCompanyKey);
    this._user = null;
    this._selectedCompany = null;
  }

  private saveUser(fullUserDto: FullUserDto) {
    localStorage.setItem(this.userKey, JSON.stringify(fullUserDto));
    this._user = fullUserDto;
  }
}
