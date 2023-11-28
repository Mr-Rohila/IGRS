let API_URls =
{
    CORE: {
        LOGIN: '/login/user',
    },

    NAVBAR: {
        DEFAULT: '/header/default',
        DASHBOARD: '/header/dashboard'
    },

    ADMIN: {
        HOME: "",
        K: '',
    },

    USER: {
        A: '',
        B: ''
    },

    DEED: {
        LOAD_DISTRICT: "/searchSubMenu/districtList",
        LOAD_SUB_DISTRICT: "/searchSubMenu/subDistrictList",
        LOAD_TEHSIL: "/search/param",
        LOAD_VILLAGE: "/search/param/",
        LOAD_YEAR: "/searchSubMenu/yearList",
        LOAD_OWNERS_NAME: "/search/ownerList",
        LOAD_SR_LOCATION: "/search/param/",
        LOAD_REVENUE_DISTRICT: "/search/param/",
        LOAD_REGISTRATION_DISTRICT: "/search/param/",
        LOAD_DEED_INFO: "/search/partyDetails/",
        DOWNLOAD_DEED: "/file/preview",
        PREVIEW_DEED:"/file/preview",
    },

    VERIFICATION: {
        REST_PASS_SEND_OTP: "/pass/reset",
        REST_PASS_SAVE: "/pass/savePassword",
        SEND_OTP: "/verify/mobileVerification",
        OTP_VERIFIED: "/verify/mobileVerification",
        REGISTER: "/user/registration",

    },
    ACCOUNT: {
        CHANGE_PASSWORD: "/account/changePassword"
    },
    PAYMENT: {
        CREATE_ORDER: "/payment/create_order",
        UPDATE_ORDER: "/payment/update_order"
    },

    RAISED_QUERY:{
        SAVE_PAYMENT_REFUND_REQUEST:'/queryd/payIssue',
        SAVE_DOCUMENT_NOT_FOUND_REQUEST:'/queryd/docNotFound',
        SAVE_DETAIL_MISMATCH_REQUEST:'/queryd/deedMismatch'
    },
    SEARCH_QUERY: {
        GET_ALL_QUERIES: "/queryd/getAll"
    },

}

export default API_URls;