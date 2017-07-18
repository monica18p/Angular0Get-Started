import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Person } from './person';

// 1. Extract array to a PEOPLE variable
const PEOPLE : Person[] = [
      {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
      {id: 2, name: 'Darth Vader', height: 200, weight: 100},
      {id: 3, name: 'Han Solo', height: 185, weight: 85},
    ];

@Injectable()
export class PeopleService{
  private baseUrl: string = 'http://swapi.co/api';
  constructor(private http: Http) {  }
  
  getAll(): Observable<Person[]> {
    let people$ = this.http
    .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
    .map(mapPersons);
      return people$;
  }
  
  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  // get(id: number) : Observable<Person> {
  //   let person$ = this.http
  //   .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
  //   .map(mapPersons);
  //   return person$;
  // }

  get(id: number): Observable<Person> {
    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .map(mapPerson);
      return person$;
  }

  save(person: Person) {
    // let originalPerson = PEOPLE.find(
    //   p => p.id === person.id
    // );
    // if (originalPerson) Object.assign(
    //   originalPerson, person
    // );
    return this
      .http
      .put(`${this.baseUrl}/people/${person.id}`,
      JSON.stringify(person), 
      {headers: this.getHeaders()});
  }

  private clone(object: any) {
    // hack
    return JSON.parse(JSON.stringify(object));
  }  
}

function mapPersons(response: Response): Person[] {
    return response.json().results.map(toPerson)
  }

  function toPerson(r: any): Person {
    let person = <Person>({
      id: extractId(r),
      url: r.url,
      name: r.name,
      weight: Number.parseInt(r.mass),
      height: Number.parseInt(r.height),
    });
    console.log('Parsed person:', person);
    return person;
  }

  function extractId(personData: any) {
    let extractedId = personData.url.replace('http://swapi.co/api/people/','').replace('/','');
    return parseInt(extractedId);
  }

  function mapPerson(response:Response): Person{
   return toPerson(response.json());
}
