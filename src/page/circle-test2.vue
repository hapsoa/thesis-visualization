<template lang="pug">
 #canvas
</template>

<script>
/* eslint-disable no-param-reassign */

import _ from 'lodash';
import * as d3 from 'd3';

export default {
  name: 'circle-test',
  mounted() {
    /**
     * 극좌표를 일반 좌표로 바꾸는 함수
     * @param centerPosition : object 중심좌표
     * @param radius : number r
     * @param theta : number 각도
     */
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

    // 연도별 큰 원 그리기
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

    // 노드 데이터
    const nodesData = [
      {
        name: 'zzz',
        year: 1995,
        color: 'green', // cluster
        reference: '',
        parentSimilarity: 0,
        siblingUnSimilarity: 0
      },
      // 자식들
      {
        name: 'aaa',
        year: 1998,
        color: 'green',
        reference: 'zzz',
        parentSimilarity: 1,
        siblingUnSimilarity: 0
      },
      {
        name: 'bbb',
        year: 1999,
        color: 'green',
        reference: 'zzz',
        parentSimilarity: 1,
        siblingUnSimilarity: 0.1
      },
      {
        name: 'ccc',
        year: 1997,
        color: 'green',
        reference: 'zzz',
        parentSimilarity: 0.5,
        siblingUnSimilarity: -0.5
      },
      {
        name: 'xxx',
        year: 1995,
        color: 'red',
        reference: 'hhh',
        parentSimilarity: 0.5,
        siblingUnSimilarity: 0
      },
      {
        name: 'yyy',
        year: 1997,
        color: 'blue',
        reference: 'hhh',
        parentSimilarity: 0.5,
        siblingUnSimilarity: 0
      }
    ];

    const clusters = {}; // 클러스터 이름으로 모음
    // clusters 의 수만큼 2PI 에서 위치를 지정시킨다.
    _.forEach(nodesData, (node) => {
      if (!_.has(clusters, node.color)) clusters[node.color] = 0;
    });

    const clustersKeys = Object.keys(clusters);
    for (let i = 0; i < clustersKeys.length; i += 1) {
      clusters[clustersKeys[i]] = ((2 * Math.PI) / clustersKeys.length) * i;
    }

    // polar coordinate 와 normal coordinate 를 nodesData 에 넣는다.
    _.forEach(nodesData, (node) => {
      node.polarCoordinate = {};
      node.polarCoordinate.radius = (node.year - 1994) * 30;
      node.polarCoordinate.theta =
        clusters[node.color] + (node.siblingUnSimilarity
        * ((Math.PI) / clustersKeys.length)); // 비유사성의 정도 -0.9 ~ 0.9 사이에 따라 각도 조절됨

      node.normalCoordinate = {};
      node.normalCoordinate.x =
        polarToNormalCoordinate(center, node.polarCoordinate.radius, node.polarCoordinate.theta).x;
      node.normalCoordinate.y =
        polarToNormalCoordinate(center, node.polarCoordinate.radius, node.polarCoordinate.theta).y;
    });

    console.log(nodesData);

    // 레퍼런스들 선 그리기
    svg.selectAll('line.reference')
      .data(nodesData)
      .enter()
      .append('line')
      .attr('x1', d => d.normalCoordinate.x)
      .attr('y1', d => d.normalCoordinate.y)
      .attr('x2', (d) => {
        let x2;
        _.forEach(nodesData, (node) => {
          if (d.reference === node.name) {
            x2 = node.normalCoordinate.x;
          }
        });
        if (!_.isNil(x2)) return x2;
        return d.normalCoordinate.x;
      })
      .attr('y2', (d) => {
        let y2;
        _.forEach(nodesData, (node) => {
          if (d.reference === node.name) {
            y2 = node.normalCoordinate.y;
          }
        });
        if (!_.isNil(y2)) return y2;
        return d.normalCoordinate.y;
      })
      .style('stroke', 'gray')
      .style('stroke-width', 2);

    // 노드 그리기
    svg.selectAll('circle.node')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('cx', (d, i) => d.normalCoordinate.x)
      .attr('cy', (d, i) => d.normalCoordinate.y)
      .attr('fill', d => d.color)
      .classed('node', true);

    // 노드 클릭시 이벤트
    svg.selectAll('circle.node')
      // eslint-disable-next-line func-names
      .on('click', function (d, i) {
        // alert(d.name);
        d3.select(this).style('fill', 'yellow');
        svg.append('rect')
          .attr('width', 100)
          .attr('height', 35)
          .attr('stroke', 'rgb(0, 0, 0)')
          .attr('stroke-width', '1')
          .attr('fill', 'rgba(255, 255, 255, 1)')
          .attr('x', d.normalCoordinate.x)
          .attr('y', d.normalCoordinate.y + 10)
          .classed('explain', true);
        svg.append('text')
          .attr('x', d.normalCoordinate.x + 20)
          .attr('y', d.normalCoordinate.y + 30)
          .attr('fill', 'blue')
          .text(d.name)
          .classed('name', true);
      })
      .on('mouseout', function (d, i) {
        d3.select(this).style('fill', d.color);
        d3.selectAll('rect.explain').remove();
        d3.selectAll('text.name').remove();
      });
  },
  methods: {

  }
};
</script>

<style scoped lang="sass">

</style>
