import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Causa } from 'src/app/model/causa.model';
import { CausaService } from 'src/app/services/causa.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  causas: Causa[];
  constructor(private theCausaService: CausaService, private router: Router) {
    this.causas = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.theCausaService.list().subscribe(data => {
      this.causas = data
    })
  }

  create() {
    this.router.navigate(["difuntos/create"])
  }

}
