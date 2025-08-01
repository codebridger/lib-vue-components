import { describe, it, expect } from "vitest";
import { sidebarData, horizontalMenuItems } from "@/shell/sidebar-data";

describe("Sidebar Data", () => {
  describe("sidebarData", () => {
    it("exports an array", () => {
      expect(Array.isArray(sidebarData)).toBe(true);
    });

    it("has the correct number of main groups", () => {
      expect(sidebarData).toHaveLength(6);
    });

    it("has the expected group titles", () => {
      const titles = sidebarData.map(group => group.title);
      expect(titles).toEqual(["", "apps", "user_interface", "tables_and_forms", "user_and_pages", "supports"]);
    });

    it("has children in each group", () => {
      sidebarData.forEach(group => {
        expect(group.children).toBeDefined();
        expect(Array.isArray(group.children)).toBe(true);
        expect(group.children.length).toBeGreaterThan(0);
      });
    });

    it("has valid menu items with required properties", () => {
      sidebarData.forEach(group => {
        group.children?.forEach(item => {
          expect(item.title).toBeDefined();
          expect(typeof item.title).toBe("string");
          expect(item.title.length).toBeGreaterThan(0);
          
          if (item.icon) {
            expect(typeof item.icon).toBe("string");
          }
          
          if (item.to) {
            expect(typeof item.to).toBe("string");
          }
          
          if (item.child) {
            expect(Array.isArray(item.child)).toBe(true);
          }
        });
      });
    });

    it("has nested children with valid structure", () => {
      sidebarData.forEach(group => {
        group.children?.forEach(item => {
          if (item.child) {
            item.child.forEach(child => {
              expect(child.title).toBeDefined();
              expect(typeof child.title).toBe("string");
              
              if (child.to) {
                expect(typeof child.to).toBe("string");
              }
              
              if (child.child) {
                expect(Array.isArray(child.child)).toBe(true);
              }
            });
          }
        });
      });
    });

    it("has dashboard group as first item", () => {
      const firstGroup = sidebarData[0];
      expect(firstGroup.title).toBe("");
      expect(firstGroup.children?.[0]?.title).toBe("dashboard");
    });

    it("has apps group with correct items", () => {
      const appsGroup = sidebarData.find(group => group.title === "apps");
      expect(appsGroup).toBeDefined();
      expect(appsGroup?.children).toBeDefined();
      
      const appTitles = appsGroup?.children?.map(item => item.title);
      expect(appTitles).toContain("chat");
      expect(appTitles).toContain("mailbox");
      expect(appTitles).toContain("todo_list");
      expect(appTitles).toContain("notes");
      expect(appTitles).toContain("scrumboard");
      expect(appTitles).toContain("contacts");
      expect(appTitles).toContain("invoice");
      expect(appTitles).toContain("calendar");
    });

    it("has user_interface group with components and elements", () => {
      const uiGroup = sidebarData.find(group => group.title === "user_interface");
      expect(uiGroup).toBeDefined();
      
      const uiTitles = uiGroup?.children?.map(item => item.title);
      expect(uiTitles).toContain("components");
      expect(uiTitles).toContain("elements");
      expect(uiTitles).toContain("charts");
      expect(uiTitles).toContain("widgets");
      expect(uiTitles).toContain("font_icons");
      expect(uiTitles).toContain("drag_and_drop");
    });

    it("has tables_and_forms group", () => {
      const tablesGroup = sidebarData.find(group => group.title === "tables_and_forms");
      expect(tablesGroup).toBeDefined();
      
      const tableTitles = tablesGroup?.children?.map(item => item.title);
      expect(tableTitles).toContain("tables");
      expect(tableTitles).toContain("datatables");
      expect(tableTitles).toContain("forms");
    });

    it("has user_and_pages group", () => {
      const pagesGroup = sidebarData.find(group => group.title === "user_and_pages");
      expect(pagesGroup).toBeDefined();
      
      const pageTitles = pagesGroup?.children?.map(item => item.title);
      expect(pageTitles).toContain("users");
      expect(pageTitles).toContain("pages");
      expect(pageTitles).toContain("authentication");
    });

    it("has supports group with documentation", () => {
      const supportsGroup = sidebarData.find(group => group.title === "supports");
      expect(supportsGroup).toBeDefined();
      
      const supportTitles = supportsGroup?.children?.map(item => item.title);
      expect(supportTitles).toContain("documentation");
    });
  });

  describe("horizontalMenuItems", () => {
    it("exports an array", () => {
      expect(Array.isArray(horizontalMenuItems)).toBe(true);
    });

    it("has the correct number of main groups", () => {
      expect(horizontalMenuItems).toHaveLength(8);
    });

    it("has the expected group titles", () => {
      const titles = horizontalMenuItems.map(group => group.title);
      expect(titles).toEqual([
        "dashboard",
        "apps", 
        "components",
        "elements",
        "tables",
        "forms",
        "pages",
        "more"
      ]);
    });

    it("has children in each group", () => {
      horizontalMenuItems.forEach(group => {
        expect(group.children).toBeDefined();
        expect(Array.isArray(group.children)).toBe(true);
        expect(group.children.length).toBeGreaterThan(0);
      });
    });

    it("has valid menu items with required properties", () => {
      horizontalMenuItems.forEach(group => {
        group.children?.forEach(item => {
          expect(item.title).toBeDefined();
          expect(typeof item.title).toBe("string");
          expect(item.title.length).toBeGreaterThan(0);
          
          if (item.icon) {
            expect(typeof item.icon).toBe("string");
          }
          
          if (item.to) {
            expect(typeof item.to).toBe("string");
          }
          
          if (item.child) {
            expect(Array.isArray(item.child)).toBe(true);
          }
        });
      });
    });

    it("has dashboard group as first item", () => {
      const firstGroup = horizontalMenuItems[0];
      expect(firstGroup.title).toBe("dashboard");
      expect(firstGroup.icon).toBe("icon-menu-dashboard");
      
      const dashboardTitles = firstGroup.children?.map(item => item.title);
      expect(dashboardTitles).toEqual(["sales", "analytics", "finance", "crypto"]);
    });

    it("has apps group with correct items", () => {
      const appsGroup = horizontalMenuItems.find(group => group.title === "apps");
      expect(appsGroup).toBeDefined();
      expect(appsGroup?.icon).toBe("icon-menu-apps");
      
      const appTitles = appsGroup?.children?.map(item => item.title);
      expect(appTitles).toContain("chat");
      expect(appTitles).toContain("mailbox");
      expect(appTitles).toContain("todo_list");
      expect(appTitles).toContain("notes");
      expect(appTitles).toContain("scrumboard");
      expect(appTitles).toContain("contacts");
      expect(appTitles).toContain("invoice");
      expect(appTitles).toContain("calendar");
    });

    it("has components group", () => {
      const componentsGroup = horizontalMenuItems.find(group => group.title === "components");
      expect(componentsGroup).toBeDefined();
      expect(componentsGroup?.icon).toBe("icon-menu-components");
      
      const componentTitles = componentsGroup?.children?.map(item => item.title);
      expect(componentTitles).toContain("tabs");
      expect(componentTitles).toContain("accordions");
      expect(componentTitles).toContain("modals");
      expect(componentTitles).toContain("cards");
    });

    it("has elements group", () => {
      const elementsGroup = horizontalMenuItems.find(group => group.title === "elements");
      expect(elementsGroup).toBeDefined();
      expect(elementsGroup?.icon).toBe("icon-menu-elements");
      
      const elementTitles = elementsGroup?.children?.map(item => item.title);
      expect(elementTitles).toContain("alerts");
      expect(elementTitles).toContain("avatar");
      expect(elementTitles).toContain("badges");
      expect(elementTitles).toContain("buttons");
    });

    it("has tables group", () => {
      const tablesGroup = horizontalMenuItems.find(group => group.title === "tables");
      expect(tablesGroup).toBeDefined();
      expect(tablesGroup?.icon).toBe("icon-menu-datatables");
      
      const tableTitles = tablesGroup?.children?.map(item => item.title);
      expect(tableTitles).toContain("tables");
      expect(tableTitles).toContain("datatables");
    });

    it("has forms group", () => {
      const formsGroup = horizontalMenuItems.find(group => group.title === "forms");
      expect(formsGroup).toBeDefined();
      expect(formsGroup?.icon).toBe("icon-menu-forms");
      
      const formTitles = formsGroup?.children?.map(item => item.title);
      expect(formTitles).toContain("basic");
      expect(formTitles).toContain("input_group");
      expect(formTitles).toContain("layouts");
      expect(formTitles).toContain("validation");
    });

    it("has pages group", () => {
      const pagesGroup = horizontalMenuItems.find(group => group.title === "pages");
      expect(pagesGroup).toBeDefined();
      expect(pagesGroup?.icon).toBe("icon-menu-pages");
      
      const pageTitles = pagesGroup?.children?.map(item => item.title);
      expect(pageTitles).toContain("users");
      expect(pageTitles).toContain("knowledge_base");
      expect(pageTitles).toContain("contact_us_boxed");
      expect(pageTitles).toContain("FAQ");
    });

    it("has more group", () => {
      const moreGroup = horizontalMenuItems.find(group => group.title === "more");
      expect(moreGroup).toBeDefined();
      expect(moreGroup?.icon).toBe("icon-menu-more");
      
      const moreTitles = moreGroup?.children?.map(item => item.title);
      expect(moreTitles).toContain("drag_and_drop");
      expect(moreTitles).toContain("charts");
      expect(moreTitles).toContain("font_icons");
      expect(moreTitles).toContain("widgets");
      expect(moreTitles).toContain("documentation");
    });

    it("has nested children with valid structure", () => {
      horizontalMenuItems.forEach(group => {
        group.children?.forEach(item => {
          if (item.child) {
            item.child.forEach(child => {
              expect(child.title).toBeDefined();
              expect(typeof child.title).toBe("string");
              
              if (child.to) {
                expect(typeof child.to).toBe("string");
              }
            });
          }
        });
      });
    });

    it("has items with target property when needed", () => {
      horizontalMenuItems.forEach(group => {
        group.children?.forEach(item => {
          if (item.target) {
            expect(item.target).toBe("_blank");
          }
          
          if (item.child) {
            item.child.forEach(child => {
              if (child.target) {
                expect(child.target).toBe("_blank");
              }
            });
          }
        });
      });
    });
  });

  describe("Data Consistency", () => {
    it("has consistent structure between sidebar and horizontal menu", () => {
      const sidebarTitles = sidebarData.map(group => group.title).filter(title => title !== "");
      const horizontalTitles = horizontalMenuItems.map(group => group.title);
      
      // Check that main sections exist in both
      expect(sidebarTitles).toContain("apps");
      expect(horizontalTitles).toContain("apps");
      
      expect(sidebarTitles).toContain("user_interface");
      expect(horizontalTitles).toContain("components");
      expect(horizontalTitles).toContain("elements");
    });

    it("has valid URLs in menu items", () => {
      const checkUrls = (items: any[]) => {
        items.forEach(item => {
          if (item.to) {
            expect(item.to).toMatch(/^(\/|https?:\/\/)/);
          }
          if (item.child) {
            checkUrls(item.child);
          }
        });
      };
      
      checkUrls(sidebarData.flatMap(group => group.children || []));
      checkUrls(horizontalMenuItems.flatMap(group => group.children || []));
    });

    it("has unique titles within each group", () => {
      const checkUniqueTitles = (items: any[]) => {
        const titles = items.map(item => item.title);
        const uniqueTitles = new Set(titles);
        expect(titles.length).toBe(uniqueTitles.size);
      };
      
      sidebarData.forEach(group => {
        if (group.children) {
          checkUniqueTitles(group.children);
        }
      });
      
      horizontalMenuItems.forEach(group => {
        if (group.children) {
          checkUniqueTitles(group.children);
        }
      });
    });
  });
});