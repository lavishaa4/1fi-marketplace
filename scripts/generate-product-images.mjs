import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('public/products', { recursive: true });

const shade = (hex, amount) => {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  const r = clamp(((n >> 16) & 255) + amount);
  const g = clamp(((n >> 8) & 255) + amount);
  const b = clamp((n & 255) + amount);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 165;
};

const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" role="img">
  <rect width="300" height="300" fill="#FAF9FD"/>
  ${body}
</svg>
`;

const shapes = {
  phone(colour) {
    const edge = shade(colour, isLight(colour) ? -35 : 30);
    const screen = shade(colour, isLight(colour) ? -60 : 22);
    return `<g>
    <rect x="98" y="34" width="104" height="232" rx="22" fill="${colour}" stroke="${edge}" stroke-width="2"/>
    <rect x="106" y="42" width="88" height="216" rx="16" fill="${screen}" opacity="0.55"/>
    <rect x="134" y="46" width="32" height="7" rx="3.5" fill="${edge}"/>
    <rect x="114" y="52" width="72" height="120" rx="10" fill="#FFFFFF" opacity="0.12"/>
    <g>
      <rect x="112" y="52" width="52" height="52" rx="16" fill="${edge}" opacity="0.9"/>
      <circle cx="126" cy="66" r="8" fill="${screen}"/>
      <circle cx="150" cy="66" r="8" fill="${screen}"/>
      <circle cx="126" cy="90" r="8" fill="${screen}"/>
    </g>
  </g>`;
  },
  tablet(colour) {
    const edge = shade(colour, isLight(colour) ? -35 : 30);
    const screen = shade(colour, isLight(colour) ? -55 : 25);
    return `<g>
    <rect x="74" y="48" width="152" height="204" rx="18" fill="${colour}" stroke="${edge}" stroke-width="2"/>
    <rect x="84" y="58" width="132" height="184" rx="12" fill="${screen}" opacity="0.5"/>
    <circle cx="96" cy="70" r="6" fill="${edge}"/>
  </g>`;
  },
  laptop(colour) {
    const edge = shade(colour, isLight(colour) ? -35 : 30);
    const screen = shade(colour, isLight(colour) ? -60 : 20);
    return `<g>
    <rect x="62" y="72" width="176" height="118" rx="10" fill="${colour}" stroke="${edge}" stroke-width="2"/>
    <rect x="72" y="82" width="156" height="98" rx="6" fill="${screen}" opacity="0.55"/>
    <path d="M44 194 h212 a10 10 0 0 1 -10 14 H54 a10 10 0 0 1 -10 -14 z" fill="${edge}"/>
    <rect x="130" y="196" width="40" height="4" rx="2" fill="${screen}" opacity="0.7"/>
  </g>`;
  },
  headphones(colour) {
    const edge = shade(colour, isLight(colour) ? -35 : 30);
    return `<g fill="none" stroke="${colour}" stroke-width="16" stroke-linecap="round">
    <path d="M86 168 V132 a64 64 0 0 1 128 0 v36"/>
  </g>
  <rect x="66" y="150" width="42" height="76" rx="20" fill="${colour}" stroke="${edge}" stroke-width="2"/>
  <rect x="192" y="150" width="42" height="76" rx="20" fill="${colour}" stroke="${edge}" stroke-width="2"/>
  <rect x="76" y="162" width="22" height="52" rx="11" fill="${edge}" opacity="0.6"/>
  <rect x="202" y="162" width="22" height="52" rx="11" fill="${edge}" opacity="0.6"/>`;
  },
  watch(colour) {
    const edge = shade(colour, isLight(colour) ? -35 : 30);
    const screen = shade(colour, isLight(colour) ? -65 : 15);
    return `<g>
    <rect x="126" y="44" width="48" height="52" rx="16" fill="${edge}"/>
    <rect x="126" y="204" width="48" height="52" rx="16" fill="${edge}"/>
    <rect x="106" y="86" width="88" height="128" rx="28" fill="${colour}" stroke="${edge}" stroke-width="2"/>
    <rect x="116" y="96" width="68" height="108" rx="22" fill="${screen}" opacity="0.65"/>
    <rect x="194" y="126" width="8" height="26" rx="4" fill="${edge}"/>
  </g>`;
  },
};

const files = [
  ['iphone-17-pro-natural', 'phone', '#C6C0B6'],
  ['iphone-17-pro-blue', 'phone', '#2B4A73'],
  ['galaxy-s25-ultra-grey', 'phone', '#6F7278'],
  ['galaxy-s25-ultra-black', 'phone', '#2A2A2E'],
  ['pixel-10-pro-porcelain', 'phone', '#EDE7DE'],
  ['pixel-10-pro-obsidian', 'phone', '#1F2126'],
  ['oneplus-15-black', 'phone', '#232427'],
  ['oneplus-15-sand', 'phone', '#C9A87C'],
  ['macbook-air-m4-midnight', 'laptop', '#2E3641'],
  ['macbook-air-m4-starlight', 'laptop', '#E8DDCB'],
  ['ipad-air-m3-blue', 'tablet', '#8FA9C6'],
  ['ipad-air-m3-space', 'tablet', '#5B5F66'],
  ['sony-wh1000xm6-black', 'headphones', '#22242A'],
  ['sony-wh1000xm6-platinum', 'headphones', '#D8D6D1'],
  ['apple-watch-s11-black', 'watch', '#1D1E22'],
  ['apple-watch-s11-silver', 'watch', '#DCDCDE'],
];

for (const [name, shape, colour] of files) {
  writeFileSync(`public/products/${name}.svg`, wrap(shapes[shape](colour)));
}

console.log(`generated ${files.length} product images`);
