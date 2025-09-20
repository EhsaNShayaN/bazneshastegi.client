import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.html',
  styleUrl: './social-icons.scss',
  standalone: false
})
export class SocialIcons {
  @Input() iconSize: string = '';
  @Input() iconColor: string = '';
}
