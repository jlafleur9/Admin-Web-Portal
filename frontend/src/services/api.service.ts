import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/home/announcements/announcements.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAnnouncements(companyId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/company/${companyId}/announcements`);
  }
}
