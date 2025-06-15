export default function buildFamilyTree(members) {
  console.clear()

  const couples = members
    .filter(person => person.parents !== 'Nothing')
    .map(person => person.parents.split(','))

  const visited = new Set()

  function buildPersonTree(personId) {
    if (visited.has(personId)) return null
    visited.add(personId)

    const person = members.find(m => String(m.id) === String(personId))
    if (!person) return null

    const currentCouple = couples.find(couple =>
      couple.includes(String(person.id))
    )

    let spouse = null
    let children = []

    if (currentCouple) {
      const spouseId = currentCouple.find(id => id !== String(person.id))
      spouse = buildPersonTree(spouseId) // 🔁 recurse into spouse too

      // Children of this couple
      children = members
        .filter(child => {
          const [p1, p2] = child.parents.split(',')
          return (
            [p1, p2].includes(String(person.id)) &&
            [p1, p2].includes(spouseId)
          )
        })
        .map(child => buildPersonTree(child.id))
        .filter(Boolean)
    } else {
      // No spouse — find children with this person as one parent
      children = members
        .filter(child =>
          child.parents.split(',').includes(String(person.id))
        )
        .map(child => buildPersonTree(child.id))
        .filter(Boolean)
    }

    return {
      id: person.id,
      name: person.name,
      nickname: person.nickname,
      spouse,
      children,
    }
  }

  const tree = members
    .filter(p => p.parents === 'Nothing')
    .map(root => buildPersonTree(root.id))
    .filter(Boolean)

  console.log('tree', tree)
  return tree
}
