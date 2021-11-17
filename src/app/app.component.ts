import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, pluck } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NgrxTodo';
  isListView$: Observable<boolean> | undefined;
  isAddView$: Observable<boolean> | undefined;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.isListView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url) => (url === '/' ? true : false))
    );
    this.isAddView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url) => (url === '/todo' ? true : false))
    );
  }
}
