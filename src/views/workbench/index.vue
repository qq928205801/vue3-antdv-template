<template>
  <div class="all">
    <h2>自定义指令拖动</h2>
    <div class="box">
    <div class="drag-main">
      <h2>上下拖动</h2>
      <div class="dragBox2">
        <div class="fixationH" v-stretch:height="{min:80,max:300}">
          拖动上
          <div class="resize"></div>
        </div>
        <div class="">下</div>
      </div>
    </div>
    <div class="drag-main">
      <h2>上下拖动</h2>
      <div class="dragBox2">
        <div class="">上</div>
        <div class="fixationH" v-stretch:heightT="{min:80,max:300}">
          拖动下
          <div class="resize top"></div>
        </div>
      </div>
    </div>
  </div>
    <div class="drag-main">
      <h2>左右拖动</h2>
      <div class="dragBox">
        <div class="">左</div>
        <div class="fixationW" v-stretch:widthL="{min:150,max:800}">
          拖动右
          <div class="resize"></div>
        </div>
      </div>
    </div>
    <div class="drag-main">
      <h2>左右拖动</h2>
      <div class="dragBox">
        <div class="fixationW" v-stretch:width="{min:150,max:800}">
          拖动左
          <div class="resize right"></div>
        </div>
        <div class="">右</div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;
  .drag-main{
    width: 49%;
  }
}
.drag-main {
  width: 100%;
  margin-bottom: 30px;
  h2 {
    margin-bottom: 30px;
  }
}
.dragBox {
  width: 100%;
  height: 100px;
  display: flex;
  > div {
    flex: 1;
    padding-left: 10px;
  }
  > div:first-child {
    background: #1ee3aa;
  }
  > div:last-child {
    background: #eb77eb;
  }
  .fixationW {
    width: 300px;
    flex: none;
    position: relative;
    .resize {
      width: 5px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      cursor: w-resize;
      background: #333;
    }
    .right {
      right: 0;
      left: auto;
    }
  }
}
.dragBox2 {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    padding-top: 10px;
  }
  > div:first-child {
    background: #1ee3aa;
  }
  > div:last-child {
    background: #eb77eb;
  }
  .fixationH {
    height: 300px;
    flex: none;
    position: relative;
    .resize {
      width: 100%;
      height: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      cursor: s-resize;
      background: #333;
    }
    .top {
      top: 0;
      bottom: auto;
    }
  }
}
</style>