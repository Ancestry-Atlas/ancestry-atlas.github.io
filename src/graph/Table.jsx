import { useState, useEffect } from 'react'
import useFamilyData from '../hooks/useFamilyData'
import buildFamilyTree from '../utils/buildFamilyTree'

function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <li>
      <div
        onClick={() => hasChildren && setExpanded(!expanded)}
        style={{ cursor: hasChildren ? 'pointer' : 'default' }}
      >
        {hasChildren ? (expanded ? '▼ ' : '▶ ') : '• '}
        {node.name}
      </div>
      {hasChildren && expanded && (
        <ul style={{ paddingLeft: '1rem' }}>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function SimpleTree() {
  const { persons } = useFamilyData()
  const [treeData, setTreeData] = useState(null)

  useEffect(() => {
    if (!persons || persons.length === 0) return

    const personsData = persons.map(
      ({ id, name, familyNames, preferred_name, nickname, parents }) => {
        const displayName = preferred_name || name
        return {
          id,
          name: [displayName, familyNames[0] || '(?)', familyNames[1] || '(?)'].join(' '),
          parents,
          nickname,
        }
      }
    )

    const tree = buildFamilyTree(personsData)
    setTreeData(tree)
  }, [persons])

  if (!treeData) return <p>Loading family tree...</p>

  return (
    <div>
      <h2>Collapsible Tree</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <TreeNode node={treeData} />
      </ul>
    </div>
  )
}
