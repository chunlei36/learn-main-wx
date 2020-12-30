<template>
  <view class="page">
    <image class="header" src="../../static/images/demo.jpg"></image>
    <view class="content">
      <navigator url="/c/demo/index">
        <button type="primary">跳转到分包(/c/demo/index)</button>
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    components: {
    },
    onShow() {
    },
    mounted () {
    },
    onHide() {
    },
    onShareAppMessage() {
    },
    methods: {
    }
  };
</script>

<style lang="less">
  @import "./index.less";
</style>