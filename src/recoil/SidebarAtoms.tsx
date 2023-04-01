import { atom } from "recoil";

export const accordionOpenIndex = atom({
  key: "AccordionOpenIndex",
  default: [] as number[],
});

export const sidebarOpenAtom = atom({
  key: "SidebarOpen",
  default: false,
});

export const tutorialProgressAtom = atom({
  key: "TutorialProgress",
  default: -1,
});
