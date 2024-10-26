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
