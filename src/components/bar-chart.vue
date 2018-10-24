<template lang="pug">
#bar-chart
</template>

<script>
/* eslint-disable no-mixed-operators */

import * as d3 from 'd3';

export default {
  name: 'bar-chart',
  mounted() {
    // Width and height
    const w = 500;
    const h = 100;
    const barPadding = 1;

    const dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

    // Create SVG element
    const svg = d3.select('#bar-chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (w / dataset.length))
      .attr('y', d => h - (d * 4))
      .attr('width', w / dataset.length - barPadding)
      .attr('height', d => d * 4)
      .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`);

    svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => i * (w / dataset.length) + (w / dataset.length - barPadding) / 2)
      .attr('y', d => h - (d * 4) + 14)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white');
  }
};
</script>

<style scoped>

</style>
