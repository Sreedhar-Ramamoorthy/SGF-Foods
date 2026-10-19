const PATHS = {
  food: (
    <>
      <path d="M7 2v20M4 2v5a3 3 0 0 0 6 0V2" />
      <path d="M18 22V2c-2.5 1.5-4 4.5-4 8.5V13h4" />
    </>
  ),
  transport: (
    <>
      <path d="M2 6h12v10H2zM14 9h4.5L22 12.5V16h-8" />
      <circle cx="6.5" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </>
  ),
  realty: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  farm: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12c0-4 2.5-7 7-7 0 4.5-3 7-7 7z" />
      <path d="M12 15c0-3-2-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z" />
      <path d="M5 21h14" />
    </>
  ),
  invest: (
    <>
      <path d="M3 20h18" />
      <path d="M6 16v-3M10 16V9M14 16v-5M18 16V6" />
      <path d="m4 9 5-5 4 3 6-5" />
    </>
  ),
  infra: (
    <>
      <path d="M2 18h20" />
      <path d="M4 18v-1a8 8 0 0 1 16 0v1" />
      <path d="M10 9.2V5h4v4.2" />
    </>
  ),
  care: (
    <>
      <path d="M12 20s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8C20 15.4 12 20 12 20z" />
      <path d="M12 10.5v5M9.5 13h5" />
    </>
  ),
  edu: (
    <>
      <path d="M2 9.5 12 5l10 4.5-10 4.5z" />
      <path d="M6 11.5V16c3.5 2.5 8.5 2.5 12 0v-4.5" />
      <path d="M22 9.5V15" />
    </>
  ),
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
}

export default function Icon({ name, className = '', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={`ic ${className}`} aria-hidden="true" {...rest}>
      {PATHS[name]}
    </svg>
  )
}
