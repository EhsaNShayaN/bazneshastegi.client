export interface MenusResponse {
  categories: ServerMenu[];
}

export interface ServerMenu extends BaseMenu {
  href: string;
}

export interface BaseMenu {
  id: string;
  title: string;
  name: string;
  parentId: string;
  parentName: string;
  code: string;
  ordinal: number;
  creationDate: Date;
}

export interface Tree {
  id: number;
  title: string;
  children?: Tree[];
}

export function createTree(data: any) {
  let menus = data.filter((s: any) => s.parentId === null);
  if (menus?.length === 0) {
    menus = data;
  }
  const temp: Tree[] = [];
  menus.forEach((s: any, i: number) => {
    temp.push({id: s.id, title: s.title, children: getChildren(data, s)});
  });
  return temp;
}

export function getChildren(data: any, menu: ServerMenu): Tree[] {
  const temp: Tree[] = [];
  data.filter((s: any) => s.parentId === menu.id).forEach((s: any, i: number) => {
    temp.push({id: s.id, title: s.title, children: getChildren(data, s)});
  });
  return temp;
}
