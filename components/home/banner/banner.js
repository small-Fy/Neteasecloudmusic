const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true, //导航点
    autoplay: true,//自动播放
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },

})