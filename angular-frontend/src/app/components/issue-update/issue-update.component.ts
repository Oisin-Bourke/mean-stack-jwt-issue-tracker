import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar} from '@angular/material';
import {IssueService} from "../../services/issue.service";
import { Issue } from "../../models/issue.model";
import { Location } from "@angular/common";


@Component({
  selector: 'app-issue-update',
  templateUrl: './issue-update.component.html',
  styleUrls: ['./issue-update.component.css']
})
export class IssueUpdateComponent implements OnInit {
  userId: String;
  issueId: String;
  issue: Issue;
  updateIssueForm: FormGroup;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.createForm();
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.issueId = this.route.snapshot.paramMap.get('issueId');
  }

  createForm() {
    this.updateIssueForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      url: '',
      responsible: '',
      severity: '',
      status: ''
    });
  }

  fetchIssueById(userId, issueId) {
    this.issueService.getIssueById(userId, issueId).subscribe(res => {
      this.issue = res;
      this.updateIssueForm.get('title').setValue(this.issue.title);
      this.updateIssueForm.get('description').setValue(this.issue.description);
      this.updateIssueForm.get('url').setValue(this.issue.url);
      this.updateIssueForm.get('responsible').setValue(this.issue.responsible);
      this.updateIssueForm.get('severity').setValue(this.issue.severity);
      this.updateIssueForm.get('status').setValue(this.issue.status);
    });
  }

  ngOnInit() {
    this.fetchIssueById(this.userId, this.issueId);
  }

  updateIssue(title, description, url, responsible, severity, status) {
    this.issueService.updateIssue(this.userId, this.issueId, title, description, url, responsible, severity, status).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'Okay', {
        duration: 3000});
      this.location.back();
    });
  }

  backOnePage(){
    this.location.back();
  }
}



