import gColors from 'nano-grid/dist/gcolors.js'
import { Link } from 'react-router-dom'

export default function MembersList({ persons = [], onDelete }) {
  return (
    <nn-pilar className="listing members">
      <nn-caja
        padding="1rem"
        max-width="600px"
      >
        <h2>Members</h2>
        <nn-desplazador>
          <ul className="repeater list">
            {(persons || []).map(member => (
              <li key={`${member.id}`}>
                <nn-fila>
                  <nn-pilar
                    size="35px"
                    className="index"
                  >
                    {member.id}
                  </nn-pilar>
                  <nn-pilar
                    size="100% - 35px * 3"
                    className="preview"
                  >
                    {[member.name, member.familyNames]?.flat().join(' ')}
                  </nn-pilar>
                  <nn-pilar
                    size="35px"
                    className="controls"
                  >
                    <nn-btn color={gColors['shamrock-green'].hex}>
                      <Link to={`/members/edit/${member.id}`}>E</Link>
                    </nn-btn>
                  </nn-pilar>
                  <nn-pilar
                    size="35px"
                    className="controls"
                  >
                    <nn-btn
                      color="#ff5555"
                      onClick={() => onDelete(member.id)}
                    >
                      X
                    </nn-btn>
                  </nn-pilar>
                </nn-fila>
              </li>
            ))}
          </ul>
        </nn-desplazador>
        <Link to="/members/create">
          <nn-btn color={gColors['sunglow'].hex}>Add Family Member</nn-btn>
        </Link>
      </nn-caja>
    </nn-pilar>
  )
}
