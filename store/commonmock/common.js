//mock your velocity data

module.exports = {

    s_version: '12345',

    lagoutitle: '',

    description: '',

    keywords: '',

    noIncludeValidate: false,

    isActive: true,

    quick: false,

    untreatedResumeCount: 100,

    resubmitToken: '1234554321',

    session: {

        getAttribute: function( key ) {

            return {

                USER_CONTEXT: {
                    id: '1221',
                    type: 1,
                    name: '我的名字',
                    idMd5: 'skxj23ikxz3j49',
                    activated: true,
                    isEmailCanLogin: function() {
                        return true;
                    }
                }

            }[ key ];

        }

    },

    request: 'what?',

    cookie: {

        hasDeliver: 1,

        setRequest: function ( obj ) {
            // do noting
        }

    },

    noticeEntity: {

        topStatus: 0,

        getCount: function ( key ) {

            return { 

                WILL_BE_REJECTED: 6,
                NO_REPLAY: 10,
                REJECTED: 19

             }[ key ]

        }

    },

    pushNoticeEntity: {

        getStatus: function() {

            var arr = [ 1 ];
            arr.get = function ( index ) {
                return arr[ index ];
            };
            return arr;

        },

        getTopStatus: function() {

            return 1;

        }

    },

    // RESUME_PROCESSING_TIPS_TOKEN: 'skxjcxj12j389dhj',

    // base
    link: {

        getContextPath: function() {

            return 'http://localhost:8001';

        }

    },

    hasNearbyResume: true,

    nearbyResume: {

        nearbyName: '附近名字',

        getResumeUploadTimeStr: function () {

            return 987654321;

        }

    },

    rbase: ''

}