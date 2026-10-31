// Generates the GitHub profile banner (light and dark) in the portfolio's clay-maquette style.
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1200;
const H = 340;
const S = 23.5;
const C = Math.cos(Math.PI / 6);
const N = Math.sin(Math.PI / 6);
const OX = 915;
const OY = 78;

const iso = (x, y, z = 0) => [OX + (x - y) * C * S, OY + (x + y) * N * S - z * S];
const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function box(x, y, w, d, h, z = 0, cls = '') {
  const top = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const left = [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const right = [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)];
  return `<g class="solid ${cls}"><polygon class="l" points="${pts(left)}"/><polygon class="r" points="${pts(right)}"/><polygon class="t" points="${pts(top)}"/></g>`;
}

function hollow(x, y, w, d, h) {
  const p = (a, b, c) => iso(a, b, c);
  const edges = [
    [p(x, y, h), p(x + w, y, h)], [p(x + w, y, h), p(x + w, y + d, h)], [p(x + w, y + d, h), p(x, y + d, h)], [p(x, y + d, h), p(x, y, h)],
    [p(x, y + d, 0), p(x + w, y + d, 0)], [p(x + w, y, 0), p(x + w, y + d, 0)],
    [p(x, y + d, 0), p(x, y + d, h)], [p(x + w, y + d, 0), p(x + w, y + d, h)], [p(x + w, y, 0), p(x + w, y, h)]
  ];
  return `<g class="hollow">${edges.map(([a, b]) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}"/>`).join('')}</g>`;
}

const topCenter = (x, y, w, d, h, z = 0) => iso(x + w / 2, y + d / 2, z + h);

function scene() {
  const parts = [];
  parts.push(box(-1, -1, 12, 9, 0.35, -0.35, 'base'));
  parts.push(hollow(0, 0, 2.2, 2, 1.4));
  parts.push(box(0, 4, 2.4, 2.4, 0.25, 0, 'stack'), box(0, 4, 2.4, 2.4, 0.25, 0.4, 'stack'), box(0, 4, 2.4, 2.4, 0.25, 0.8, 'stack'));
  parts.push(box(3.6, 3.2, 2.6, 2.2, 1.8));
  parts.push(box(7.2, 0.6, 1.8, 1.8, 2.8, 0, 'router'));
  parts.push(hollow(9.4, 3.6, 1.8, 1.8, 1.2));
  for (let i = 0; i < 5; i++) parts.push(box(4 + i * 0.75, 6.6, 0.45, 0.45, 0.45 + i * 0.4));
  const a = topCenter(0, 4, 2.4, 2.4, 0.25, 0.8);
  const b = topCenter(3.6, 3.2, 2.6, 2.2, 1.8);
  const c = topCenter(7.2, 0.6, 1.8, 1.8, 2.8);
  const d = topCenter(9.4, 3.6, 1.8, 1.8, 1.2);
  const e = topCenter(0, 0, 2.2, 2, 1.4);
  const flow = (p, cls) => `<polyline class="flow ${cls}" points="${pts(p)}"/>`;
  parts.push(flow([a, b], 'f1'), flow([b, c], 'f2'), flow([b, d], 'f3'), flow([e, b], 'f4'));
  for (const n of [a, b, c, d, e]) parts.push(`<circle class="node" cx="${n[0].toFixed(1)}" cy="${n[1].toFixed(1)}" r="3.2"/>`);
  return parts.join('\n    ');
}

const themes = {
  light: { bg: '#f4f1ea', ink: '#16150f', ink2: '#55524a', hair: '#d6d0c4', signal: '#e2481c', top: '#f3efe7', right: '#dcd5c7', left: '#c8c0af', base: '#e4ded2' },
  dark: { bg: '#121110', ink: '#ece8df', ink2: '#a8a398', hair: '#34312b', signal: '#ff6a3d', top: '#3a3732', right: '#2b2925', left: '#22201d', base: '#1c1b18' }
};

function svg(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">
  <title id="title">Jeyasurya V — Software Engineer</title>
  <desc id="desc">I build multi-tenant platforms, enterprise integrations and production AI systems. A clay scale model of connected systems with animated data flows.</desc>
  <style>
    .bg { fill: ${t.bg}; }
    .label { font: 500 13px ui-monospace, 'SFMono-Regular', 'Cascadia Mono', Menlo, Consolas, monospace; letter-spacing: 2.2px; fill: ${t.ink2}; }
    .accent { fill: ${t.signal}; }
    .head { font: 400 40px 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, 'Times New Roman', serif; fill: ${t.ink}; letter-spacing: -0.4px; }
    .sub { font: 400 16px -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; fill: ${t.ink2}; }
    .rule { stroke: ${t.hair}; stroke-width: 1; }
    .solid .t { fill: ${t.top}; } .solid .r { fill: ${t.right}; } .solid .l { fill: ${t.left}; }
    .solid polygon { stroke: ${t.left}; stroke-width: 0.6; stroke-linejoin: round; }
    .base .t { fill: ${t.base}; }
    .hollow line { stroke: ${t.ink}; stroke-width: 1; stroke-dasharray: 4 3; opacity: 0.75; }
    .flow { fill: none; stroke: ${t.signal}; stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 7 6; animation: flow 1.6s linear infinite; }
    .f2 { animation-duration: 1.2s; } .f3 { animation-duration: 2s; } .f4 { animation-duration: 1.8s; }
    .node { fill: ${t.signal}; }
    .router .t { fill: ${t.top}; }
    .intro { opacity: 0; animation: rise 900ms cubic-bezier(.2,.7,.2,1) forwards; }
    .d1 { animation-delay: 100ms; } .d2 { animation-delay: 300ms; } .d3 { animation-delay: 500ms; } .d4 { animation-delay: 700ms; }
    .model { opacity: 0; animation: fade 1200ms ease-out 400ms forwards; }
    .pulse { animation: pulse 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes flow { to { stroke-dashoffset: -26; } }
    @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes fade { to { opacity: 1; } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
    @media (prefers-reduced-motion: reduce) {
      .flow, .pulse { animation: none; }
      .intro, .model { animation: none; opacity: 1; }
    }
  </style>
  <rect class="bg" width="${W}" height="${H}" rx="14"/>
  <g transform="translate(56 0)">
    <text class="label intro d1" x="0" y="74"><tspan class="accent pulse">●</tspan> JEYASURYA V · SOFTWARE ENGINEER</text>
    <text class="head intro d2" x="0" y="134">I build multi-tenant platforms,</text>
    <text class="head intro d2" x="0" y="182">enterprise integrations and</text>
    <text class="head intro d3" x="0" y="230">production AI systems.</text>
    <line class="rule intro d4" x1="0" y1="262" x2="560" y2="262"/>
    <text class="sub intro d4" x="0" y="292">Go · TypeScript · Python — shipping in production since 2023 · Coimbatore, India</text>
  </g>
  <g class="model">
    ${scene()}
  </g>
</svg>
`;
}

mkdirSync(new URL('../assets/', import.meta.url), { recursive: true });
for (const [name, t] of Object.entries(themes)) writeFileSync(new URL(`../assets/banner-${name}.svg`, import.meta.url), svg(t));
console.log('written');
