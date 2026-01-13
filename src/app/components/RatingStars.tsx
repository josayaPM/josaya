export default function RatingStars({
  value,
  size = "md",
}: {
  value: number; // 1..5 (oder 0..5)
  size?: "sm" | "md" | "lg";
}) {
  const v = Math.max(0, Math.min(5, value));
  const filled = Math.round(v); // bei Einzel-Ratings: 1..5

  const sizeCls = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-lg";

  const color =
    v <= 1 ? "text-red-600" :
    v <= 2 ? "text-orange-500" :
    v <= 3 ? "text-yellow-500" :
    v < 4.5 ? "text-green-500" :
    "text-emerald-700";

  return (
    <span className={`inline-flex items-center gap-0.5 ${sizeCls} ${color}`} aria-label={`${v} von 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < filled ? "" : "text-slate-300"}>
          ★
        </span>
      ))}
    </span>
  );
}