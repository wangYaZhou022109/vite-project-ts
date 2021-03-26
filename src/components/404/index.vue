<template>
  <div class="warning-view">
    <div class="pic"></div>
    <div class="tip">很抱歉，您访问的页面不存在！</div>
  </div>
</template>
<style scoped lang="less">
.warning-view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-right: 20px;
  .pic {
    background: url('../../assets/wyz/404.png') no-repeat;
    width: 350px;
    height: 350px;
    background-size: 100% 100%;
    margin-top: 60px;
  }
  .tip {
    color: #ccc;
    margin-top: -50px;
  }
}
</style>
