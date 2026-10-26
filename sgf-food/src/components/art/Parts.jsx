// SVG building blocks for the chips illustrations. Every part is drawn around (0, 0) so a scene can
// place it with a plain <g transform="translate(..)"> and animate an inner motion element.

// Potato chip: a slightly wavy round
const WAVY = (() => {
  const pts = []
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2
    const r = 18 + 1.6 * Math.sin(a * 9) + 0.8 * Math.cos(a * 4)
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r * 0.92).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
})()

/** Whole raw vegetable. `peeled` shows the flesh instead of the skin. */
export function Veg({ type, c, peeled = false, scale = 1 }) {
  const fill = peeled ? c.flesh : c.skin
  const stroke = peeled ? c.fleshDark : c.skinDark
  const common = { fill, stroke, strokeWidth: 2.5, strokeLinejoin: 'round' }
  return (
    <g transform={`scale(${scale})`}>
      {type === 'potato' && (
        <>
          <path d="M-40,-8 C-42,-30 -12,-40 12,-36 C38,-32 46,-12 42,8 C38,30 10,38 -12,34 C-34,30 -38,14 -40,-8Z" {...common} />
          {!peeled && (
            <g fill={c.skinDark} opacity="0.7">
              <ellipse cx="-16" cy="-8" rx="3" ry="2" />
              <ellipse cx="12" cy="12" rx="2.6" ry="1.8" />
              <ellipse cx="22" cy="-16" rx="2.2" ry="1.6" />
              <ellipse cx="-6" cy="18" rx="2" ry="1.4" />
            </g>
          )}
          <ellipse cx="-14" cy="-20" rx="12" ry="5" fill="#fff" opacity="0.25" transform="rotate(-18 -14 -20)" />
        </>
      )}
      {type === 'banana' && (
        <>
          <path d="M-50,8 C-34,-22 18,-32 50,-16 C55,-13 54,-6 49,-6 C22,-15 -18,-6 -40,20 C-47,25 -54,16 -50,8Z" {...common} />
          {!peeled && <path d="M-42,10 C-24,-12 14,-20 44,-11" fill="none" stroke={c.skinDark} strokeWidth="1.6" opacity="0.6" />}
          <path d="M49,-6 L58,-10 L56,-17 L50,-16" fill={peeled ? c.fleshDark : '#5b4126'} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="-10" cy="-14" rx="16" ry="3.5" fill="#fff" opacity="0.22" transform="rotate(-20 -10 -14)" />
        </>
      )}
      {type === 'tapioca' && (
        <>
          <path d="M-52,0 C-42,-15 10,-19 48,-6 C55,-3 55,4 48,7 C10,19 -42,15 -52,0Z" {...common} />
          {!peeled && (
            <g fill="none" stroke={c.skinDark} strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
              <path d="M-30,-10 q3,10 0,20" />
              <path d="M-8,-12 q3,12 0,24" />
              <path d="M16,-10 q3,10 0,19" />
              <path d="M34,-6 q2,7 0,12" />
            </g>
          )}
          <ellipse cx="-50" cy="0" rx="4" ry="11" fill={c.flesh} stroke={stroke} strokeWidth="2" />
          <ellipse cx="0" cy="-9" rx="22" ry="3" fill="#fff" opacity="0.18" />
        </>
      )}
    </g>
  )
}

/** One slice. `raw` = freshly cut (flesh colour); otherwise fried golden. */
export function Chip({ type, c, raw = false, scale = 1 }) {
  const fill = raw ? c.flesh : c.chip
  const stroke = raw ? c.fleshDark : c.chipDark
  return (
    <g transform={`scale(${scale})`}>
      {type === 'potato' && (
        <>
          <path d={WAVY} fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          {!raw && (
            <g fill={c.chipDark} opacity="0.45">
              <circle cx="-6" cy="-4" r="1.6" />
              <circle cx="7" cy="5" r="1.3" />
              <circle cx="4" cy="-9" r="1.1" />
            </g>
          )}
          <ellipse cx="-5" cy="-7" rx="7" ry="3" fill="#fff" opacity="0.3" />
        </>
      )}
      {type === 'banana' && (
        <>
          <circle r="17" fill={fill} stroke={stroke} strokeWidth="2" />
          <circle r="10" fill="#fff" opacity={raw ? 0.25 : 0.2} />
          <g fill={raw ? c.fleshDark : c.chipDark} opacity="0.7">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <circle key={a} cx={(Math.cos((a * Math.PI) / 180) * 4.5).toFixed(1)} cy={(Math.sin((a * Math.PI) / 180) * 4.5).toFixed(1)} r="1.1" />
            ))}
          </g>
        </>
      )}
      {type === 'tapioca' && (
        <g transform="rotate(-14)">
          <ellipse rx="24" ry="12" fill={fill} stroke={stroke} strokeWidth="2" />
          <path d="M-14,0 C-6,-3 6,-3 14,0" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="-6" cy="-5" rx="9" ry="2.5" fill="#fff" opacity="0.3" />
        </g>
      )}
    </g>
  )
}

// Pack body with crimped (zig-zag) top and bottom seals
const PACK_OUTLINE = (() => {
  const top = Array.from({ length: 15 }, (_, i) => `${-70 + i * 10},${-88 - (i % 2) * 5}`)
  const bottom = Array.from({ length: 15 }, (_, i) => `${70 - i * 10},${88 + (i % 2) * 5}`)
  return `M${top.join('L')}L${bottom.join('L')}Z`
})()

/** A chips pack with the company logo and the chip type on the label. Roughly 140 × 190, centred. */
export function Pack({ t, scale = 1 }) {
  const { c } = t
  return (
    <g transform={`scale(${scale})`}>
      <path d={PACK_OUTLINE} fill={c.pack} stroke={c.packDark} strokeWidth="3" strokeLinejoin="round" />
      <path d="M-62,-70 C-30,-80 30,-80 62,-70 L58,72 C30,80 -30,80 -58,72 Z" fill="#fff" opacity="0.08" />
      <rect x="-70" y="-80" width="140" height="10" fill={c.packDark} opacity="0.45" />
      <rect x="-70" y="70" width="140" height="10" fill={c.packDark} opacity="0.45" />
      <circle cy="-44" r="24" fill="#fff" stroke={c.packDark} strokeWidth="2" />
      <image href="/logo.png" x="-21" y="-65" width="42" height="42" />
      <text y="-6" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="700" fontSize="12" letterSpacing="2" fill="#fff" opacity="0.9">
        SRI GOPAL
      </text>
      <text y="22" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="26" fill="#fff">
        {t.name.toUpperCase()}
      </text>
      <text y="42" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12" letterSpacing="5" fill="#fff" opacity="0.85">
        CHIPS
      </text>
      <g transform="translate(-26 60)">
        <Chip type={t.id} c={c} scale={0.55} />
      </g>
      <g transform="translate(0 58)">
        <Chip type={t.id} c={c} scale={0.6} />
      </g>
      <g transform="translate(26 60)">
        <Chip type={t.id} c={c} scale={0.55} />
      </g>
      <path d="M-58,-60 C-58,-20 -60,20 -56,64" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.18" fill="none" />
    </g>
  )
}
