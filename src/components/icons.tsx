export function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  const left = direction === "left";

  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className={`btn-arrow size-4 shrink-0 ${left ? "btn-arrow-left" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {left ? <path d="M13 8H3M7 4 3 8l4 4" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2.5v7M5.5 7 8 9.5 10.5 7M3.5 13h9" />
    </svg>
  );
}
