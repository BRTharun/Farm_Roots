import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarClosed = false;

  ngOnInit(): void {
    // Any initialization logic
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
