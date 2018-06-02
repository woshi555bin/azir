<template>
  <div class="pa">
    <h1 :style="{color: themeColor}">{{node.content.title}}</h1>
    <small v-if="node.config.showSubTitle">{{node.content.subTitle}}</small>
    <p>{{node.content.detail}}</p>
  </div>
</template>

<script>
  export default {
    name: 'pa',
    props: ['node', 'themeColor'],
    created(){
      console.log(1);
    }
  }
</script>

<style scoped>
  .paragraph {
    cursor: move;
  }
  .paragraph:hover {
    background: #ddd;
  }
</style>
