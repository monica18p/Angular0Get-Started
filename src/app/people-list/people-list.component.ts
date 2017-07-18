import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from "../people.service";

@Component({
  selector: 'app-people-list',
  template: `

  <!-- this is the new syntax for ng-repeat -->
  <ul>
    <li *ngFor="let person of people">
      <a [routerLink]="['/persons', person.id]">
      {{person.name}}
      </a>
    </li>
  </ul>

  <!--<app-person-details [person]="selectedPerson"></app-person-details> -->

  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  // selectedPerson: Person;
  people: Person[] = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getAll().subscribe(p => this.people = p);
  }

}