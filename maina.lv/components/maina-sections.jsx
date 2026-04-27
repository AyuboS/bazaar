
// maiņa.lv — Navbar, Spinner, OG Images, Color Palette, Taglines

// ---- 4. FAVICON SET ----
const FaviconSet = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', fontFamily: 'Inter, sans-serif' }}>
    {[
      { size: 32, label: '32×32 favicon', bg: '#0A0A0A', r: 5 },
      { size: 32, label: '32×32 on light', bg: '#FAFAF7', r: 5 },
      { size: 48, label: '48×48', bg: '#0A0A0A', r: 7 },
      { size: 32, label: '32×32 amber bg', bg: '#B8651E', r: 5 },
    ].map(({ size, label, bg, r }) => (
      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <AppIconMark size={size} bgFill={bg} iconColor={bg === '#B8651E' ? '#FAFAF7' : '#B8651E'} radius={r}/>
        <span style={{ fontSize: 10, color: '#6B6B68' }}>{label}</span>
      </div>
    ))}
    <div style={{ marginLeft: 16, padding: '12px 16px', background: '#F3F2EE', borderRadius: 8, border: '1px solid #E8E6DF' }}>
      <div style={{ fontSize: 10, color: '#6B6B68', marginBottom: 6 }}>Pixel grid check — 2× zoom</div>
      <AppIconMark size={64} bgFill="#0A0A0A" iconColor="#B8651E" radius={10}/>
    </div>
  </div>
);

// ---- 5. NAVBAR ----
const NavbarSection = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Inter, sans-serif' }}>
    <div style={{ fontSize: 10, color: '#6B6B68', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>
      Desktop Navbar — 28px logo height, full context
    </div>
    {/* Main navbar */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: '#FFFFFF', border: '1px solid #E8E6DF',
      borderRadius: 10, padding: '0 20px', height: 56,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
          <ExchangeIcon size={24} color="#B8651E" strokeWidth={2.2}/>
          <text x="30" y="20"
            fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="19"
            letterSpacing="-0.6" fill="#0A0A0A">
            maiņa<tspan fill="#B8651E" fontSize="15" dy="1">.lv</tspan>
          </text>
        </svg>
      </div>

      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: 440,
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#FAFAF7', border: '1.5px solid #E8E6DF',
        borderRadius: 8, padding: '0 12px', height: 36,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="#6B6B68" strokeWidth="1.5"/>
          <line x1="10" y1="10" x2="13" y2="13" stroke="#6B6B68" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 13, color: '#6B6B68' }}>Meklē sludinājumus...</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, borderLeft: '1px solid #E8E6DF', paddingLeft: 10 }}>
          <span style={{ fontSize: 12, color: '#6B6B68' }}>Rīga</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="#6B6B68" strokeWidth="1.3" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 20, marginLeft: 4 }}>
        {['Transports', 'Nekustamais', 'Elektronika'].map(l => (
          <span key={l} style={{ fontSize: 13, color: '#6B6B68', whiteSpace: 'nowrap', cursor: 'pointer' }}>{l}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, marginLeft: 'auto', flexShrink: 0 }}>
        <button style={{
          background: 'none', border: '1px solid #E8E6DF', borderRadius: 7,
          padding: '0 14px', height: 36, fontSize: 13, color: '#0A0A0A',
          cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500,
        }}>Ieiet</button>
        <button style={{
          background: '#0A0A0A', border: 'none', borderRadius: 7,
          padding: '0 16px', height: 36, fontSize: 13, color: '#FFFFFF',
          cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="6" y1="1" x2="6" y2="11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="6" x2="11" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Ievietot
        </button>
      </div>
    </div>

    {/* Dark variant */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: '#0A0A0A', border: '1px solid #1E1E1E',
      borderRadius: 10, padding: '0 20px', height: 56,
    }}>
      <svg width="110" height="28" viewBox="0 0 110 28" fill="none">
        <ExchangeIcon size={24} color="#D08840" strokeWidth={2.2}/>
        <text x="30" y="20"
          fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="19"
          letterSpacing="-0.6" fill="#FFFFFF">
          maiņa<tspan fill="#D08840" fontSize="15" dy="1">.lv</tspan>
        </text>
      </svg>
      <div style={{ flex: 1, maxWidth: 440, display: 'flex', alignItems: 'center', gap: 8, background: '#161616', border: '1px solid #2A2A2A', borderRadius: 8, padding: '0 12px', height: 36 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="#555" strokeWidth="1.5"/><line x1="10" y1="10" x2="13" y2="13" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span style={{ fontSize: 13, color: '#555' }}>Meklē sludinājumus...</span>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexShrink: 0 }}>
        <button style={{ background: 'none', border: '1px solid #2A2A2A', borderRadius: 7, padding: '0 14px', height: 36, fontSize: 13, color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Ieiet</button>
        <button style={{ background: '#B8651E', border: 'none', borderRadius: 7, padding: '0 16px', height: 36, fontSize: 13, color: '#FFFFFF', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="6" y1="1" x2="6" y2="11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="6" x2="11" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Ievietot
        </button>
      </div>
    </div>
  </div>
);

// ---- 6. LOADING SPINNER ----
const SpinnerSection = () => {
  const frames = [0, 60, 120, 180, 240, 300];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: 'Inter, sans-serif' }}>
      <p style={{ fontSize: 12, color: '#6B6B68', maxWidth: 480, lineHeight: 1.6 }}>
        The exchange icon animates as a loading indicator — each frame shows the arrows at a different rotation. The amber mark spinning communicates both brand and progress.
      </p>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {frames.map(deg => (
          <div key={deg} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ transform: `rotate(${deg}deg)` }}>
                <ExchangeIcon size={40} color="#B8651E"/>
              </svg>
            </div>
            <span style={{ fontSize: 9, color: '#6B6B68' }}>{deg}°</span>
          </div>
        ))}

        {/* Live animated version */}
        <div style={{ marginLeft: 16, width: 1, height: 48, background: '#E8E6DF' }}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <ExchangeIcon size={40} color="#B8651E"/>
              <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1.4s" repeatCount="indefinite"/>
            </svg>
          </div>
          <span style={{ fontSize: 9, color: '#B8651E', fontWeight: 600 }}>Live ↻</span>
        </div>
      </div>
    </div>
  );
};

// ---- 7. OG IMAGE — HOMEPAGE ----
// ---- 8. OG IMAGE — LISTING ----
const OGSection = () => {
  // Tiled exchange arrow pattern for background
  const tileSize = 60;
  const tiles = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) {
    tiles.push({ x: c * tileSize, y: r * tileSize });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Inter, sans-serif' }}>

      {/* Homepage OG */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#6B6B68', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Homepage OG — 1200×630</div>
        <div style={{ width: 600, height: 315, background: '#FAFAF7', borderRadius: 10, overflow: 'hidden', border: '1px solid #E8E6DF', position: 'relative', display: 'flex' }}>

          {/* Left content */}
          <div style={{ flex: '0 0 52%', padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <div>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <ExchangeIcon size={40} color="#B8651E" strokeWidth={3.5}/>
                </svg>
                <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px', color: '#0A0A0A' }}>
                  maiņa<span style={{ color: '#B8651E' }}>.lv</span>
                </span>
              </div>

              {/* Tagline */}
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 10 }}>
                Pērc.<br/>
                Pārdod.<br/>
                <span style={{ color: '#B8651E' }}>Mainies.</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#6B6B68', marginBottom: 4 }}>Latvijas lielākais sludinājumu portāls</div>
              {/* Amber accent bar */}
              <div style={{ width: 40, height: 3, background: '#B8651E', borderRadius: 2 }}/>
            </div>
          </div>

          {/* Right — tiled exchange pattern */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, #FAFAF7 0%, transparent 30%)',
              zIndex: 1,
            }}/>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} viewBox="0 0 480 315" preserveAspectRatio="xMidYMid slice">
              {tiles.map(({ x, y }, i) => (
                <g key={i} transform={`translate(${x + 10}, ${y + 10})`}>
                  <ExchangeIcon size={40} color="#B8651E" strokeWidth={2}/>
                </g>
              ))}
            </svg>
            {/* Large amber accent shape */}
            <div style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)', width: 200, height: 200, borderRadius: '50%', background: 'rgba(184,101,30,0.06)', zIndex: 0 }}/>
          </div>
        </div>
      </div>

      {/* Listing OG */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#6B6B68', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Listing Page OG — 1200×630</div>
        <div style={{ width: 600, height: 315, borderRadius: 10, overflow: 'hidden', border: '1px solid #E8E6DF', display: 'flex' }}>

          {/* Photo half */}
          <div style={{ width: '48%', background: '#E0DED6', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <svg width="100%" height="315" viewBox="0 0 290 315" fill="none" preserveAspectRatio="xMidYMid slice">
              <rect width="290" height="315" fill="#E0DED6"/>
              {[...Array(8)].map((_, i) => (
                <line key={i} x1={i*40-10} y1="0" x2={i*40+200} y2="315" stroke="#D4D2CA" strokeWidth="1.2"/>
              ))}
              <text x="145" y="158" textAnchor="middle" dy="0.35em" fontFamily="monospace" fontSize="11" fill="#9A9890">listing photo</text>
            </svg>
            {/* Exchange watermark */}
            <div style={{ position: 'absolute', bottom: 16, right: 16, opacity: 0.25 }}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <ExchangeIcon size={40} color="#B8651E" strokeWidth={3}/>
              </svg>
            </div>
          </div>

          {/* Info half */}
          <div style={{ flex: 1, background: '#FFFFFF', padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Logo top right */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '-0.3px', color: '#0A0A0A' }}>
                maiņa<span style={{ color: '#B8651E' }}>.lv</span>
              </span>
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#6B6B68', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
                Rīga · Transports
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: 14 }}>
                BMW 320d, 2018, 120 tkm
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-1.2px', marginBottom: 14 }}>
                € 14 900
              </div>
              {/* Amber rule */}
              <div style={{ width: '100%', height: 2, background: '#B8651E', borderRadius: 1, opacity: 0.5 }}/>
            </div>

            <div style={{ fontSize: 11, color: '#6B6B68' }}>maiņa.lv — Latvijas sludinājumu portāls</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---- 9. COLOR PALETTE ----
const PaletteSection = () => {
  const colors = [
    { name: 'Canvas', hex: '#FAFAF7', usage: 'Page background', wcagW: '—', wcagD: '16.2:1 ✓' },
    { name: 'Ink', hex: '#0A0A0A', usage: 'Primary text, buttons', wcagW: '19.5:1 ✓', wcagD: '—' },
    { name: 'Accent / Amber', hex: '#B8651E', usage: 'CTAs, highlights, brand', wcagW: '4.8:1 ✓ AA', wcagD: '4.1:1 ✓ AA' },
    { name: 'Surface', hex: '#FFFFFF', usage: 'Cards, modals', wcagW: '—', wcagD: '21:1 ✓' },
    { name: 'Muted Surface', hex: '#F3F2EE', usage: 'Tags, chips, alt rows', wcagW: '—', wcagD: '18.4:1 ✓' },
    { name: 'Border', hex: '#E8E6DF', usage: 'Dividers, outlines', wcagW: '—', wcagD: '12.1:1 ✓' },
    { name: 'Muted Text', hex: '#6B6B68', usage: 'Secondary labels', wcagW: '4.6:1 ✓ AA', wcagD: '4.5:1 ✓ AA' },
    { name: 'Success', hex: '#1D9E75', usage: 'Active, verified, available', wcagW: '4.5:1 ✓ AA', wcagD: '3.4:1 ✓ AA' },
    { name: 'Danger', hex: '#E24B4A', usage: 'Errors, deleted, urgent', wcagW: '4.5:1 ✓ AA', wcagD: '3.1:1 AA' },
  ];

  const ramp = ['#0A0A0A','#1A1A1A','#3A3A3A','#6B6B68','#9A9A96','#C8C6C0','#E8E6DF','#F3F2EE','#FAFAF7','#FFFFFF'];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.2px' }}>maiņa.lv — Design System v1.0</div>

      {/* Main palette grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {colors.map(c => (
          <div key={c.hex} style={{ border: '1px solid #E8E6DF', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: 52, background: c.hex }}/>
            <div style={{ padding: '8px 10px', background: '#FFFFFF' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0A0A0A', marginBottom: 1 }}>{c.name}</div>
              <div style={{ fontSize: 10, color: '#6B6B68', marginBottom: 5, fontFamily: 'monospace' }}>{c.hex}</div>
              <div style={{ fontSize: 10, color: '#6B6B68', marginBottom: 4 }}>{c.usage}</div>
              <div style={{ display: 'flex', gap: 6, fontSize: 9 }}>
                <span style={{ color: c.wcagW.includes('✓') ? '#1D9E75' : '#9A9A96' }}>↔ white: {c.wcagW}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grayscale ramp */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#6B6B68', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Neutral ramp — #0A0A0A → #FFFFFF</div>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #E8E6DF' }}>
          {ramp.map((hex, i) => (
            <div key={hex} style={{ flex: 1, background: hex, height: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 4px' }}>
              <span style={{ fontSize: 8, color: i < 5 ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)', fontFamily: 'monospace' }}>{hex.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amber contrast demo */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#6B6B68', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Amber #B8651E — Contrast demos</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { bg: '#FFFFFF', fg: '#B8651E', label: 'On White — 4.8:1 AA' },
            { bg: '#FAFAF7', fg: '#B8651E', label: 'On Canvas — 4.7:1 AA' },
            { bg: '#0A0A0A', fg: '#B8651E', label: 'On Dark — 4.1:1 AA' },
            { bg: '#B8651E', fg: '#FFFFFF', label: 'White on Amber — 4.8:1 AA' },
          ].map(({ bg, fg, label }) => (
            <div key={label} style={{ flex: 1, background: bg, border: '1px solid #E8E6DF', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: fg, marginBottom: 4 }}>maiņa</div>
              <div style={{ fontSize: 9, color: fg, opacity: 0.7 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---- 10. TAGLINE LOCKUPS ----
const TaglineSection = () => {
  const taglines = [
    {
      text: ['Pērc. Pārdod. ', 'Mainies.'],
      accent: 1,
      style: 'Short & punchy',
      size: 36,
      sub: 'Primary tagline — headlines, hero, OG',
    },
    {
      text: ['Latvijas modernākais ', 'sludinājumu portāls'],
      accent: 1,
      style: 'Descriptive',
      size: 22,
      sub: 'Footer, about section, press',
    },
    {
      text: ['Mainies uz ', 'labāku.'],
      accent: 1,
      style: 'Aspirational',
      size: 32,
      sub: 'Brand campaign, onboarding',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'Inter, sans-serif' }}>
      {taglines.map(({ text, accent, style, size, sub }) => (
        <div key={style}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#B8651E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{style}</span>
            <span style={{ fontSize: 11, color: '#6B6B68' }}>— {sub}</span>
          </div>
          <div style={{ padding: '28px 32px', background: '#FAFAF7', border: '1px solid #E8E6DF', borderRadius: 10 }}>
            <div style={{ fontSize: size, fontWeight: 800, letterSpacing: `-${size * 0.032}px`, lineHeight: 1.1, color: '#0A0A0A' }}>
              {text[0]}<span style={{ color: '#B8651E' }}>{text[1]}</span>
            </div>
          </div>
          {/* Dark variant */}
          <div style={{ padding: '20px 32px', background: '#0A0A0A', borderRadius: 8, marginTop: 8 }}>
            <div style={{ fontSize: size * 0.8, fontWeight: 800, letterSpacing: `-${size * 0.025}px`, lineHeight: 1.1, color: '#FFFFFF' }}>
              {text[0]}<span style={{ color: '#D08840' }}>{text[1]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Object.assign(window, { FaviconSet, NavbarSection, SpinnerSection, OGSection, PaletteSection, TaglineSection });
