// Lightweight SVG charts (no extra dependencies). Values are illustrative series
// staff can replace from the Economic Barometer dataset.
const growth = [
  { y: "2019", gdp: -6.3, jobs: -1.2 },
  { y: "2020", gdp: -7.8, jobs: -2.0 },
  { y: "2021", gdp: 8.5, jobs: 1.1 },
  { y: "2022", gdp: 6.1, jobs: 0.9 },
  { y: "2023", gdp: 5.3, jobs: 0.7 },
  { y: "2024", gdp: 2.0, jobs: 0.4 },
  { y: "2025", gdp: 6.0, jobs: 0.8 },
];

export function GrowthChart() {
  const W = 520, H = 280, pad = 32, max = 10, min = -10;
  const x = (i: number) => pad + (i * (W - pad * 2)) / (growth.length - 1);
  const y = (v: number) => pad + ((max - v) * (H - pad * 2)) / (max - min);
  const bw = 22;
  return (
    <figure>
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-display text-lg">Real GDP growth vs formal job growth, %</span>
        <span className="flex gap-4 text-xs text-ink-foreground/70">
          <span className="flex items-center gap-1.5"><i className="h-2 w-3 bg-gold" /> GDP</span>
          <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 bg-accent" /> Formal jobs</span>
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Bar chart: GDP growth rebounded strongly after 2020 while formal job growth stayed below 1.2 percent">
        <line x1={pad} x2={W - pad} y1={y(0)} y2={y(0)} stroke="currentColor" strokeOpacity={0.3} />
        {growth.map((d, i) => (
          <g key={d.y}>
            <rect x={x(i) - bw / 2} width={bw} y={Math.min(y(d.gdp), y(0))} height={Math.abs(y(d.gdp) - y(0))} fill="var(--gold)" opacity={0.9}>
              <title>{`${d.y}: GDP ${d.gdp}%`}</title>
            </rect>
            <text x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="currentColor" opacity={0.6}>{d.y}</text>
          </g>
        ))}
        <polyline fill="none" stroke="var(--accent)" strokeWidth={2.5} points={growth.map((d, i) => `${x(i)},${y(d.jobs)}`).join(" ")} />
        {growth.map((d, i) => <circle key={d.y} cx={x(i)} cy={y(d.jobs)} r={3.5} fill="var(--accent)" />)}
      </svg>
      <p className="mt-3 text-xs text-ink-foreground/50">Source: ZEPARI estimates (illustrative). See the Economic Barometer for official series.</p>
    </figure>
  );
}
