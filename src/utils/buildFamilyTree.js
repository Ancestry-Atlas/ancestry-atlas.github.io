export default function buildFamilyTree(members) {
  console.clear()
  const tree = []

  // get couples
  const couples = members
    .filter(person => person?.parents !== 'Nothing')
    .map(person => person.parents.split(','))

  // add couples as childrens
  members = members.map(person => {
    const currentCouple = couples.find(couple =>
      couple.includes(String(person.id))
    )
    if (currentCouple) {
      const spouseId = currentCouple?.filter(id => id !== String(person.id))
      let spouse = members.find(({ id }) => id === +spouseId)

      // add childrens to the nested parent
      const children = members.filter(member =>
        member.parents.split(',').includes(String(spouseId))
      )

      spouse = { ...spouse, children }
      return {
        ...person,
        children: spouse,
      }
    } else {
      return person
    }
  })

  // move node without parents to the root
  members = members.filter(person => {
    if (person?.parents === 'Nothing') {
      tree.push({
        id: person.id,
        name: person.name,
        nickname: person.nickname,
        children: person.children,
      })
      return false
    }
    return true
  })

  // console.log('couples', couples)
  // console.log('pending', pendingMembers)
  console.log('tree', tree)
}