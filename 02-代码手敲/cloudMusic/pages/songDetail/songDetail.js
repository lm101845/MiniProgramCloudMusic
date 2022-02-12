import request from '../../utils/request.js';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false, //音乐是否播放
        song: {}, //歌曲信息
        musicId: "", //歌曲id
        // backgroundAudioManager:{} //音乐播放器
    },

    /**
     * 生命周期函数--监听页面加载——只执行一次
     */
    onLoad: function(options) {
        // console.log(options.song, 'options.song');
        //注：你传过来的不是一个完整的对象
        //原生小程序中路由传参，对参数的长度有限制，最大不能超过100个字符，超过长度会给你截掉一部分
        //options是专门用来接收路由跳转的query参数的
        // console.log(typeof options.song, 'typeof options.song');
        // console.log(JSON.parse(options.song), 'JSON.parse(options.song)');
        let musicId = options.musicId;
        this.setData({
                musicId
            })
            // console.log(musicId, 'musicId');
            // console.log(options, 'options');
            //获取音乐详情
        this.getUserInfo(musicId)

        /***
         * 如果用户操纵系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示是否播放的状态和真实的音乐播放状态不一致
         * 解决方案：
         *  1.通过控制音频的实例去监视音乐播放/暂停
         */
        //创建控制音乐播放的实例
        this.backgroundAudioManager = wx.getBackgroundAudioManager();
        //监视音乐播放/暂停
        this.backgroundAudioManager.onPlay(() => {
            // console.log('play');
            // this.setData({
            //     isPlay: true
            // })
            this.changePlayStatus(true)
        })
        this.backgroundAudioManager.onPause(() => {
            // console.log('pause');
            // this.setData({
            //     isPlay: false
            // })
            this.changePlayStatus(false)
        })
        this.backgroundAudioManager.onStop(() => {
            // this.setData({
            //     isPlay: false
            // })
            this.changePlayStatus(false)
        })
    },

    //修改播放状态的功能函数
    changePlayStatus(isPlay) {
        this.setData({
            isPlay
        })
    },
    //获取音乐详情的功能函数
    async getUserInfo(musicId) {
        let songData = await request('/song/detail', { ids: musicId });
        this.setData({
                song: songData.songs[0]
            })
            //动态修改窗口的标题
        wx.setNavigationBarTitle({
            title: this.data.song.name
        })
    },

    handleMusicPlay() {
        let { musicId } = this.data
            // 点击播放或暂停的回调
        let isPlay = !this.data.isPlay;
        //修改是否播放的状态——现在已经不需要了
        // this.setData({
        //         isPlay
        //     })
        //除了要修改状态以外，还要告诉功能函数你是要播放还是暂停
        this.musicControl(isPlay, musicId);
    },
    //控制音乐播放/暂停的功能函数
    async musicControl(isPlay, musicId) {
        // let backgroundAudioManager = wx.getBackgroundAudioManager();
        //我们应该更早一点创建这个实例
        if (isPlay) {
            //获取音乐的播放链接
            let musicLinkData = await request('/song/url', { id: musicId });
            let musicLink = musicLinkData.data[0].url;
            //音乐播放
            //创建控制音乐播放的实例对象
            // let backgroundAudioManager = wx.getBackgroundAudioManager();
            // backgroundAudioManager.src = '音乐链接'
            this.backgroundAudioManager.src = musicLink
            this.backgroundAudioManager.title = this.data.song.name;
        } else {
            //暂停音乐
            this.backgroundAudioManager.pause()
                //注意：我是用let定义的变量，只能在if那个代码块中使用，else代码块它不认识
                //所以我们应该把BackgroundAudioManager这个变量提到if的外面去
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})