<template lang="pug">
  .sandglass-root
    svg(v-bind:width="svgWidth" v-bind:height="svgHeight")
      g.year
        // 중심 (400, 90)
        path.parent-year(v-for="(year, index) in parentYears"
          :d="`M ${center.x - 15 - (index * yearInterval)},90 a1,1 0 0,0 ${30 + (index * yearInterval * 2)},0`"
          stroke="#aaa" fill="transparent")
        // 중심 (400, 600)
        path.parent-year(v-for="(year, index) in childYears"
          :d="`M ${center.x - 15 - (index * yearInterval)},600 a1,1 0 0,1 ${30 + (index * yearInterval * 2)},0`"
          stroke="#aaa" fill="transparent")

      circle.searched-node(:cx="searchedNode.x" :cy="searchedNode.y"
        r="10" fill="green")
      text(:x="searchedNode.x + 14" :y="searchedNode.y + 4") searched thesis

      g.cluster(v-for="cluster in thesisData")
        line(v-for="(hullPoint, index) in cluster.hullPoints" v-if="index !== 0"
          :x1="cluster.hullPoints[index-1][0]" :y1="cluster.hullPoints[index-1][1]"
          :x2="hullPoint[0]" :y2="hullPoint[1]"
          style="stroke:rgb(255,0,0);stroke-width:2")
        circle.node(v-for="node in cluster.positions"
          :cx="node[0]" :cy="node[1]" r="3" fill="blue")


      <!--circle(v-for="hullPoint in hullPoints"-->
        <!--:cx="hullPoint[0]" :cy="hullPoint[1]"-->
        <!--r="1" fill="black")-->
      <!--line(v-for="(hullPoint, index) in hullPoints" v-if="index !== 0"-->
        <!--:x1="hullPoints[index-1][0]" :y1="hullPoints[index-1][1]"-->
        <!--:x2="hullPoint[0]" :y2="hullPoint[1]"-->
        <!--style="stroke:rgb(255,0,0);stroke-width:2")-->
</template>

<script>
/* eslint-disable no-undef */

import _ from 'lodash';
// eslint-disable-next-line import/extensions
import '../lib/hull.js';

export default {
  name: 'sandglass-test',
  data() {
    return {
      svgWidth: 800,
      svgHeight: 800,
      hullPoints: [],
      parentYears: [1992, 1993, 1994, 1995, 1996, 1997, 1998,
        1999, 2000, 2001, 2002, 2003, 2004],
      childYears: [2006, 2007, 2008, 2009, 2010, 2011, 2012,
        2013, 2014, 2015, 2016, 2017, 2018],
      yearInterval: 20,
      thesisData: {}
    };
  },
  computed: {
    center() {
      return { x: this.svgWidth / 2, y: this.svgHeight / 2 };
    },
    parentYearCenter() {
      return { x: this.svgWidth / 2, y: 90 };
    },
    childYearCenter() {
      return { x: this.svgWidth / 2, y: 600 };
    },
    searchedNode() {
      return {
        x: this.svgWidth / 2,
        y: ((this.childYearCenter.y - this.parentYearCenter.y) / 2) + this.parentYearCenter.y
      };
    },
  },
  methods: {
    createChildNodePosition(numOfDistance, piTheta) {
      return [this.childYearCenter.x + ((15 + (numOfDistance * this.yearInterval)) * Math.cos(piTheta * Math.PI)),
        this.childYearCenter.y + ((15 + (numOfDistance * this.yearInterval)) * Math.sin(piTheta * Math.PI))];
    },
    createParentNodePosition(numOfDistance, piTheta) {
      return [this.parentYearCenter.x + ((15 + (numOfDistance * this.yearInterval)) * Math.cos(piTheta * Math.PI)),
        this.parentYearCenter.y + ((15 + (numOfDistance * this.yearInterval)) * Math.sin(piTheta * Math.PI))];
    }
  },
  created() {
    const points = [[10, 10], [200, 10], [200, 500], [10, 500], [80, 300],
      [170, 30], [100, 250]];
    this.hullPoints = hull(points, 80);
    // console.log('test hullPoints : ', this.hullPoints);

    const thesisData = {
      cluster1: {
        positions: [ // child cluster
          this.createChildNodePosition(1, 30 / 16),
          this.createChildNodePosition(3, 28 / 16),
          this.createChildNodePosition(4, 29 / 16),
          this.createChildNodePosition(3, 29 / 16)
        ]
      },
      cluster2: {
        positions: [
          this.createParentNodePosition(1, 3 / 16),
          this.createParentNodePosition(2, 3 / 16),
          this.createParentNodePosition(4, 4 / 16),
          this.createParentNodePosition(6, 6 / 16),
          this.createParentNodePosition(3, 5 / 16),
          this.createParentNodePosition(3, 4.5 / 16),
          this.createParentNodePosition(4, 5 / 16),
          this.createParentNodePosition(4, 4.5 / 16)
        ]
      },
      cluster3: {
        positions: [
          this.createParentNodePosition(4, 14 / 16),
          this.createParentNodePosition(5, 15 / 16),
          this.createParentNodePosition(9, 15 / 16),
          this.createParentNodePosition(11, 14.5 / 16),
          this.createParentNodePosition(10, 13 / 16),
          this.createParentNodePosition(9, 13.2 / 16),
          this.createParentNodePosition(6, 13.4 / 16),
          this.createParentNodePosition(7, 13.6 / 16),
          this.createParentNodePosition(7, 13.9 / 16),
          this.createParentNodePosition(9, 13.9 / 16),
          this.createParentNodePosition(9, 14.2 / 16),
        ]
      },
      cluster4: {
        positions: [
          this.createChildNodePosition(12, 20 / 16),
          this.createChildNodePosition(11, 19 / 16),
          this.createChildNodePosition(9, 19 / 16),
          this.createChildNodePosition(7, 19.5 / 16),
          this.createChildNodePosition(10, 19.5 / 16)
        ]
      },
      cluster5: {
        positions: [
          this.createChildNodePosition(5, 24 / 16),
          this.createChildNodePosition(2, 23 / 16),
          this.createChildNodePosition(3, 23 / 16),
          this.createChildNodePosition(6, 22 / 16),
          this.createChildNodePosition(8, 22.3 / 16),
          this.createChildNodePosition(7, 22.4 / 16),
          this.createChildNodePosition(6, 22.4 / 16),
          this.createChildNodePosition(5, 23.4 / 16),
        ]
      },
      cluster6: {
        positions: [
          this.createParentNodePosition(7, 9 / 16),
          this.createParentNodePosition(8, 10 / 16),
          this.createParentNodePosition(8, 9.5 / 16),
          this.createParentNodePosition(9, 9.5 / 16),
          this.createParentNodePosition(10, 9.7 / 16),
          this.createParentNodePosition(10, 9.9 / 16),
          this.createParentNodePosition(11, 9.9 / 16),
          this.createParentNodePosition(11, 10.2 / 16),
          this.createParentNodePosition(11, 10.4 / 16),
          this.createParentNodePosition(11, 11 / 16),
          this.createParentNodePosition(10, 10.5 / 16),
        ]
      },
      cluster7: {
        positions: [
          this.createParentNodePosition(7, 3 / 16),
          this.createParentNodePosition(8, 3.5 / 16),
          this.createParentNodePosition(8, 4 / 16),
          this.createParentNodePosition(9, 4 / 16),
          this.createParentNodePosition(11, 4 / 16),
        ]
      },
      cluster8: {
        positions: [
          this.createChildNodePosition(10, 28 / 16),
          this.createChildNodePosition(11, 29 / 16),
          this.createChildNodePosition(10, 28.5 / 16),
          this.createChildNodePosition(10, 28.7 / 16),
          this.createChildNodePosition(9, 28.3 / 16),
          this.createChildNodePosition(9, 28.1 / 16),
          this.createChildNodePosition(9, 27.9 / 16),
          this.createChildNodePosition(8, 27.9 / 16),
          this.createChildNodePosition(7, 27.9 / 16),
          this.createChildNodePosition(8, 28.5 / 16),
        ]
      }
    };

    _.forEach(thesisData, (value, key) => {
      thesisData[key].hullPoints = hull(thesisData[key].positions, 80);
    });

    this.thesisData = thesisData;

    console.log('thesisData: ', thesisData);
  }
};
</script>

<style scoped lang="sass">
svg
  border: 1px solid #aaa
</style>
