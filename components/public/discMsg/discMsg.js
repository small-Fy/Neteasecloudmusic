// components/public/discMsg/discMsg.js
import create from '../../../utils/create'
import store from '../../../store/index'
create.Component(store,{
  use: ['name', 'author', 'poster', 'src', 'playFlag','musicId'],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 歌单
    playlist: {},
    // 循环序号
    cycleIndex: 0,
    // 选定的序号
    clickItem: -1,
    // 循环方式
    cycleStyle: [{
      path: "../../../images/circulationList-gray.png",
      text: "列表循环"
    }, {
      path: "../../../images/randomBroadcast-gray.png",
      text: "随机播放"
    }, {
      path: "../../../images/singleCycle-gray.png",
      text: "单曲循环"
    }]
  },
  ready() {
    this.setData({
      playlist: wx.getStorageSync("playlist")
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 切换播放模式
    changeModel() {
      if (this.data.cycleIndex === 0) {
        this.setData({
          cycleIndex: this.data.cycleIndex + 1
        })
      } else if (this.data.cycleIndex === 1) {
        this.setData({
          cycleIndex: this.data.cycleIndex + 1
        })
      } else {
        this.setData({
          cycleIndex: 0
        })
      }
    },
    // 选择播放的歌曲
    chooseItem(e) {
      this.setData({
        clickItem: e.currentTarget.dataset.index
      })
      
      this.store.data.musicId = e.currentTarget.dataset.id
      console.log(this.store.data.musicId, 46546465465465)
      this.triggerEvent("getSonId", {
        sonId: e.currentTarget.dataset.id, sonIndex: this.data.cycleIndex
      })
    }
  }
})