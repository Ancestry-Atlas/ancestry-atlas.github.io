import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/members/">Members</Link>
        </li>
        <li>
          <Link to="/family_names/">Family Names</Link>
        </li>
      </ul>
    </nav>
  )
}
