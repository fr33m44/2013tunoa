/*edited by fukai*/
var options;
(function($) {
	var ajaxMode=false;
	
	
	$.fn.acts_as_tree_table = function(opts) {
		options = $.extend({}, $.fn.acts_as_tree_table.defaults, opts);
		
		return this.each(function() {
			var table = $(this);
			if(table.attr("mode")=="ajax"){
				ajaxMode=true;
			}
			
			table.addClass("acts_as_tree_table");
			
			if(ajaxMode){
				
				table.children("tbody").children("tbody tr").each(function() {
					var node2 = $(this);
					
					if(node2.not(".parent") && node2.attr("url")!=null) {
						node2.addClass("parent");
					}
					
					if(node2.is(".parent")) {
						init_parent2(node2);
					}
				});	
				
					
			}
			else{
				
			table.children("tbody").children("tbody tr").each(function() {
				var node = $(this);
				
				if(node.not(".parent") && children_of(node).size() > 0) {
					node.addClass("parent");
				}
				
				if(node.is(".parent")) {
					init_parent(node);
				}
			});	
				
				
				
			}
		});
	};
	
	$.fn.acts_as_tree_table.defaults = {
		expandable: true,
		default_state: 'expanded',
		indent: 19,
		tree_column: 0
	};
	
	$.fn.collapse = function() {
  	collapse(this);
	};

	$.fn.expand = function() {
		expand(this);
	};

	$.fn.toggleBranch = function() {
		toggle(this);
	};
	
	
	
	

	function init_parent(node) {
		var cell = $(node.children("td")[options.tree_column]);

		var padding = parseInt(cell.css("padding-left")) + options.indent;
		
		children_of(node).each(function() {
			$($(this).children("td")[options.tree_column]).css("padding-left", padding + "px");
		});

		if(options.expandable) {
			cell.prepend('<span style="margin-left:0px; padding-left: ' + options.indent + 'px" class="expander"></span>');
			var expander = $(cell[0].firstChild);
			expander.click(function() { toggle(node); });
			
			if( !(node.is(".expanded") || node.is(".collapsed")) ) {
			  node.addClass(options.default_state);
			}
			
			if(node.is(".collapsed")) {
				collapse(node);
			} else if (node.is(".expanded")) {
				expand(node);
			}
		}
	};
	
	
	
})(jQuery);

function children_of(node) {
		return $("tr.child-of-" + node[0].id);
	};
function init_parent2(node){
		var cell = $(node.children("td")[0]);
		cell.prepend('<span style="margin-left:0px; padding-left: ' + options.indent + 'px" class="expander"></span>');
		var expander = $(cell[0].firstChild);
		node.addClass("collapsed");
		expander.click(function() { 
			var clickObj=$(this);
			var treeTableDataValue=node.attr("url");
			if(treeTableDataValue!=""){
				node.removeClass("collapsed");
				node.addClass("loading");
				window.setTimeout(function(){treeTableLoadLater(clickObj,treeTableDataValue);},200);
			}
			else{
				toggle(node); 
			}
		 });
		
	}
	
	function toggle(node) {
		if(node.is(".collapsed")) {
			node.removeClass("collapsed");
			node.addClass("expanded");
			expand(node);
		}
		else {
			node.removeClass("expanded");
			node.addClass("collapsed");
			collapse(node);
		}
	};
	function collapse(node) {
		children_of(node).each(function() {
			var child = $(this);

			collapse(child);

			child.hide();
		});
	};
	
	function expand(node) {
		children_of(node).each(function() {
			var child = $(this);
			
			if(child.is(".expanded.parent")) {
				expand(child);
			}
			
			child.show();
		});
	};
$(function(){
	$(".treeTable").each(function(){
			var expandable=true;
			var default_state="expanded";
			if($(this).attr("expandable")=="false"){
				expandable=false;
			}
			if($(this).attr("initState")=="collapsed"){
				default_state="collapsed";
			}
			$(this).acts_as_tree_table({
				expandable: expandable,
				default_state: default_state
			});
	})
})
function treeTableLoadLater(obj,value){
	$.ajax({
		url: value,
		error: function(){
			try {
				top.Dialog.alert("数据加载失败，请检查dataPath是否正确");
			}
			catch(e){
				alert("数据加载失败，请检查dataPath是否正确");
			}
		},
		success: function(xml){
			var $tableContent=obj.parents("tr");
			var $newTable=$(xml);
			$tableContent.after($newTable);
			$tableContent.attr("url","");
			$tableContent.removeClass("loading");
			$tableContent.addClass("expanded");
			var cell = $tableContent.find("td").eq(0);
			var padding = parseInt(cell.css("padding-left")) + options.indent;
			children_of($tableContent).each(function() {
				$($(this).children("td")[0]).css("padding-left", padding + "px");
				var node2 = $(this);
				if(node2.not(".parent") && node2.attr("url")!=null) {
					node2.addClass("parent");
				}
				
				if(node2.is(".parent")) {
					init_parent2(node2);
				}
			});
		}
	})
}
