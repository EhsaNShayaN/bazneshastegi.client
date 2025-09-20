import {FlatTreeControl} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Tree} from '../../core/models/MenusResponse';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  title: string;
  level: number;
  id: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TreeViewComponent implements OnInit {
  @Input() selectedId: number = 0;
  @Input() data: Tree[] = [];
  @Output() onItemClicked = new EventEmitter<Tree>();
  @Input() marginClass: string = 'mr-5';
  private _transformer = (node: Tree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node.title,
      level: level,
      id: node.id
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
    this.dataSource.data = this.data;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  nodeSelect(node: any) {
    this.onItemClicked.emit(node);
  }
}
