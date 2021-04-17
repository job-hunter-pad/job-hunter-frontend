import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  jobs : {title:string, employer:string}[]=[
    { "title" : "Angajez ajutor bucatar", "employer":"Adrian Verde"},
    { "title" : "Caut mecanic", "employer":"Vasile Petrovan"},
    { "title" : "Site Web (salariu atractiv)", "employer":"MediaX"},
    { "title" : "Babysiter", "employer":"Cosmina Lof"},
    { "title" : "Angajez ajutor bucatar", "employer":"Adrian Verde"},
    { "title" : "Caut mecanic", "employer":"Vasile Petrovan"},
    { "title" : "Site Web (salariu atractiv)", "employer":"MediaX"},
    { "title" : "Babysiter", "employer":"Cosmina Lof"}
  ]

}
