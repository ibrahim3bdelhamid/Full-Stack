import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})

export class Search {

  search(event:any) {
    event.preventDefault();


    
    return false;
  }
}
