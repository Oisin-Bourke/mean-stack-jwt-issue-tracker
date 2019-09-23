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
  userId: any;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.fetchIssuesById(this.userId);
  }

  ngOnInit() {
  }

  fetchIssues() {
    this.issueService
      .getAll()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data requested...');
        console.log(this.issues);
      });
  }

  fetchIssuesById(id) {
    this.issueService
      .getAllIssuesById(id)
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data requested...');
        console.log(this.issues);
      });
  }

  navigateCreate(){
    this.router.navigate(['/issues/', this.userId, 'add_issue']);
  }

}
