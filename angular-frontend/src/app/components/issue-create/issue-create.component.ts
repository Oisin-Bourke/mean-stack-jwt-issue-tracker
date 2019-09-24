import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { IssueService } from "../../services/issue.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
  createIssueForm: FormGroup;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location){
    this.createIssueForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      responsible: ['', Validators.required],
      severity: ''
    });

    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  ngOnInit() {
  }

  addIssue(title, description, url, responsible, severity) {
    this.issueService.addIssue(title, description, url, responsible, severity, this.userId).subscribe(() => {
      this.router.navigate(['/issues/', this.userId]);
    });
  }

  backOnePage(){
    this.location.back();
  }

}


