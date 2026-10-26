const WORDS = ['Potato chips', 'Banana chips', 'Tapioca chips', 'Taste the Happiness', 'Made in Trichy', 'Farm to pack']

function Tape({ className, reverse }) {
  const row = WORDS.map((w) => (
    <span key={w}>
      {w} <b>✦</b>
    </span>
  ))
  return (
    <div className={`tape ${className}`}>
      <div className={`tape-track ${reverse ? 'rev' : ''}`}>
        <div className="tape-group">{row}</div>
        <div className="tape-group">{row}</div>
      </div>
    </div>
  )
}

export default function Tapes() {
  return (
    <section className="tapes" aria-hidden="true">
      <Tape className="t1" />
      <Tape className="t2" reverse />
    </section>
  )
}
