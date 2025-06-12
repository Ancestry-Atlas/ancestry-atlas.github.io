import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const data = {
  name: 'Root',
  children: [
    {
      name: 'Child A',
      children: [{ name: 'A1' }, { name: 'A2' }],
    },
    {
      name: 'Child B',
      children: [{ name: 'B1' }],
    },
  ],
}

export default function RadialTree() {
  const ref = useRef()

  useEffect(() => {
    const width = 500
    const radius = width / 2

    const tree = d3.cluster().size([2 * Math.PI, radius - 100])

    const root = d3.hierarchy(data)
    tree(root)

    const svg = d3
      .select(ref.current)
      .attr('viewBox', [-radius, -radius, width, width])
      .style('font', '12px sans-serif')

    const link = svg
      .append('g')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .linkRadial()
          .angle(d => d.x)
          .radius(d => d.y)
      )

    const node = svg
      .append('g')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr(
        'transform',
        d => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      )

    node
      .append('circle')
      .attr('r', 4)
      .attr('fill', d => (d.children ? '#555' : '#999'))

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', d => (d.x < Math.PI ? 6 : -6))
      .attr('text-anchor', d => (d.x < Math.PI ? 'start' : 'end'))
      .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
      .text(d => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke', 'white')
  }, [])

  return (
    <svg
      ref={ref}
      width={500}
      height={500}
    />
  )
}
