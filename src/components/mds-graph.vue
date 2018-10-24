<template lang="pug">
  #cities
</template>

<script>
/* eslint-disable no-param-reassign */

// import mds from '../lib/mds';
import * as d3 from 'd3';
import numeric from 'numeric';
import mdsDist from './javascripts/mds-dist';

export default {
  name: 'test1',
  mounted() {
    // 속성이 많은 기본데이터가 주어지고,
    const multivariateData = [
      {
        reading: 501,
        math: 515,
        writing: 493,
        percent_g: 46,
        pupil_staf: 7.9,
        dropout_rate: 4.4
      },
      {
        reading: 557,
        math: 552,
        writing: 549,
        percent_g: 7,
        pupil_staf: 6.7,
        dropout_rate: 2.3
      },
      {
        reading: 520,
        math: 516,
        writing: 492,
        percent_g: 46,
        pupil_staf: 7.9,
        dropout_rate: 7.3
      }
    ];

    // 유크리드 거리 방식으로 계산한 다음에
    const cityData = mdsDist.dist(multivariateData);
    // console.log(cityData);

    // 각 노드의 이름들(citiData배열의 순서대로)
    const labels = [
      'United States',
      'Alabama',
      'Alaska'
    ];

    (function (mds) {
      // / given a matrix of distances between some points, returns the
      // / point coordinates that best approximate the distances using
      // / classic multidimensional scaling
      mds.classic = function (distances, dimensions) {
        dimensions = dimensions || 2;

        // square distances
        const M = numeric.mul(-0.5, numeric.pow(distances, 2));

        // double centre the rows/columns
        function mean(A) { return numeric.div(numeric.add.apply(null, A), A.length); }
        const rowMeans = mean(M);
        const colMeans = mean(numeric.transpose(M));
        const totalMean = mean(rowMeans);

        for (let i = 0; i < M.length; i += 1) {
          for (let j = 0; j < M[0].length; j += 1) {
            M[i][j] += totalMean - rowMeans[i] - colMeans[j];
          }
        }

        // take the SVD of the double centred matrix, and return the
        // points from it
        const ret = numeric.svd(M);
        const eigenValues = numeric.sqrt(ret.S);
        return ret.U.map(row => numeric.mul(row, eigenValues).splice(0, dimensions));
      };

      // / draws a scatter plot of points, useful for displaying the output
      // / from mds.classic etc
      mds.drawD3ScatterPlot = function (element, xPos, yPos, labels, params) {
        params = params || {};
        const padding = params.padding || 32;
        const w = params.w || Math.min(720, document.documentElement.clientWidth - padding);
        const h = params.h || w;
        const xDomain = [Math.min.apply(null, xPos),
          Math.max.apply(null, xPos)];
        const yDomain = [Math.max.apply(null, yPos),
          Math.min.apply(null, yPos)];
        const pointRadius = params.pointRadius || 3;

        if (params.reverseX) {
          xDomain.reverse();
        }
        if (params.reverseY) {
          yDomain.reverse();
        }

        const xScale = d3.scaleLinear()
          .domain(xDomain)
          .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
          .domain(yDomain)
          .range([padding, h - padding]);

        const xAxis = d3.axisBottom(xScale)
          .ticks(params.xTicks || 7);

        const yAxis = d3.axisLeft(yScale)
          .ticks(params.yTicks || 7);

        const svg = element.append('svg')
          .attr('width', w)
          .attr('height', h);

        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', `translate(0,${(h - padding) + (2 * pointRadius)})`)
          .call(xAxis);

        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', `translate(${padding - (2 * pointRadius)},0)`)
          .call(yAxis);

        const nodes = svg.selectAll('circle')
          .data(labels)
          .enter()
          .append('g');

        nodes.append('circle')
          .attr('r', pointRadius)
          .attr('cx', (d, i) => xScale(xPos[i]))
          .attr('cy', (d, i) => yScale(yPos[i]));

        nodes.append('text')
          .attr('text-anchor', 'middle')
          .text(d => d)
          .attr('x', (d, i) => xScale(xPos[i]))
          .attr('y', (d, i) => yScale(yPos[i]) - (2 * pointRadius));
      };
    }(window.mds = window.mds || {}));


    // console.log(window.mds.classic(cityData));

    const cityPositions = numeric.transpose(window.mds.classic(cityData));

    // console.log(cityPositions);

    const w = Math.min(720, document.documentElement.clientWidth - 20);
    // const h = w / 2;

    window.mds.drawD3ScatterPlot(d3.select('#cities'),
      cityPositions[0],
      cityPositions[1],
      labels,
      {
        w: Math.min(720, document.documentElement.clientWidth - 20),
        h: w / 2,
        padding: 37,
        reverseX: true,
        reverseY: true
      });
  }
};
</script>

<style>
  body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
  }
  .axis path,
  .axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
  }

  text {
    font-size : 12px;
  }
  .axis text {
    font-size: 10px;
  }

  circle {
    stroke: #1f77b4;
    fill : #1f77b4;
  }
</style>
