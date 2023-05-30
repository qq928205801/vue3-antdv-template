<template>
  <div class="box">
    <div class="left" v-stretch>
      <div class="seach">搜索</div>
      <div class="user">
        <div v-for="(item, index) in 20" :key="index">用户{{ index + 1 }}</div>
      </div>
      <div class="resize qqq"></div>
    </div>
    <div class="right">
      <div class="contentBox">
        <div class="contentTitle">标题</div>
        <div class="content">
          <div v-for="(item, index) in 20" :key="index">
            聊天记录{{ index + 1 }}
          </div>
        </div>
      </div>
      <div class="input" v-stretch:heightT="{min:100,max:600}">
        <div class="resize"></div>
        <div>输入框</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 300px;
    border-right: 2px solid;
    position: relative;
    .seach {
      height: 60px;
      border-bottom: 2px solid;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    .user {
      height: calc(100% - 60px);
      overflow-y: auto;
      div {
        height: 80px;
        border-bottom: 6px solid #eee;
      }
    }
    .resize {
      position: absolute;
      right: 0;
      top: 0;
      width: 5px;
      height: 100%;
      cursor: w-resize;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .contentBox {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .contentTitle {
        height: 60px;
        border-bottom: 2px solid;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 20px;
      }
      .content {
        flex: 1;
        background-color: #eee;
        overflow-y: auto;
        div {
          height: 60px;
        }
      }
    }
    .input {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .resize {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 5px;
        cursor: s-resize;
      }
    }
  }
}
</style>
