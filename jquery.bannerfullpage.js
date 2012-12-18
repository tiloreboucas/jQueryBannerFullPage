(function ($) {
    $.fn.overlay = function (method) {

        var options = null;
        var methodName = '';
        var params = [];

        if (arguments.length >= 1 && typeof (arguments[0]) == 'object')
            options = arguments[0];
        else if (arguments.length >= 1 && typeof (arguments[0]) == 'string') {
            methodName = arguments[0];
            params = arguments[1];
        }

        var attr = {
            'target': null,
            'container': null,
            'mask': null,
            'opacity': '1',
            'width': 900,
            'height': 500,
            'content': null,
            'bg_url': 'none',
            'bg_color': '#000',
            'button': null,
            'button_container': null
        };

        var methods = {
            init: function (options) {
                var $this = this;

                $this.attr = $.extend(true, {}, attr, options);
                $this.attr.target = $(this);

                window.overlay = $this;

                methods.build.call($this);
            },

            HideAsideVideo: function(){
                $("#Coluna_Direita center").css({ 
                    width: "300px", 
                    height: "250px", 
                    display: "block",
                    "background-color": "#000"
                });

                $("#Coluna_Direita center iframe").hide();
            },

            ShowAsideVideo: function(){
                $("#Coluna_Direita center").removeAtrr("style");
                $("#Coluna_Direita center iframe").show();
            },

            build: function () {
                var $this = this;

                $($this.attr.target).css({
                    'overflow': 'hidden'
                }).prepend("<div id='overlay_mask'></div>").prepend("<div id='overlay_container'></div>");

                $this.attr.mask = $($this.attr.target).find('#overlay_mask');
                $this.attr.container = $($this.attr.target).find('#overlay_container');

                $($this.attr.container).prepend("<div id='overlay_button_container'></div>");
                $this.attr.button_container = $($this.attr.target).find('#overlay_button_container');

                $($this.attr.button_container).css({
                    'width': 0,
                    'height': 0,
                    'position': 'relative'
                });

                $($this.attr.button_container).prepend("<button type='button' id='overlay_button_close'></div>");
                $this.attr.button = $($this.attr.target).find('#overlay_button_close');

                $($this.attr.button).css({
                    'width': '192px',
                    'height': '26px',
                    'position': 'absolute',
                    'cursor': 'pointer',
                    'border': '0px',
                    'top': '-26px',
                    'left': '354px',
                    'background': 'transparent url(http://www.areah.com.br/images/bt_entrar_PL.gif) no-repeat center center'
                });

                $($this.attr.button).click(function () {
                    methods.remove.call($this);   
                    methods.ShowAsideVideo.call($call);      
                });

                $($this.attr.mask).css({
                    'width': $(window).width(),
                    'height': $(window).height()
                });

                $(window).resize(function () {
                    methods.reposition.call($this);
                });

                methods.stylize.call($this);
                methods.reposition.call($this);
                methods.HideAsideVideo.call($this);

                $($this.attr.container).append($this.attr.content);
            },

            stylize: function () {
                var $this = this;

                $($this.attr.mask).css({
                    'width': $(window).width(),
                    'height': $(window).height(),
                    'position': 'fixed',
                    'left': '0px',
                    'top': '0px',
                    'background-color': $this.attr.bg_color,
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center',
                    'background-image': "url(" + $this.attr.bg_url + ")",
                    'z-index': '10000',
                    'opacity': $this.attr.opacity,
                    'overflow': 'hidden'
                });

                $($this.attr.container).css({
                    'width': $this.attr.width + 'px',
                    'height': $this.attr.height + 'px',
                    'background': '#fff',
                    'z-index': '10001',
                    'position': 'fixed',
                    'visibility': 'hidden'
                });
            },

            reposition: function () {
                var $this = this;

                $($this.attr.mask).css({
                    'width': $(window).width(),
                    'height': $(window).height()
                });

                $($this.attr.container).css({
                    'left': ($(window).width() / 2) - ($($this.attr.container).width() / 2),
                    'top': ($(window).height() / 2) - ($($this.attr.container).height() / 2),
                    'visibility': 'visible'
                });
            },

            remove: function () {
                var $this = this;

                $($this.attr.mask).remove();
                $($this.attr.container).remove();

                $($this.attr.target).css({ 'overflow': 'auto' });
            }
        };

        if (methodName != '') {
            if (methods[methodName]) {
                return this.each(function () {
                    methods[methodName].call(this, params);
                });
            }
            else {
                $.error("Method '" + methodName + "' does not exist on jQuery.overlay");
                return;
            }
        }

        return this.each(function () {
            methods.init.call(this, options);
        });
    };
})(jQuery);