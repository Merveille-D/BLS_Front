import dynamic from "next/dynamic";
export const NoSsr = dynamic(
  () => Promise.resolve(({ children }) => children),
  { ssr: false },
);
