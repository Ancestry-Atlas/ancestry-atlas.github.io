import "nano-grid/dist/nanogrid.js";
import gColors from "nano-grid/dist/gcolors.js";
import { Link } from "react-router-dom";

export default function FamilyNamesList({ familyNames, onDelete, onEdit }) {
  return (
    <nn-pilar className="listing family">
      <nn-caja padding="1rem" max-width="600px">
        <h2>Family Names</h2>
        <nn-desplazador>
          <ul className="repeater list">
            {familyNames.map((name) => (
              <li key={`${name.id}`}>
                <nn-fila>
                  <nn-pilar size="35px" className="index">
                    {name.id}
                  </nn-pilar>
                  <nn-pilar size="100% - 35px * 3" className="preview">
                    {name.label}
                  </nn-pilar>
                  <nn-pilar size="35px">
                    <nn-btn
                      color={gColors["shamrock-green"].hex}
                      onClick={() => onEdit(name.id)}
                    >
                      E
                    </nn-btn>
                  </nn-pilar>
                  <nn-pilar size="35px">
                    <nn-btn color="#ff5555" onClick={() => onDelete(name.id)}>
                      X
                    </nn-btn>
                  </nn-pilar>
                </nn-fila>
              </li>
            ))}
          </ul>
        </nn-desplazador>
        <Link to="/family-names/edit">
          <nn-btn color={gColors["sunglow"].hex}>Add Family Name</nn-btn>
        </Link>
      </nn-caja>
    </nn-pilar>
  );
}
