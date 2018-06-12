<template>
  <div class="paragraph">
    <h1 :style="{color: themeColor}" style="visibility: hidden">{{node.content.title}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'paragraph',
    props: ['node', 'themeColor'],
    created(){
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

