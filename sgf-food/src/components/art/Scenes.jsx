import { motion } from 'motion/react'
import { Chip, Pack, Veg } from './Parts'

// One illustrated scene per life-cycle step (viewBox 400 × 300).
// Every loop runs only while `play` is true, so scenes that are off screen cost nothing.

const ORIGIN = { transformBox: 'fill-box', transformOrigin: 'center' }
const loop = (play, animate, transition = {}) =>
  play ? { animate, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', ...transition } } : {}

function Svg({ children, label }) {
  return (
    <svg className="scene" viewBox="0 0 400 300" role="img" aria-label={label}>
      {children}
    </svg>
  )
}

function Harvest({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Harvesting ${t.raw}`}>
      <g transform="translate(330 62)">
        <motion.g style={ORIGIN} {...loop(play, { rotate: 360 }, { duration: 24, ease: 'linear' })}>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="-2.5" y="-40" width="5" height="12" rx="2.5" fill="#ffc53d" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="22" fill="#ffc53d" />
        </motion.g>
      </g>
      <motion.g {...loop(play, { x: [0, 26, 0] }, { duration: 9 })}>
        <path d="M62,70 a14,14 0 0 1 26,-8 a18,18 0 0 1 32,6 a12,12 0 0 1 2,24 h-56 a12,12 0 0 1 -4,-22z" fill="#fff" opacity="0.9" />
      </motion.g>
      <ellipse cx="200" cy="262" rx="186" ry="34" fill="#86c25a" />
      <path d="M40,256 Q120,196 210,214 T362,250 Q300,276 200,278 Q100,276 40,256Z" fill="#a8d77a" />
      <g fill="#6aa843">
        <path d="M70,250 q4,-14 8,0 q4,-10 7,0z" />
        <path d="M318,246 q4,-14 8,0 q4,-10 7,0z" />
      </g>
      <g transform="translate(200 240)">
        <rect x="-74" y="-40" width="148" height="20" rx="4" fill="#b07636" />
        {[-40, 0, 40].map((x, i) => (
          <g key={x} transform={`translate(${x} -40)`}>
            <motion.g {...loop(play, { y: [-150, 0, 0, 0], opacity: [0, 1, 1, 1] }, { duration: 2.6, times: [0, 0.32, 0.4, 1], delay: i * 0.45, ease: 'easeIn' })}>
              <motion.g style={ORIGIN} {...loop(play, { rotate: [0, -8, 0] }, { duration: 2.6, delay: i * 0.45 })}>
                <Veg type={t.id} c={c} scale={0.55} />
              </motion.g>
            </motion.g>
          </g>
        ))}
        <rect x="-78" y="-26" width="156" height="56" rx="6" fill="#c98a4b" stroke="#8a5a2b" strokeWidth="3" />
        <path d="M-78,-8 H78 M-78,12 H78" stroke="#8a5a2b" strokeWidth="2.5" opacity="0.6" />
        <path d="M-52,-26 V30 M52,-26 V30" stroke="#8a5a2b" strokeWidth="3" opacity="0.5" />
      </g>
    </Svg>
  )
}

function Wash({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Washing ${t.raw}`}>
      <defs>
        <clipPath id="tank-clip">
          <rect x="60" y="128" width="280" height="132" rx="18" />
        </clipPath>
      </defs>
      <path d="M200,22 V58 M184,58 h32 v14 h-32z" stroke="#7d8b93" strokeWidth="8" strokeLinecap="round" fill="#b8c4ca" />
      {[0, 1, 2, 3].map((i) => (
        <motion.ellipse
          key={i}
          cx={192 + (i % 2) * 16}
          cy="84"
          rx="3.5"
          ry="5.5"
          fill="#7cc6f2"
          initial={{ opacity: 0 }}
          {...loop(play, { y: [0, 70], opacity: [1, 0.8, 0] }, { duration: 0.9, delay: i * 0.22, ease: 'easeIn' })}
        />
      ))}
      <rect x="60" y="128" width="280" height="132" rx="18" fill="#eaf7ff" stroke="#8cc9ee" strokeWidth="3" />
      <g clipPath="url(#tank-clip)">
        <motion.path
          d="M-100,160 q25,-12 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 V300 H-100Z"
          fill="#8fd0f5"
          opacity="0.85"
          {...loop(play, { x: [0, 100] }, { duration: 2.4, ease: 'linear' })}
        />
        {[130, 200, 270].map((x, i) => (
          <g key={x} transform={`translate(${x} 182)`}>
            <motion.g style={ORIGIN} {...loop(play, { y: [0, -9, 0], rotate: [-8, 8, -8] }, { duration: 2.2 + i * 0.3 })}>
              <Veg type={t.id} c={c} scale={0.5} />
            </motion.g>
          </g>
        ))}
        {[100, 160, 235, 300, 180, 260].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="250"
            r={3 + (i % 3)}
            fill="#fff"
            stroke="#8cc9ee"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            {...loop(play, { y: [0, -90], opacity: [0, 0.9, 0] }, { duration: 2.4, delay: i * 0.35, ease: 'easeOut' })}
          />
        ))}
      </g>
    </Svg>
  )
}

function Peel({ t, play }) {
  const { c } = t
  const strips = [-3, -2, -1, 1, 2, 3]
  return (
    <Svg label={`Peeling ${t.raw}`}>
      <circle cx="200" cy="168" r="112" fill="#fff" opacity="0.55" />
      <g transform="translate(200 172)">
        <motion.g style={ORIGIN} {...loop(play, { rotate: [-6, 6, -6] }, { duration: 3 })}>
          <Veg type={t.id} c={c} peeled scale={1.7} />
        </motion.g>
      </g>
      {strips.map((d, i) => (
        <g key={d} transform={`translate(${200 + d * 10} 120)`}>
          <motion.path
            d="M0,0 c8,-7 16,5 24,-2 c6,-5 10,2 14,0"
            fill="none"
            stroke={c.skin}
            strokeWidth="7"
            strokeLinecap="round"
            style={ORIGIN}
            initial={{ opacity: 0 }}
            {...loop(play, { x: [0, d * 34], y: [0, -50 - Math.abs(d) * 6, 70], rotate: [0, d * 70], opacity: [0, 1, 1, 0] }, { duration: 1.9, delay: i * 0.3, ease: 'easeOut' })}
          />
        </g>
      ))}
      <g transform="translate(200 104)">
        <motion.g {...loop(play, { x: [-56, 56, -56] }, { duration: 1.9 })}>
          <rect x="-6" y="-58" width="12" height="40" rx="6" fill="#3a2a22" />
          <rect x="-18" y="-20" width="36" height="12" rx="4" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="2" />
        </motion.g>
      </g>
    </Svg>
  )
}

function Slice({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Slicing ${t.raw}`}>
      <rect x="36" y="214" width="328" height="30" rx="12" fill="#d9a066" stroke="#a8713a" strokeWidth="3" />
      <g transform="translate(128 182)">
        <motion.g {...loop(play, { x: [0, 14, 0] }, { duration: 0.9 })}>
          <Veg type={t.id} c={c} peeled scale={0.95} />
        </motion.g>
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${296 + i * 22} ${204 - i * 3})`}>
          <Chip type={t.id} c={c} raw scale={0.8} />
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform="translate(214 182)">
          <motion.g
            style={ORIGIN}
            initial={{ opacity: 0 }}
            {...loop(play, { x: [0, 60 + i * 10], y: [0, -20, 18], rotate: [0, 160], opacity: [0, 1, 1, 0] }, { duration: 1.4, delay: i * 0.28, ease: 'easeOut' })}
          >
            <Chip type={t.id} c={c} raw scale={0.75} />
          </motion.g>
        </g>
      ))}
      <g transform="translate(206 150)">
        <motion.g {...loop(play, { y: [-26, 22, -26] }, { duration: 0.9 })}>
          <rect x="-9" y="-90" width="18" height="36" rx="5" fill="#3a2a22" />
          <path d="M-7,-56 H7 V30 L-7,18 Z" fill="#dfe6ea" stroke="#90a4ae" strokeWidth="2.5" strokeLinejoin="round" />
        </motion.g>
      </g>
    </Svg>
  )
}

function Fry({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Frying ${t.name.toLowerCase()} slices`}>
      {[-22, 0, 22].map((x, i) => (
        <g key={x} transform={`translate(${200 + x} 284)`}>
          <motion.path
            d="M0,0 C-12,-8 -10,-26 0,-40 C10,-26 12,-8 0,0Z"
            fill={i === 1 ? '#ffc53d' : '#ff7a45'}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            {...loop(play, { scaleY: [1, 1.25, 0.9, 1] }, { duration: 0.7 + i * 0.1 })}
          />
        </g>
      ))}
      <rect x="110" y="246" width="180" height="8" rx="4" fill="#5b4a40" />
      <path d="M86,172 Q200,320 314,172 Z" fill="#3a2a22" />
      <path d="M86,172 Q60,168 62,184 M314,172 Q340,168 338,184" stroke="#3a2a22" strokeWidth="8" fill="none" strokeLinecap="round" />
      <ellipse cx="200" cy="172" rx="114" ry="18" fill="#2a1d17" />
      <ellipse cx="200" cy="174" rx="102" ry="13" fill="#f2b13a" />
      {[150, 186, 222, 256].map((x, i) => (
        <g key={x} transform={`translate(${x} 170) scale(1 0.55)`}>
          <motion.g {...loop(play, { y: [0, -6, 0] }, { duration: 1.4, delay: i * 0.2 })}>
            <Chip type={t.id} c={c} scale={0.8} />
            <motion.g initial={{ opacity: 1 }} {...loop(play, { opacity: [1, 0, 0, 1] }, { duration: 4, times: [0, 0.4, 0.85, 1], delay: i * 0.5 })}>
              <Chip type={t.id} c={c} raw scale={0.8} />
            </motion.g>
          </motion.g>
        </g>
      ))}
      {[130, 172, 214, 240, 268, 196].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={170 + (i % 3) * 3}
          r="3.5"
          fill="#fff3c4"
          style={ORIGIN}
          initial={{ scale: 0 }}
          {...loop(play, { scale: [0, 1, 0] }, { duration: 1.1, delay: i * 0.23 })}
        />
      ))}
      {[160, 200, 240].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x},140 c-8,-10 8,-18 0,-28 c-8,-10 8,-18 0,-28`}
          stroke="#c9b8aa"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          {...loop(play, { y: [0, -24], opacity: [0, 0.8, 0] }, { duration: 2.2, delay: i * 0.5, ease: 'easeOut' })}
        />
      ))}
    </Svg>
  )
}

const PILE = [
  [-62, -18], [-34, -30], [-4, -36], [26, -30], [56, -18], [-46, -6], [-14, -14], [18, -12], [46, -4], [-2, 0],
]

function Season({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Seasoning ${t.name.toLowerCase()} chips`}>
      <g transform="translate(200 214)">
        <motion.g {...loop(play, { y: [0, -8, 0] }, { duration: 1.2 })}>
          {PILE.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${i * 37})`}>
              <Chip type={t.id} c={c} scale={0.85} />
            </g>
          ))}
        </motion.g>
        <path d="M-118,-6 Q-108,74 0,76 Q108,74 118,-6Z" fill="#fff" stroke="#e7d5c2" strokeWidth="3" />
        <path d="M-112,16 Q0,34 112,16" stroke={c.pack} strokeWidth="8" fill="none" opacity="0.85" />
        <ellipse cy="-6" rx="118" ry="12" fill="none" stroke="#e7d5c2" strokeWidth="3" />
      </g>
      {Array.from({ length: 12 }, (_, i) => (
        <motion.circle
          key={i}
          cx="268"
          cy="100"
          r={i % 3 ? 2.6 : 3.2}
          fill={i % 2 ? '#fff' : '#e8742f'}
          stroke={i % 2 ? '#d8c8b8' : 'none'}
          initial={{ opacity: 0 }}
          {...loop(play, { x: [0, -110 + i * 12], y: [0, 92 + (i % 4) * 6], opacity: [0, 1, 0] }, { duration: 1.2, delay: i * 0.1, ease: 'easeIn' })}
        />
      ))}
      <g transform="translate(298 72)">
        <motion.g style={{ transformBox: 'fill-box', transformOrigin: '50% 80%' }} {...loop(play, { rotate: [-28, -48, -28] }, { duration: 0.6 })}>
          <rect x="-20" y="-34" width="40" height="64" rx="12" fill="#fff" stroke="#3a2a22" strokeWidth="3" />
          <rect x="-20" y="-48" width="40" height="18" rx="6" fill="#c0c7cc" stroke="#3a2a22" strokeWidth="3" />
          <g fill="#3a2a22">
            <circle cx="-8" cy="-39" r="2" />
            <circle cx="0" cy="-39" r="2" />
            <circle cx="8" cy="-39" r="2" />
          </g>
          <rect x="-12" y="-10" width="24" height="24" rx="6" fill={c.pack} opacity="0.9" />
        </motion.g>
      </g>
    </Svg>
  )
}

function Check({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Cooling and checking ${t.name.toLowerCase()} chips`}>
      <path d="M70,232 V280 M330,232 V280" stroke="#7d6a5f" strokeWidth="8" strokeLinecap="round" />
      <rect x="30" y="210" width="340" height="24" rx="12" fill="#3a2a22" />
      {[52, 108, 164, 220, 276, 332].map((x) => (
        <g key={x} transform={`translate(${x} 222)`}>
          <motion.g style={ORIGIN} {...loop(play, { rotate: 360 }, { duration: 1, ease: 'linear' })}>
            <circle r="8" fill="#7d6a5f" />
            <path d="M-6,0 H6" stroke="#3a2a22" strokeWidth="2" />
          </motion.g>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform="translate(0 196)">
          {/* CSS animation: a negative delay spaces the chips evenly along the belt from the first frame */}
          <g className="belt-chip" style={{ animationDelay: `${-i}s`, animationPlayState: play ? 'running' : 'paused' }}>
            <Chip type={t.id} c={c} scale={0.85} />
          </g>
        </g>
      ))}
      <g transform="translate(200 116)">
        <motion.g {...loop(play, { x: [-50, 50, -50], y: [0, -6, 0] }, { duration: 3.4 })}>
          <path d="M22,26 L48,56" stroke="#3a2a22" strokeWidth="10" strokeLinecap="round" />
          <circle r="32" fill="#ffffff" fillOpacity="0.55" stroke="#3a2a22" strokeWidth="6" />
          <ellipse cx="-10" cy="-12" rx="10" ry="5" fill="#fff" transform="rotate(-30 -10 -12)" />
        </motion.g>
      </g>
      <g transform="translate(316 70)">
        <motion.g style={ORIGIN} initial={{ scale: 1 }} {...loop(play, { scale: [0, 1.15, 1, 1, 0] }, { duration: 2.4, times: [0, 0.15, 0.25, 0.85, 1] })}>
          <circle r="22" fill="#1f9d6b" />
          <path d="M-9,0 l6,7 l12,-14" stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </g>
    </Svg>
  )
}

function Packing({ t, play }) {
  const { c } = t
  return (
    <Svg label={`Packing ${t.name.toLowerCase()} chips`}>
      {[
        [70, 70],
        [334, 96],
        [92, 236],
        [318, 238],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <motion.path
            d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3Z"
            fill={c.chip}
            style={ORIGIN}
            initial={{ scale: 0.6 }}
            {...loop(play, { scale: [0, 1, 0], rotate: [0, 90] }, { duration: 1.8, delay: i * 0.4 })}
          />
        </g>
      ))}
      {[-30, -8, 14, 32].map((x, i) => (
        <g key={i} transform={`translate(${200 + x} 40)`}>
          <motion.g style={ORIGIN} initial={{ opacity: 0 }} {...loop(play, { y: [0, 60], rotate: [0, 120], opacity: [0, 1, 0] }, { duration: 1.2, delay: i * 0.3, ease: 'easeIn' })}>
            <Chip type={t.id} c={c} scale={0.6} />
          </motion.g>
        </g>
      ))}
      <g transform="translate(200 186)">
        <motion.g style={ORIGIN} {...loop(play, { y: [0, -6, 0], rotate: [-3, 3, -3] }, { duration: 2.6 })}>
          <Pack t={t} scale={0.82} />
        </motion.g>
      </g>
    </Svg>
  )
}

export const SCENES = { harvest: Harvest, wash: Wash, peel: Peel, slice: Slice, fry: Fry, season: Season, check: Check, pack: Packing }
