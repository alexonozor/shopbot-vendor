import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Media } from '../../models/media';

@Component({
  selector: 'app-file-media-card',
  templateUrl: './file-media-card.component.html',
  styleUrls: ['./file-media-card.component.scss']
})
export class FileMediaCardComponent {
  @Input() media!: Media;
  @Output() deleteMedia: EventEmitter<any> = new EventEmitter();
  @Output() selectedMedia: EventEmitter<any> = new EventEmitter();

  

  delete() {
      this.deleteMedia.emit();
  }

  select(media: Media) {
    this.selectedMedia.emit(media)
  }

}
