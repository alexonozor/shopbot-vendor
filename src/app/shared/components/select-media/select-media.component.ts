import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Media } from 'src/app/shared/models/media';

@Component({
  selector: 'app-select-media',
  templateUrl: './select-media.component.html',
  styleUrls: ['./select-media.component.scss']
})
export class SelectMediaComponent  {
  @Input() mediaData!: Media;
  @Input() valueName = 'no value name';
  @Input() isNew!: boolean;
  @Output() removeValue: EventEmitter<any> = new EventEmitter();
  @Output() openMediaBrowser: EventEmitter<any> = new EventEmitter()

  remove() {
    this.removeValue.emit(this.valueName.toLowerCase());
  }

  select() {
    this.openMediaBrowser.emit(this.valueName.toLowerCase());
  }

  getUrlExtension(url:any) {
    if (typeof(url) === 'string') {
      return url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();
    } else {
      this.isNew = true
      return url.url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();
    }
   
  }

 

}
