(function($)
{
    $.fn.nestedDecimalList = function(settings)
    {
        var config = { 'trailingPeriod': false, 'numberClass': 'nesteddecimallistnumber', 'zeroStart': false };

        if (settings) $.extend(config, settings);

        this.each(function()
        {
            var t = $(this);

            t.css({ 'list-style-type': 'none' });
            t.find('ol').css({ 'list-style-type': 'none' });

            t.find('li').each(function()
            {
                var item = $(this);
                item.css({ 'position': 'relative' });

                var parent = item.parent();

                var num = new Array();
                var o = item;

                while (o.is('li'))
                {
                    num.push((o.prevAll('li').length + ((config['zeroStart']) ? 0 : 1)));
                    o = o.parent().parent();
                }

                item.prepend('<span><span class="' + config['numberClass'] + '">' + num.reverse().join('.') + ((config['trailingPeriod']) ? '.' : '') + '</span></span>');

                var span = item.find('span:first');
                var w = span.width();

                if ((w + 10) > parseInt(item.parent().css('margin-left'))) item.parent().css('margin-left', (w + 15) + 'px');

                span.css({ 'text-align': 'right', 'position': 'absolute', 'top': item.css('padding-top'), 'left': '-' + (w + 10) + 'px' });

            });
        });

        return this;
    };

})(jQuery);