import { GROUP_BUSINESSES, GROUP_NAME, GROUP_URL } from '../data/company'
import { usePageTransition } from './Transition'
import Icon from './Icon'

export default function GroupBar() {
  const go = usePageTransition()
  return (
    <div className="group-bar">
      <div className="container gb-inner">
        <span className="gb-left">
          <span className="gb-dots">
            {GROUP_BUSINESSES.map((b) => (
              <i key={b.id} style={{ background: b.color }} title={b.name} />
            ))}
          </span>
          A <b>{GROUP_NAME}</b> company
        </span>
        <a
          href={`${GROUP_URL}/#businesses`}
          className="gb-link"
          onClick={(e) => {
            e.preventDefault()
            go(`${GROUP_URL}/#businesses`, GROUP_NAME, e)
          }}
        >
          Explore all {GROUP_BUSINESSES.length} businesses <Icon name="arrowUp" />
        </a>
      </div>
    </div>
  )
}
