/* eslint-disable no-param-reassign,prefer-const,one-var,no-plusplus,no-mixed-operators */
import d3 from 'd3';
import numeric from 'numeric';

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
    let rowMeans = mean(M),
      colMeans = mean(numeric.transpose(M)),
      totalMean = mean(rowMeans);

    for (let i = 0; i < M.length; ++i) {
      for (let j = 0; j < M[0].length; ++j) {
        M[i][j] += totalMean - rowMeans[i] - colMeans[j];
      }
    }

    // take the SVD of the double centred matrix, and return the
    // points from it
    let ret = numeric.svd(M),
      eigenValues = numeric.sqrt(ret.S);
    return ret.U.map(row => numeric.mul(row, eigenValues).splice(0, dimensions));
  };

  // / draws a scatter plot of points, useful for displaying the output
  // / from mds.classic etc
  mds.drawD3ScatterPlot = function (element, xPos, yPos, labels, params) {
    params = params || {};
    let padding = params.padding || 32,
      w = params.w || Math.min(720, document.documentElement.clientWidth - padding),
      h = params.h || w,
      xDomain = [Math.min.apply(null, xPos),
        Math.max.apply(null, xPos)],
      yDomain = [Math.max.apply(null, yPos),
        Math.min.apply(null, yPos)],
      pointRadius = params.pointRadius || 3;

    if (params.reverseX) {
      xDomain.reverse();
    }
    if (params.reverseY) {
      yDomain.reverse();
    }

    let xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([padding, w - padding]),

      yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([padding, h - padding]),

      xAxis = d3.axisBottom(xScale)
        .ticks(params.xTicks || 7),

      yAxis = d3.axisLeft(yScale)
        .ticks(params.yTicks || 7);

    const svg = element.append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${h - padding + 2 * pointRadius})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${padding - 2 * pointRadius},0)`)
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
      .attr('y', (d, i) => yScale(yPos[i]) - 2 * pointRadius);
  };
}(window.mds = window.mds || {}));

