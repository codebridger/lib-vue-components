import {
  HorizontalMenuGroupType,
  HorizontalMenuItemType,
} from "@/types/horizontal-menu.type";
import { SidebarItemType, SidebarGroupType } from "@/types/sidebar.type";

export const sidebarData: (SidebarGroupType | SidebarItemType)[] = [
  {
    title: "",
    children: [
      {
        title: "dashboard",
        icon: "icon-menu-dashboard",
        child: [
          { title: "sales", to: "/", child: [] },
          { title: "analytics", to: "/", child: [] },
          { title: "finance", to: "/", child: [] },
          { title: "crypto", to: "/", child: [] },
        ],
      },
    ],
  },
  {
    title: "apps",
    children: [
      {
        title: "chat",

        icon: "icon-menu-chat",
        to: "/",
      },
      {
        title: "mailbox",

        icon: "icon-menu-mailbox",
        to: "/",
      },
      {
        title: "todo_list",

        icon: "icon-menu-todo",
        to: "/",
      },
      {
        title: "notes",

        icon: "icon-menu-notes",
        to: "/",
      },
      {
        title: "scrumboard",

        icon: "icon-menu-scrumboard",
        to: "/",
      },
      {
        title: "contacts",

        icon: "icon-menu-contacts",
        to: "/",
      },
      {
        title: "invoice",

        icon: "icon-menu-invoice",
        child: [
          { title: "list", to: "/", child: [] },
          {
            title: "preview",

            to: "/",
          },
          { title: "add", to: "/", child: [] },
          { title: "edit", to: "/", child: [] },
        ],
      },
      {
        title: "calendar",

        icon: "icon-menu-calendar",
        to: "/",
      },
    ],
  },

  {
    title: "user_interface",
    children: [
      {
        title: "components",

        icon: "icon-menu-components",
        child: [
          { title: "tabs", to: "/", child: [] },
          {
            title: "accordions",

            to: "/",
          },
          { title: "modals", to: "/", child: [] },
          { title: "cards", to: "/", child: [] },
          {
            title: "carousel",

            to: "/",
          },
          {
            title: "countdown",

            to: "/",
          },
          { title: "counter", to: "/", child: [] },
          {
            title: "sweet_alerts",

            to: "/",
          },
          {
            title: "timeline",

            to: "/",
          },
          {
            title: "notifications",

            to: "/",
          },
          {
            title: "media_object",

            to: "/",
          },
          {
            title: "list_group",

            to: "/",
          },
          {
            title: "pricing_tables",

            to: "/",
          },
          {
            title: "lightbox",

            to: "/",
          },
        ],
      },
      {
        title: "elements",

        icon: "icon-menu-elements",
        child: [
          { title: "alerts", to: "/", child: [] },
          { title: "avatar", to: "/", child: [] },
          { title: "badges", to: "/", child: [] },
          {
            title: "breadcrumbs",

            to: "/",
          },
          { title: "buttons", to: "/", child: [] },
          {
            title: "button_groups",

            to: "/",
          },
          {
            title: "color_library",

            to: "/",
          },
          { title: "dropdown", to: "/", child: [] },
          { title: "infobox", to: "/", child: [] },
          {
            title: "jumbotron",

            to: "/",
          },
          { title: "loader", to: "/", child: [] },
          {
            title: "pagination",

            to: "/",
          },
          { title: "popovers", to: "/", child: [] },
          {
            title: "progress_bar",

            to: "/",
          },
          { title: "search", to: "/", child: [] },
          { title: "tooltips", to: "/", child: [] },
          { title: "treeview", to: "/", child: [] },
          {
            title: "typography",

            to: "/",
          },
        ],
      },
      {
        title: "charts",

        icon: "icon-menu-charts",
        to: "/",
      },
      {
        title: "widgets",

        icon: "icon-menu-widgets",
        to: "/",
      },
      {
        title: "font_icons",

        icon: "icon-menu-font-icons",
        to: "/",
      },
      {
        title: "drag_and_drop",

        icon: "icon-menu-drag-and-drop",
        to: "/",
      },
    ],
  },

  {
    title: "tables_and_forms",
    children: [
      {
        title: "tables",

        icon: "icon-menu-tables",
        to: "/",
      },
      {
        title: "datatables",

        icon: "icon-menu-datatables",
        child: [
          { title: "basic", to: "/", child: [] },
          {
            title: "advanced",

            to: "/",
          },
          { title: "skin", to: "/", child: [] },
          {
            title: "order_sorting",

            to: "/",
          },
          {
            title: "columns_filter",

            to: "/",
          },
          {
            title: "multi_column",

            to: "/",
          },
          {
            title: "multiple_tables",

            to: "/",
          },
          {
            title: "alt_pagination",

            to: "/",
          },
          {
            title: "checkbox",

            to: "/",
          },
          {
            title: "range_search",

            to: "/",
          },
          { title: "export", to: "/", child: [] },
          {
            title: "sticky_header",

            to: "/",
          },
          {
            title: "clone_header",

            to: "/",
          },
          {
            title: "column_chooser",

            to: "/",
          },
        ],
      },
      {
        title: "forms",

        icon: "icon-menu-forms",
        child: [
          { title: "basic", to: "/", child: [] },
          {
            title: "input_group",

            to: "/",
          },
          { title: "layouts", to: "/", child: [] },
          { title: "validation", to: "/", child: [] },
          { title: "input_mask", to: "/", child: [] },
          { title: "select2", to: "/", child: [] },
          { title: "touchspin", to: "/", child: [] },
          {
            title: "checkbox_and_radio",

            to: "/",
          },
          { title: "switches", to: "/", child: [] },
          { title: "wizards", to: "/", child: [] },
          {
            title: "file_upload",

            to: "/",
          },
          {
            title: "quill_editor",

            to: "/",
          },
          {
            title: "markdown_editor",

            to: "/",
          },
          {
            title: "date_and_range_picker",

            to: "/",
          },
          { title: "clipboard", to: "/forms/clipboard", child: [] },
        ],
      },
    ],
  },

  {
    title: "user_and_pages",
    children: [
      {
        title: "users",

        icon: "icon-menu-users",
        child: [
          { title: "profile", to: "/users/profile", child: [] },
          {
            title: "account_settings",

            to: "/",
          },
        ],
      },
      {
        title: "pages",

        icon: "icon-menu-pages",
        child: [
          {
            title: "knowledge_base",

            to: "/",
          },
          {
            title: "contact_us_boxed",

            to: "/",
            target: "_blank",
          },
          {
            title: "contact_us_cover",

            to: "/",
            target: "_blank",
          },
          { title: "faq", to: "/pages/faq", child: [] },
          {
            title: "coming_soon_boxed",

            to: "/",
            target: "_blank",
          },
          {
            title: "coming_soon_cover",

            to: "/",
            target: "_blank",
          },
          {
            title: "error",

            child: [
              {
                title: "404",

                to: "/",
                target: "_blank",
              },
              {
                title: "500",

                to: "/",
                target: "_blank",
              },
              {
                title: "503",

                to: "/",
                target: "_blank",
              },
            ],
          },
          {
            title: "maintenence",

            to: "/",
            target: "_blank",
          },
        ],
      },
      {
        title: "authentication",

        icon: "icon-menu-authentication",
        child: [
          {
            title: "login_boxed",

            to: "/",
            target: "_blank",
          },
          {
            title: "register_boxed",

            to: "/",
            target: "_blank",
          },
          {
            title: "unlock_boxed",

            to: "/",
            target: "_blank",
          },
          {
            title: "recover_id_boxed",

            to: "/",
            target: "_blank",
          },
          {
            title: "login_cover",

            to: "/",
            target: "_blank",
          },
          {
            title: "register_cover",

            to: "/",
            target: "_blank",
          },
          {
            title: "unlock_cover",

            to: "/",
            target: "_blank",
          },
          {
            title: "recover_id_cover",

            to: "/",
            target: "_blank",
          },
        ],
      },
    ],
  },

  {
    title: "supports",
    children: [
      {
        title: "documentation",

        icon: "icon-menu-documentation",
        to: "https://vristo.sbthemes.com",
        target: "_blank",
      },
    ],
  },
];

export const horizontalMenuItems: Array<HorizontalMenuGroupType> = [
  {
    title: "dashboard",
    icon: "icon-menu-dashboard",
    children: [
      { title: "sales", to: "/" },
      { title: "analytics", to: "/analytics" },
      { title: "finance", to: "/finance" },
      { title: "crypto", to: "/crypto" },
    ],
  },
  {
    title: "apps",
    icon: "icon-menu-apps",
    children: [
      { title: "chat", to: "/apps/chat" },
      { title: "mailbox", to: "/apps/mailbox" },
      { title: "todo_list", to: "/apps/todolist" },
      { title: "notes", to: "/apps/notes" },
      { title: "scrumboard", to: "/apps/scrumboard" },
      { title: "contacts", to: "/apps/contacts" },
      {
        title: "invoice",
        child: [
          { title: "list", to: "/apps/invoice/list" },
          { title: "preview", to: "/apps/invoice/preview" },
          { title: "add", to: "/apps/invoice/add" },
          { title: "edit", to: "/apps/invoice/edit" },
        ],
      },
      { title: "calendar", to: "/apps/calendar" },
    ],
  },
  {
    title: "components",
    icon: "icon-menu-components",
    children: [
      { title: "tabs", to: "/components/tabs" },
      { title: "accordions", to: "/components/accordions" },
      { title: "modals", to: "/components/modals" },
      { title: "cards", to: "/components/cards" },
      { title: "carousel", to: "/components/carousel" },
      { title: "countdown", to: "/components/countdown" },
      { title: "counter", to: "/components/counter" },
      { title: "sweet_alerts", to: "/components/sweetalert" },
      { title: "timeline", to: "/components/timeline" },
      { title: "notifications", to: "/components/notifications" },
      { title: "media_object", to: "/components/media-object" },
      { title: "list_group", to: "/components/list-group" },
      { title: "pricing_tables", to: "/components/pricing-table" },
      { title: "lightbox", to: "/components/lightbox" },
    ],
  },
  {
    title: "elements",
    icon: "icon-menu-elements",
    children: [
      { title: "alerts", to: "/elements/alerts" },
      { title: "avatar", to: "/elements/avatar" },
      { title: "badges", to: "/elements/badges" },
      { title: "breadcrumbs", to: "/elements/breadcrumbs" },
      { title: "buttons", to: "/elements/buttons" },
      { title: "button_groups", to: "/elements/buttons-group" },
      { title: "color_library", to: "/elements/color-library" },
      { title: "dropdown", to: "/elements/dropdown" },
      { title: "infobox", to: "/elements/infobox" },
      { title: "jumbotron", to: "/elements/jumbotron" },
      { title: "loader", to: "/elements/loader" },
      { title: "pagination", to: "/elements/pagination" },
      { title: "popovers", to: "/elements/popovers" },
      { title: "progress_bar", to: "/elements/progress-bar" },
      { title: "search", to: "/elements/search" },
      { title: "tooltips", to: "/elements/tooltips" },
      { title: "treeview", to: "/elements/treeview" },
      { title: "typography", to: "/elements/typography" },
    ],
  },
  {
    title: "tables",
    icon: "icon-menu-datatables",
    children: [
      { title: "tables", to: "/tables" },
      {
        title: "datatables",
        child: [
          { title: "basic", to: "/datatables/basic" },
          { title: "advanced", to: "/datatables/advanced" },
          { title: "skin", to: "/datatables/skin" },
          { title: "order_sorting", to: "/datatables/order-sorting" },
          { title: "columns_filter", to: "/datatables/columns-filter" },
          { title: "multi_column", to: "/datatables/multi-column" },
          { title: "multiple_tables", to: "/datatables/multiple-tables" },
          { title: "alt_pagination", to: "/datatables/alt-pagination" },
          { title: "checkbox", to: "/datatables/checkbox" },
          { title: "range_search", to: "/datatables/range-search" },
          { title: "export", to: "/datatables/export" },
          { title: "sticky_header", to: "/datatables/sticky-header" },
          { title: "clone_header", to: "/datatables/clone-header" },
          { title: "column_chooser", to: "/datatables/column-chooser" },
        ],
      },
    ],
  },
  {
    title: "forms",
    icon: "icon-menu-forms",
    children: [
      { title: "basic", to: "/forms/basic" },
      { title: "input_group", to: "/forms/input-group" },
      { title: "layouts", to: "/forms/layouts" },
      { title: "validation", to: "/forms/validation" },
      { title: "input_mask", to: "/forms/input-mask" },
      { title: "select2", to: "/forms/select2" },
      { title: "touchspin", to: "/forms/touchspin" },
      { title: "checkbox_and_radio", to: "/forms/checkbox-radio" },
      { title: "switches", to: "/forms/switches" },
      { title: "wizards", to: "/forms/wizards" },
      { title: "file_upload", to: "/forms/file-upload" },
      { title: "quill_editor", to: "/forms/quill-editor" },
      { title: "markdown_editor", to: "/forms/markdown-editor" },
      { title: "date_and_range_picker", to: "/forms/date-picker" },
      { title: "clipboard", to: "/forms/clipboard" },
    ],
  },
  {
    title: "pages",
    icon: "icon-menu-pages",
    children: [
      {
        title: "users",
        child: [
          { title: "profile", to: "/users/profile" },
          { title: "account_settings", to: "/users/user-account-settings" },
        ],
      },
      { title: "knowledge_base", to: "/pages/knowledge-base" },
      {
        title: "contact_us_boxed",
        to: "/pages/contact-us-boxed",
        target: "_blank",
      },
      {
        title: "contact_us_cover",
        to: "/pages/contact-us-cover",
        target: "_blank",
      },
      { title: "FAQ", to: "/pages/faq" },
      {
        title: "coming_soon_boxed",
        to: "/pages/coming-soon-boxed",
        target: "_blank",
      },
      {
        title: "coming_soon_cover",
        to: "/pages/coming-soon-cover",
        target: "_blank",
      },
      { title: "maintenence", to: "/pages/maintenence", target: "_blank" },
      {
        title: "error",
        child: [
          { title: "404", to: "/pages/error404", target: "_blank" },
          { title: "500", to: "/pages/error500", target: "_blank" },
          { title: "503", to: "/pages/error503", target: "_blank" },
        ],
      },
      {
        title: "login",
        child: [
          { title: "login_cover", to: "/auth/cover-login", target: "_blank" },
          { title: "login_boxed", to: "/auth/boxed-signin", target: "_blank" },
        ],
      },
      {
        title: "register",
        child: [
          {
            title: "register_cover",
            to: "/auth/cover-register",
            target: "_blank",
          },
          {
            title: "register_boxed",
            to: "/auth/boxed-signup",
            target: "_blank",
          },
        ],
      },
      {
        title: "password_recovery",
        child: [
          {
            title: "recover_id_cover",
            to: "/auth/cover-password-reset",
            target: "_blank",
          },
          {
            title: "recover_id_boxed",
            to: "/auth/boxed-password-reset",
            target: "_blank",
          },
        ],
      },
      {
        title: "lockscreen",
        child: [
          {
            title: "unlock_cover",
            to: "/auth/cover-lockscreen",
            target: "_blank",
          },
          {
            title: "unlock_boxed",
            to: "/auth/boxed-lockscreen",
            target: "_blank",
          },
        ],
      },
    ],
  },
  {
    title: "more",
    icon: "icon-menu-more",
    children: [
      { title: "drag_and_drop", to: "/dragndrop" },
      { title: "charts", to: "/charts" },
      { title: "font_icons", to: "/font-icons" },
      { title: "widgets", to: "/widgets" },
      {
        title: "documentation",
        to: "https://vristo.sbthemes.com",
        target: "_blank",
      },
    ],
  },
];
