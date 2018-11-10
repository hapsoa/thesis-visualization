<template lang="pug">
  .root
    svg(v-bind:width="svgWidth" v-bind:height="svgHeight")
      g // 테두리 원
        circle(v-bind:cx="svgWidth/2" v-bind:cy="svgHeight/2"
          v-bind:r="radvizRadius" stroke="green" v-bind:stroke-width="2" fill="rgba(0, 0, 0, 0)")
      g // 테두리 원의 dimensions text
        text(v-for="(dimension, i) in dimensions"
          :x="center.x + radvizRadius * Math.cos(getDimensionTheta(i))"
          :y="center.y + radvizRadius * Math.sin(getDimensionTheta(i))") {{dimension}}
      g // 노드들
        circle(v-for="(nodeData, nodeId) in nodesData"
          :cx="getNodePosition(nodeData).x" :cy="getNodePosition(nodeData).y"
          r="10" fill="black")
</template>

<script>
import _ from 'lodash';

export default {
  name: 'making-radviz',
  data() {
    return {
      svgWidth: 800,
      svgHeight: 800,
      dimensions: ['variableA', 'variableB', 'variableC', 'variableD'],
      nodesData: {
        id1: {
          variableA: 1,
          variableB: 2,
          variableC: 3,
          variableD: 4
        },
        id2: {
          variableA: 1,
          variableB: 0,
          variableC: 0,
          variableD: 0
        },
        id3: {
          variableA: 0,
          variableB: 0,
          variableC: 2,
          variableD: 4
        }
      }
    };
  },
  computed: {
    radvizRadius() {
      return (this.svgWidth / 2) - 100;
    },
    center() {
      return { x: this.svgWidth / 2, y: this.svgHeight / 2 };
    }
  },
  methods: {
    /**
     * @description dimensions의 index를 통해 각 dimension의 각도를 구한다.
     * @param {number} index dimensions의 index
     * @returns {number} 세타 각도
     */
    getDimensionTheta(index) {
      return ((2 * Math.PI) / this.dimensions.length) * index;
    },
    getNodePosition(nodeData) {
      const sumOfaij = _.reduce(nodeData, (sum, value) => sum + value);
      const sumOfaijMulCos = _.reduce(nodeData, (sum, value, key) => sum + (value
          * Math.cos(this.getDimensionTheta(_.indexOf(this.dimensions, key)))), 0);
      const x = this.center.x + ((sumOfaijMulCos / sumOfaij) * this.radvizRadius);

      const sumOfaijMulSin = _.reduce(nodeData, (sum, value, key) => sum + (value
          * Math.sin(this.getDimensionTheta(_.indexOf(this.dimensions, key)))), 0);
      const y = this.center.y + ((sumOfaijMulSin / sumOfaij) * this.radvizRadius);

      return { x, y };
    }
  },
  mounted() {
    // this.getNodePosition(this.nodesData.id2);
  }
};
</script>

<style scoped lang="sass">

</style>
