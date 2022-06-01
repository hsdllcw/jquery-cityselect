<template>
  <div class="bigOne">
    <div class="box">
      <span class="loadText text">请选择省/市/区</span>
      <span class="textProvince text"></span>
      <span class="textCity text"></span>
      <span class="textArea text"></span>
      <span class="iconfont icon-arrow-down arrow"></span>
    </div>
    <input
      type="text"
      name="name"
      class="totalConfirm input-text"
      readonly=""
    />
    <div class="bigOne-content">
      <div class="chose-tab">
        <div id="province" class="chosePCA bigOne-select">
          省份
          <ul class="province-list list"></ul>
        </div>
        <div id="city" class="chosePCA">
          城市
          <ul class="city-list list"></ul>
        </div>
        <div id="area" class="chosePCA">
          区县
          <ul class="area-list list"></ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { cityselect } from "./script.js";
export default {
  name: "App",
  mounted() {
    $(".bigOne").each((index, item) => {
      cityselect.init(item);
    });
  },
};
</script>
<style lang="sass">
@charset "utf-8"
.bigOne
  width: 100%
  position: relative

  *
    margin: 0
    padding: 0

  ul
    list-style-type: none

  .box
    width: 100%
    height: 30px
    border-bottom: 1px solid rgba(200, 200, 200, .8)
    color: #999999
    cursor: pointer

  .totalConfirm
    z-index: -9999
    opacity: 0
    width: 100%
    height: 30px
    position: absolute
    outline: none
    left: 0
    top: 0

  .text
    line-height: 30px

  .icon-arrow-down,
  .icon-arrow-up
    position: absolute
    left: 380px
    font-size: 22px
    line-height: 30px
    color: #999999

  .bigOne-content
    width: 100%
    display: none
    border-top: none
    position: relative

  .chosePCA
    width: 80px
    height: 40px
    display: inline-block
    font-size: 18px
    line-height: 40px
    text-align: center
    float: left
    cursor: pointer

  .province-list,
  .city-list,
  .area-list
    position: absolute
    width: 100%
    min-height: 10px
    padding: 10px
    left: 0
    top: 40px

  .bigOne-select
    background-color: #fff
    color: #46a4ff
    border-bottom: none

  .bigOne-content li
    font-size: 14px
    display: inline-block
    padding: 8px
    line-height: normal
    cursor: pointer
    color: black


  &:hover
    background-color: #f1f8ff
    color: #46a4ff
    border-radius: 4px

  .chose-tab
    width: 100%
    height: 40px
    background-color: #f0f0f0
    clear: both
    border-left: 1px solid rgba(200, 200, 200, 0.8)
    border-right: 1px solid rgba(200, 200, 200, 0.8)

  .chosePCA>ul
    border: 1px solid rgba(200, 200, 200, .8)
    border-top: none
    font-size: 18px
    line-height: 20px
    text-align: left
    cursor: auto
    z-index: 999
    background-color: #fff

  .textProvince:hover,
  .textArea:hover,
  .textCity:hover
    background-color: #bcd5e7

  .btn
    width: 60px
    height: 30px
    font-size: 16px
    line-height: 30px
    text-align: center
    margin-top: 10px
    position: absolute

  .confirm
    left: 70px
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
