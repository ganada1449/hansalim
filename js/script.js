// html 이 준비가 되면 실행한다.
$(document).ready(function () {

    // 상단 고정 메뉴 기능
    let scroll_y = $(window).scrollTop();
    let header = $('.header');
    let body = $('body');

    $(window).scroll(function () {
        scroll_y = $(window).scrollTop();
        if (scroll_y > 70) {
            header.addClass('header-fix');
            body.addClass('body-fix');
        } else {
            header.removeClass('header-fix');
            body.removeClass('body-fix');
        }
    });

    // gotop 기능
    $('.gotop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        });
    });

    // center-menu 기능
    let center_menu = $('.center-menu');
    let center_submenu = $('.center-submenu');
    center_menu.click(function (event) {
        event.preventDefault();
        center_submenu.toggle();
        center_menu.toggleClass('center-menu-active');
    });

    let category_list_more = $('.category-list-more');
    let category_list_2 = $('.category-list-2');
    category_list_more.click(function (event) {
        event.preventDefault();
        category_list_2.toggle();
        $(this).toggleClass('category-list-more-active');
        see_more_list.hide();
        see_more_bt_open.show();
        see_more_bt_close.hide();
    });

    // 더보기 기능
    let see_more_bt = $('.see-more-bt');

    let see_more_bt_open = $('.see-more-bt-open');
    let see_more_bt_close = $('.see-more-bt-close');
    see_more_bt_close.hide();

    let see_more_list = $('.see-more-list');

    see_more_list.hide();    
    see_more_bt.click(function (event) {
        event.preventDefault();
        see_more_bt_open.toggle();
        see_more_bt_close.toggle();
        see_more_list.toggle();

        category_list_2.hide();
        category_list_more.removeClass('category-list-more-active');
    });

    // visual slide
    let sw_visual = new Swiper('.sw-visual', {
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: ".sw-visual-next",
            prevEl: ".sw-visual-prev",
        },
        pagination: {
            el: ".sw-visual-pg",
            type: "fraction",
        },
    });

    let sw_visual_bt = $('.sw-visual-bt');
    sw_visual_bt.click(function () {
        $(this).toggleClass('sw-visual-bt-play');

        let temp = $(this).hasClass('sw-visual-bt-play');

        if (temp == true) {
            sw_visual.autoplay.stop();
        } else {
            sw_visual.autoplay.start();
        }
    });

    // 알뜰물품 슬라이드
    new Swiper('.sw-sales', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw-sales-next",
            prevEl: ".sw-sales-prev",
        },
        pagination: {
            el: ".sw-sales-pg",
            type: "fraction",
        },
    });

    // 추천 슬라이드 관련
    new Swiper('.sw-pick', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw-pick-next",
            prevEl: ".sw-pick-prev",
        },
        pagination: {
            el: ".sw-pick-pg",
            type: "fraction",
        },
    });

    // 유명물품 슬라이드 관련 10 픽셀 여백 7개 배치
    new Swiper('.sw-famous', {
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 10,
        navigation: {
            nextEl: ".sw-famous-next",
            prevEl: ".sw-famous-prev",
        },
    });

    // famous 를 위한 기능
    let famous_good_box = $('.famous .good-box');
    $.each(famous_good_box, function () {
        let temp = $(this).find('.good-box-special');
        if (temp.length > 0) {} else {
            $(this).find('.good-box-price').css('bottom', '3rem');
            $(this).find('.good-box-cart').css('bottom', '3rem');
        }
    });

    let famous_icon = $('.sw-famous .swiper-slide>a');
    let famous_good_list = $('.famous .good-list');
    famous_good_list.eq(0).show();

    $.each(famous_icon, function (index, item) {
        $(this).click(function (event) {
            event.preventDefault();
            famous_good_list.hide();
            famous_good_list.eq(index).show();
        });
    });

    // brand 슬라이드
    new Swiper('.sw-brand', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 16,
        navigation: {
            nextEl: ".sw-brand-next",
            prevEl: ".sw-brand-prev",
        },
        pagination: {
            el: ".sw-brand-pg",
            type: "fraction",
        },
    });

    // banner 슬라이드
    new Swiper('.sw-banner', {
        slidesPerView: 2,
        slidesPerGroup: 1,
        loop: true,
        navigation: {
            nextEl: ".sw-banner-next",
            prevEl: ".sw-banner-prev",
        },
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
    });

    // recipe 슬라이드
    $(".recipe-con-scroll").niceScroll({
        cursoropacitymax: 0.4,
        cursorwidth: "0.8rem",
    });

    // 리뷰 슬라이드
    new Swiper('.sw-review', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 15,
        navigation: {
            nextEl: ".sw-review-next",
            prevEl: ".sw-review-prev",
        },
        pagination: {
            el: ".sw-review-pg",
            type: "fraction",
        },
    });

    // 장바구니 기능
    let recipe_con_item_bt = $('.recipe-con-item-bt');
    let recipe_con_count = $('.recipe-con-count .count-recipe');
    let recipe_con_count_bt = $('.recipe-con-count-bt');
    let recipe_con_buy_b = $('.recipe-con-buy b');

    $.each(recipe_con_item_bt, function (index, item) {
        $(this).click(function () {
            $(this).toggleClass('recipe-con-item-bt-active');
            count();
        });
    });

    function count() {
        let total = 5;
        let minus = 0;
        let totalprice = 0;

        $.each(recipe_con_item_bt, function (index, item) {
            let notcheck = $(this).hasClass('recipe-con-item-bt-active');
            if (notcheck == true) {
                minus = minus + 1;
            }
            let productprice = $(this).attr('data-money');
            productprice = parseInt(productprice);

            if (notcheck == false) {
                totalprice = totalprice + productprice;
            }
        });

        // 가격
        totalprice = totalprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        recipe_con_buy_b.text(totalprice);

        total = total - minus;
        recipe_con_count.text('전체 선택 ' + total + '개');

        if (total != 5) {
            recipe_con_count_bt.addClass('recipe-con-count-bt-active');
        } else {
            recipe_con_count_bt.removeClass('recipe-con-count-bt-active');
        }
    }

    count();

    recipe_con_count_bt.click(function () {
        $(this).toggleClass('recipe-con-count-bt-active');
        let temp = $(this).hasClass('recipe-con-count-bt-active');
        if (temp == true) {
            checkout();
        } else {
            all();
        }

        count();
    });

    function checkout() {
        $.each(recipe_con_item_bt, function (index, item) {
            $(this).addClass('recipe-con-item-bt-active');
        });
        recipe_con_count.text('전체 선택 0개');
    }

    function all() {
        $.each(recipe_con_item_bt, function (index, item) {
            $(this).removeClass('recipe-con-item-bt-active');
        });
        recipe_con_count.text('전체 선택 5개');
    }

    // allmap 기능
    let footer_sitemap = $('.footer-sitemap');
    let footer_sitemap_a = $('.footer-sitemap > a');
    let allmap = $('.allmap');
    let allmap_close = $('.allmap-close');
    footer_sitemap_a.click(function (event) {
        event.preventDefault();
        allmap.stop().slideToggle();
        footer_sitemap.toggleClass('footer-sitemap-active');
    });

    allmap_close.click(function () {
        allmap.stop().slideUp();
        footer_sitemap.removeClass('footer-sitemap-active');
    });

});