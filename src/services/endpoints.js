// This is the endPoints file where all the api will be stored ;

const BASE_URL = "https://admin.xperienceit.in/api";

export const endpoints = {   
     authentication : {
        login : BASE_URL + "/user-login",
        otpLogin:BASE_URL+"/request_otp",
        otpVerify : BASE_URL + "/verify_otp" ,
        emailSubmit : BASE_URL + "" ,
        register : BASE_URL + "/register",
        userProfiles : BASE_URL + "/userProfiles",
        forgotPassword : BASE_URL + "/forgot-password",
    } ,
    home : {
        location : BASE_URL + "/get-location" , 
        gift : BASE_URL + "/best-seller-gift",
        
        banner : BASE_URL + "/banner" ,
        homeScreen : BASE_URL + "/list-dynamic-category",
        categoryList : BASE_URL + "/get-All-category" ,
        allSubCatList : BASE_URL + "/get-All-subcategory" ,
        getAllChildCategory : BASE_URL + "/get-All-childcategory" ,
        tour : BASE_URL + "/tours" ,
        roomDecoration : BASE_URL + "/balloon-room-decor",
        bannerOffers : BASE_URL + "/offers",
        testimonials : BASE_URL + "/reviews",
        filterCategory:BASE_URL + "/filter-category-api",
        changePassword:BASE_URL + "/submit-reset-password",
        pincode : BASE_URL + "/get-pincode",
        enquiry : BASE_URL + "/enquiry-form",
        bookingDetails : BASE_URL + "/book-now",
        packageBySubCategory : BASE_URL + "/getPackageBySubCategory?package_subcat_id=",
        suggestions : BASE_URL+ "/suggestions",
    },
    birthday : {
        banner : BASE_URL + "/gift-banner" ,
        gitCategory : BASE_URL + "/gift-category",
        // giftCombo : BASE_URL + "/combo-gift",
        // digitalGifts : BASE_URL + "/digital-gift",
        bestSeller : BASE_URL + "/best-seller-category",
        birthdaySurprise : BASE_URL + "/birthday-decoration"
    },
    wishlist : {
        updateWishList : BASE_URL + "/wishlist" ,
        allWishtList : BASE_URL + "/user-wishlist"
    },
    blogs : {
        allBlogs : BASE_URL + "/blog"
    } ,
    booking : {
        bookingDetailsUrl : BASE_URL + "/booking-details" , 
        cancelBooking : BASE_URL + "/cancel-bookings" ,
        cancelReason : BASE_URL + "/cancel-reason"
    } ,
    marriage : {
        vendorType : BASE_URL + "/marriage/vendors/type" ,
        bookMarriage : BASE_URL + "/marriage/details"
    }
}

