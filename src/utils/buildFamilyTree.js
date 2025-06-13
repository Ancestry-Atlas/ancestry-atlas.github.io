export default function buildFamilyTree(members) {
  const memberMap = new Map()
  const usedAsChild = new Set()

  // Create base node map
  for (const member of members) {
    memberMap.set(member.id, {
      id: member.id,
      name: member.name,
      parents: member.parents,
      nickname: member.nickname,
      children: []
    })
  }

  // Assign children
  for (const member of members) {
    const parents = (member.parents || '')
      .split(',')
      .map(p => parseInt(p.trim()))
      .filter(p => !isNaN(p))

    // For each parent, attach the current member as their child
    for (const parentId of parents) {
      const parentNode = memberMap.get(parentId)
      const childNode = memberMap.get(member.id)

      if (parentNode && childNode) {
        parentNode.children.push(childNode)
        usedAsChild.add(childNode.id) // Track it
      }
    }
  }

  // Roots are members that were never added as a child
  const roots = []
  for (const [id, node] of memberMap.entries()) {
    if (!usedAsChild.has(id)) {
      roots.push(node)
    }
  }

  // If only one root, return it
  if (roots.length === 1) return roots[0]

  // Otherwise wrap in a container root
  return {
    name: 'Root',
    children: roots
  }
}
