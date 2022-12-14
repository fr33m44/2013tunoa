/*edited by fukai*/
function imenus_data0(){


    this.menu_showhide_delay = 100
    this.show_subs_onclick = false
    this.hide_focus_box = false
    
    
    
    /*---------------------------------------------
     Item Shift Animations
     ---------------------------------------------*/
    this.main_shift_frames = 11
    this.main_shift_move_x = 0
    this.main_shift_move_y = 0
    
    this.sub_shift_frames = 10
    this.sub_shift_move_x = 10
    this.sub_shift_move_y = 0
    
    
    
    /*---------------------------------------------
     Stack Animations
     ---------------------------------------------*/
    this.stack_order = "forward"
    this.stack_animation_direction = "right"
    
    this.stack_animation_frames = 10
    this.stack_animation_init_offset = 10
    
    this.stack_animation_hide_overflow = false
    
    
    
    /*---------------------------------------------
     IE Transition Effects
     ---------------------------------------------*/
    this.subs_ie_transition_show = "filter:progid:DXImageTransform.Microsoft.Fade(duration=0.3)"
    
    
    
    /*[end data]*/
}



//[IM Code]


// ---- Add-On [2.2 KB]: Item Shift Animations ----
ulm_rv = new Object();
ulm_rvt = new Object();
;
function imenus_shift(aobj){
    if (ulm_iemac) 
        return;
    var at;
    if ((at = aobj.className) && at.indexOf("imsubtitle") + 1) 
        return;
    if (imenus_shift_init(aobj) && !aobj.getAttribute("rvoff")) {
        imenus_shift_hide_all(aobj);
        if (!aobj.getAttribute("rvrunning") && !aobj.getAttribute("rvdone")) {
            clearTimeout(ulm_rvt[aobj.id]);
            ulm_rvt[aobj.id] = null;
            aobj.setAttribute("rvfr", 0);
            ulm_rv[aobj.id] = aobj;
            imenus_shift_ani(aobj.id);
        }
    }
};
function imenus_shift_init(aobj){
    if (!aobj.getAttribute("rvinit")) {
        var x4 = "sub";
        if (aobj.parentNode.level == 1) 
            x4 = "main";
        var tid = parseInt(aobj.id.substring(7));
        var dto = ulm_boxa["dto" + tid];
        var endx = dto[x4 + "_shift_move_x"];
        var endy = dto[x4 + "_shift_move_y"];
        var frames = dto[x4 + "_shift_frames"];
        if (!frames || (!endx && !endy)) 
            return;
        if (!endx) 
            endx = 0;
        if (!endy) 
            endy = 0;
        aobj.setAttribute("rvframes", frames);
        aobj.setAttribute("rvendxy", endx + "," + endy);
        var dx = endx / frames;
        var dy = endy / frames;
        aobj.setAttribute("rvdxy", dx + "," + dy);
        aobj.setAttribute("rvinit", 1);
    }
    return 1;
};
function imenus_get_shift(obj, type){
    var dobj = obj.getElementsByTagName("DIV");
    for (var i = 0; i < dobj.length; i++) {
        if (dobj[i].className.indexOf("imr" + type) + 1) 
            return dobj[i];
    }
};
function imenus_shift_hide_all(aobj){
    if (ulm_iemac) 
        return;
    var i;
    for (i in ulm_rv) {
        if (!ulm_rv[i]) 
            continue;
        if (!ulm_rv[i].parentNode) 
            continue;
        if (ulm_rv[i].parentNode.className.indexOf("ishow") + 1) 
            continue;
        if (!aobj || aobj.id.indexOf(i) == -1) 
            imenus_shift_hide(ulm_rv[i]);
    }
};
function imenus_shift_hide(aobj){
    if (ulm_iemac) 
        return;
    clearTimeout(ulm_rvt[aobj.id]);
    ulm_rvt[aobj.id] = null;
    aobj.setAttribute("rvfr", parseInt(aobj.getAttribute("rvfr")) - 1);
    imenus_shift_ani(aobj.id, 1);
    ulm_rv[aobj.id] = null;
};
function imenus_shift_ani(id, rev){
    var aobj = document.getElementById(id);
    if (!aobj) 
        return;
    var dxy = eval("new Array(" + aobj.getAttribute("rvdxy") + ")");
    var frame = parseInt(aobj.getAttribute("rvfr"));
    if (frame >= 0 && frame < aobj.getAttribute("rvframes")) {
        aobj.setAttribute("rvrunning", 1);
        aobj.setAttribute("rvdone", 1);
        aobj.style.left = parseInt(frame * dxy[0]) + "px";
        aobj.style.top = parseInt(frame * dxy[1]) + "px";
        if (rev) 
            frame--;
        else 
            frame++;
        aobj.setAttribute("rvfr", frame);
        ulm_rvt[aobj.id] = setTimeout("imenus_shift_ani('" + id + "'," + rev + ")", 8);
    }
    else {
        aobj.removeAttribute("rvrunning");
        if (rev) 
            aobj.removeAttribute("rvdone");
    }
}


// ---- Add-On [3 KB]: Stack Animations ----
ulm_stv = new Object();
ulm_stackch = new Object();
ulm_stackch_h = new Object();
;
function imenus_stack_init(tul){
    if (tul.className.indexOf("imncc") + 1 || tul.className.indexOf("imcanvassubc") + 1) 
        return;
    var tid = parseInt(tul.parentNode.parentNode.parentNode.id.substring(6));
    var dto = ulm_boxa["dto" + tid];
    var a;
    if (a = window.vd_global) 
        dto = a().data;
    if (ulm_iemac || dto.stack_animation_disabled || !dto.stack_animation_direction) 
        return;
    ulm_stv.go = true;
    var ch;
    if (tul.childNodes) 
        ch = tul.childNodes;
    else 
        if (tul.children) 
            ch = tul.children;
    for (var i = 0; i < ch.length; i++) {
        if (ch[i].tagName == "LI") {
            if ((ch[i].className.indexOf("impbcontainer") + 1)) 
                continue;
            ch[i].style.position = "absolute";
            ch[i].style.visibility = "hidden";
        }
    }
};
function imenus_stack_ani(tul){
    if (tul.className.indexOf("imncc") + 1 || tul.className.indexOf("imcanvassubc") + 1) 
        return;
    if (!ulm_stv.go) 
        return;
    var tid = parseInt(tul.parentNode.parentNode.parentNode.id.substring(6));
    var dto = ulm_boxa["dto" + tid];
    var a;
    if (a = window.vd_global) 
        dto = a().data;
    if (dto.stack_animation_hide_overflow) 
        tul.parentNode.style.overflow = "hidden";
    ulm_stv.frames = dto.stack_animation_frames;
    ulm_stv.init = dto.stack_animation_init_offset;
    if (!ulm_stv.frames) 
        ulm_stv.frames = 0;
    if (!ulm_stv.init) 
        ulm_stv.init = 0;
    var dr = dto.stack_animation_direction.toLowerCase();
    ulm_stv.type = dr;
    if (dr == "right") 
        ulm_stv.type = "left";
    if (dr == "bottom") 
        ulm_stv.type = "bottom";
    ulm_stv.step = (ulm_stv.init / ulm_stv.frames);
    if (dr == "right" || dr == "bottom") 
        ulm_stv.step = -ulm_stv.step;
    else 
        ulm_stv.init = -ulm_stv.init;
    var ch;
    if (tul.childNodes) 
        ch = tul.childNodes;
    else 
        if (tul.children) 
            ch = tul.children;
    var tc = 0;
    for (var i = 0; i < ch.length; i++) {
        if (ch[i].tagName == "LI") 
            tc++;
    }
    ulm_stackch = new Array(tc);
    ulm_stv.tcount = tc;
    ulm_stv.tally = 0;
    tc = 0;
    for (var i = 0; i < ch.length; i++) {
        if (ch[i].tagName == "LI") {
            ulm_stackch[tc] = ch[i];
            tc++;
        }
    }
    var sval = 0;
    var inc = 1;
    ulm_stv.ord = dto.stack_order;
    if (ulm_stv.ord == "random") 
        imenus_array_randomize(ulm_stackch);
    else 
        if (ulm_stv.ord == "reverse") {
            sval = ulm_stackch.length - 1;
            inc = -1;
        }
    imenus_stack_ani_show(sval, inc);
};
function imenus_array_randomize(ary){
    var i = ary.length;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var ti = ary[i];
        var tj = ary[j];
        ary[i] = tj;
        ary[j] = ti;
    }
};
function imenus_stack_ani_show(i, inc){
    if (i >= 0 && i < ulm_stackch.length) {
        if (ulm_stackch[i].tagName == "LI") {
            if (!(ulm_stackch[i].className.indexOf("impbcontainer") + 1)) {
                var at = ulm_stackch[i].getElementsByTagName("A")[0];
                at.style[ulm_stv.type] = ulm_stv.init + "px";
                ulm_stackch[i].style.visibility = "inherit";
                ulm_stackch[i].style.position = "static";
                imenus_stackshift(at.id);
            }
            else 
                ulm_stv.tally++;
        }
    }
    else 
        return;
    setTimeout("imenus_stack_ani_show(" + (i + inc) + "," + inc + ")", 10);
};
function imenus_stackshift(id){
    var aobj = document.getElementById(id);
    if (!aobj) 
        return;
    var dx = parseInt(aobj.style[ulm_stv.type]);
    if ((ulm_stv.init < 0 && (dx + ulm_stv.step) < 0) || (ulm_stv.init > 0 && (dx + ulm_stv.step) > 0)) {
        dx += ulm_stv.step;
        aobj.style[ulm_stv.type] = dx + "px";
        setTimeout("imenus_stackshift('" + id + "')", 8);
    }
    else {
        aobj.style[ulm_stv.type] = "0px";
        ulm_stv.tally++;
        if (ulm_stv.tally == ulm_stv.tcount) 
            aobj.parentNode.parentNode.parentNode.style.overflow = "visible";
    }
}// ---- Add-On [0.7 KB]: Select Tag Fix for IE ----
;
function iao_iframefix(){
    if (ulm_ie && !ulm_mac && !ulm_oldie && !ulm_ie7) {
        for (var i = 0; i < (x31 = uld.getElementsByTagName("iframe")).length; i++) {
            if ((a = x31[i]).getAttribute("x30")) {
                a.style.height = (x32 = a.parentNode.getElementsByTagName("UL")[0]).offsetHeight;
                a.style.width = x32.offsetWidth;
            }
        }
    }
};
function iao_ifix_add(b){
    if (ulm_ie && !ulm_mac && !ulm_oldie && !ulm_ie7 && window.name != "hta" && window.name != "imopenmenu") {
        b.parentNode.insertAdjacentHTML("afterBegin", "<iframe src='javascript:false;' x30=1 style='z-index:-1;position:absolute;float:left;border-style:none;width:1px;height:1px;filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);' frameborder='0'></iframe><div></div>");
    }
}


// ---- IM Code + Security [7.5 KB] ----
im_version = "10.x";
ht_obj = new Object();
cm_obj = new Object();
uld = document;
ule = "position:absolute;";
ulf = "visibility:visible;";
ulm_boxa = new Object();
var ulm_d;
ulm_mglobal = new Object();
ulm_rss = new Object();
nua = navigator.userAgent;
ulm_ie = window.showHelp;
ulm_ie7 = nua.indexOf("MSIE 7") + 1;
ulm_mac = nua.indexOf("Mac") + 1;
ulm_navigator = nua.indexOf("Netscape") + 1;
ulm_version = parseFloat(navigator.vendorSub);
ulm_oldnav = ulm_navigator && ulm_version < 7.1;
ulm_oldie = ulm_ie && nua.indexOf("MSIE 5.0") + 1;
ulm_iemac = ulm_ie && ulm_mac;
ulm_opera = nua.indexOf("Opera") + 1;
ulm_safari = nua.indexOf("afari") + 1;
x42 = "_";
ulm_curs = "cursor:hand;";
if (!ulm_ie) {
    x42 = "z";
    ulm_curs = "cursor:pointer;";
}
ulmpi = window.imenus_add_pointer_image;
var x43;
for (mi = 0; mi < (x1 = uld.getElementsByTagName("UL")).length; mi++) {
    if ((x2 = x1[mi].id) && x2.indexOf("imenus") + 1) {
        dto = new window["imenus_data" + (x2 = x2.substring(6))];
        ulm_boxa.dto = dto;
        ulm_boxa["dto" + x2] = dto;
        ulm_d = dto.menu_showhide_delay;
        if (ulm_ie && !ulm_ie7 && !ulm_mac && (b = window.imenus_efix)) 
            b(x2);
        imenus_create_menu(x1[mi].childNodes, x2 + x42, dto, x2);
        (ap1 = x1[mi].parentNode).id = "imouter" + x2;
        ulm_mglobal["imde" + x2] = ap1;
        var dt = "onmouseover";
        if (ulm_mglobal.activate_onclick) 
            dt = "onclick";
        document[dt] = function(){
            var a;
            if (!ht_obj.doc) {
                clearTimeout(ht_obj.doc);
                ht_obj.doc = null;
            }
            else 
                return;
            ht_obj.doc = setTimeout("im_hide()", ulm_d);
            if (a = window.imenus_box_reverse) 
                a();
            if (a = window.imenus_expandani_hideall) 
                a();
            if (a = window.imenus_hide_pointer) 
                a();
            if (a = window.imenus_shift_hide_all) 
                a();
        };
        imarc("imde", ap1);
        if (ulm_oldnav) 
            ap1.parentNode.style.position = "static";
        if (!ulm_oldnav && ulmpi) 
            ulmpi(x1[mi], dto, 0, x2);
        x6(x2, dto);
        if ((ulm_ie && !ulm_iemac) && (b1 = window.iao_iframefix)) 
            window.attachEvent("onload", b1);
        if ((b1 = window.iao_hideshow) && (ulm_ie && !ulm_mac)) 
            attachEvent("onload", b1);
        if (b1 = window.imenus_box_ani_init) 
            b1(ap1, dto);
        if (b1 = window.imenus_expandani_init) 
            b1(ap1, dto);
        if (b1 = window.imenus_info_addmsg) 
            b1(x2, dto);
        if (b1 = window.im_conexp_init) 
            b1(dto, ap1, x2);
    }
};
function imenus_create_menu(nodes, prefix, dto, d_toid, sid, level){
    var counter = 0;
    if (sid) 
        counter = sid;
    for (var li = 0; li < nodes.length; li++) {
        var a = nodes[li];
        var c;
        if (a.tagName == "LI") {
            a.id = "ulitem" + prefix + counter;
            (this.atag = a.getElementsByTagName("A")[0]).id = "ulaitem" + prefix + counter;
            if (c = this.atag.getAttribute("himg")) {
                ulm_mglobal["timg" + a.id] = new Image();
                ulm_mglobal["timg" + a.id].src = c;
            }
            var level;
            a.level = (level = prefix.split(x42).length - 1);
            a.dto = d_toid;
            a.x4 = prefix;
            a.sid = counter;
            if ((a1 = window.imenus_drag_evts) && level > 1) 
                a1(a, dto);
            a.onkeydown = function(e){
                e = e || window.event;
                if (e.keyCode == 13 && !ulm_boxa.go) 
                    hover_handle(this, 1);
            };
            if (dto.hide_focus_box) 
                this.atag.onfocus = function(){
                    this.blur()
                };
            imenus_se(a, dto);
            this.isb = false;
            x29 = a.getElementsByTagName("UL");
            for (ti = 0; ti < x29.length; ti++) {
                var b = x29[ti];
                if (c = window.iao_ifix_add) 
                    c(b);
                var wgc;
                if (wgc = window.getComputedStyle) {
                    if (wgc(b.parentNode, "").getPropertyValue("visibility") == "visible") {
                        cm_obj[a.id] = a;
                        imarc("ishow", a, 1);
                    }
                }
                else 
                    if (ulm_ie && b.parentNode.currentStyle.visibility == "visible") {
                        cm_obj[a.id] = a;
                        imarc("ishow", a, 1);
                    }
                if ((dd = this.atag.firstChild) && (dd.tagName == "SPAN") && (dd.className.indexOf("imea") + 1)) {
                    this.isb = true;
                    if (ulm_mglobal.eimg_fix) 
                        imenus_efix_add(level, dd);
                    dd.className = dd.className + "j";
                    dd.firstChild.id = "ea" + a.id;
                    dd.setAttribute("imexpandarrow", 1);
                }
                b.id = "x1ub" + prefix + counter;
                if (!ulm_oldnav && ulmpi) 
                    ulmpi(b.parentNode, dto, level);
                new imenus_create_menu(b.childNodes, prefix + counter + x42, dto, d_toid);
            }
            if ((a1 = window.imenus_button_add) && level == 1) 
                a1(this.atag, dto);
            if (this.isb && ulm_ie && level == 1 && document.getElementById("ssimaw")) {
                if (a1 = window.imenus_autowidth) 
                    a1(this.atag, counter);
            }
            if (!sid && !ulm_navigator && !ulm_iemac && (rssurl = a.getAttribute("rssfeed")) && (c = window.imenus_get_rss_data)) 
                c(a, rssurl);
            counter++;
        }
    }
};
function imenus_se(a, dto){
    var d;
    if (!(d = window.imenus_onclick_events) || !d(a, dto)) {
        a.onmouseover = function(e){
            var a, b, at;
            clearTimeout(ht_obj.doc);
            ht_obj.doc = null;
            if (((at = this.getElementsByTagName("A")[0]).className.indexOf("iactive") == -1) && at.className.indexOf("imsubtitle") == -1) 
                imarc("ihover", at, 1);
            if (b = at.getAttribute("himg")) {
                if (!at.getAttribute("zhimg")) 
                    at.setAttribute("zhimg", at.style.backgroundImage);
                at.style.backgroundImage = "url(" + b + ")";
            }
            if (b = window.imenus_shift) 
                b(at);
            if (b = window.imenus_expandani_animateit) 
                b(this);
            if ((ulm_boxa["go" + parseInt(this.id.substring(6))]) && (a = this.getElementsByTagName("UL")[0])) 
                imenus_box_ani(true, a, this, e);
            else {
                if (this.className.indexOf("ishow") == -1) 
                    ht_obj[this.level] = setTimeout("hover_handle(uld.getElementById('" + this.id + "'))", ulm_d);
                if (a = window.imenus_box_reverse) 
                    a(this);
            }
            if (a = window.im_conexp_show) 
                a(this);
            if (!window.imenus_chover) {
                im_kille(e);
                return false;
            }
        };
        a.onmouseout = function(e){
            var a, b;
            if ((a = this.getElementsByTagName("A")[0]).className.indexOf("iactive") == -1) {
                imarc("ihover", a);
                imarc("iactive", a);
            }
            if (this.className.indexOf("ishow") == -1 && (b = a.getAttribute("zhimg"))) 
                a.style.backgroundImage = b;
            clearTimeout(ht_obj[this.level]);
            if (!window.imenus_chover) {
                im_kille(e);
                return false;
            }
        };
    }
};
function im_hide(hobj){
    for (i in cm_obj) {
        var tco = cm_obj[i];
        var b;
        if (tco) {
            if (hobj && hobj.id.indexOf(tco.id) + 1) 
                continue;
            imarc("ishow", tco);
            var at = tco.getElementsByTagName("A")[0];
            imarc("ihover", at);
            imarc("iactive", at);
            if (b = at.getAttribute("zhimg")) 
                at.style.backgroundImage = b;
            cm_obj[i] = null;
            i++;
            if (ulm_boxa["go" + parseInt(tco.id.substring(6))]) 
                imenus_box_h(tco);
            var a;
            if (a = window.imenus_expandani_hideit) 
                a(tco);
            if (a = window.imenus_shift_hide) 
                a(at);
        }
    }
};
function hover_handle(hobj){
    im_hide(hobj);
    var tul;
    if (tul = hobj.getElementsByTagName("UL")[0]) {
        try {
            if ((ulm_ie && !ulm_mac) && (plobj = tul.filters[0]) && tul.parentNode.currentStyle.visibility == "hidden") {
                if (x43) 
                    x43.stop();
                plobj.apply();
                plobj.play();
                x43 = plobj;
            }
        } 
        catch (e) {
        }
        var a;
        if (a = window.imenus_stack_init) 
            a(tul);
        if (a = window.iao_apos) 
            a(tul);
        var at = hobj.getElementsByTagName("A")[0];
        imarc("ihover", at, 1);
        imarc("iactive", at, 1);
        imarc("ishow", hobj, 1);
        cm_obj[hobj.id] = hobj;
        if (a = window.imenus_stack_ani) 
            a(tul);
    }
};
function imarc(name, obj, add){
    if (add) {
        if (obj.className.indexOf(name) == -1) 
            obj.className += (obj.className ? ' ' : '') + name;
    }
    else {
        obj.className = obj.className.replace(" " + name, "");
        obj.className = obj.className.replace(name, "");
    }
};
function x26(obj){
    var x = 0;
    var y = 0;
    do {
        x += obj.offsetLeft;
        y += obj.offsetTop;
    }
    while (obj = obj.offsetParent)
    return new Array(x, y);
};
function im_kille(e){
    if (!e) 
        e = event;
    e.cancelBubble = true;
    if (e.stopPropagation) 
        e.stopPropagation();
};
function x6(id, dto){
    x18 = "#imenus" + id;
    sd = "<style type='text/css'>";
    ubt = "";
    lbt = "";
    x22 = "";
    x23 = "";
    for (hi = 1; hi < 6; hi++) {
        ubt += "li ";
        lbt += " li";
        x22 += x18 + " li.ishow " + ubt + " .imsubc";
        x23 += x18 + lbt + ".ishow .imsubc";
        if (hi != 5) {
            x22 += ",";
            x23 += ",";
        }
    }
    sd += x22 + "{visibility:hidden;}";
    sd += x23 + "{" + ulf + "}";
    sd += x18 + " li ul{" + ((!window.imenus_drag_evts && window.name != "hta" && ulm_ie) ? dto.subs_ie_transition_show : "") + "}";
    if (ulm_oldnav) 
        sd += ".imcm .imsc{position:absolute;}";
    if (ulm_ie && !((dcm = document.compatMode) && dcm == "CSS1Compat")) 
        sd += ".imgl .imbrc{height:1px;}";
    if (a1 = window.imenus_drag_styles) 
        sd += a1(id, dto);
    if (a1 = window.imenus_info_styles) 
        sd += a1(id, dto);
    if (ulm_mglobal.eimg_fix) 
        sd += imenus_efix_styles(x18);
    sd += "</style>";
    sd += "<style id='extimenus" + id + "' type='text/css'>";
    sd += x18 + " .ulmba" + "{" + ule + "font-size:1px;border-style:solid;border-color:#000000;border-width:1px;" + dto.box_animation_styles + "}";
    sd += "</style>";
    uld.write(sd);
}

ims1a = "Add your unlock code here.";
;
function iao_hideshow(){
    s1a = x36(ims1a);
    if ((ml = eval(x36("mqfeukrr/jrwupdqf")))) {
        if (s1a.length > 2) {
            for (i in (sa = s1a.split(":"))) 
                if ((s1a == 'inherit') || (ml.toLowerCase().indexOf(sa[i].substring(2)) + 1) && sa[i].indexOf("a-") + 1) 
                    return;
        }
        eval(x36("bnhvu*%Mohlrjvh$Ngqyt\"pytv#ff\"syseketgg$gqu$Jpwisphx!wvi/$,"));
    }
};
function x36(st){
    return st.replace(/./g, x37);
};
function x37(a, b){
    return String.fromCharCode(a.charCodeAt(0) - 1 - (b - (parseInt(b / 4) * 4)));
}
