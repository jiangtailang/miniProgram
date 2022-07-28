// pages/video/video.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList: [],
        navId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getvideoGroupList()
    },
    // 获取视频标签列表
    async getvideoGroupList() {
        let result = await request('/video/group/list')
        this.setData({
            videoGroupList: result.data.slice(0, 14),
            navId: result.data[0].id
        })
    },
    // 点击切换导航标签
    tapNavItem(event) {
        // let navId = event.currentTarget.id //通过id向event传参的时候如果传的是number会自动转换成string
        let navId = event.currentTarget.dataset.id //通过data-key=value不会自动转换
        this.setData({
            navId: navId >>> 0 //将string强制转换成number
        })
    },
    toSearch() {
        wx.navigateTo({ url: '/pages/search/search' })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})