export interface SidebarGroupType {
  title?: string;
  children: SidebarItemType[];
}

export interface SidebarItemType {
  title: string;
  icon?: string;
  to?: string;
  target?: string;
  /**
   * Only 2 levels of nesting are supported: root->su1->su2
   */
  child?: SidebarItemType[];
}
