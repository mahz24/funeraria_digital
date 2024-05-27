import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1 view, 2 create, 3 update
  constructor(private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
