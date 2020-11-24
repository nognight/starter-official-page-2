/**
 * common.js
 *
 */


/* !stack ------------------------------------------------------------------- */
jQuery(document).ready(function($) {

    //ウインドウサイズ取得
    var windowWidth = document.body.clientWidth;

    //全デバイス共通
    pageScroll();
    rollover();

    //デバイス振り分け
    if (windowWidth < 768) {
        //SPのみ
    } else {
        //PCのみ
    }

});


/* !isUA -------------------------------------------------------------------- */
var isUA = (function() {
    var ua = navigator.userAgent.toLowerCase();
    indexOfKey = function(key) {
        return (ua.indexOf(key) != -1) ? true : false;
    }
    var o = {};
    o.ie = function() {
        return indexOfKey("msie");
    }
    o.fx = function() {
        return indexOfKey("firefox");
    }
    o.chrome = function() {
        return indexOfKey("chrome");
    }
    o.opera = function() {
        return indexOfKey("opera");
    }
    o.android = function() {
        return indexOfKey("android");
    }
    o.ipad = function() {
        return indexOfKey("ipad");
    }
    o.ipod = function() {
        return indexOfKey("ipod");
    }
    o.iphone = function() {
        return indexOfKey("iphone");
    }
    return o;
})();

/* !rollover ---------------------------------------------------------------- */
var rollover = function() {
    var suffix = {
        normal: '_no.',
        over: '_on.'
    }
    $('a.over, img.over, input.over').each(function() {
        var a = null;
        var img = null;

        var elem = $(this).get(0);
        if (elem.nodeName.toLowerCase() == 'a') {
            a = $(this);
            img = $('img', this);
        } else if (elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input') {
            img = $(this);
        }

        var src_no = img.attr('src');
        var src_on = src_no.replace(suffix.normal, suffix.over);

        if (elem.nodeName.toLowerCase() == 'a') {
            a.bind("mouseover focus", function() {
                    img.attr('src', src_on);
                })
                .bind("mouseout blur", function() {
                    img.attr('src', src_no);
                });
        } else if (elem.nodeName.toLowerCase() == 'img') {
            img.bind("mouseover", function() {
                    img.attr('src', src_on);
                })
                .bind("mouseout", function() {
                    img.attr('src', src_no);
                });
        } else if (elem.nodeName.toLowerCase() == 'input') {
            img.bind("mouseover focus", function() {
                    img.attr('src', src_on);
                })
                .bind("mouseout blur", function() {
                    img.attr('src', src_no);
                });
        }

        var cacheimg = document.createElement('img');
        cacheimg.src = src_on;
    });
};
/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function() {
    jQuery.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    $('a.scroll, .scroll a, .pagetop a').each(function() {
        $(this).on("click", function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            var targetY = $(target).offset().top;
            var parent = (isUA.opera()) ? (document.compatMode == 'BackCompat') ? 'body' : 'html' : 'html,body';
            $(parent).animate({
                    scrollTop: targetY
                },
                400,
                'easeInOutCubic'
            );
            return false;
        });
    });
}

/* heightLine -------------------------------------------------------------- */
if (!navigator.userAgent.match(/(iPhone|Android)/)) {

    new function() {

        function heightLine() {

            this.className = "heightLine";
            this.parentClassName = "heightLineParent"
            reg = new RegExp(this.className + "-([a-zA-Z0-9-_]+)", "i");
            objCN = new Array();
            var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
            for (var i = 0; i < objAll.length; i++) {
                var eltClass = objAll[i].className.split(/\s+/);
                for (var j = 0; j < eltClass.length; j++) {
                    if (eltClass[j] == this.className) {
                        if (!objCN["main CN"]) objCN["main CN"] = new Array();
                        objCN["main CN"].push(objAll[i]);
                        break;
                    } else if (eltClass[j] == this.parentClassName) {
                        if (!objCN["parent CN"]) objCN["parent CN"] = new Array();
                        objCN["parent CN"].push(objAll[i]);
                        break;
                    } else if (eltClass[j].match(reg)) {
                        var OCN = eltClass[j].match(reg)
                        if (!objCN[OCN]) objCN[OCN] = new Array();
                        objCN[OCN].push(objAll[i]);
                        break;
                    }
                }
            }

            //check font size
            var e = document.createElement("div");
            var s = document.createTextNode("S");
            e.appendChild(s);
            e.style.visibility = "hidden"
            e.style.position = "absolute"
            e.style.top = "0"
            document.body.appendChild(e);
            var defHeight = e.offsetHeight;

            changeBoxSize = function() {
                for (var key in objCN) {
                    if (objCN.hasOwnProperty(key)) {
                        //parent type
                        if (key == "parent CN") {
                            for (var i = 0; i < objCN[key].length; i++) {
                                var max_height = 0;
                                var CCN = objCN[key][i].childNodes;
                                for (var j = 0; j < CCN.length; j++) {
                                    if (CCN[j] && CCN[j].nodeType == 1) {
                                        CCN[j].style.height = "auto";
                                        max_height = max_height > CCN[j].offsetHeight ? max_height : CCN[j].offsetHeight;
                                    }
                                }
                                for (var j = 0; j < CCN.length; j++) {
                                    if (CCN[j].style) {
                                        var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
                                        var newheight = max_height;
                                        if (stylea.paddingTop) newheight -= stylea.paddingTop.replace("px", "");
                                        if (stylea.paddingBottom) newheight -= stylea.paddingBottom.replace("px", "");
                                        if (stylea.borderTopWidth && stylea.borderTopWidth != "medium") newheight -= stylea.borderTopWidth.replace("px", "");
                                        if (stylea.borderBottomWidth && stylea.borderBottomWidth != "medium") newheight -= stylea.borderBottomWidth.replace("px", "");
                                        CCN[j].style.height = newheight + "px";
                                    }
                                }
                            }
                        } else {
                            var max_height = 0;
                            for (var i = 0; i < objCN[key].length; i++) {
                                objCN[key][i].style.height = "auto";
                                max_height = max_height > objCN[key][i].offsetHeight ? max_height : objCN[key][i].offsetHeight;
                            }
                            for (var i = 0; i < objCN[key].length; i++) {
                                if (objCN[key][i].style) {
                                    var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
                                    var newheight = max_height;
                                    if (stylea.paddingTop) newheight -= stylea.paddingTop.replace("px", "");
                                    if (stylea.paddingBottom) newheight -= stylea.paddingBottom.replace("px", "");
                                    if (stylea.borderTopWidth && stylea.borderTopWidth != "medium") newheight -= stylea.borderTopWidth.replace("px", "")
                                    if (stylea.borderBottomWidth && stylea.borderBottomWidth != "medium") newheight -= stylea.borderBottomWidth.replace("px", "");
                                    objCN[key][i].style.height = newheight + "px";
                                }
                            }
                        }
                    }
                }
            }

            checkBoxSize = function() {
                if (defHeight != e.offsetHeight) {
                    changeBoxSize();
                    defHeight = e.offsetHeight;
                }
            }
            changeBoxSize();
            setInterval(checkBoxSize, 1000)
            window.onresize = changeBoxSize;
        }

        function addEvent(elm, listener, fn) {
            try {
                elm.addEventListener(listener, fn, false);
            } catch (e) {
                elm.attachEvent("on" + listener, fn);
            }
        }
        addEvent(window, "load", heightLine);
    }

}

/* 電話番号処理 -------------------------------------------------------------- */
$(function() {
    if (!isPhone())
        return;

    $('span[data-action=call]').each(function() {
        var $ele = $(this);
        $ele.wrap('<a href="tel:' + $ele.data('tel') + '"></a>');
    });
});

function isPhone() {
    return (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0);
}