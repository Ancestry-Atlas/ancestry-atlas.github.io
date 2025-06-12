import ManageMembers from '../components/ManageMembers'
import { useParams } from 'react-router-dom'

export default function EditMember() {
  const { id } = useParams()
  return <ManageMembers id={id} />
}
