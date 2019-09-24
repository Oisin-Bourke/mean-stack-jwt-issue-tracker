import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Issue } from "../../models/issue.model";
import { IssueService } from "../../services/issue.service";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[]; // hold the data from the service
  displayedColumns = ['title', 'description', 'url', 'responsible', 'severity', 'status', 'actions'];
  threatDisplayedColumns = ['index', 'threat', 'threatType'];
  userId: String;
  urls: String[];
  matches = [];

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.fetchIssuesById(this.userId);
    this.fetchUrlsById(this.userId);
  }

  ngOnInit() {
  }

  fetchIssuesById(id) {
    this.issueService
      .getAllIssuesByUserId(id)
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data requested...');
        console.log(this.issues);
      });
  }

  fetchUrlsById(id){
    this.issueService
      .getUrls(id)
      .subscribe( (data: String[]) =>{
        this.urls = data;
        console.log(this.urls)
      })
  }

  checkSafe(){
    const array: Object[] = [];
    this.urls.forEach(function (element) {
      const obj = {
        url: String
      };
      obj.url = element['url'];
      array.push(obj);
    });
    console.log(array);
    this.issueService.checkSafeBrowsing(array).subscribe( (data: String[]) => {
      this.matches = data['matches'];
      console.log(this.matches);
    });
  }

  navigateCreate(){
    this.router.navigate(['/issues/',this.userId,'add_issue']);
  }

  navigateUpdate(issueId) {
    this.router.navigate([`/issues/${this.userId}/get/${issueId}`]);
  }

  deleteIssue(issueId) {
    this.issueService.deleteIssue(issueId).subscribe(() => {
      this.fetchIssuesById(this.userId);
    });
  }


}
