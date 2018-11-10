<template lang="pug">
  .root
    svg(v-bind:width="svgWidth" v-bind:height="svgHeight")
      g // 테두리 원
        circle(v-bind:cx="svgWidth/2" v-bind:cy="svgHeight/2"
          v-bind:r="radvizRadius" stroke="green" v-bind:stroke-width="2" fill="rgba(0, 0, 0, 0)")
      g // dimensions text
        text(v-for="(dimension, i) in dimensions"
          :x="center.x + radvizRadius * Math.cos(getDimensionRadius(i))"
          :y="center.y + radvizRadius * Math.sin(getDimensionRadius(i))") {{dimension}}

</template>

<script>
export default {
  name: 'making-radviz',
  data() {
    return {
      svgWidth: 800,
      svgHeight: 800,
      dimensions: ['variable a', 'variable b', 'variable c', 'variable d']
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
    getDimensionRadius(index) {
      return ((2 * Math.PI) / this.dimensions.length) * index;
    }
  },
  mounted() {
    console.log(this.getDimensionRadius(4));
  }
};
</script>

<style scoped lang="sass">

</style>
