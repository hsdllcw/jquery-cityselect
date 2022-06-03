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
// import { cityselect } from "./app.js";
import { cityselect } from "../dist/app.js";
export default {
  name: "App",
  mounted() {
    $(".bigOne").each((index, item) => {
      cityselect.init(item);
    });
  },
};
</script>
<style lang="sass" src="./style/style.scss"></style>
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
