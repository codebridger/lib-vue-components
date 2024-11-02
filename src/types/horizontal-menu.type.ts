export interface HorizontalMenuGroupType {
  title?: string;
  icon?: string;
  children: HorizontalMenuItemType[];
}

export interface HorizontalMenuItemType {
  title: string;
  icon?: string;
  to?: string;
  target?: string;
  /**
   * Only 2 levels of nesting are supported: root->su1->su2
   */
  child?: HorizontalMenuItemType[];
}
