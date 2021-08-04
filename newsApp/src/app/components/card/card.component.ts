import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() dataEntrante: any;  // datos del componente padre

  public image: string;

  constructor(
  ) { }

  ngOnInit(): void {
    // console.log(this.dataEntrante);
  }

}
