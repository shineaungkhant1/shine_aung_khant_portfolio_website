type DayStat = {
  day: string;
  views: number;
  visitors: number;
};

function shortLabel(day: string) {
  const date = new Date(`${day}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

function fillLast7Days(days: DayStat[]): DayStat[] {
  if (days.length > 0) {
    return days;
  }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (6 - index));
    return {
      day: date.toISOString().slice(0, 10),
      views: 0,
      visitors: 0,
    };
  });
}

export function VisitorsChart({ days }: { days: DayStat[] }) {
  const series = fillLast7Days(days);
  const max = Math.max(1, ...series.flatMap((day) => [day.views, day.visitors]));

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <p className="text-sm font-medium text-ink">Last 7 days</p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-ink" />
            Views
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-ink/35" />
            Visitors
          </span>
        </div>
      </div>

      <div className="mt-5 grid h-48 grid-cols-7 items-end gap-2 sm:gap-3">
        {series.map((day) => {
          const viewsHeight = Math.max(day.views > 0 ? 8 : 2, (day.views / max) * 100);
          const visitorsHeight = Math.max(day.visitors > 0 ? 8 : 2, (day.visitors / max) * 100);
          return (
            <div key={day.day} className="flex h-full flex-col items-center justify-end gap-2">
              <div
                className="flex h-full w-full items-end justify-center gap-1"
                title={`${day.day}: ${day.views} views, ${day.visitors} visitors`}
              >
                <span
                  className="w-[42%] rounded-t-md bg-ink transition-[height]"
                  style={{ height: `${viewsHeight}%` }}
                />
                <span
                  className="w-[42%] rounded-t-md bg-ink/35 transition-[height]"
                  style={{ height: `${visitorsHeight}%` }}
                />
              </div>
              <span className="text-[11px] tracking-wide text-muted uppercase">{shortLabel(day.day)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
