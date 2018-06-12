<template>
  <component :is="node.type" :node="node" :theme="themeColor">
    <render v-for="child in node.children" :key="child.id" :node="child" :theme="themeColor" />
  </component>
</template>

<script>
  // 导入JSON 树中所涉及的所有节点
  import Page from './Page.vue'
  import Pa from './Pa.vue'
  import Paragraph from './Paragraph.vue'
  import TheSection from './TheSection.vue'
  import Head from './Head'
  import HelloWorld from './HelloWorld'
  import Loading from './Loading'
  export default {
    name: 'render',
    props: ['node', 'themeColor'],
    components: {
      Page,
      TheSection,
      Paragraph,
      Pa,
      Head,
      HelloWorld,
      Loading
    }
  }
</script>
