export type EventItem = {
  kind: string;
  title: string;
  date: string;
  place: string;
};

export const events: EventItem[] = [
  {
    kind: "Lorem",
    title: "Lorem ipsum dolor sit",
    date: "Tempor incididunt",
    place: "Ut labore et dolore",
  },
  {
    kind: "Ipsum",
    title: "Consectetur adipiscing elit",
    date: "Magna aliqua",
    place: "Quis nostrud exercitation",
  },
  {
    kind: "Dolor",
    title: "Sed do eiusmod tempor",
    date: "Ut enim ad minim",
    place: "Ullamco laboris nisi",
  },
];
