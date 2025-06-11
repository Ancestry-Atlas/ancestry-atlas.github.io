import { Link } from 'react-router-dom'

export default function () {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/graph/table">Table</Link>
        </li>
        <li>
          <Link to="/graph/force-3d">Force 3D</Link>
        </li>
        <li>
          <Link to="/graph/radial-cluster-tree">Radial Cluster Tree</Link>
        </li>
        <li>
          <Link to="/members/edit">Manage Members</Link>
        </li>
      </ul>
    </nav>
  )
}
