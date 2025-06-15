import useFamilyData from '../hooks/useFamilyData'
import FamilyNamesList from '../components/FamilyNamesList'

export default function FamilyNamesIndex() {
  const { familyNames, deleteMember } = useFamilyData()

  return (
    <nn-fila>
      <FamilyNamesList
        familyNames={familyNames}
        onDelete={deleteMember}
      />
    </nn-fila>
  )
}
