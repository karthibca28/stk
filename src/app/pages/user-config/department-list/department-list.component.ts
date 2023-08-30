import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  title: string;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.title = "Deparment List";
  }
  goToForm(){
    this.router.navigate(['user-config/department-form'])
  }

}
