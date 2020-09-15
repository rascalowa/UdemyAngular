import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  //we need to manage by ourselves - unsubscribe when it is not required anymore
  ngOnInit() {
    //user is either null(not logged in) or exist (logged in)
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      //  !user = if we don't have a user - true if user is null, false if we have user object -
      //  !!user = that is opposite of what we need - inverse our value .
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    //if we are not subscribing to fetch Data in the service (only RETURN), we need to subscribe here. If we don't care about response, we don't have to pass a function
    //this approach helps us in the RESOLVER
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
