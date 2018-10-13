<template lang="pug">
  #test1
    p asdf
    p asdfgg
    p xcvbb
    p agvvb
    p asdf
    p zxcv]
    p sdfffg
    svg
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'd3-test1',
  mounted() {
    // d3.selectAll('#test1').style('background-color', 'black');

    // d3.selectAll('p').style('color', () =>
    //   `hsl(${Math.random() * 360}, 100%, 50%)`);

    // d3.selectAll('p').style('color', (d, i) => (i % 2 === 0 ? '#fff' : '#aaa'));

    // d3.selectAll('p')
    //   .data([4, 8, 15, 16, 23, 42])
    //   .style('font-size', (d, i) => {
    //     console.log(d, i);
    //     return `${d}px`;
    //   });

    // d3.select('#test1')
    //   .selectAll('p')
    //   .data([4, 8, 15, 16, 23, 42])
    //   .enter()
    //   .append('p')
    //   .text(d => d);

    // const p = d3.select('#test1')
    //   .selectAll('p')
    //   .data([4, 8, 15, 16, 23, 42])
    //   .text(d => d);
    //
    // p.enter().append('p')
    //   .text(d => d);
    //
    // p.exit().remove();
    //
    // d3.select('#test1')
    //   .transition()
    //   .style('background-color', 'black');
    const scale = 100;
    d3.select('svg')
      .selectAll('circle')
      .data([100, 110])
      .enter()
      .append('circle')
      .style('background-color', 'blue')
      .attr('cx', (d, i) => 30 + 30 * i)
      .attr('cy', (d, i) => 30 + 30 * i)
      .transition()
      .duration(750)
      .delay((d, i) => i * 10)
      .attr('r', d => Math.sqrt(scale));
  }
};
</script>

<style scoped lang="sass">
  #test1
    width: 100%
    height: 200px
    border: 1px solid black
</style>
