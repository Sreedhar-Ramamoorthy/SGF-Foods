import { COMPANY, GROUP_BUSINESSES, GROUP_NAME, GROUP_URL } from '../data/menu'
import { scrollToId } from '../lib/motion'
import { usePageTransition } from './Transition'
import Icon from './Icon'

export default function Footer() {
  const go = usePageTransition()
  const toGroup = (hash) => (e) => {
    e.preventDefault()
    go(`${GROUP_URL}/${hash}`, GROUP_NAME, e)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="ft-grid">
          <div className="ft-brand">
            <a href="#top" className="logo" onClick={(e) => (e.preventDefault(), scrollToId('top'))}>
              <span className="logo-badge">🍛</span>
              <span className="logo-txt">
                Sri Gopal<em>Foods</em>
              </span>
            </a>
            <p>Fresh, hot food from our own kitchen, delivered to your door. Proudly part of {GROUP_NAME}.</p>
            <a href={GROUP_URL} className="ft-group" onClick={toGroup('')}>
              <Icon name="back" /> Back to {GROUP_NAME}
            </a>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {[
                ['menu', 'Menu'],
                ['specials', 'Combos'],
                ['how', 'How it works'],
                ['reviews', 'Reviews'],
              ].map(([id, l]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => (e.preventDefault(), scrollToId(id))}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{GROUP_NAME}</h4>
            <ul>
              {GROUP_BUSINESSES.filter((b) => b.id !== 'food').map((b) => (
                <li key={b.id}>
                  <a href={`${GROUP_URL}/#${b.id}`} onClick={toGroup(`#${b.id}`)} style={{ '--c': b.color }}>
                    <i /> {b.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Visit us</h4>
            <address className="ft-address">
              <b>{COMPANY.name}</b>
              {COMPANY.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          </div>
        </div>
        <div className="ft-bottom">
          <span>
            © {new Date().getFullYear()} {COMPANY.name} · A {GROUP_NAME} company
          </span>
          <span>Made with 🧡 in Tiruchirappalli</span>
        </div>
      </div>
    </footer>
  )
}
