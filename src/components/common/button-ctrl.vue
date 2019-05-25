<template>
  <span class="btn-ctrl" @click="handleClick">
    <slot></slot>
  </span>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .btn-ctrl
    display inline-block
    float left
    min-width 70px
    height 22px
    padding 0 10px
    margin-left 10px
    font-size 12px
    line-height 22px
    text-align center
    color #e63f3c
    background #fff
    box-shadow 0 1px 4px 0 rgba(0,0,0,.2)
    border-radius 100px
    cursor pointer
    transition box-shadow .3s
    &:hover
      box-shadow 0 1px 4px 0 #e63f3c
</style>
