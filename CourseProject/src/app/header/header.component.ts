import { DataStorageService } from './../shared/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    //if we are not subscribing to fetch Data in the service (only RETURN), we need to subscribe here. If we don't care about response, we don't have to pass a function
    //this approach helps us in the RESOLVER
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
