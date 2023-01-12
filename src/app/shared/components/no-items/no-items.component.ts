import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.component.html',
  styleUrls: ['./no-items.component.css']
})
export class NoItemsComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() buttonTxt!: string;
  @Output() tapButton: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickAction() {
    this.tapButton.emit()
  }

}
