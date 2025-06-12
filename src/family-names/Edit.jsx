import ManageFamilyNames from '../components/ManageFamilyNames'
import { useParams } from 'react-router-dom'

export default function EditFamilyNames() {
  const { id } = useParams()
  return <ManageFamilyNames id={id} />
}
