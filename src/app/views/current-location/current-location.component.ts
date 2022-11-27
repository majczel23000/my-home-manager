import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.scss']
})
export class CurrentLocationComponent {

  @Input() location: string = '';
  @Input() id: string | undefined = '';
  @Input() name: string | undefined = '';

  constructor() { }

}
