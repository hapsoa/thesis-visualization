<template lang="pug">
  header
    .title Academic Genealogy
    input(type="text" v-model="inputValue")
</template>

<script>
export default {
  name: 'header-component',
  data() {
    return {
      inputValue: ''
    };
  }
};
</script>

<style scoped lang="sass">
header
  display: flex
  align-items: center
  > .title
    margin: 0 20px
  > input
    width: 450px
    height: 30px
    border: none
    margin-left: 250px
    border-bottom: 1px solid #bbb
</style>
