export type UnpublishedProject = {
  title: string;
  year: string;
  tag: string;
  description: string;
  imagePath: string;
};

export const unpublishedMobileProjects: UnpublishedProject[] = [
  {
    title: "Kidcoder",
    year: "2025",
    tag: "EdTech",
    description:
      "A playful coding app that introduces kids to programming through gamified lessons, streaks, and progress milestones.",
    imagePath: "/brand/work%20img.png",
  },
  {
    title: "Villascape",
    year: "2025",
    tag: "Real Estate",
    description:
      "A clean real-estate interface concept for browsing listings, scanning property details, and booking inspections quickly.",
    imagePath: "/brand/work%20img.png",
  },
];
