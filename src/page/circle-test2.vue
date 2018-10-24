<template lang="pug">
 #canvas
</template>

<script>
export default {
  name: 'circle-test',
  mounted() {
    function polarToNormalCoordinate(centerPosition, radius, theta) {
      const position = {};

      position.x = centerPosition.x + (radius * Math.cos(theta));
      position.y = centerPosition.y + (radius * Math.sin(theta));

      return position;
    }

    const svg = this.$d3.select('#canvas')
      .append('svg');

    svg.attr('width', 600)
      .attr('height', 600);

    const center = {
      x: 250,
      y: 250
    };

    const yearArray = [1995, 1996, 1997, 1998, 1999];
    svg.selectAll('circle.year')
      .data(yearArray)
      .enter()
      .append('circle')
      .attr('r', (d, i) => (i + 1) * 30)
      .attr('fill', 'rgba(255, 255, 255, 0)')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('cx', center.x)
      .attr('cy', center.y);

    svg.selectAll('text.year')
      .data(yearArray)
      .enter()
      .append('text')
      .attr('x', 250 - 18)
      .attr('y', (d, i) => 250 + ((i + 1) * 30) + 5)
      .attr('fill', 'black')
      .text(d => d);


    const nodesData = [
      {
        name: 'hi thesis',
        year: 2000,
        color: 'yellow', // cluster
        position: {
          theta: 12,
          radius: 4
        },
        keywords: [
          'hi', 'hello'
        ]
      },
      {
        name: 'bye thesis',
        year: 2005,
        color: 'yellow',
        keywords: [
          'bye', 'good night'
        ]
      },
      {
        name: 'bye thesis',
        year: 2010,
        color: 'blue',
        keywords: [
          'bye', 'good night'
        ]
      },
      {
        name: 'bye thesis',
        year: 2015,
        color: 'blue',
        keywords: [
          'bye', 'good night'
        ]
      }
    ];

    svg.selectAll('circle.node')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('cx', (d, i) => polarToNormalCoordinate(center, 30, (i / 2) * Math.PI).x)
      .attr('cy', (d, i) => polarToNormalCoordinate(center, 30, (i / 2) * Math.PI).y)
      .attr('fill', d => d.color);
  },
  methods: {

  }
};
</script>

<style scoped lang="sass">

</style>
