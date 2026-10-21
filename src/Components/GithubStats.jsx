import { useEffect, useMemo, useState } from "react";

const ACCENT = "#525f71";
// Empty cell first, then five steps built around the accent.
const LEVELS = ["rgba(60, 61, 90, 0.33)", "#3d434c", ACCENT, "#5c7795", "#4A7FBF"];
const CELL = 12;
const GAP = 3;

function buildWeeks(contributions) {
  if (contributions.length === 0) return [];

  // Pad the first week so Sunday sits in the top row.
  const firstDate = new Date(`${contributions[0].date}T00:00:00`);
  const leading = firstDate.getDay();
  const cells = [...Array(leading).fill(null), ...contributions];

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  const lastWeek = weeks[weeks.length - 1];
  while (lastWeek.length < 7) lastWeek.push(null);

  return weeks;
}

export default function GithubContributions({ username = "kalerkaler", onTotal }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();

    setData(null);
    setError(null);

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username
      )}?y=last`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      }).then(json => {
        setData(json);
        if (onTotal && json.total) onTotal(json.total);
        console.log(json.total);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      });

    return () => controller.abort();
  }, [username]);

  const weeks = useMemo(
    () => (data ? buildWeeks(data.contributions) : []),
    [data]
  );

  if (error) {
    return <p style={{ color: "#6B7280", fontSize: 13 }}>{error}</p>;
  }

  if (!data) {
    return <p style={{ color: "#6B7280", fontSize: 13 }}>Loading…</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        role="img"
        aria-label={`Contribution graph for ${username}`}
        style={{ borderCollapse: "separate", borderSpacing: GAP }}
      >
        <tbody>
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <tr key={dayIndex}>
              {weeks.map((week, weekIndex) => {
                const day = week[dayIndex];
                return (
                  <td
                    key={weekIndex}
                    title={
                      day
                        ? `${day.count} contribution${
                            day.count === 1 ? "" : "s"
                          } on ${day.date}`
                        : undefined
                    }
                    style={{
                      width: CELL,
                      height: CELL,
                      minWidth: CELL,
                      padding: 0,
                      borderRadius: 3,
                      background: day ? LEVELS[day.level] ?? LEVELS[0] : "transparent",
                    }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 4,
            marginTop: 8,
            fontSize: 12,
            color: "#6B7280",
          }}
        >
        <span style={{ marginRight: 4 }}>Less</span>
        {LEVELS.map((color, i) => (
          <span
            key={i}
            style={{
              width: CELL,
              height: CELL,
              borderRadius: 3,
              background: color,
              display: "inline-block",
            }}
          />
        ))}
        <span style={{ marginLeft: 4 }}>More</span>
      </div>
    </div>
  );
}