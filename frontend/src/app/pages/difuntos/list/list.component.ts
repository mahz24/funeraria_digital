import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Difunto } from 'src/app/model/difunto.model';
import { DifuntosService } from 'src/app/services/difuntos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  difuntos: Difunto[];
  constructor(private thedifuntoService: DifuntosService, private router: Router) {
    this.difuntos = []
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.thedifuntoService.list().subscribe(data => {
      this.difuntos = data
    })
  }

  create() {
    this.router.navigate(["difuntos/create"])
  }

}
