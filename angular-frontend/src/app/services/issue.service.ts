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

  getIssueById(userId,issueId) {
    return this.http.get <Issue>(`${environment.apiUrl}/issues/${userId}/get/${issueId}`);
  }

  getAllIssuesByUserId(userId){
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues/${userId}`);
  }

  addIssue(title, description, url, responsible, severity, userId) {
    const issue = {
      title: title,
      description: description,
      url: url,
      responsible: responsible,
      severity: severity,
      author: userId,
    };
    return this.http.post(`${environment.apiUrl}/issues/${userId}/add_issue`, issue);
  }

  updateIssue(userId, issueId, title, description, url, responsible, severity, status) {
    const issue = {
      title: title,
      description: description,
      url: url,
      responsible: responsible,
      severity: severity,
      status: status
    };
    return this.http.put(`${environment.apiUrl}/issues/${userId}/update/${issueId}`, issue);
  }

  deleteIssue(issueId) {
    return this.http.delete(`${environment.apiUrl}/issues/delete/${issueId}`);
  }

  getUrls(userId) {
    return this.http.get(`${environment.apiUrl}/issues/${userId}/urls`);
  }

  checkSafeBrowsing(urls: Object[]){
    const body = {
      client: {
        clientId:      "Company Name",
        clientVersion: "1.5.2"
      },
      threatInfo: {
        threatTypes:      ["MALWARE", "SOCIAL_ENGINEERING","THREAT_TYPE_UNSPECIFIED"],
        platformTypes:    ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [
        ]
      }
    };

    urls.forEach(function (element) {
      body.threatInfo.threatEntries.push(element);
    });

   return this.http.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDgu-yQy8a09QIB7qhLmXqChS6BncFZmD4`, body);
  }

}
