import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: false,
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss'
})
export class CommentForm {
  @Input() entityId!: number;
  @Input() entityType!: 'product' | 'news';

  comment = {
    author: '',
    text: ''
  };

  submitComment() {
    // اینجا درخواست به API ارسال شود
  }
}
