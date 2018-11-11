<template lang="pug">
  .hello
    #canvas
</template>

<script>
/* eslint-disable no-param-reassign */

import _ from 'lodash';
import * as d3 from 'd3';

export default {
  name: 'circle-test3',
  mounted() {
    const that = this;
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

    svg.attr('width', 800)
      .attr('height', 800);

    const center = {
      x: 400,
      y: 400
    };

    // 연도별 큰 원 그리기
    const yearArray = [1995, 1996, 1997, 1998, 1999,
      2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
      2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
    const yearRadius = 15; // 한 연도 원당 반지름 차이
    svg.selectAll('circle.year')
      .data(yearArray)
      .enter()
      .append('circle')
      .attr('r', (d, i) => (i + 1) * yearRadius)
      .attr('fill', 'rgba(255, 255, 255, 0)')
      .attr('stroke', (d, i) => {
        if (i % 5 === 0) return 'rgba(50, 50, 50, 0.8)';
        return 'rgba(200, 200, 200, 0.8)';
      })
      .attr('stroke-width', 1)
      .attr('cx', center.x)
      .attr('cy', center.y);

    svg.selectAll('text.year')
      .data(_.filter(yearArray, year => year % 5 === 0))
      .enter()
      .append('text')
      .attr('x', center.x - 18)
      .attr('y', (d, i) => center.y + (((i * 5) + 1) * yearRadius) + 5)
      .attr('fill', 'black')
      .text(d => d);

    // 노드 데이터
    const nodesData = [
      {
        name: 'zzz',
        year: 1995,
        color: 'green', // cluster
        reference: '',
        parentSimilarity: 0, // 0 ~ 1
        siblingUnSimilarity: 0, // -0.9 ~ 0.9  0일수록 동일하다.
        authors: ['jack', 'john', 'jain']
      },
      // 자식들
      {
        name: 'aaa',
        year: 1998,
        color: 'green',
        reference: 'zzz',
        parentSimilarity: 1,
        siblingUnSimilarity: 0,
        authors: ['harry', 'hermione', 'ron']
      },
      {
        name: 'bbb',
        year: 1999,
        color: 'green',
        parent: [{x:1, y: 1}, 'asdf'],
        parentSimilarity: 1,
        siblingUnSimilarity: 0.1,
        authors: ['goloom', 'sam']
      },
      {
        name: 'ccc',
        year: 1997,
        color: 'green',
        reference: 'zzz',
        parentSimilarity: 0.5,
        siblingUnSimilarity: -0.5,
        authors: ['ann', 'cherchil', 'hitler']
      },
      {
        name: 'xxx',
        year: 1995,
        color: 'red',
        reference: 'hhh',
        parentSimilarity: 0.5,
        siblingUnSimilarity: 0,
        authors: ['mouse', 'cat', 'dog', 'horse']
      },
      {
        name: 'yyy',
        year: 1997,
        color: 'blue',
        reference: '',
        parentSimilarity: 0.5,
        siblingUnSimilarity: 0
      },
      {
        name: 'yyy-1',
        year: 1998,
        color: 'blue',
        reference: 'yyy',
        parentSimilarity: 0.5,
        siblingUnSimilarity: -0.2
      },
      {
        name: 'yyy-2',
        year: 2000,
        color: 'blue',
        reference: 'yyy-1',
        parentSimilarity: 0.5,
        siblingUnSimilarity: -0.6
      },
      {
        name: 'yyy-3',
        year: 2001,
        color: 'blue',
        reference: 'yyy-1',
        parentSimilarity: 0.5,
        siblingUnSimilarity: -0.5
      },
      {
        name: 'yyy-4',
        year: 2008,
        color: 'blue',
        reference: 'yyy-3',
        parentSimilarity: 0.5,
        siblingUnSimilarity: -0.6
      },
      {
        name: 'yyy-5',
        year: 1999,
        color: 'blue',
        reference: 'yyy',
        parentSimilarity: 0.5,
        siblingUnSimilarity: 0.3
      },
      {
        name: 'yyy-6',
        year: 2010,
        color: 'blue',
        reference: 'yyy-5',
        parentSimilarity: 0.5,
        siblingUnSimilarity: 0.3
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
      node.polarCoordinate.radius = (node.year - 1994) * yearRadius;
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

    // const lineData = [{ x: 30, y: 30 },
    //   { x: 40, y: 30 },
    //   { x: 50, y: 70 }];
    // const line = d3.line()
    //   .x(lineData => lineData.x)
    //   .y(lineData => lineData.x)
    //   .curve(d3.curveCatmullRom.alpha(0.5));

    // 노드 그리기
    svg.selectAll('circle.node')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', 6)
      .attr('cx', (d, i) => d.normalCoordinate.x)
      .attr('cy', (d, i) => d.normalCoordinate.y)
      .attr('fill', d => d.color)
      .classed('node', true);

    // 노드 클릭시 이벤트
    svg.selectAll('circle.node')
      // eslint-disable-next-line func-names
      .on('mouseover', function (d, i) {
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
        that.$store.commit('showAuthors', d.authors);
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
