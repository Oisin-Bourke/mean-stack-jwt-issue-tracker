import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Issue } from "../models/issue.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues`)
  }

  getAllIssuesById(id) {
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues/${id}`);
  }

  addIssue(id, title, description, url, responsible, severity) {
    const issue = {
      title: title,
      description: description,
      url: url,
      responsible: responsible,
      severity: severity,
      author: id,
    };
    return this.http.post(`${environment.apiUrl}/issues/${id}/add_issue`, issue);
  }




}
