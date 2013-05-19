/*edit by fukai*/
$(function(){
	$('.text_break').breakly(3);
})
$.fn.breakly = function(chopAt, spaceCode) {
  spaceCode |= 8203;  // U+200B ZERO WIDTH SPACE
  var zw = String.fromCharCode(spaceCode), re = new RegExp(/\B/), orig, idx, chopped, ch;
  function breakly(node) {
    if (3 == node.nodeType && (orig = node.nodeValue).length > chopAt) {
      idx = 0;
      chopped=[];
      for (var i=0; i < orig.length; i++) {
        ch = orig.substr(i,1);
        chopped.push(ch);
        if (null != ch.match(re)) {
          idx=0;
          continue;
        }
        if (++idx == chopAt) {
          ch = orig.substr(i+1,1); // look ahead
          if (ch && null == ch.match(re)) {
            chopped.push(zw);
            idx=0;
          }
        }
      }
      node.nodeValue = chopped.join('');
    } else {
      for (var i=0; i < node.childNodes.length; i++) {
        breakly(node.childNodes[i]);
      }
    }
  }

  return this.each(function() {
    breakly(this);
  })
}


