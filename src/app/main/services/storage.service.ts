import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  load(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key: string): any {
    localStorage.removeItem(key);
  }

}
