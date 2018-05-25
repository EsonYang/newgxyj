$(function() {


    function Banner() {
        this.timer;
        this.banner = $("#banner");
        this.init();
    }
    Banner.prototype = {
        constructor: Banner,
        init() {
            this.index = 0;
            this.index = Number(this.index)
            this.bannerWrapper = $(".banner-wrapper");
            this.bannerItem = this.bannerWrapper.children("div");
            this.bannerNum = this.bannerItem.length;
            this.span = $(".banner_pagination span");
            this.spanLg = this.span.length;
            $("#banner").on("mouseenter", "span", $.proxy(this.change, this))
            $("#banner").on("mouseenter", "div .banner_item", $.proxy(this.clear, this))
            $("#banner").on("mouseleave", "div .banner_item", $.proxy(this.set, this))
            this.set()
        },
        change(event) {
            this.clear();
            var target = event.target || event.srcElement;
            $("#banner span").removeClass("bg-change")
            $(target).addClass("bg-change");
            var ind = $(target).index();
            this.index = ind;
            console.log(ind, this.bannerItem)
            this.bannerItem.fadeOut();
            $(this.bannerItem[ind]).fadeIn();
            // console.log()
        },
        set(event) {
            clearInterval(this.timer)
            this.timer = setInterval(function() {
                $("#banner span").removeClass("bg-change")
                this.bannerItem.fadeOut();
                this.index++;
                var divInd = this.index % this.bannerNum;
                console.log(this.index, divInd)
                $(this.bannerItem[divInd]).fadeIn();
                $($("#banner span")[divInd]).addClass("bg-change")
            }.bind(this), 3000)
        },
        clear() {
            clearInterval(this.timer);
        }
    }
    new Banner();





    function SideBar() {
        this.elevator = $("#elevatorNew");
        this.firLi = this.elevator.find("ul>li").eq(0);
        this.lasLi = this.elevator.find("ul>li").eq(1);
        this.lastTop = $("#w_floor_4").offset().top;
        this.init()
    }
    SideBar.prototype = {
        constructor: SideBar,
        init() {
            //console.log(this.firLi)
            $(document).on("scroll", function() {
                this.offTop = $("html").scrollTop();
                if (this.offTop < 1000) {
                    this.elevator.css("display", "none")
                        // this.firLi.css()
                } else if (this.offTop > this.lastTop - 150) {
                    this.elevator.css("display", "block");
                    this.lasLi.addClass("cur")
                    this.firLi.removeClass("cur")

                } else {
                    this.elevator.css("display", "block");
                    this.lasLi.removeClass("cur")

                    this.firLi.addClass("cur")
                }

            }.bind(this))
        }
    }
    new SideBar()


    function Ashow(ele) {
        this.oBox = $(ele);
        this.firli = $(ele + " a:first");
        this.lasli = $(ele + " a:last");
        this.init();
    }
    Ashow.prototype = {
        constructor: Ashow,
        init() {
            this.oBox.on("mouseenter", function() {
                this.firli.hide();
                this.lasli.show();
            }.bind(this))
            this.oBox.on("mouseleave", function() {
                this.firli.show();
                this.lasli.hide();
            }.bind(this))
        }
    }
    new Ashow(".scroll_top")
    new Ashow(".contact_service")
    new Ashow(".tab_cart")

})