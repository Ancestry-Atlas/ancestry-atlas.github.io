import { useState } from 'react'

const data = {
  name: 'Root',
  children: [
    {
      name: 'Child A',
      children: [
        { name: 'Grandchild A1' },
        { name: 'Grandchild A2' },
      ],
    },
    {
      name: 'Child B',
    },
  ],
}

function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  return (
    <li>
      <div onClick={() => setExpanded(!expanded)} style={{ cursor: hasChildren ? 'pointer' : 'default' }}>
        {hasChildren ? (expanded ? '▼ ' : '▶ ') : '• '}
        {node.name}
      </div>
      {hasChildren && expanded && (
        <ul style={{ paddingLeft: '1rem' }}>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function SimpleTree() {
  return (
    <div>
      <h2>Collapsible Tree</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <TreeNode node={data} />
      </ul>
    </div>
  )
}
