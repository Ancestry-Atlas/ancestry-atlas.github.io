import gColors from 'nano-grid/dist/gcolors.js'
import { Link } from 'react-router-dom'

export default function FamilyNamesList({ familyNames, onDelete }) {
  return (
    <nn-pilar className="listing family">
      <nn-caja padding="1rem">
        <h2>Family Names</h2>
        <nn-desplazador>
          <ul className="repeater list">
            {familyNames.map(name => (
              <li key={`${name.id}`}>
                <nn-fila>
                  <nn-pilar
                    size="35px"
                    className="index"
                  >
                    {name.id}
                  </nn-pilar>
                  <nn-pilar
                    size="100% - 35px * 3"
                    className="preview"
                  >
                    {name.label}
                  </nn-pilar>
                  <nn-pilar
                    size="35px"
                    className="controls"
                  >
                    <nn-btn color={gColors['shamrock-green'].hex}>
                      <Link to={`/family-names/edit/${name.id}`}>E</Link>
                    </nn-btn>
                  </nn-pilar>
                  <nn-pilar
                    size="35px"
                    className="controls"
                  >
                    <nn-btn
                      color="#ff5555"
                      onClick={() => onDelete(name.id)}
                    >
                      X
                    </nn-btn>
                  </nn-pilar>
                </nn-fila>
              </li>
            ))}
          </ul>
        </nn-desplazador>
        <nn-btn color={gColors['sunglow'].hex}>
          <Link to="/family-names/create">Add Family Name</Link>
        </nn-btn>
      </nn-caja>
    </nn-pilar>
  )
}
