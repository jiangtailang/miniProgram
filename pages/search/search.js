import request from '../../utils/request'
let isSend = false
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotSearchList: [], //热搜榜列表
        placeholderContent: '', //placeholder默认内容
        searchKeyWord: '', //搜索关键字
        searchList: [], //模糊匹配搜索的列表
        historySearchList: [], //搜索历史关键字列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取热搜榜列表
        this.getInitData()
            // 获取历史搜索列表
        this.handleHistoryList()
    },

    // 获取热搜榜
    async getInitData() {
        let hotSearchListResult = await request('/search/hot/detail')
        let placeholderContentResult = await request('/search/default')
        this.setData({
            hotSearchList: hotSearchListResult.data,
            placeholderContent: placeholderContentResult.data.showKeyword
        })
    },
    // input搜索框内容发生变化时的回调 
    handleInputChange(event) {
        let searchKeyWord = event.detail.value.trim()
        this.setData({
                searchKeyWord
            })
            // 函数节流
        if (isSend) {
            return
        }
        isSend = true
        if (searchKeyWord) {
            // 进行模糊匹配搜索的列表
            this.getSearchList(searchKeyWord)
                // 添加历史搜索关键字，并存储在本地
            let { historySearchList } = this.data
            if (historySearchList.indexOf(searchKeyWord) !== -1) {
                historySearchList.splice(historySearchList.indexOf(searchKeyWord), 1)
            }
            historySearchList.unshift(searchKeyWord)
            wx.setStorageSync('historySearchList', historySearchList)
            this.setData({
                historySearchList
            })
        } else {
            this.setData({
                searchList: []
            })
        }
        setTimeout(() => {
            isSend = false
        }, 300)
    },
    // 获取根据用户输入的内容进行模糊匹配搜索的列表
    async getSearchList(searchKeyWord) {
        let searchListResult = await request('/search', { keywords: searchKeyWord, limit: 10 })
        let searchList = searchListResult.result.songs
        this.setData({
            searchList,
        })
    },
    // 处理历史搜索关键字函数
    handleHistoryList() {
        let historySearchList = wx.getStorageSync('historySearchList')
        if (historySearchList) {
            this.setData({
                historySearchList
            })
        }
    },
    // 删除全部历史记录
    clearAllHistory() {
        wx.showModal({
            content: '确认删除吗？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        historySearchList: []
                    })
                    wx.removeStorageSync('historySearchList')
                }
            }
        })

    },
    // 清空关键字 
    clearKeyword() {
        this.setData({
            searchKeyWord: '',
            searchList: []
        })
    },
    // 跳转至视频页
    toVideo() {
        wx.switchTab({ url: '/pages/video/video' })
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