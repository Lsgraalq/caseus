import { Locale } from "@/utils/translations";

export interface MenuItemText {
  text: string;
  href: string;
}

export interface MenuItemLang {
  lang: {
    from: string;
    to: string;
    link: string;
    flagSrc: string;
  };
}

export type MenuItem = MenuItemText | MenuItemLang;
