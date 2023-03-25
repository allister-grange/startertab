import { atom } from "recoil";

export const accordionIndex = atom({
  key: "AccordionIndex",
  default: [] as number[],
});

export const settingsSidebarSate = atom({
  key: "SidebarOpen",
  default: false,
});
