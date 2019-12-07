Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      default: () => []
    },
    albumsDisc: {
      type: Array,
      default: () => []
    },
    albumsMusic: {
      type: Array,
      default: () => []
    },
    newPower: {
      type: Array,
      default: () => []
    },
    radios: {
      type: Array,
      default: () => []
    },
    program: {
      type: Array,
      default: () => []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 新歌与新碟的切换
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      this.setData({
        flag: e.currentTarget.dataset.flag
      })
    },
    // 跳转歌单详情
    musicDetail(e) {
      wx.navigateTo({
        url: `/pages/musicDetail/musicDetail?id=${e.currentTarget.dataset.id}&copywriter=${e.currentTarget.dataset.copywriter}`,
      })
    },
    // 跳转专辑详情
    discDetail(e){
      wx.navigateTo({
        url: `/pages/discDetail/discDetail?id=${e.currentTarget.dataset.id}`,
      })
    },
    // 点击新歌
    musiscDetail(e){
      wx.navigateTo({
        url: `../../pages/musicPlay/musicPlay?musicId=${e.currentTarget.dataset.item.id}`,
      })
    },
    // 点击电台
    radiosDetail(e){
      // radioId为9位数id,radiosId为10位数id
      wx.navigateTo({
        url: `../../pages/radios/radios?radioId=${e.currentTarget.dataset.item.program.radio.id}&radiosId=${e.currentTarget.dataset.item.id}`,
      })
    }
  }
})