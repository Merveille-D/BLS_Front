import { cn } from "@/lib/utils";
export default function EllipsisLoader({ size = 13, color = "#fff" }) {
  return (
    <span
      className="relative w-20"
      style={{
        height: `${size}px`,
      }}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cn("absolute rounded-full", {
            "animate-ellipsis-loader-1": i === 0,
            "animate-ellipsis-loader-2": i === 1 || i === 2,
            "left-2": i === 0 || i === 1,
            "left-8": i === 2,
          })}
          style={{
            height: `${size}px`,
            width: `${size}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </span>
  );
}
