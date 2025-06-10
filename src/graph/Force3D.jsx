import React from 'react'
import ForceGraph3D from 'react-force-graph-3d'

const graphData = {
  nodes: [
    { id: 'Node 1' },
    { id: 'Node 2' },
    { id: 'Node 3' },
    { id: 'Node 4' },
    { id: 'Node 5' },
  ],
  links: [
    { source: 'Node 1', target: 'Node 2' },
    { source: 'Node 1', target: 'Node 3' },
    { source: 'Node 2', target: 'Node 4' },
    { source: 'Node 3', target: 'Node 5' },
  ],
}

export default function () {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="id"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={node => alert(`Clicked node: ${node.id}`)}
      />
    </div>
  )
}
