
// maiņa.lv Logo Components
// The ņ is the hero — uniquely Latvian, celebrated throughout

// ---- SHARED: Exchange Arrows Icon ----
// Two curved arrows forming a loop — the visual metaphor for exchange (maiņa)

const ExchangeIcon = ({ size = 40, color = '#B8651E', strokeWidth: sw }) => {
  const c = size / 2;
  const R = size * 0.33;   // arc radius
  const stroke = sw || Math.max(1.6, size * 0.062);
  const arr = size * 0.18; // arrowhead size

  // Upper arc: left → right, over the top
  // Starts at (c-R, c-size*0.04), ends at (c+R, c-size*0.04)
  const uy = c - size * 0.04;
  // Lower arc: right → left, under the bottom
  const ly = c + size * 0.04;

  // Arrowhead helper: point, direction angle
  const arrowHead = (x, y, angle) => {
    const a1 = angle + 2.4;
    const a2 = angle - 2.4;
    const al = arr * 0.55;
    return `M${x + al * Math.cos(a1)},${y + al * Math.sin(a1)} L${x},${y} L${x + al * Math.cos(a2)},${y + al * Math.sin(a2)}`;
  };

  // Upper arc end tangent angle: rightward arc ends going downward → ~π/2
  // Lower arc end tangent angle: leftward arc ends going upward → ~-π/2 or 3π/2

  return (
    <g>
      {/* Upper arc: left to right over top */}
      <path
        d={`M ${c - R} ${uy} A ${R} ${R} 0 0 1 ${c + R} ${uy}`}
        stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
      />
      {/* Arrowhead at right end of upper arc, pointing down-right */}
      <path d={arrowHead(c + R, uy, Math.PI * 0.55)}
        stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Lower arc: right to left under bottom */}
      <path
        d={`M ${c + R} ${ly} A ${R} ${R} 0 0 1 ${c - R} ${ly}`}
        stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
      />
      {/* Arrowhead at left end of lower arc, pointing up-left */}
      <path d={arrowHead(c - R, ly, Math.PI * -0.45)}
        stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  );
};

// ---- CONCEPT A — WORDMARK ----
// "maiņa" with ņ cedar replaced by an amber diamond mark
// ".lv" in accent color, slightly smaller

const MainaWordmark = ({ inkColor = '#0A0A0A', accentColor = '#B8651E', bgColor = '#FAFAF7', scale = 1 }) => {
  const fs = 38 * scale;          // main font size
  const lv_fs = 30 * scale;       // .lv smaller
  const h = 56 * scale;
  const baseline = h * 0.70;

  // We render: "mai" + "ņ"(styled) + "a" as a single text run,
  // then add the custom diamond cedar mark below the ņ.
  // Approximate char widths at fs=38 Inter 600, tracking -0.03em:
  // m≈27, a≈22, i≈11, ņ≈22, a≈22 → "maiņa" ≈ 104px
  // Estimate ņ start x: "mai" ≈ 60px
  const maiW  = 60 * scale;   // approx width of "mai"
  const nW    = 22 * scale;   // approx width of ņ
  const totalTextW = 200 * scale; // generous
  const w = totalTextW;

  // Diamond (cedilla replacement) position: below ņ baseline, centered on ņ
  const diamX = maiW + nW * 0.50;
  const diamY = baseline + fs * 0.18;
  const diamR = fs * 0.10;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');`}</style>
      {/* Main wordmark */}
      <text
        x="0" y={baseline}
        fontFamily="'Inter', sans-serif" fontWeight="600" fontSize={fs}
        letterSpacing={`${-0.03 * fs}px`}
        fill={inkColor}
      >maiņa<tspan fill={accentColor} fontSize={lv_fs} dy={`${(fs - lv_fs) * 0.4}px`}>.lv</tspan></text>

      {/* Amber diamond replacing the cedilla of ņ */}
      <rect
        x={diamX - diamR} y={diamY - diamR}
        width={diamR * 2} height={diamR * 2}
        rx={diamR * 0.2}
        fill={accentColor}
        transform={`rotate(45 ${diamX} ${diamY})`}
      />
    </svg>
  );
};

const ConceptA = () => {
  const variants = [
    { label: 'Default — Ink on Canvas', bg: '#FAFAF7', inkColor: '#0A0A0A', accentColor: '#B8651E' },
    { label: 'White on Dark', bg: '#0A0A0A', inkColor: '#FFFFFF', accentColor: '#D08840' },
    { label: 'Full Amber', bg: '#FAFAF7', inkColor: '#B8651E', accentColor: '#B8651E' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#B8651E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Concept A — Wordmark</div>
        <p style={{ fontSize: 12, color: '#6B6B68', maxWidth: 520, lineHeight: 1.6 }}>
          Inter Semibold, −0.03em tracking. The cedilla of ņ is replaced by a custom amber diamond mark — the ņ becomes a brand asset. ".lv" sits slightly smaller in accent amber, typeset in a single text run for perfect spacing.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {variants.map(v => (
          <div key={v.label} style={{
            flex: 1, background: v.bg,
            border: `1px solid ${v.bg === '#FAFAF7' ? '#E8E6DF' : '#2A2A2A'}`,
            borderRadius: 10, padding: '28px 22px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <MainaWordmark {...v} scale={0.88}/>
            <span style={{ fontSize: 10, color: v.bg === '#FAFAF7' ? '#6B6B68' : '#555' }}>{v.label}</span>
          </div>
        ))}
      </div>
      {/* Size scale */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '14px 18px', background: '#F3F2EE', borderRadius: 8, border: '1px solid #E8E6DF' }}>
        <span style={{ fontSize: 10, color: '#6B6B68', minWidth: 55, fontFamily: 'Inter, sans-serif' }}>Scale →</span>
        <MainaWordmark scale={0.55}/>
        <MainaWordmark scale={0.38}/>
        <MainaWordmark scale={0.26}/>
      </div>
    </div>
  );
};

// ---- CONCEPT B — ICON + WORDMARK ----
const ConceptB = () => {
  const variants = [
    { label: 'Ink on Canvas', bg: '#FAFAF7', inkColor: '#0A0A0A', accentColor: '#B8651E' },
    { label: 'Light on Dark', bg: '#0A0A0A', inkColor: '#FFFFFF', accentColor: '#D08840' },
  ];

  const Lockup = ({ inkColor, accentColor, bgColor, scale = 1 }) => {
    const iconSize = 38 * scale;
    const fs = 32 * scale;
    const lv_fs = 26 * scale;
    const gap = 12 * scale;
    const h = 52 * scale;
    const baseline = h * 0.70;
    const w = iconSize + gap + 190 * scale;
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <g transform={`translate(0, ${(h - iconSize) / 2})`}>
          <ExchangeIcon size={iconSize} color={accentColor}/>
        </g>
        <text x={iconSize + gap} y={baseline}
          fontFamily="'Inter', sans-serif" fontWeight="600" fontSize={fs}
          letterSpacing={`${-0.03 * fs}px`} fill={inkColor}>
          maiņa<tspan fill={accentColor} fontSize={lv_fs} dy={`${(fs - lv_fs) * 0.4}px`}>.lv</tspan>
        </text>
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#B8651E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Concept B — Exchange Icon + Wordmark</div>
        <p style={{ fontSize: 12, color: '#6B6B68', maxWidth: 520, lineHeight: 1.6 }}>
          Two curved arrows forming a cycle — the universal gesture of exchange (maiņa). Drawn with rounded strokes at 2px, in amber. The icon and wordmark share the same optical height. The icon works solo as the app mark.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {variants.map(v => (
          <div key={v.label} style={{
            flex: 1, background: v.bg,
            border: `1px solid ${v.bg === '#FAFAF7' ? '#E8E6DF' : '#2A2A2A'}`,
            borderRadius: 10, padding: '28px 22px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <Lockup inkColor={v.inkColor} accentColor={v.accentColor} bgColor={v.bg} scale={0.9}/>
            <span style={{ fontSize: 10, color: v.bg === '#FAFAF7' ? '#6B6B68' : '#555' }}>{v.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- CONCEPT C — MONOGRAM / FAVICON ----
const AppIconMark = ({ size = 64, bgFill = '#0A0A0A', iconColor = '#B8651E', radius }) => {
  const r = radius !== undefined ? radius : size * 0.22;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx={r * (64 / size)} fill={bgFill}/>
      <g transform="translate(32,32)">
        {/* Exchange icon centered, scaled for app icon */}
        <g transform="translate(-20,-20)">
          <ExchangeIcon size={40} color={iconColor} strokeWidth={3.5}/>
        </g>
      </g>
    </svg>
  );
};

const ConceptC = () => {
  const sizes = [
    { px: 16, label: '16px favicon', radius: 3 },
    { px: 32, label: '32px favicon', radius: 5 },
    { px: 64, label: '64px icon', radius: 10 },
    { px: 120, label: '120px app', radius: 22 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#B8651E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Concept C — Monogram / App Icon</div>
        <p style={{ fontSize: 12, color: '#6B6B68', maxWidth: 520, lineHeight: 1.6 }}>
          The exchange arrows stand alone as the monogram mark. Bold enough to read at 16×16px; rich at 512px. The rounded square format follows iOS/Android app icon specs. Dark background makes amber pop — works on any surface.
        </p>
      </div>

      {/* Size row */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', padding: '24px 20px', background: '#F3F2EE', borderRadius: 10, border: '1px solid #E8E6DF' }}>
        {sizes.map(({ px, label, radius }) => (
          <div key={px} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <AppIconMark size={px} bgFill="#0A0A0A" iconColor="#B8651E" radius={radius}/>
            <span style={{ fontSize: 10, color: '#6B6B68' }}>{label}</span>
          </div>
        ))}
        {/* Canvas variant */}
        <div style={{ width: 1, background: '#E8E6DF', alignSelf: 'stretch', margin: '0 4px' }}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <AppIconMark size={64} bgFill="#FAFAF7" iconColor="#B8651E" radius={10}/>
          <span style={{ fontSize: 10, color: '#6B6B68' }}>On canvas</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <AppIconMark size={64} bgFill="#B8651E" iconColor="#FAFAF7" radius={10}/>
          <span style={{ fontSize: 10, color: '#6B6B68' }}>On amber</span>
        </div>
      </div>

      {/* Favicon pixel preview */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E8E6DF' }}>
        <span style={{ fontSize: 10, color: '#6B6B68', minWidth: 100 }}>Browser tab preview</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F3F2EE', borderRadius: 6, padding: '6px 14px' }}>
          <AppIconMark size={16} bgFill="#0A0A0A" iconColor="#B8651E" radius={3}/>
          <span style={{ fontSize: 12, color: '#0A0A0A', fontFamily: 'Inter, sans-serif' }}>maiņa.lv — Pārdod & maini</span>
        </div>
      </div>
    </div>
  );
};

const LogosSection = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
    <ConceptA />
    <ConceptB />
    <ConceptC />
  </div>
);

Object.assign(window, { LogosSection, ExchangeIcon, AppIconMark, MainaWordmark });
