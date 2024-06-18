import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suste } from 'src/app/model/suste';
import { SusteService } from 'src/app/services/suste.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  sustes: Suste[];
  constructor(private susteService: SusteService, private router: Router) {
    this.sustes = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.susteService.list().subscribe(data => {
      this.sustes = data
    })
  }

  view(id: number) {
    this.router.navigate(["suste/view/" + id])
  }

  create() {
    this.router.navigate(["suste/create"])
  }


}
