<template>
  <div class="box">
    <div class="move" v-drag>move</div>
    <div class="move" v-drag>move2</div>
    <div class="move" v-drag>move3</div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  >div{
    cursor: move;
    position: fixed;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    background: #fff;
    text-align: center;
    line-height: 50px;
    top: 200px;
    z-index: 100;
  }
  >div:nth-of-type(1) {
    left: 300px;
  }
  >div:nth-of-type(2) {
    left: 500px;
  }
  >div:nth-of-type(3) {
    left: 700px;
  }
}
</style>
