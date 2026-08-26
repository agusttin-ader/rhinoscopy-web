export type Professional = {
  name: string;
  role: string;
  credentials: string;
  initials: string;
};

export const professionals: Professional[] = [
  {
    name: "Lorem Ipsum",
    role: "Lorem",
    credentials:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    initials: "LI",
  },
  {
    name: "Dolor Sit Amet",
    role: "Ipsum",
    credentials:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    initials: "DS",
  },
  {
    name: "Consectetur Elit",
    role: "Dolor",
    credentials:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    initials: "CE",
  },
  {
    name: "Adipiscing Natus",
    role: "Sit",
    credentials:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    initials: "AN",
  },
];
