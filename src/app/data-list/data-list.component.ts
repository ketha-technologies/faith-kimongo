// imports 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// decorator - enables modification of inside class datalistcomponent before it is used.
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})

// used export so that i can use it outside this file to register and import in the module file.
export class DataListComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) { }

  // goes to server and picks the data
  ngOnInit() {  
    this.http.get<any[]>('http://localhost:3000/collections').subscribe(response => {
      this.data = response;
      this.filteredData = response;
    });
  }

  // gives the ability to search and filter data
  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredData = this.data.filter(item =>
        item.collectionCode.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
  }

  // since we need to delay search until client has finished typing, this button will only send request onclick.
  onSearchClick() {
    this.search();
  }
}
