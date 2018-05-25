$(function() {
    $(function() {
        function AddCar() {
            this.main = $("#oBox");
            this.Rendering();
            this.init();
        }
        AddCar.prototype = {
            constructor: AddCar,
            init() {
                this.carNum = $("#number")
                this.carNum.html(this.getSum());
                this.main.on("click.addCar", "a[data_id]", $.proxy(this.Add, this));
                this.main.on("click.changeNum", "a[data-id]", $.proxy(this.changeNum, this));
            },
            Rendering() {

                $.ajax({
                        url: "./data/shoplist.json",

                    })
                    .then(function(res) {
                        var html = ""
                        res.forEach(function(item) {
                            html += `
                      <div class="productBox"">
                        <li >
                        <div class="pro">
                            <div class="p-img"   >
                                <a href="javaScript:;" target="_blank">
                                    <img id="${item.id}" src="${item.images}" style="display: inline;">
                                </a>
                            </div>
                            <div class="p-price">￥${item.price}
                            </div>
                            <div class="p-name"><a title="茶叶鲜叶" href="javascript:;" target="_blank">${item.pro}</a></div>

                            <div class="extra">
                                <a style="color:#999999;line-height: 25px;display: inline-block; width: 50%;float: left;height: 25px;" href="javascript:;" title="雅安雅供" target="_blank">
                                    <span title="雅安雅供" style="display: block;height: 100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                            ${item.shop}
            		</span>
                                </a>
                                <div class="p-address" title="四川 雅安市">
                                    ${item.prosition}
                                </div>
                            </div>
                            <div class="renzheng">
                            </div>
                            <div class="btns">
                                <a href="javascript:;" class="btn3 collect">
                                    <span >收藏</span>
                                </a>
                                <a href="javascript:;" class="btn3 contrast">
                                    <input type="checkbox" class="compare_close" value="对比" >
                                    <label for="checkbox"> 对比</label>
                                </a>
                                <a id="addTringToShopCardId${item.id}" data_id="${item.id}" class="btn3 addCar" href="javascript:void(0)"><i class="item-icon"></i>加入购物车</a>
                            </div>
                        </div>
                    </li>
                </div>`
                        }.bind(this))
                        $("#oBox").html(html);
                    }.bind(this))
                    .then(function() {
                        $(".pro").delegate("img", "click", function() {
                            var url = "details.html?id=" + this.id;
                            window.location.href = url;
                            console.log(url)
                        })
                    }.bind(this));
            },
            Add(event) {
                //我怎么知道当前点击的元素是谁;
                var target = event.target || event.srcElement;
                var goodsId = $(target).attr("data_id");
                console.log(goodsId)
                if (!$.cookie("shopCar")) {
                    var shopCarArray = [{
                        id: goodsId,
                        num: 1
                    }]
                    $.cookie("shopCar", JSON.stringify(shopCarArray))
                    return 0;
                }
                var shopCarString = $.cookie("shopCar");
                var shopCarArray = JSON.parse(shopCarString);
                var hasItem = false;
                shopCarArray.forEach(function(item) {
                    if (item.id == goodsId) {
                        item.num++;
                        hasItem = true;
                    }
                })
                if (!hasItem) {
                    // console.log(1)
                    var item = {
                        id: goodsId,
                        num: 1
                    }
                    shopCarArray.push(item)
                }
                $.cookie("shopCar", JSON.stringify(shopCarArray));
                // console.log($.cookie("shopCar"));
            },
            changeNum() {
                this.carNum.html(this.getSum());
            },
            getSum() {
                var shopCarString = $.cookie("shopCar");
                console.log(shopCarString)
                if (shopCarString) {
                    var shopCarArray = JSON.parse(shopCarString);
                    var sum = 0;
                    shopCarArray.forEach(function(item) {
                        sum += Number(item.num);
                    })
                    return sum;
                }
                return 0;
            }
        }
        new AddCar()

    })
})