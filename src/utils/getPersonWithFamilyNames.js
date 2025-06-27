export function getPersonWithFamilyNames({
  personId,
  members,
  familyNamesMap,
}) {
  if (!personId || !members || !familyNamesMap) return null

  const visited = new Set()
  const getPerson = id => members.find(m => m.id === Number(id))

  function extractFamilyNames(id) {
    if (!id || visited.has(id)) return []
    visited.add(id)

    const person = getPerson(id)
    if (!person) return []

    const ignore = (person.ignore_family_name || '')
      .split(',')
      .map(s => s.trim())

    const rawFamilyIds = (person.family_names || '')
      .split(',')
      .map(s => s.trim())
      .filter(fid => fid && !ignore.includes(fid))

    const direct = rawFamilyIds.map(fid => familyNamesMap[fid]).filter(Boolean)

    const [p1, p2] = (person.parents || '')
      .split(',')
      .map(pid => pid.trim())
      // .filter(pid => pid && !ignore.includes(pid) && !isNaN(pid))

    const p1Names = p1 ? extractFamilyNames(p1) : []
    const p2Names = p2 ? extractFamilyNames(p2) : []

    return [...interleave(p1Names, p2Names), ...direct]
  }

  function interleave(a, b) {
    const maxLen = Math.max(a.length, b.length)
    const result = []
    for (let i = 0; i < maxLen; i++) {
      result.push(a[i] || '(?)')
      result.push(b[i] || '(?)')
    }
    return result
  }

  const person = getPerson(personId)

  return {
    id: personId,
    name: person?.names?.replace(/,/g, ' ') ?? null,
    nickname: person?.nickname,
    parents: person?.parents,
    preferred_name: person?.preferred_name,
    familyNames: extractFamilyNames(personId),
  }
}
