import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import {MatDivider, MatList, MatListItem, MatListModule, MatNavList} from '@angular/material/list';
import {MatCard, MatCardActions, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {CommentForm} from './components/comment-form/comment-form';
import {TreeViewComponent} from './tree-view/tree-view.component';
import {MatTooltip} from '@angular/material/tooltip';
import {CustomCurrencyPipe} from '../core/pipes/custom-currency.pipe';
import {SafeHtmlPipe} from '../core/pipes/safe-html.pipe';
import {ReplaceUrlSpacesPipe} from '../core/pipes/replace-url-spaces.pipe';
import {DirectivesModule} from '../core/directives/directives.module';
import {LoadMoreComponent} from './load-more/load-more.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';
import {Comments} from './comments/comments';
import {DefaultClassDirective, DefaultFlexDirective, DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultShowHideDirective} from 'ngx-flexible-layout';
import {ToastrModule} from 'ngx-toastr';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {JalaliMomentDateAdapter, PERSIAN_DATE_FORMATS} from '../core/custom-date-adapter';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    CommentForm,
    /////////////////
    CustomCurrencyPipe,
    SafeHtmlPipe,
    ReplaceUrlSpacesPipe,
    LoadMoreComponent,
    Comments,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    /////////////////
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    //////////////////////
    DefaultShowHideDirective,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSidenavContainer,
    MatNavList,
    MatSidenav,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatSidenavContent,
    MatTooltip,
    MatCardActions,
    MatProgressSpinner,
    MatChipListbox,
    MatChipOption,
    MatList,
    MatDivider,
    MatOption,
    MatSelect,
    MatCheckbox,
    //////////////////////
    DefaultFlexDirective,
    DefaultClassDirective,
    DefaultLayoutDirective,
    DefaultLayoutAlignDirective,
    TreeViewComponent,
    //////////////////////
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatPaginator,
    MatError,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    CustomCurrencyPipe,
    SafeHtmlPipe,
    ReplaceUrlSpacesPipe,
    LoadMoreComponent,
    Comments,
    MatDatepickerModule,
    MatNativeDateModule,
    //////////////////////
    DefaultShowHideDirective,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSidenavContainer,
    MatNavList,
    MatSidenav,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatSidenavContent,
    MatTooltip,
    MatCardActions,
    MatProgressSpinner,
    MatChipListbox,
    MatChipOption,
    MatList,
    MatDivider,
    MatOption,
    MatSelect,
    MatCheckbox,
    //////////////////////
    DefaultFlexDirective,
    DefaultClassDirective,
    DefaultLayoutDirective,
    DefaultLayoutAlignDirective,
    TreeViewComponent,
    CommentForm,
    //////////////////////
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatPaginator,
    MatError,
  ],
  providers: [
    CustomCurrencyPipe,
    provideNativeDateAdapter(), // 👈 required
    {provide: MAT_DATE_LOCALE, useValue: 'fa-IR'},
    {provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
  ],
})
export class SharedModule {
}
