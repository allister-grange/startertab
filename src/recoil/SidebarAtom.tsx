import { atom } from "recoil";

export const accordionOpenIndex = atom({
  key: "AccordionOpenIndex",
  default: [] as number[],
});

export const settingsSidebarSate = atom({
  key: "SidebarOpen",
  default: false,
});
