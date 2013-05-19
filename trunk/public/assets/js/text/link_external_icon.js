/*edited by fukai */
(function(a){
    a.fn.link_external_icon=function(p){
        var p=p||{};
        var icon_path=p&&p.icon_path?p.icon_path:"link_external.png";
        var n=a(this);
        n.find("a[target='_blank']").css("padding-right","13px").css("background-image","url("+icon_path+")").css("background-repeat","no-repeat").css("background-position","center right");
    }
})(jQuery);

$(function() {
		var imgPrePath="../";
		if($("#skin").attr("prePath")!=null){
			imgPrePath=$("#skin").attr("prePath");
		}
		$("body").link_external_icon({
			icon_path:imgPrePath+"images/icons/link_external.png"
		});
	});