//mock your velocity data

module.exports = {

    projectYears: function () {

        var result = [ ];
        var i = 2014;
        for ( ; i >= 1988; i -- ) {
            result.push( i );
        }

        return result;

    }(),
    // 以下的内容和业务逻辑相关
    resume: {

        id: 783,
        birthday: '2010.09.08',
        workYear: '10',
        email: 'lagou@lagou.com',
        phone: 13333333333,
        status: 0,
        myRemark: '神马神马？神马神马？神马神马？神马神马？神马神马？',
        resumeName: '简历名称',
        name: '谁谁谁',
        createTime: '2837818378',
        perfect: '98',
        headPic: '/images/ipo/logo_ct.png',
        isDel: 0,
        userId: '123',
        sex: '男',
        resumekey: '12312312',
        highestEducation: '研究生',
        deliverNearByConfirm: 1,
        deliverResumeConfirm: 1,
        refuseCount: 10,
        markCanInterviewCount: 9,
        haveNoticeInterCount: 5,
        oneWord: '我是这样子的人，我是这样子的人我是这样子的人，你猜对了！',
        liveCity: '周口店',
        resumeScore: 80,
        userIdentity: 2

    },

    resumeCompleteStatus: {

        score: 90

    }

};