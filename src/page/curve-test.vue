<!--<template lang="pug">-->
  <!--#canvas-->
<!--</template>-->

<!--<script>-->
<!--/* eslint-disable no-param-reassign */-->

<!--import _ from 'lodash';-->
<!--import * as d3 from 'd3';-->

<!--export default {-->
  <!--name: 'curve-test',-->
  <!--mounted() {-->
    <!--const that = this;-->

    <!--const svg = this.$d3.select('#canvas')-->
      <!--.append('svg');-->

    <!--svg.attr('width', 800)-->
      <!--.attr('height', 800);-->

    <!--const center = {-->
      <!--x: 400,-->
      <!--y: 400-->
    <!--};-->

    <!--const clusters = {}; // 클러스터 이름으로 모음-->
    <!--// clusters 의 수만큼 2PI 에서 위치를 지정시킨다.-->
    <!--_.forEach(nodesData, (node) => {-->
      <!--if (!_.has(clusters, node.color)) clusters[node.color] = 0;-->
    <!--});-->

    <!--const clustersKeys = Object.keys(clusters);-->
    <!--for (let i = 0; i < clustersKeys.length; i += 1) {-->
      <!--clusters[clustersKeys[i]] = ((2 * Math.PI) / clustersKeys.length) * i;-->
    <!--}-->

    <!--// polar coordinate 와 normal coordinate 를 nodesData 에 넣는다.-->
    <!--_.forEach(nodesData, (node) => {-->
      <!--node.polarCoordinate = {};-->
      <!--node.polarCoordinate.radius = (node.year - 1994) * yearRadius;-->
      <!--node.polarCoordinate.theta =-->
          <!--clusters[node.color] + (node.siblingUnSimilarity-->
          <!--* ((Math.PI) / clustersKeys.length)); // 비유사성의 정도 -0.9 ~ 0.9 사이에 따라 각도 조절됨-->

      <!--node.normalCoordinate = {};-->
      <!--node.normalCoordinate.x =-->
          <!--polarToNormalCoordinate(center, node.polarCoordinate.radius, node.polarCoordinate.theta).x;-->
      <!--node.normalCoordinate.y =-->
          <!--polarToNormalCoordinate(center, node.polarCoordinate.radius, node.polarCoordinate.theta).y;-->
    <!--});-->

    <!--console.log(nodesData);-->

    <!--// 레퍼런스들 선 그리기-->
    <!--svg.selectAll('line.reference')-->
      <!--.data(nodesData)-->
      <!--.enter()-->
      <!--.append('line')-->
      <!--.attr('x1', d => d.normalCoordinate.x)-->
      <!--.attr('y1', d => d.normalCoordinate.y)-->
      <!--.attr('x2', (d) => {-->
        <!--let x2;-->
        <!--_.forEach(nodesData, (node) => {-->
          <!--if (d.reference === node.name) {-->
            <!--x2 = node.normalCoordinate.x;-->
          <!--}-->
        <!--});-->
        <!--if (!_.isNil(x2)) return x2;-->
        <!--return d.normalCoordinate.x;-->
      <!--})-->
      <!--.attr('y2', (d) => {-->
        <!--let y2;-->
        <!--_.forEach(nodesData, (node) => {-->
          <!--if (d.reference === node.name) {-->
            <!--y2 = node.normalCoordinate.y;-->
          <!--}-->
        <!--});-->
        <!--if (!_.isNil(y2)) return y2;-->
        <!--return d.normalCoordinate.y;-->
      <!--})-->
      <!--.style('stroke', 'gray')-->
      <!--.style('stroke-width', 2);-->

    <!--// const lineData = [{ x: 30, y: 30 },-->
    <!--//   { x: 40, y: 30 },-->
    <!--//   { x: 50, y: 70 }];-->
    <!--// const line = d3.line()-->
    <!--//   .x(lineData => lineData.x)-->
    <!--//   .y(lineData => lineData.x)-->
    <!--//   .curve(d3.curveCatmullRom.alpha(0.5));-->

    <!--// 노드 그리기-->
    <!--svg.selectAll('circle.node')-->
      <!--.data(nodesData)-->
      <!--.enter()-->
      <!--.append('circle')-->
      <!--.attr('r', 6)-->
      <!--.attr('cx', (d, i) => d.normalCoordinate.x)-->
      <!--.attr('cy', (d, i) => d.normalCoordinate.y)-->
      <!--.attr('fill', d => d.color)-->
      <!--.classed('node', true);-->

    <!--// 노드 클릭시 이벤트-->
    <!--svg.selectAll('circle.node')-->
      <!--// eslint-disable-next-line func-names-->
      <!--.on('click', function (d, i) {-->
        <!--// alert(d.name);-->
        <!--d3.select(this).style('fill', 'yellow');-->
        <!--svg.append('rect')-->
          <!--.attr('width', 100)-->
          <!--.attr('height', 35)-->
          <!--.attr('stroke', 'rgb(0, 0, 0)')-->
          <!--.attr('stroke-width', '1')-->
          <!--.attr('fill', 'rgba(255, 255, 255, 1)')-->
          <!--.attr('x', d.normalCoordinate.x)-->
          <!--.attr('y', d.normalCoordinate.y + 10)-->
          <!--.classed('explain', true);-->
        <!--svg.append('text')-->
          <!--.attr('x', d.normalCoordinate.x + 20)-->
          <!--.attr('y', d.normalCoordinate.y + 30)-->
          <!--.attr('fill', 'blue')-->
          <!--.text(d.name)-->
          <!--.classed('name', true);-->
        <!--that.$store.commit('showAuthors', d.authors);-->
      <!--})-->
      <!--.on('mouseout', function (d, i) {-->
        <!--d3.select(this).style('fill', d.color);-->
        <!--d3.selectAll('rect.explain').remove();-->
        <!--d3.selectAll('text.name').remove();-->
      <!--});-->
  <!--},-->
  <!--methods: {-->

  <!--}-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="sass">-->

<!--</style>-->
