<template lang="pug">
 #canvas
</template>

<script>
export default {
  name: 'circle-test',
  mounted() {
    const svg = this.$d3.select('#canvas')
      .append('svg');

    svg.attr('width', 600)
      .attr('height', 600);

    const center = {
      x: 250,
      y: 250
    };

    const yearArray = [1995, 2000, 2005, 2010, 2015];
    svg.selectAll('circle.year')
      .data(yearArray)
      .enter()
      .append('circle')
      .attr('r', (d, i) => (i + 1) * 30)
      .attr('fill', 'rgba(255, 255, 255, 0)')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('cx', 250)
      .attr('cy', 250);

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
        color: 'yellow',
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
      .attr('cx', (d, i) => 250 - (6 * (d.year - 1990)))
      .attr('cy', 250)
      .attr('fill', d => d.color);

    const node2Data = [
      {
        name: 'bye thesis',
        year: 2005,
        color: 'red',
        keywords: [
          'bye', 'good night'
        ]
      },
      {
        name: 'bye thesis',
        year: 2015,
        color: 'red',
        keywords: [
          'bye', 'good night'
        ]
      },
      {
        name: 'bye thesis',
        year: 2000,
        color: 'red',
        keywords: [
          'bye', 'good night'
        ]
      }
    ];

    svg.selectAll('circle.node2')
      .data(node2Data)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('cx', 250)
      .attr('cy', (d, i) => 250 - (6 * (d.year - 1990)))
      .attr('fill', d => d.color)
      .attr('v-on:click', 'console.log("oh")');


    // svg.selectAll('line')
    //   .data()
  }
};
</script>

<style scoped lang="sass">

</style>
