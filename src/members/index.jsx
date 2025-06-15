import useFamilyData from '../hooks/useFamilyData'
import MembersList from '../components/MembersList'

export default function MembersIndex() {
  const { persons, deleteMember } = useFamilyData()

  return (
    <nn-fila>
      <MembersList
        persons={persons}
        onDelete={deleteMember}
      />
    </nn-fila>
  )
}
