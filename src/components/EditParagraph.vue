<template>
  <edit-wrapper>
    <paragraph :node="node" :themeColor="themeColor" />
  </edit-wrapper>
</template>

<script>
  // EditWrapper提供统一的编辑入口，内部仍需要渲染一次 Paragraph 便于实时预览编辑结果
  import EditWrapper from './EditWrapper.vue'
  import Paragraph from './Paragraph.vue'
  import { mapMutations } from 'vuex'

  export default {
    name: 'edit-paragraph',
    props: ['node', 'themeColor'],
    methods: { ...mapMutations(['updateModule']) }
  }
</script>

