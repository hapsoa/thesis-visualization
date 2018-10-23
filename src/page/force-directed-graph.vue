<template lang="pug">
  .asdf hi
</template>

<script>
export default {
  name: 'force-directed-graph',
  mounted() {
    const data = (await fetch("https://gist.githubusercontent.com"
      + "/mbostock/4062045"
      + "/raw/5916d145c8c048a6e3086915a6be464467391c62"
      + "/miserables.json")).json();

    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));
    const simulation = forceSimulation(nodes, links).on('tick', ticked);

    const svg = d3.select(DOM.svg(width, height))
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', color)
      .call(drag(simulation));

    node.append('title')
      .text(d => d.id);

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    return svg.node();
  }

};
</script>

<style scoped lang="sass">

</style>
