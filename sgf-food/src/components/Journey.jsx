import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { EASE } from '../lib/motion'
import SectionHead from './SectionHead'

// The world is one wide illustration (2600 × 520 units). The truck parks at each station's `stop`.
const WORLD_W = 2600
const WORLD_H = 520
const TRUCK_W = 180

const STATIONS = [
  { id: 'farm', stop: 300, label: 'Potato farmers and suppliers', text: 'Fresh potatoes are harvested at the farm and loaded onto the truck.' },
  { id: 'factory', stop: 820, label: 'Factory processing and quality control', text: 'At the factory they are washed, peeled, sliced and fried, with quality checks along the way.' },
  { id: 'pack', stop: 1320, label: 'Flavouring, packaging and branding', text: 'The chips are flavoured, sealed in packs and branded Sri Gopal Foods.' },
  { id: 'dist', stop: 1830, label: 'Distributors and wholesalers', text: 'Distributors and wholesalers stock up and carry the packs onward.' },
  { id: 'retail', stop: 2330, label: 'Retail shops, supermarkets and consumers', text: 'They reach shops and supermarkets, and finally the people who enjoy them.' },
]

// Scroll progress → truck position: park at a station, drive, park at the next...
const P_IN = [0, 0.08, 0.24, 0.32, 0.48, 0.56, 0.72, 0.8, 0.96, 1]
const X_OUT = STATIONS.flatMap((s) => [s.stop - TRUCK_W / 2, s.stop - TRUCK_W / 2])
const pad = (i) => String(i + 1).padStart(2, '0')

function Truck({ cargo }) {
  return (
    <svg viewBox="0 0 180 100" aria-hidden="true">
      {cargo === 'potatoes' ? (
        <g fill="#c99a5b" stroke="#9c7038" strokeWidth="1.5">
          {[[16, 34], [34, 30], [52, 33], [70, 29], [88, 33], [104, 34], [26, 24], [46, 21], [64, 23], [82, 22], [56, 14]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="11" ry="8" />
          ))}
        </g>
      ) : (
        <g stroke="#a8823f" strokeWidth="1.5">
          {[[4, 20], [42, 20], [80, 20], [22, 2]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="36" height="20" rx="2" fill="#e2bd84" />
              <path d={`M${x + 18},${y} V${y + 20}`} stroke="#c49a55" />
            </g>
          ))}
        </g>
      )}
      <rect x="0" y="40" width="118" height="36" rx="5" fill="#38b6f5" stroke="#0e2a47" strokeWidth="2.5" />
      <image href="/logo.png" x="8" y="44" width="28" height="28" />
      <text x="77" y="63" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="12" letterSpacing="0.5" fill="#fff">
        SRI GOPAL
      </text>
      <path d="M118,76 V38 Q118,30 126,30 H152 Q160,30 166,40 L176,56 V76 Z" fill="#1583d6" stroke="#0e2a47" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M130,36 H150 Q156,36 160,42 L166,54 H130 Z" fill="#dff1ff" stroke="#0e2a47" strokeWidth="2" strokeLinejoin="round" />
      <rect x="170" y="62" width="7" height="6" rx="2" fill="#ffd54d" />
      {[30, 146].map((cx) => (
        <g key={cx} transform={`translate(${cx} 80)`}>
          <g className="wheel">
            <circle r="13" fill="#1d2a36" />
            <circle r="5.5" fill="#c0ccd8" />
            <path d="M-9,0 H9" stroke="#1d2a36" strokeWidth="2" />
          </g>
        </g>
      ))}
    </svg>
  )
}

function Tree({ x, s = 1 }) {
  return (
    <g transform={`translate(${x} 400) scale(${s})`}>
      <rect x="-5" y="-50" width="10" height="50" rx="3" fill="#8a6a4a" />
      <circle cy="-70" r="30" fill="#7cc46a" />
      <circle cx="-18" cy="-56" r="18" fill="#6db75c" />
      <circle cx="18" cy="-58" r="20" fill="#86cc72" />
    </g>
  )
}

const PACKS = ['#ff7a45', '#3f9d4a', '#c4452f']

function MiniPack({ x, y, color, s = 1, className = '' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className}>
        <path d="M-16,-24 l4,-3 l4,3 l4,-3 l4,3 l4,-3 l4,3 l4,-3 l4,3 V24 l-4,3 l-4,-3 l-4,3 l-4,-3 l-4,3 l-4,-3 l-4,3 l-4,-3 Z" fill={color} stroke="#0e2a47" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cy="-6" r="8" fill="#fff" />
        <image href="/logo.png" x="-7" y="-13" width="14" height="14" />
        <rect x="-11" y="7" width="22" height="5" rx="2" fill="#fff" opacity="0.85" />
      </g>
    </g>
  )
}

/** The whole landscape. Each station's little loops only run while the truck is parked there. */
function World({ active }) {
  const on = (i) => `st ${active === i ? 'on' : ''}`
  return (
    <svg className="jn-svg" viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} preserveAspectRatio="xMinYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="jn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#dff3ff" />
          <stop offset="1" stopColor="#c4e8ff" />
        </linearGradient>
      </defs>
      <rect width={WORLD_W} height={WORLD_H} fill="url(#jn-sky)" />
      <circle cx="190" cy="90" r="38" fill="#ffe08a" />
      {[[520, 70], [1150, 50], [1700, 90], [2250, 60]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y} a16,16 0 0 1 30,-8 a20,20 0 0 1 36,6 a13,13 0 0 1 2,26 h-64 a13,13 0 0 1 -4,-24z`} fill="#fff" opacity="0.95" />
      ))}
      <path d="M0,340 C300,262 600,312 900,292 C1300,262 1600,330 2000,300 C2300,282 2500,312 2600,300 V420 H0Z" fill="#d7eef6" />
      <rect y="380" width={WORLD_W} height="140" fill="#c9e8b0" />
      <rect y="414" width={WORLD_W} height="6" fill="#e7eef5" />
      <rect y="420" width={WORLD_W} height="52" fill="#a9bccf" />
      <path d={`M0,446 H${WORLD_W}`} stroke="#fff" strokeWidth="4" strokeDasharray="30 22" />
      <rect y="472" width={WORLD_W} height="48" fill="#b5dd97" />
      {[570, 1135, 1625, 2125].map((x) => (
        <Tree key={x} x={x} s={0.9} />
      ))}

      {/* 01 Farm */}
      <g className={on(0)}>
        <rect x="40" y="300" width="470" height="104" rx="12" fill="#a97c50" />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <path d={`M56,${322 + r * 30} H494`} stroke="#8d6440" strokeWidth="10" strokeLinecap="round" />
            {Array.from({ length: 8 }, (_, c) => (
              <g key={c} transform={`translate(${78 + c * 56} ${318 + r * 30})`}>
                <path d="M0,0 q-10,-14 -4,-24 q4,8 4,14 q2,-14 10,-18 q2,12 -6,28z" fill="#5fae4e" />
                {r === 2 && c % 2 === 0 && <ellipse className="loop pop" style={{ animationDelay: `${c * 0.25}s` }} cx="10" cy="8" rx="9" ry="6" fill="#c99a5b" stroke="#9c7038" strokeWidth="1.2" />}
              </g>
            ))}
          </g>
        ))}
        <g transform="translate(300 330)">
          <g className="loop bob">
            <rect x="-11" y="-36" width="22" height="34" rx="6" fill="#38b6f5" />
            <rect x="-10" y="-2" width="8" height="26" rx="3" fill="#1f4468" />
            <rect x="2" y="-2" width="8" height="26" rx="3" fill="#1f4468" />
            <circle cy="-48" r="11" fill="#8d5a3b" />
            <ellipse cy="-56" rx="20" ry="5" fill="#e8c46a" />
            <ellipse cy="-60" rx="10" ry="7" fill="#e8c46a" />
            <path d="M10,-30 L26,-20" stroke="#8d5a3b" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="30" cy="-18" rx="8" ry="6" fill="#c99a5b" stroke="#9c7038" strokeWidth="1.2" />
          </g>
        </g>
        {[[440, 392], [470, 392], [455, 372]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M-14,10 Q-16,-12 -6,-16 L6,-16 Q16,-12 14,10 Z" fill="#c8a06a" stroke="#9a7442" strokeWidth="1.5" />
            <path d="M-6,-16 L0,-22 L6,-16" fill="none" stroke="#9a7442" strokeWidth="2" />
          </g>
        ))}
        <g transform="translate(70 262)">
          <rect x="-3" y="0" width="6" height="40" fill="#8a6a4a" />
          <rect x="-34" y="-22" width="68" height="26" rx="5" fill="#fff" stroke="#8a6a4a" strokeWidth="2" />
          <text y="-4" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="13" fill="#1f4468">
            FARM
          </text>
        </g>
      </g>

      {/* 02 Factory */}
      <g className={on(1)}>
        <rect x="1000" y="118" width="34" height="96" fill="#8fb1cc" />
        {[0, 1, 2].map((i) => (
          <circle key={i} className="loop smoke" style={{ animationDelay: `${i * 0.8}s` }} cx="1017" cy="108" r="14" fill="#e8f1f8" />
        ))}
        <path d="M660,214 L660,190 L730,160 L730,190 L800,160 L800,190 L870,160 L870,190 L940,160 L940,190 L1010,160 L1010,190 L1080,160 L1080,214 Z" fill="#38b6f5" stroke="#0e2a47" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="660" y="212" width="420" height="204" fill="#fff" stroke="#9cc3e2" strokeWidth="2.5" />
        <rect x="700" y="226" width="340" height="32" rx="8" fill="#0e2a47" />
        <text x="870" y="248" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="17" letterSpacing="1.5" fill="#fff">
          SRI GOPAL FOODS
        </text>
        <rect x="688" y="270" width="364" height="110" rx="12" fill="#e6f5ff" stroke="#9cc3e2" strokeWidth="2" />
        <g className="loop drip">
          <path d="M740,286 v10 M752,282 v14 M764,286 v10" stroke="#5bb8f0" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g transform="translate(860 300)">
          <g className="loop chop">
            <rect x="-4" y="-22" width="8" height="12" rx="2" fill="#0e2a47" />
            <path d="M-4,-10 H4 V12 L-4,6 Z" fill="#cfd8dc" stroke="#78909c" strokeWidth="1.5" />
          </g>
        </g>
        <path d="M955,296 Q980,326 1005,296 Z" fill="#3a2a22" />
        <ellipse cx="980" cy="297" rx="25" ry="4" fill="#f2b13a" />
        {[968, 984, 994].map((x, i) => (
          <circle key={x} className="loop fizz" style={{ animationDelay: `${i * 0.3}s` }} cx={x} cy="294" r="2.5" fill="#fff3c4" />
        ))}
        <rect x="700" y="346" width="340" height="12" rx="6" fill="#5f7a94" />
        <g className="loop belt">
          {[0, 60, 120, 180, 240, 300].map((dx, i) => (
            <ellipse key={i} cx={712 + dx} cy="340" rx={i % 2 ? 9 : 8} ry={i % 2 ? 4 : 6} fill={i % 2 ? '#f4b740' : '#c99a5b'} stroke={i % 2 ? '#d98a1c' : '#9c7038'} strokeWidth="1.2" />
          ))}
        </g>
        <text x="870" y="374" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="11" letterSpacing="2" fill="#5f7a94">
          WASH · PEEL · SLICE · FRY
        </text>
        <g transform="translate(1064 268)">
          <g className="loop pulse">
            <circle r="16" fill="#1f9d6b" />
            <path d="M-7,0 l5,6 l10,-12" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <rect x="960" y="384" width="70" height="32" fill="#cfe6f7" stroke="#9cc3e2" strokeWidth="2" />
      </g>

      {/* 03 Flavouring, packaging and branding */}
      <g className={on(2)}>
        <path d="M1180,250 L1370,196 L1560,250 Z" fill="#9ad8ff" stroke="#0e2a47" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="1190" y="248" width="360" height="168" fill="#f4faff" stroke="#9cc3e2" strokeWidth="2.5" />
        <rect x="1250" y="258" width="240" height="26" rx="7" fill="#0e2a47" />
        <text x="1370" y="276" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="12" letterSpacing="2" fill="#fff">
          FLAVOUR · PACK · BRAND
        </text>
        <g transform="translate(1238 336)">
          <g className="loop spin">
            <circle r="26" fill="#ffd9a8" stroke="#c49a55" strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 14} cy={Math.sin((a * Math.PI) / 180) * 14} r="4" fill="#f4b740" />
            ))}
          </g>
        </g>
        <path d="M1290,298 H1340 L1326,326 H1304 Z" fill="#c3d6e6" stroke="#5f7a94" strokeWidth="2" strokeLinejoin="round" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} className="loop drop" style={{ animationDelay: `${i * 0.35}s` }} cx="1315" cy="330" rx="5" ry="3" fill="#f4b740" />
        ))}
        <rect x="1210" y="384" width="320" height="10" rx="4" fill="#9cb4c9" />
        {PACKS.map((c, i) => (
          <MiniPack key={i} x={1315 + i * 58} y={356} color={c} className="loop bob" />
        ))}
        <MiniPack x={1480} y={356} color={PACKS[0]} className="loop bob" />
      </g>

      {/* 04 Distributors and wholesalers */}
      <g className={on(3)}>
        <path d="M1680,416 V250 Q1870,186 2060,250 V416 Z" fill="#e3eef8" stroke="#7fa6c6" strokeWidth="2.5" />
        <path d="M1680,250 Q1870,186 2060,250" fill="none" stroke="#5f86a8" strokeWidth="10" strokeLinecap="round" />
        <rect x="1780" y="232" width="180" height="26" rx="7" fill="#0e2a47" />
        <text x="1870" y="250" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="12" letterSpacing="2" fill="#fff">
          DISTRIBUTOR
        </text>
        <rect x="1820" y="300" width="130" height="116" fill="#c9d9e8" stroke="#7fa6c6" strokeWidth="2" />
        {[316, 334, 352, 370, 388].map((y) => (
          <path key={y} d={`M1820,${y} H1950`} stroke="#a7bfd4" strokeWidth="2" />
        ))}
        {[[1700, 388], [1740, 388], [1720, 360], [1760, 360], [1740, 332], [1700, 360]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="38" height="28" rx="2" fill="#e2bd84" stroke="#a8823f" strokeWidth="1.5" />
            <path d={`M${x + 19},${y} V${y + 28}`} stroke="#c49a55" strokeWidth="1.5" />
          </g>
        ))}
        <g transform="translate(1990 392)">
          <g className="loop shuttle">
            <rect x="-22" y="-26" width="34" height="22" rx="4" fill="#ffc533" stroke="#0e2a47" strokeWidth="1.5" />
            <rect x="-14" y="-40" width="16" height="16" rx="3" fill="none" stroke="#0e2a47" strokeWidth="2" />
            <path d="M14,-44 V0 M14,-6 H30" stroke="#0e2a47" strokeWidth="3" />
            <rect x="16" y="-26" width="20" height="16" rx="2" fill="#e2bd84" stroke="#a8823f" strokeWidth="1.5" />
            <circle cx="-14" cy="0" r="7" fill="#1d2a36" />
            <circle cx="6" cy="0" r="7" fill="#1d2a36" />
          </g>
        </g>
      </g>

      {/* 05 Retail shops, supermarkets and consumers */}
      <g className={on(4)}>
        <rect x="2180" y="226" width="390" height="190" fill="#fff" stroke="#9cc3e2" strokeWidth="2.5" />
        <rect x="2210" y="206" width="330" height="34" rx="8" fill="#0e2a47" />
        <text x="2375" y="229" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="18" letterSpacing="2" fill="#fff">
          SUPERMARKET
        </text>
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={2170 + i * 41} y="246" width="41" height="34" fill={i % 2 ? '#fff' : '#38b6f5'} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={2190.5 + i * 41} cy="280" r="20.5" fill={i % 2 ? '#fff' : '#38b6f5'} />
        ))}
        <rect x="2200" y="306" width="210" height="92" rx="6" fill="#e6f5ff" stroke="#9cc3e2" strokeWidth="2" />
        {[334, 370].map((y) => (
          <g key={y}>
            <path d={`M2206,${y + 14} H2404`} stroke="#9cc3e2" strokeWidth="3" />
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={i} x={2214 + i * 27} y={y - 10} width="16" height="24" rx="3" fill={PACKS[(i + y) % 3]} />
            ))}
          </g>
        ))}
        <rect x="2440" y="306" width="80" height="110" fill="#cfe6f7" stroke="#9cc3e2" strokeWidth="2" />
        <g transform="translate(2548 400)">
          <g className="loop bob">
            <rect x="-11" y="-50" width="22" height="34" rx="6" fill="#ff7aa8" />
            <rect x="-10" y="-16" width="8" height="18" rx="3" fill="#1f4468" />
            <rect x="2" y="-16" width="8" height="18" rx="3" fill="#1f4468" />
            <circle cy="-62" r="11" fill="#c68b5e" />
            <path d="M-11,-66 Q0,-80 11,-66" fill="#2b1d16" />
            <path d="M-10,-44 L-22,-36" stroke="#c68b5e" strokeWidth="6" strokeLinecap="round" />
            <MiniPack x={-28} y={-34} color={PACKS[0]} s={0.55} />
          </g>
          <path className="loop heart" d="M0,-92 c-6,-8 -16,-2 -10,6 l10,9 l10,-9 c6,-8 -4,-14 -10,-6z" fill="#ff5c8a" />
        </g>
      </g>
    </svg>
  )
}

/** Farm-to-shelf journey: the stage pins while scrolling; a truck drives past each station of the supply chain. */
export default function Journey() {
  const ref = useRef(null)
  const worldRef = useRef(null)
  const stageRef = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const truckX = useTransform(p, P_IN, X_OUT)

  // world size in px (the world is laid out by CSS; we only read it)
  const [dims, setDims] = useState({ scale: 1, worldW: WORLD_W, viewW: 1200 })
  useEffect(() => {
    const measure = () => {
      const h = worldRef.current?.offsetHeight || WORLD_H
      const scale = h / WORLD_H
      setDims({ scale, worldW: WORLD_W * scale, viewW: stageRef.current?.offsetWidth || innerWidth })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  const truckPx = useTransform(truckX, (x) => x * dims.scale)
  const camX = useTransform(truckX, (x) => {
    const centre = (x + TRUCK_W / 2) * dims.scale
    return -Math.max(0, Math.min(dims.worldW - dims.viewW, centre - dims.viewW * 0.5))
  })

  const [active, setActive] = useState(0)
  const [moving, setMoving] = useState(false)
  useMotionValueEvent(truckX, 'change', (x) => {
    let best = 0
    STATIONS.forEach((s, i) => {
      if (Math.abs(s.stop - TRUCK_W / 2 - x) < Math.abs(STATIONS[best].stop - TRUCK_W / 2 - x)) best = i
    })
    setActive(best)
    setMoving(!STATIONS.some((s) => Math.abs(s.stop - TRUCK_W / 2 - x) < 1))
  })
  // potatoes from the farm up to the factory; boxes of packed chips once it drives off from there
  const cargo = truckX.get() <= STATIONS[1].stop - TRUCK_W / 2 + 0.5 ? 'potatoes' : 'boxes'
  const s = STATIONS[active]

  return (
    <section className="products" id="products">
      <div className="container">
        <SectionHead
          kicker="Farm to shelf"
          title={
            <>
              Three kinds of <em>crunch</em>.
            </>
          }
          sub="Follow the journey: from the potato farm, through our factory, all the way to the shop near you."
          center
        />
      </div>
      <div ref={ref} className="jn" style={{ height: `${STATIONS.length * 90}vh` }}>
        <div ref={stageRef} className="jn-pin">
          <ol className="jn-steps container">
            {STATIONS.map((st, i) => (
              <li key={st.id} className={i === active ? 'on' : i < active ? 'done' : ''}>
                <span>{pad(i)}</span>
                {st.label}
              </li>
            ))}
          </ol>

          <motion.div ref={worldRef} className={`jn-world ${moving ? 'is-moving' : ''}`} style={{ x: camX, width: dims.worldW }}>
            <World active={moving ? -1 : active} />
            <motion.div className="jn-truck" style={{ x: truckPx }}>
              <div className="jn-truck-bob">
                <Truck cargo={cargo} />
              </div>
            </motion.div>
          </motion.div>

          <div className="jn-caption container">
            <AnimatePresence mode="wait">
              <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }}>
                <span className="pc-num">
                  Step {active + 1} of {STATIONS.length}
                </span>
                <h3>{s.label}</h3>
                <p>{s.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
