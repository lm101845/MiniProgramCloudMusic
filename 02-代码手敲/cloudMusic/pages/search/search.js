import request from '../../utils/request.js';
let isSend = false; //函数节流使用
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholderContent: "", //placeholder的内容
        hotList: [], //热搜榜数据
        searchContent: "", //用户输入的表单项数据
        searchList: [], //关键字模糊匹配的数据
        historyList: [], //搜索历史记录

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取初始化数据
        this.getInitData();
        //获取历史记录
        this.getSearchHistory();
    },

    //获取初始化数据
    async getInitData() {
        let placeholderData = await request('/search/default')
        let hotListData = await request('/search/hot/detail')
        this.setData({
            placeholderContent: placeholderData.data.showKeyword,
            hotList: hotListData.data
        })
    },

    //获取本地历史记录的功能函数
    getSearchHistory() {
        let historyList = wx.getStorageSync('searchHistory')
        if (historyList) {
            this.setData({
                historyList
            })
        }
    },

    //表单项内容发生改变的回调
    //input事件是监听input框的内容变化
    //change事件也是，但它必须要失去焦点才会触发
    handleInputChange(event) {
        // console.log(event, '函数调用了');
        // 你输入内容只要发生变化，这个函数就被调用
        //更新searchContent的状态数据
        this.setData({
            searchContent: event.detail.value.trim()
        })
        if (isSend) {
            return
        }
        // console.log('后面的代码执行了把');
        isSend = true;
        this.setSearchList();
        // 函数节流
        setTimeout(async () => {
            isSend = false;
        }, 300)
    },

    //获取搜索数据的功能函数
    async setSearchList() {
        if (!this.data.searchContent) {
            this.setData({
                searchList: []
            })
            return
        }
        let { searchContent, historyList } = this.data;
        //发请求获取关键字模糊匹配数据
        let searchListData = await request('/search', { keywords: this.data.searchContent, limit: 10 })
        this.setData({
            searchList: searchListData.result.songs
        })

        //将搜索关键字添加到搜索历史记录中
        if (historyList.indexOf(searchContent) !== -1) {
            historyList.splice(historyList.indexOf(searchContent), 1)
        }
        historyList.unshift(searchContent)
        this.setData({
            historyList
        })
        wx.setStorageSync('searchHistory', historyList);
    },

    //清空搜索内容
    clearSearchContent() {
        this.setData({
            searchContent: "",
            searchList: []
        })
    },

    //删除搜索历史记录
    deleteSearchHistory() {
        wx.showModal({
            content: '确认删除吗？',
            success: (res) => {
                console.log(res);
                if (res.confirm) {
                    //首先清空data中的历史记录(historyList)
                    this.setData({
                        historyList: []
                    })
                    //同时移除本地历史记录缓存
                    wx.removeStorageSync('searchHistory')
                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})