interface ExchangeIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export function ExchangeIcon({ size = 40, color = "#B8651E", strokeWidth, className }: ExchangeIconProps) {
  const c = size / 2;
  const R = size * 0.33;
  const stroke = strokeWidth ?? Math.max(1.6, size * 0.062);
  const arr = size * 0.18;
  const uy = c - size * 0.04;
  const ly = c + size * 0.04;

  const arrowHead = (x: number, y: number, angle: number) => {
    const a1 = angle + 2.4;
    const a2 = angle - 2.4;
    const al = arr * 0.55;
    return `M${x + al * Math.cos(a1)},${y + al * Math.sin(a1)} L${x},${y} L${x + al * Math.cos(a2)},${y + al * Math.sin(a2)}`;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={className} aria-hidden="true">
      <path d={`M ${c - R} ${uy} A ${R} ${R} 0 0 1 ${c + R} ${uy}`} stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <path d={arrowHead(c + R, uy, Math.PI * 0.55)} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${c + R} ${ly} A ${R} ${R} 0 0 1 ${c - R} ${ly}`} stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <path d={arrowHead(c - R, ly, Math.PI * -0.45)} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
