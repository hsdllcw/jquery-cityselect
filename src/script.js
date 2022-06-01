import $ from "jquery";
let that = null;
const cityselect = {
  data: require('./area.json'),
  //获取选择框
  box: null,
  //箭头
  arrow: null,
  //获取显示选择结果的文本框
  text: null,
  //定义一个空字符串接收文本
  pro_text: '',
  city_text: '',
  area_text: '',
  //隐藏的选择框
  content: null,
  //获取每一个list
  list: null,
  //获取省份、城市、区县按钮
  chosePCA: null,
  //省份的li标签
  provinceLi: null,
  cityLi: null,
  areaLi: null,
  //获取选的省份、市、区的索引
  provinceIndex: 0,
  cityIndex: 0,
  //空字符串接收省市区的数据,用于动态加载
  str_province: '',
  str_city: '',
  str_area: '',
  //获取确定后显示的文本框
  totalConfirm: null,
  //最后需要显示的文本
  lastText: '',
  //暂时保存最后文本
  tempProText: '',
  tempCityText: '',
  $bigOne: null,
  //点击空白处，关闭选择界面
  close() {
    $(document).mouseup(function (e) {
      var con = that.$bigOne;
      if (!con.is(e.target) && con.has(e.target).length === 0) {
        that.content.style.display = 'none';
      }
    })
  },

  //box的点击事件，箭头更换，隐藏的盒子显示
  boxClick() {
    that.box.onclick = function () {
      //如果盒子隐藏，点击则显示
      if (that.content.offsetParent === null) {
        that.content.style.display = 'block';
        that.arrow.className = 'iconfont icon-arrow-up arrow';
        that.showPCAList();
        for (var i = 0; i < that.list.length; i++) {
          if (i === 0) {
            that.list[i].style.display = 'block';
            that.chosePCA[i].classList.add('bigOne-select');
          } else {
            that.list[i].style.display = 'none';
            that.chosePCA[i].classList.remove('bigOne-select');
          }
        }
        if (that.str_province === '') {
          that.addProvince();
        }
      }
      //如果盒子显示，点击则隐藏
      else {
        that.content.style.display = 'none';
        that.arrow.className = 'iconfont icon-arrow-down arrow';
      }
    }
  },

  //根据对应的chosePCA显示对应的板块
  showPCAList() {
    for (var i = 0; i < that.list.length; i++) {
      if (that.chosePCA[i].classList.contains('bigOne-select')) {
        that.list[i].style.display = 'block';
      } else {
        that.list[i].style.display = 'none';
      }
    }
  },

  //省份、城市、区县点击事件
  chosePCAClick() {
    for (var i = 0; i < that.chosePCA.length; i++) {
      that.chosePCA[i].onclick = function (event) {
        if (event.target === this) {
          for (var k = 0; k < that.chosePCA.length; k++) {
            that.chosePCA[k].className = 'chosePCA';
          }
          this.classList.add('bigOne-select');
          that.showPCAList();
        }
      }
    }
  },

  //点击省市区文本的时候，显示出对应的选择板块
  textClick() {
    for (var i = 1; i < 4; i++) {
      (function (i) {
        that.text[i].onclick = function (e) {
          that.content.style.display = 'block';
          for (var k = 0; k < 3; k++) {
            that.chosePCA[k].className = 'chosePCA';
            that.list[k].style.display = 'none';
          }
          that.list[i - 1].style.display = 'block';
          that.chosePCA[i - 1].classList.add('bigOne-select');
          that.arrow.className = 'iconfont icon-arrow-up arrow';
          e.stopPropagation();
        }
      })(i)
    }
  },

  //点击省市区的时候，自动跳到下一个板块，点了省，跳到市···
  changeClass(n) {
    if (n === 0 || n === 1) {
      that.chosePCA[n].classList.remove('bigOne-select');
      that.list[n].style.display = 'none';
      that.chosePCA[n + 1].classList.add('bigOne-select');
      that.list[n + 1].style.display = 'block';
    } else {
      that.content.style.display = 'none';
      that.arrow.className = 'iconfont icon-arrow-down arrow';
    }
  },

  //li标签的点击事件，点击后将省市区显示到文本框内
  textShow() {
    //点省
    that.$bigOne.on("click", '.provinceLi', function () {
      //最后显示的文本获取数据
      that.lastText = '';
      that.lastText = this.innerText;
      that.tempProText = this.innerText;
      //最开始的请选择省/市/区，消失
      that.text[0].innerHTML = '';
      //重复点省的时候，清空市区的数据
      that.pro_text = '';
      that.city_text = '';
      that.area_text = '';
      that.text[2].innerHTML = '';
      that.text[3].innerHTML = '';
      that.pro_text = this.innerText;
      //省的数据显示到页面
      that.text[1].innerHTML = that.pro_text;
      //获取当前省的索引
      that.provinceIndex = this.value;
      //当前省添加选择样式
      for (var i = 0; i < that.provinceLi.length; i++) {
        if (i === this.value) {
          this.style.backgroundColor = '#46a4ff';
          this.style.color = '#fff';
        } else {
          that.provinceLi[i].style.backgroundColor = '';
          that.provinceLi[i].style.color = '';
        }
      }
      //根据省的索引添加市的数据
      that.addCity();
      //自动跳到市选择板块
      that.changeClass(0);
      that.totalConfirm.value = `中国,${that.lastText}`;
    })
  },
  //将省动态添加到省
  addProvince() {
    //文本置空，防止重选的时候数据重复
    that.list[0].innerHTML = '';
    that.str_province = '';
    //读取JSON文件，获取数据
    for (var i = 0; i < that.data.length; i++) {
      that.str_province += "<li class='provinceLi' value=" + i + '>' + that.data[i].name + "</li>";
    }
    that.list[0].innerHTML = that.str_province;
  },

  //动态添加市区
  addCity() {
    //文本置空，防止重选的时候数据重复
    that.list[1].innerHTML = '';
    that.str_city = '';
    that.list[2].innerHTML = '';
    that.str_area = '';
    //读取JSON文件，获取数据
    var city_data = that.data[that.provinceIndex].city;
    for (var i = 0; i < city_data.length; i++) {
      that.str_city += "<li class='cityLi' value=" + i + '>' + city_data[i].name + "</li>";
    }
    that.list[1].innerHTML = that.str_city;
    //点市
    $(that.list[1]).find('.cityLi').on({
      click: that.clickCityLi
    })
  },

  //动态添加区县
  addArea() {
    //文本置空，防止重选的时候数据重复
    that.list[2].innerHTML = '';
    that.str_area = '';
    //读取JSON文件，获取数据
    var area_data = that.data[that.provinceIndex].city[that.cityIndex].area;
    for (var i = 0; i < area_data.length; i++) {
      that.str_area += "<li class='areaLi' value=" + i + '>' + area_data[i] + "</li>";
    }
    that.list[2].innerHTML = that.str_area;
    //点市
    $(that.list[2]).find('.areaLi').on({
      click: that.clickAreaLi
    })
  },
  clickCityLi(event) {
    //最后显示的文本获取数据
    that.lastText = that.tempProText;
    that.lastText += ',' + event.target.innerText;
    that.tempCityText = that.lastText;
    //最开始的请选择省/市/区，消失
    that.text[0].innerHTML = '';
    //重复点市的时候，清空区的数据
    that.city_text = '';
    that.area_text = '';
    that.text[3].innerHTML = '';
    that.city_text = ',' + event.target.innerText;
    //市的数据显示到页面
    that.text[2].innerHTML = that.city_text;
    //获取市的索引
    that.cityIndex = event.target.value;
    //当前市添加选择样式
    for (var i = 0; i < that.cityLi.length; i++) {
      if (i === event.target.value) {
        event.target.style.backgroundColor = '#46a4ff';
        event.target.style.color = '#fff';
      } else {
        that.cityLi[i].style.backgroundColor = '';
        that.cityLi[i].style.color = '';
      }
    }
    //根据市的索引，添加区的数据
    that.addArea();
    //自动跳到区选择板块
    that.changeClass(1);
    that.totalConfirm.value = `中国,${that.lastText}`;
  },
  clickAreaLi(event) {
    //最后显示的文本获取数据
    that.lastText = that.tempCityText
    that.lastText += ',' + event.target.innerText;
    //最开始的请选择省/市/区，消失
    that.text[0].innerHTML = '';
    //重复点区的时候，清空区的数据
    that.area_text = '';
    that.area_text = ',' + event.target.innerText;
    //区的数据显示到页面
    that.text[3].innerHTML = that.area_text;
    //当前区添加选择样式
    for (var i = 0; i < that.areaLi.length; i++) {
      if (i === event.target.value) {
        event.target.style.backgroundColor = '#46a4ff';
        event.target.style.color = '#fff';
      } else {
        that.areaLi[i].style.backgroundColor = '';
        that.areaLi[i].style.color = '';
      }
    }
    //选完后，自动关闭选择界面
    that.changeClass(2);
    that.totalConfirm.value = `中国,${that.lastText}`;
  },
  init(bigOneElement) {
    that = this;
    that.$bigOne = $(bigOneElement)
    //获取选择框
    that.box = that.$bigOne.find('.box')[0];
    //箭头
    that.arrow = that.$bigOne.find('.arrow')[0];
    //获取显示选择结果的文本框
    that.text = that.$bigOne.find('.text');
    //隐藏的选择框
    that.content = that.$bigOne.find('.bigOne-content')[0];
    //获取每一个list
    that.list = that.$bigOne.find('.list');
    //获取省份、城市、区县按钮
    that.chosePCA = that.$bigOne.find('.chosePCA');
    //省份的li标签
    that.provinceLi = that.$bigOne.find('.provinceLi');
    that.cityLi = that.$bigOne.find('.cityLi');
    that.areaLi = that.$bigOne.find('.areaLi');
    //获取确定后显示的文本框
    that.totalConfirm = that.$bigOne.find('.totalConfirm')[0];
    //box的点击事件，箭头更换，隐藏的盒子显示
    that.boxClick();
    //省份、城市、区县点击事件
    that.chosePCAClick();
    //li标签的点击事件，点击后将省市区显示到文本框内
    that.textShow();
    //点击省市区文本的时候，显示出对应的选择板块
    that.textClick();
    //点击空白处，关闭选择界面
    that.close();
    //回显
    const areaArray = that.totalConfirm.value.split(',');
    if (areaArray.length > 0) {
      areaArray.forEach((item, index) => {
        switch (index) {
          case 1:
            that.addProvince();
            that.$bigOne.find('.provinceLi').filter((index, province) => province.innerHTML === item).click();
            break;
          case 2:
            that.$bigOne.find('.cityLi').filter((index, city) => city.innerHTML === item).click();
            break;
          case 3:
            that.$bigOne.find('.areaLi').filter((index, area) => area.innerHTML === item).click();
            break;
        }
      })
    }
  }
}

export {
  cityselect
};