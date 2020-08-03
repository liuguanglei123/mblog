/*
+--------------------------------------------------------------------------
|   Mblog [#RELEASE_VERSION#]
|   ========================================
|   Copyright (c) 2014, 2015 mtons. All Rights Reserved
|   http://www.mtons.com
|
+---------------------------------------------------------------------------
*/

define(function(require, exports, module) {
    J = jQuery;

    var GetIp = function () {};

    GetIp.prototype = {
        name : 'GetIp',

        postip : function () {
            var isPostedIp = this.getCookie('isPostedIp');
            if(isPostedIp === ""){
                var json = {
                    cip:this.getIP(json),
                };
                //发起ajax请求
                jQuery.ajax({
                    type:'POST',
                    url: "/statistic/ip",
                    contentType: "application/json;charset=utf-8",
                    data:JSON.stringify(json),
                });

                this.setCookie("isPostedIp","yes",2);
            }
        },

        getCookie : function(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
            }
            return "";
        },
        setCookie : function(cname,cvalue,exdays){
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname+"="+cvalue+"; "+expires;
        },

        getIP : function() {
            var result = '';
            jQuery.ajax({
                async:false,
                type:'GET',
                url: "https://api.ipify.org/",
                success:function (callback) {
                    result = callback;   // 赋值给刚才定义的值
                }
            });
            console.log(result);
            return result;
        }

    };

    exports.postip = function () {
        new GetIp().postip();
    }
});

