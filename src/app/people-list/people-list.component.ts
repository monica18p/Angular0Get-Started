import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from "../people.service";

@Component({
  selector: 'app-people-list',
  template: `
  <ul>
    <li *ngFor="let person of people">
      <a [routerLink]="['/persons', person.id]">
      {{person.name}}
      </a>
    </li>
  </ul>
  <section *ngIf="errorMessag">
    {{errorMessag}}
  </section>
  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  isLoading: boolean = true;
  people: Person[] = [];
  errorMessage: String = '';

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getAll().subscribe(
      p => this.people = p,
    e => this.errorMessage = e,
    () => this.isLoading = false);
  }
}
