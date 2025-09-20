import {Component, DoCheck, Injector, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {mobileValidator} from '../../core/utils/app-validators';
import {Pagination} from '../../core/models/Pagination';
import {Comment} from '../../core/models/CommentResponse';
import {AppSettings, Settings} from '../../app.settings';
import {PureComponent} from '../../pure-component';
import {Tables} from '../../core/constants/server.constants';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
  standalone: false
})
export class Comments extends PureComponent implements OnInit, DoCheck {
  @Input() relatedId: number = 0;
  @Input() tableId: number = 0;
  public commentForm!: UntypedFormGroup;
  public ratings = [
    {title: 'Very Dissatisfied', icon: 'sentiment_very_dissatisfied', percentage: 20, selected: false},
    {title: 'Dissatisfied', icon: 'sentiment_dissatisfied', percentage: 40, selected: false},
    {title: 'Neutral', icon: 'sentiment_neutral', percentage: 60, selected: false},
    {title: 'Satisfied', icon: 'sentiment_satisfied', percentage: 80, selected: false},
    {title: 'Very Satisfied', icon: 'sentiment_very_satisfied', percentage: 100, selected: false}
  ];
  public settings: Settings;
  public items: Comment[] = [];
  public count: number = 12;
  public pagination: Pagination = new Pagination(1, this.count, null, 2, 0, 0);

  constructor(private toaster: ToastrService,
              public appSettings: AppSettings,
              public fb: UntypedFormBuilder,
              public authService: AuthService) {
    super();
    this.settings = appSettings.settings;
  }

  ngOnInit() {
    this.getItems(this.relatedId);
    this.commentForm = this.fb.group({
      description: [null, Validators.required],
      mobile: [null, this.authService.isLoggedIn() ? null : Validators.compose([Validators.required, mobileValidator])],
      icon: null,
      relatedId: this.relatedId,
      tableId: this.tableId,
      tableName: null,
    });
  }

  public getItems(id: number) {
    const model = {
      page: this.pagination.page,
      pageSize: this.pagination.perPage,
      sort: 1,
      id: this.relatedId
    };
    /*this.restClientService.getComments(model).subscribe((result: CommentResponse) => {
      if (this.items && this.items.length > 0) {
        this.settings.loadMore.page++;
        this.pagination.page = this.settings.loadMore.page;
      }
      if (result.data.length == 0) {
        this.items.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        return false;
      }
      if (this.items && this.items.length > 0) {
        this.items = this.items.concat(result.data);
      } else {
        this.items = result.data;
      }
      this.pagination = {
        page: result.pageNumber + 1,
        perPage: result.pageSize,
        prePage: result.pageNumber - 1 ? result.pageNumber - 1 : null,
        nextPage: (result.totalPages > result.pageNumber) ? result.pageNumber + 1 : null,
        total: result.totalCount,
        totalPages: result.totalPages,
      };
      if (this.items.length == this.pagination.total) {
        this.settings.loadMore.complete = true;
        this.settings.loadMore.result = this.items.length;
      } else {
        this.settings.loadMore.complete = false;
      }
      return true;
    });*/
  }

  ngDoCheck() {
    if (this.settings.loadMore.load) {
      this.settings.loadMore.load = false;
      this.getItems(this.relatedId);
    }
  }

  public onCommentFormSubmit(values: any) {
    let enumKey = Tables[this.tableId];
    values.tableName = enumKey = enumKey.substring(0, 1).toUpperCase() + enumKey.substring(1, enumKey.length);
    if (this.commentForm?.valid) {
      /*this.restClientService.addComment(values).subscribe((c: Comment) => {
        this.items.splice(0, 0, c);
        this.toaster.success('نظر شما با موفقیت ثبت گردید.', '', {});
      });*/
    }
  }

  public rate(rating: any) {
    this.ratings.filter(r => r.selected = false);
    this.ratings.filter(r => r.percentage === rating.percentage)[0].selected = true;
    this.commentForm?.controls['icon'].setValue(rating.icon);
  }
}
