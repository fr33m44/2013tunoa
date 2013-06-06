(function ($) {
        var settings = {}, roots = {}, caches = {}, zId = 0,
            _consts = {
                event: {
                    NODECREATED: "ztree_nodeCreated",
                    CLICK: "ztree_click",
                    EXPAND: "ztree_expand",
                    COLLAPSE: "ztree_collapse",
                    ASYNC_SUCCESS: "ztree_async_success",
                    ASYNC_ERROR: "ztree_async_error"
                },
                id: {
                    A: "_a",
                    ICON: "_ico",
                    SPAN: "_span",
                    SWITCH: "_switch",
                    UL: "_ul"
                },
                line: {
                    ROOT: "root",
                    ROOTS: "roots",
                    CENTER: "center",
                    BOTTOM: "bottom",
                    NOLINE: "noline",
                    LINE: "line"
                },
                folder: {
                    OPEN: "open",
                    CLOSE: "close",
                    DOCU: "docu"
                },
                node: {
                    CURSELECTED: "curSelectedNode"
                }
            }, _setting = {
                treeId: "",
                treeObj: null,
                view: {
                    addDiyDom: null,
                    autoCancelSelected: true,
                    dblClickExpand: true,
                    expandSpeed: "fast",
                    fontCss: {},
                    nameIsHTML: false,
                    selectedMulti: false,
                    showIcon: true,
                    showLine: true,
                    showTitle: true
                },
                data: {
                    key: {
                        children: "children",
                        name: "name",
                        title: "title"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: null
                    },
                    keep: {
                        parent: false,
                        leaf: false
                    }
                },
                async: {
                    enable: false,
                    contentType: "application/x-www-form-urlencoded",
                    type: "post",
                    dataType: "text",
                    dataName: null,
                    url: "",
                    autoParam: [],
                    otherParam: {},
                    dataFilter: null
                },
                callback: {
                    beforeAsync: null,
                    beforeClick: null,
                    beforeRightClick: null,
                    beforeMouseDown: null,
                    beforeMouseUp: null,
                    beforeExpand: null,
                    beforeCollapse: null,
                    onAsyncError: null,
                    onAsyncSuccess: null,
                    onNodeCreated: null,
                    onClick: null,
                    onRightClick: null,
                    onMouseDown: null,
                    onMouseUp: null,
                    onExpand: null,
                    onCollapse: null
                }
            }, _initRoot = function (setting) {
                var r = data.getRoot(setting);
                if (!r) {
                    r = {};
                    data.setRoot(setting, r)
                }
                r.children = [];
                r.expandTriggerFlag = false;
                r.curSelectedList = [];
                r.noSelection = true;
                r.createdNodes = []
            }, _initCache = function (setting) {
                var c = data.getCache(setting);
                if (!c) {
                    c = {};
                    data.setCache(setting, c)
                }
                c.nodes = [];
                c.doms = []
            }, _bindEvent = function (setting) {
                var o = setting.treeObj,
                    c = consts.event;
                o.unbind(c.NODECREATED);
                o.bind(c.NODECREATED, function (event, treeId, node) {
                        tools.apply(setting.callback.onNodeCreated, [event, treeId, node])
                    });
                o.unbind(c.CLICK);
                o.bind(c.CLICK, function (event, treeId, node, clickFlag) {
                        tools.apply(setting.callback.onClick, [event, treeId, node, clickFlag])
                    });
                o.unbind(c.EXPAND);
                o.bind(c.EXPAND, function (event, treeId, node) {
                        tools.apply(setting.callback.onExpand, [event, treeId, node])
                    });
                o.unbind(c.COLLAPSE);
                o.bind(c.COLLAPSE, function (event, treeId, node) {
                        tools.apply(setting.callback.onCollapse, [event, treeId, node])
                    });
                o.unbind(c.ASYNC_SUCCESS);
                o.bind(c.ASYNC_SUCCESS, function (event, treeId, node, msg) {
                        tools.apply(setting.callback.onAsyncSuccess, [event, treeId, node, msg])
                    });
                o.unbind(c.ASYNC_ERROR);
                o.bind(c.ASYNC_ERROR, function (event, treeId, node, XMLHttpRequest, textStatus, errorThrown) {
                        tools.apply(setting.callback.onAsyncError, [event, treeId, node, XMLHttpRequest, textStatus, errorThrown])
                    })
            }, _eventProxy = function (event) {
                var target = event.target,
                    setting = settings[event.data.treeId],
                    tId = "",
                    node = null,
                    nodeEventType = "",
                    treeEventType = "",
                    nodeEventCallback = null,
                    treeEventCallback = null,
                    tmp = null;
                if (tools.eqs(event.type, "mousedown")) {
                    treeEventType = "mousedown"
                } else {
                    if (tools.eqs(event.type, "mouseup")) {
                        treeEventType = "mouseup"
                    } else {
                        if (tools.eqs(event.type, "contextmenu")) {
                            treeEventType = "contextmenu"
                        } else {
                            if (tools.eqs(event.type, "click")) {
                                if (tools.eqs(target.tagName, "button")) {
                                    target.blur()
                                }
                                if (tools.eqs(target.tagName, "button") && target.getAttribute("treeNode" + consts.id.SWITCH) !== null) {
                                    tId = target.parentNode.id;
                                    nodeEventType = "switchNode"
                                } else {
                                    tmp = tools.getMDom(setting, target, [{
                                                tagName: "a",
                                                attrName: "treeNode" + consts.id.A
                                            }
                                        ]);
                                    if (tmp) {
                                        tId = tmp.parentNode.id;
                                        nodeEventType = "clickNode"
                                    }
                                }
                            } else {
                                if (tools.eqs(event.type, "dblclick")) {
                                    treeEventType = "dblclick";
                                    tmp = tools.getMDom(setting, target, [{
                                                tagName: "a",
                                                attrName: "treeNode" + consts.id.A
                                            }
                                        ]);
                                    if (tmp) {
                                        tId = tmp.parentNode.id;
                                        nodeEventType = "switchNode"
                                    }
                                }
                            }
                        }
                    }
                } if (treeEventType.length > 0 && tId.length == 0) {
                    tmp = tools.getMDom(setting, target, [{
                                tagName: "a",
                                attrName: "treeNode" + consts.id.A
                            }
                        ]);
                    if (tmp) {
                        tId = tmp.parentNode.id
                    }
                }
                if (tId.length > 0) {
                    node = data.getNodeCache(setting, tId);
                    switch (nodeEventType) {
                    case "switchNode":
                        if (!node.isParent) {
                            nodeEventType = ""
                        } else {
                            if (tools.eqs(event.type, "click") || (tools.eqs(event.type, "dblclick") && tools.apply(setting.view.dblClickExpand, [setting.treeId, node], setting.view.dblClickExpand))) {
                                nodeEventCallback = handler.onSwitchNode
                            } else {
                                nodeEventType = ""
                            }
                        }
                        break;
                    case "clickNode":
                        nodeEventCallback = handler.onClickNode;
                        break
                    }
                }
                switch (treeEventType) {
                case "mousedown":
                    treeEventCallback = handler.onZTreeMousedown;
                    break;
                case "mouseup":
                    treeEventCallback = handler.onZTreeMouseup;
                    break;
                case "dblclick":
                    treeEventCallback = handler.onZTreeDblclick;
                    break;
                case "contextmenu":
                    treeEventCallback = handler.onZTreeContextmenu;
                    break
                }
                var proxyResult = {
                    stop: false,
                    node: node,
                    nodeEventType: nodeEventType,
                    nodeEventCallback: nodeEventCallback,
                    treeEventType: treeEventType,
                    treeEventCallback: treeEventCallback
                };
                return proxyResult
            }, _initNode = function (setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
                if (!n) {
                    return
                }
                var childKey = setting.data.key.children;
                n.level = level;
                n.tId = setting.treeId + "_" + (++zId);
                n.parentTId = parentNode ? parentNode.tId : null;
                if (n[childKey] && n[childKey].length > 0) {
                    if (typeof n.open == "string") {
                        n.open = tools.eqs(n.open, "true")
                    }
                    n.open = !! n.open;
                    n.isParent = true;
                    n.zAsync = true
                } else {
                    n.open = false;
                    if (typeof n.isParent == "string") {
                        n.isParent = tools.eqs(n.isParent, "true")
                    }
                    n.isParent = !! n.isParent;
                    n.zAsync = !n.isParent
                }
                n.isFirstNode = isFirstNode;
                n.isLastNode = isLastNode;
                n.getParentNode = function () {
                    return data.getNodeCache(setting, n.parentTId)
                };
                n.getPreNode = function () {
                    return data.getPreNode(setting, n)
                };
                n.getNextNode = function () {
                    return data.getNextNode(setting, n)
                };
                n.isAjaxing = false;
                data.fixPIdKeyValue(setting, n)
            }, _init = {
                bind: [_bindEvent],
                caches: [_initCache],
                nodes: [_initNode],
                proxys: [_eventProxy],
                roots: [_initRoot],
                beforeA: [],
                afterA: [],
                innerBeforeA: [],
                innerAfterA: [],
                zTreeTools: []
            }, data = {
                addNodeCache: function (setting, node) {
                    data.getCache(setting).nodes[node.tId] = node
                },
                addAfterA: function (afterA) {
                    _init.afterA.push(afterA)
                },
                addBeforeA: function (beforeA) {
                    _init.beforeA.push(beforeA)
                },
                addInnerAfterA: function (innerAfterA) {
                    _init.innerAfterA.push(innerAfterA)
                },
                addInnerBeforeA: function (innerBeforeA) {
                    _init.innerBeforeA.push(innerBeforeA)
                },
                addInitBind: function (bindEvent) {
                    _init.bind.push(bindEvent)
                },
                addInitCache: function (initCache) {
                    _init.caches.push(initCache)
                },
                addInitNode: function (initNode) {
                    _init.nodes.push(initNode)
                },
                addInitProxy: function (initProxy) {
                    _init.proxys.push(initProxy)
                },
                addInitRoot: function (initRoot) {
                    _init.roots.push(initRoot)
                },
                addNodesData: function (setting, parentNode, nodes) {
                    var childKey = setting.data.key.children;
                    if (!parentNode[childKey]) {
                        parentNode[childKey] = []
                    }
                    if (parentNode[childKey].length > 0) {
                        parentNode[childKey][parentNode[childKey].length - 1].isLastNode = false;
                        view.setNodeLineIcos(setting, parentNode[childKey][parentNode[childKey].length - 1])
                    }
                    parentNode.isParent = true;
                    parentNode[childKey] = parentNode[childKey].concat(nodes)
                },
                addSelectedNode: function (setting, node) {
                    var root = data.getRoot(setting);
                    if (!data.isSelectedNode(setting, node)) {
                        root.curSelectedList.push(node)
                    }
                },
                addCreatedNode: function (setting, node) {
                    if ( !! setting.callback.onNodeCreated || !! setting.view.addDiyDom) {
                        var root = data.getRoot(setting);
                        root.createdNodes.push(node)
                    }
                },
                addZTreeTools: function (zTreeTools) {
                    _init.zTreeTools.push(zTreeTools)
                },
                exSetting: function (s) {
                    $.extend(true, _setting, s)
                },
                fixPIdKeyValue: function (setting, node) {
                    if (setting.data.simpleData.enable) {
                        node[setting.data.simpleData.pIdKey] = node.parentTId ? node.getParentNode()[setting.data.simpleData.idKey] : setting.data.simpleData.rootPId
                    }
                },
                getAfterA: function (setting, node, array) {
                    for (var i = 0, j = _init.afterA.length; i < j; i++) {
                        _init.afterA[i].apply(this, arguments)
                    }
                },
                getBeforeA: function (setting, node, array) {
                    for (var i = 0, j = _init.beforeA.length; i < j; i++) {
                        _init.beforeA[i].apply(this, arguments)
                    }
                },
                getInnerAfterA: function (setting, node, array) {
                    for (var i = 0, j = _init.innerAfterA.length; i < j; i++) {
                        _init.innerAfterA[i].apply(this, arguments)
                    }
                },
                getInnerBeforeA: function (setting, node, array) {
                    for (var i = 0, j = _init.innerBeforeA.length; i < j; i++) {
                        _init.innerBeforeA[i].apply(this, arguments)
                    }
                },
                getCache: function (setting) {
                    return caches[setting.treeId]
                },
                getNextNode: function (setting, node) {
                    if (!node) {
                        return null
                    }
                    var childKey = setting.data.key.children,
                        p = node.parentTId ? node.getParentNode() : data.getRoot(setting);
                    if (node.isLastNode) {
                        return null
                    } else {
                        if (node.isFirstNode) {
                            return p[childKey][1]
                        } else {
                            for (var i = 1, l = p[childKey].length - 1; i < l; i++) {
                                if (p[childKey][i] === node) {
                                    return p[childKey][i + 1]
                                }
                            }
                        }
                    }
                    return null
                },
                getNodeByParam: function (setting, nodes, key, value) {
                    if (!nodes || !key) {
                        return null
                    }
                    var childKey = setting.data.key.children;
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (nodes[i][key] == value) {
                            return nodes[i]
                        }
                        var tmp = data.getNodeByParam(setting, nodes[i][childKey], key, value);
                        if (tmp) {
                            return tmp
                        }
                    }
                    return null
                },
                getNodeCache: function (setting, tId) {
                    if (!tId) {
                        return null
                    }
                    var n = caches[setting.treeId].nodes[tId];
                    return n ? n : null
                },
                getNodes: function (setting) {
                    return data.getRoot(setting)[setting.data.key.children]
                },
                getNodesByParam: function (setting, nodes, key, value) {
                    if (!nodes || !key) {
                        return []
                    }
                    var childKey = setting.data.key.children,
                        result = [];
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (nodes[i][key] == value) {
                            result.push(nodes[i])
                        }
                        result = result.concat(data.getNodesByParam(setting, nodes[i][childKey], key, value))
                    }
                    return result
                },
                getNodesByParamFuzzy: function (setting, nodes, key, value) {
                    if (!nodes || !key) {
                        return []
                    }
                    var childKey = setting.data.key.children,
                        result = [];
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        if (typeof nodes[i][key] == "string" && nodes[i][key].indexOf(value) > -1) {
                            result.push(nodes[i])
                        }
                        result = result.concat(data.getNodesByParamFuzzy(setting, nodes[i][childKey], key, value))
                    }
                    return result
                },
                getPreNode: function (setting, node) {
                    if (!node) {
                        return null
                    }
                    var childKey = setting.data.key.children,
                        p = node.parentTId ? node.getParentNode() : data.getRoot(setting);
                    if (node.isFirstNode) {
                        return null
                    } else {
                        if (node.isLastNode) {
                            return p[childKey][p[childKey].length - 2]
                        } else {
                            for (var i = 1, l = p[childKey].length - 1; i < l; i++) {
                                if (p[childKey][i] === node) {
                                    return p[childKey][i - 1]
                                }
                            }
                        }
                    }
                    return null
                },
                getRoot: function (setting) {
                    return setting ? roots[setting.treeId] : null
                },
                getSetting: function (treeId) {
                    return settings[treeId]
                },
                getSettings: function () {
                    return settings
                },
                getTitleKey: function (setting) {
                    return setting.data.key.title === "" ? setting.data.key.name : setting.data.key.title
                },
                getZTreeTools: function (treeId) {
                    var r = this.getRoot(this.getSetting(treeId));
                    return r ? r.treeTools : null
                },
                initCache: function (setting) {
                    for (var i = 0, j = _init.caches.length; i < j; i++) {
                        _init.caches[i].apply(this, arguments)
                    }
                },
                initNode: function (setting, level, node, parentNode, preNode, nextNode) {
                    for (var i = 0, j = _init.nodes.length; i < j; i++) {
                        _init.nodes[i].apply(this, arguments)
                    }
                },
                initRoot: function (setting) {
                    for (var i = 0, j = _init.roots.length; i < j; i++) {
                        _init.roots[i].apply(this, arguments)
                    }
                },
                isSelectedNode: function (setting, node) {
                    var root = data.getRoot(setting);
                    for (var i = 0, j = root.curSelectedList.length; i < j; i++) {
                        if (node === root.curSelectedList[i]) {
                            return true
                        }
                    }
                    return false
                },
                removeNodeCache: function (setting, node) {
                    var childKey = setting.data.key.children;
                    if (node[childKey]) {
                        for (var i = 0, l = node[childKey].length; i < l; i++) {
                            arguments.callee(setting, node[childKey][i])
                        }
                    }
                    delete data.getCache(setting).nodes[node.tId]
                },
                removeSelectedNode: function (setting, node) {
                    var root = data.getRoot(setting);
                    for (var i = 0, j = root.curSelectedList.length; i < j; i++) {
                        if (node === root.curSelectedList[i] || !data.getNodeCache(setting, root.curSelectedList[i].tId)) {
                            root.curSelectedList.splice(i, 1);
                            i--;
                            j--
                        }
                    }
                },
                setCache: function (setting, cache) {
                    caches[setting.treeId] = cache
                },
                setRoot: function (setting, root) {
                    roots[setting.treeId] = root
                },
                setZTreeTools: function (setting, zTreeTools) {
                    for (var i = 0, j = _init.zTreeTools.length; i < j; i++) {
                        _init.zTreeTools[i].apply(this, arguments)
                    }
                },
                transformToArrayFormat: function (setting, nodes) {
                    if (!nodes) {
                        return []
                    }
                    var childKey = setting.data.key.children,
                        r = [];
                    if (tools.isArray(nodes)) {
                        for (var i = 0, l = nodes.length; i < l; i++) {
                            r.push(nodes[i]);
                            if (nodes[i][childKey]) {
                                r = r.concat(data.transformToArrayFormat(setting, nodes[i][childKey]))
                            }
                        }
                    } else {
                        r.push(nodes);
                        if (nodes[childKey]) {
                            r = r.concat(data.transformToArrayFormat(setting, nodes[childKey]))
                        }
                    }
                    return r
                },
                transformTozTreeFormat: function (setting, sNodes) {
                    var i, l, key = setting.data.simpleData.idKey,
                        parentKey = setting.data.simpleData.pIdKey,
                        childKey = setting.data.key.children;
                    if (!key || key == "" || !sNodes) {
                        return []
                    }
                    if (tools.isArray(sNodes)) {
                        var r = [];
                        var tmpMap = [];
                        for (i = 0, l = sNodes.length; i < l; i++) {
                            tmpMap[sNodes[i][key]] = sNodes[i]
                        }
                        for (i = 0, l = sNodes.length; i < l; i++) {
                            if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                                if (!tmpMap[sNodes[i][parentKey]][childKey]) {
                                    tmpMap[sNodes[i][parentKey]][childKey] = []
                                }
                                tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
                            } else {
                                r.push(sNodes[i])
                            }
                        }
                        return r
                    } else {
                        return [sNodes]
                    }
                }
            }, event = {
                bindEvent: function (setting) {
                    for (var i = 0, j = _init.bind.length; i < j; i++) {
                        _init.bind[i].apply(this, arguments)
                    }
                },
                bindTree: function (setting) {
                    var eventParam = {
                        treeId: setting.treeId
                    }, o = setting.treeObj;
                    o.unbind("click", event.proxy);
                    o.bind("click", eventParam, event.proxy);
                    o.unbind("dblclick", event.proxy);
                    o.bind("dblclick", eventParam, event.proxy);
                    o.unbind("mouseover", event.proxy);
                    o.bind("mouseover", eventParam, event.proxy);
                    o.unbind("mouseout", event.proxy);
                    o.bind("mouseout", eventParam, event.proxy);
                    o.unbind("mousedown", event.proxy);
                    o.bind("mousedown", eventParam, event.proxy);
                    o.unbind("mouseup", event.proxy);
                    o.bind("mouseup", eventParam, event.proxy);
                    o.unbind("contextmenu", event.proxy);
                    o.bind("contextmenu", eventParam, event.proxy)
                },
                doProxy: function (e) {
                    var results = [];
                    for (var i = 0, j = _init.proxys.length; i < j; i++) {
                        var proxyResult = _init.proxys[i].apply(this, arguments);
                        results.push(proxyResult);
                        if (proxyResult.stop) {
                            break
                        }
                    }
                    return results
                },
                proxy: function (e) {
                    var setting = data.getSetting(e.data.treeId);
                    if (!tools.uCanDo(setting, e)) {
                        return true
                    }
                    var results = event.doProxy(e),
                        r = true,
                        x = false;
                    for (var i = 0, l = results.length; i < l; i++) {
                        var proxyResult = results[i];
                        if (proxyResult.nodeEventCallback) {
                            x = true;
                            r = proxyResult.nodeEventCallback.apply(proxyResult, [e, proxyResult.node]) && r
                        }
                        if (proxyResult.treeEventCallback) {
                            x = true;
                            r = proxyResult.treeEventCallback.apply(proxyResult, [e, proxyResult.node]) && r
                        }
                    }
                    try {
                        if (x && $("input:focus").length == 0) {
                            tools.noSel(setting)
                        }
                    } catch (e) {}
                    return r
                }
            }, handler = {
                onSwitchNode: function (event, node) {
                    var setting = settings[event.data.treeId];
                    if (node.open) {
                        if (tools.apply(setting.callback.beforeCollapse, [setting.treeId, node], true) == false) {
                            return true
                        }
                        data.getRoot(setting).expandTriggerFlag = true;
                        view.switchNode(setting, node)
                    } else {
                        if (tools.apply(setting.callback.beforeExpand, [setting.treeId, node], true) == false) {
                            return true
                        }
                        data.getRoot(setting).expandTriggerFlag = true;
                        view.switchNode(setting, node)
                    }
                    return true
                },
                onClickNode: function (event, node) {
                    var setting = settings[event.data.treeId],
                        clickFlag = ((setting.view.autoCancelSelected && event.ctrlKey) && data.isSelectedNode(setting, node)) ? 0 : (setting.view.autoCancelSelected && event.ctrlKey && setting.view.selectedMulti) ? 2 : 1;
                    if (tools.apply(setting.callback.beforeClick, [setting.treeId, node, clickFlag], true) == false) {
                        return true
                    }
                    if (clickFlag === 0) {
                        view.cancelPreSelectedNode(setting, node)
                    } else {
                        view.selectNode(setting, node, clickFlag === 2)
                    }
                    setting.treeObj.trigger(consts.event.CLICK, [setting.treeId, node, clickFlag]);
                    return true
                },
                onZTreeMousedown: function (event, node) {
                    var setting = settings[event.data.treeId];
                    if (tools.apply(setting.callback.beforeMouseDown, [setting.treeId, node], true)) {
                        tools.apply(setting.callback.onMouseDown, [event, setting.treeId, node])
                    }
                    return true
                },
                onZTreeMouseup: function (event, node) {
                    var setting = settings[event.data.treeId];
                    if (tools.apply(setting.callback.beforeMouseUp, [setting.treeId, node], true)) {
                        tools.apply(setting.callback.onMouseUp, [event, setting.treeId, node])
                    }
                    return true
                },
                onZTreeDblclick: function (event, node) {
                    var setting = settings[event.data.treeId];
                    if (tools.apply(setting.callback.beforeDblClick, [setting.treeId, node], true)) {
                        tools.apply(setting.callback.onDblClick, [event, setting.treeId, node])
                    }
                    return true
                },
                onZTreeContextmenu: function (event, node) {
                    var setting = settings[event.data.treeId];
                    if (tools.apply(setting.callback.beforeRightClick, [setting.treeId, node], true)) {
                        tools.apply(setting.callback.onRightClick, [event, setting.treeId, node])
                    }
                    return (typeof setting.callback.onRightClick) != "function"
                }
            }, tools = {
                apply: function (fun, param, defaultValue) {
                    if ((typeof fun) == "function") {
                        return fun.apply(zt, param ? param : [])
                    }
                    return defaultValue
                },
                canAsync: function (setting, node) {
                    var childKey = setting.data.key.children;
                    return (node && node.isParent && !(node.zAsync || (node[childKey] && node[childKey].length > 0)))
                },
                clone: function (jsonObj) {
                    var buf;
                    if (jsonObj instanceof Array) {
                        buf = [];
                        var i = jsonObj.length;
                        while (i--) {
                            buf[i] = arguments.callee(jsonObj[i])
                        }
                        return buf
                    } else {
                        if (typeof jsonObj == "function") {
                            return jsonObj
                        } else {
                            if (jsonObj instanceof Object) {
                                buf = {};
                                for (var k in jsonObj) {
                                    buf[k] = arguments.callee(jsonObj[k])
                                }
                                return buf
                            } else {
                                return jsonObj
                            }
                        }
                    }
                },
                eqs: function (str1, str2) {
                    return str1.toLowerCase() === str2.toLowerCase()
                },
                isArray: function (arr) {
                    return Object.prototype.toString.apply(arr) === "[object Array]"
                },
                getMDom: function (setting, curDom, targetExpr) {
                    if (!curDom) {
                        return null
                    }
                    while (curDom && curDom.id !== setting.treeId) {
                        for (var i = 0, l = targetExpr.length; curDom.tagName && i < l; i++) {
                            if (tools.eqs(curDom.tagName, targetExpr[i].tagName) && curDom.getAttribute(targetExpr[i].attrName) !== null) {
                                return curDom
                            }
                        }
                        curDom = curDom.parentNode
                    }
                    return null
                },
                noSel: function (setting) {
                    var r = data.getRoot(setting);
                    if (r.noSelection) {
                        try {
                            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
                        } catch (e) {}
                    }
                },
                uCanDo: function (setting, e) {
                    return true
                }
            }, view = {
                addNodes: function (setting, parentNode, newNodes, isSilent) {
                    if (setting.data.keep.leaf && parentNode && !parentNode.isParent) {
                        return
                    }
                    if (!tools.isArray(newNodes)) {
                        newNodes = [newNodes]
                    }
                    if (setting.data.simpleData.enable) {
                        newNodes = data.transformTozTreeFormat(setting, newNodes)
                    }
                    if (parentNode) {
                        var target_switchObj = $("#" + parentNode.tId + consts.id.SWITCH),
                            target_icoObj = $("#" + parentNode.tId + consts.id.ICON),
                            target_ulObj = $("#" + parentNode.tId + consts.id.UL);
                        if (!parentNode.open) {
                            view.replaceSwitchClass(parentNode, target_switchObj, consts.folder.CLOSE);
                            view.replaceIcoClass(parentNode, target_icoObj, consts.folder.CLOSE);
                            parentNode.open = false;
                            target_ulObj.css({
                                    display: "none"
                                })
                        }
                        data.addNodesData(setting, parentNode, newNodes);
                        view.createNodes(setting, parentNode.level + 1, newNodes, parentNode);
                        if (!isSilent) {
                            view.expandCollapseParentNode(setting, parentNode, true)
                        }
                    } else {
                        data.addNodesData(setting, data.getRoot(setting), newNodes);
                        view.createNodes(setting, 0, newNodes, null)
                    }
                },
                appendNodes: function (setting, level, nodes, parentNode, initFlag, openFlag) {
                    if (!nodes) {
                        return []
                    }
                    var html = [],
                        childKey = setting.data.key.children,
                        nameKey = setting.data.key.name,
                        titleKey = data.getTitleKey(setting);
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        var node = nodes[i],
                            tmpPNode = (parentNode) ? parentNode : data.getRoot(setting),
                            tmpPChild = tmpPNode[childKey],
                            isFirstNode = ((tmpPChild.length == nodes.length) && (i == 0)),
                            isLastNode = (i == (nodes.length - 1));
                        if (initFlag) {
                            data.initNode(setting, level, node, parentNode, isFirstNode, isLastNode, openFlag);
                            data.addNodeCache(setting, node)
                        }
                        var childHtml = [];
                        if (node[childKey] && node[childKey].length > 0) {
                            childHtml = view.appendNodes(setting, level + 1, node[childKey], node, initFlag, openFlag && node.open)
                        }
                        if (openFlag) {
                            var url = view.makeNodeUrl(setting, node),
                                fontcss = view.makeNodeFontCss(setting, node),
                                fontStyle = [];
                            for (var f in fontcss) {
                                fontStyle.push(f, ":", fontcss[f], ";")
                            }
                            html.push("<li id='", node.tId, "' class='level", node.level, "' treenode>", "<button type='button' hidefocus='true'", (node.isParent ? "" : "disabled"), " id='", node.tId, consts.id.SWITCH, "' title='' class='", view.makeNodeLineClass(setting, node), "' treeNode", consts.id.SWITCH, "></button>");
                            data.getBeforeA(setting, node, html);
                            html.push("<a id='", node.tId, consts.id.A, "' class='level", node.level, "' treeNode", consts.id.A, ' onclick="', (node.click || ""), '" ', ((url != null && url.length > 0) ? "href='" + url + "'" : ""), " target='", view.makeNodeTarget(node), "' style='", fontStyle.join(""), "'");
                            if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle) && node[titleKey]) {
                                html.push("title='", node[titleKey].replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'")
                            }
                            html.push(">");
                            data.getInnerBeforeA(setting, node, html);
                            var name = setting.view.nameIsHTML ? node[nameKey] : node[nameKey].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            html.push("<button type='button' hidefocus='true' id='", node.tId, consts.id.ICON, "' title='' treeNode", consts.id.ICON, " class='", view.makeNodeIcoClass(setting, node), "' style='", view.makeNodeIcoStyle(setting, node), "'></button><span id='", node.tId, consts.id.SPAN, "'>", name, "</span>");
                            data.getInnerAfterA(setting, node, html);
                            html.push("</a>");
                            data.getAfterA(setting, node, html);
                            if (node.isParent && node.open) {
                                view.makeUlHtml(setting, node, html, childHtml.join(""))
                            }
                            html.push("</li>");
                            data.addCreatedNode(setting, node)
                        }
                    }
                    return html
                },
                appendParentULDom: function (setting, node) {
                    var html = [],
                        nObj = $("#" + node.tId),
                        ulObj = $("#" + node.tId + consts.id.UL),
                        childKey = setting.data.key.children,
                        childHtml = view.appendNodes(setting, node.level + 1, node[childKey], node, false, true);
                    view.makeUlHtml(setting, node, html, childHtml.join(""));
                    if (!nObj.get(0) && !! node.parentTId) {
                        view.appendParentULDom(setting, node.getParentNode());
                        nObj = $("#" + node.tId)
                    }
                    if (ulObj.get(0)) {
                        ulObj.remove()
                    }
                    nObj.append(html.join(""));
                    view.createNodeCallback(setting)
                },
                asyncNode: function (setting, node, isSilent, callback) {
                    var i, l;
                    if (node && !node.isParent) {
                        tools.apply(callback);
                        return false
                    } else {
                        if (node && node.isAjaxing) {
                            return false
                        } else {
                            if (tools.apply(setting.callback.beforeAsync, [setting.treeId, node], true) == false) {
                                tools.apply(callback);
                                return false
                            }
                        }
                    } if (node) {
                        node.isAjaxing = true;
                        var icoObj = $("#" + node.tId + consts.id.ICON);
                        icoObj.attr({
                                style: "",
                                "class": "ico_loading"
                            })
                    }
                    var isJson = (setting.async.contentType == "application/json"),
                        tmpParam = isJson ? "{" : "",
                        jTemp = "";
                    for (i = 0, l = setting.async.autoParam.length; node && i < l; i++) {
                        var pKey = setting.async.autoParam[i].split("="),
                            spKey = pKey;
                        if (pKey.length > 1) {
                            spKey = pKey[1];
                            pKey = pKey[0]
                        }
                        if (isJson) {
                            jTemp = (typeof node[pKey] == "string") ? '"' : "";
                            tmpParam += '"' + spKey + ('":' + jTemp + node[pKey]).replace(/'/g, "\\'") + jTemp + ","
                        } else {
                            tmpParam += spKey + ("=" + node[pKey]).replace(/&/g, "%26") + "&"
                        }
                    }
                    if (tools.isArray(setting.async.otherParam)) {
                        for (i = 0, l = setting.async.otherParam.length; i < l; i += 2) {
                            if (isJson) {
                                jTemp = (typeof setting.async.otherParam[i + 1] == "string") ? '"' : "";
                                tmpParam += '"' + setting.async.otherParam[i] + ('":' + jTemp + setting.async.otherParam[i + 1]).replace(/'/g, "\\'") + jTemp + ","
                            } else {
                                tmpParam += setting.async.otherParam[i] + ("=" + setting.async.otherParam[i + 1]).replace(/&/g, "%26") + "&"
                            }
                        }
                    } else {
                        for (var p in setting.async.otherParam) {
                            if (isJson) {
                                jTemp = (typeof setting.async.otherParam[p] == "string") ? '"' : "";
                                tmpParam += '"' + p + ('":' + jTemp + setting.async.otherParam[p]).replace(/'/g, "\\'") + jTemp + ","
                            } else {
                                tmpParam += p + ("=" + setting.async.otherParam[p]).replace(/&/g, "%26") + "&"
                            }
                        }
                    } if (tmpParam.length > 1) {
                        tmpParam = tmpParam.substring(0, tmpParam.length - 1)
                    }
                    if (isJson) {
                        tmpParam += "}"
                    }
                    $.ajax({
                            contentType: setting.async.contentType,
                            type: setting.async.type,
                            url: tools.apply(setting.async.url, [setting.treeId, node], setting.async.url),
                            data: tmpParam,
                            dataType: setting.async.dataType,
                            success: function (msg) {
                                var newNodes = [];
                                try {
                                    if (!msg || msg.length == 0) {
                                        newNodes = []
                                    }
                                    if (setting.async.dataName) {
                                        if (typeof msg == "string") {
                                            newNodes = eval("(" + msg + ")")[setting.async.dataName]
                                        } else {
                                            newNodes = msg[setting.async.dataName]
                                        }
                                    } else {
                                        if (typeof msg == "string") {
                                            newNodes = eval("(" + msg + ")")
                                        } else {
                                            newNodes = msg
                                        }
                                    }
                                } catch (err) {}
                                if (node) {
                                    node.isAjaxing = null;
                                    node.zAsync = true
                                }
                                view.setNodeLineIcos(setting, node);
                                if (setting.async.dataFilter && newNodes && newNodes != "") {
                                    newNodes = tools.apply(setting.async.dataFilter, [setting.treeId, node, newNodes], newNodes)
                                }
                                if (newNodes && newNodes != "") {
                                    view.addNodes(setting, node, tools.clone(newNodes), !! isSilent)
                                } else {
                                    view.addNodes(setting, node, [], !! isSilent)
                                }
                                setting.treeObj.trigger(consts.event.ASYNC_SUCCESS, [setting.treeId, node, msg]);
                                tools.apply(callback)
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                view.setNodeLineIcos(setting, node);
                                if (node) {
                                    node.isAjaxing = null
                                }
                                setting.treeObj.trigger(consts.event.ASYNC_ERROR, [setting.treeId, node, XMLHttpRequest, textStatus, errorThrown])
                            }
                        });
                    return true
                },
                cancelPreSelectedNode: function (setting, node) {
                    var list = data.getRoot(setting).curSelectedList;
                    for (var i = 0, j = list.length - 1; j >= i; j--) {
                        if (!node || node === list[j]) {
                            $("#" + list[j].tId + consts.id.A).removeClass(consts.node.CURSELECTED);
                            view.setNodeName(setting, list[j]);
                            if (node) {
                                data.removeSelectedNode(setting, node);
                                break
                            }
                        }
                    }
                    if (!node) {
                        data.getRoot(setting).curSelectedList = []
                    }
                },
                createNodeCallback: function (setting) {
                    if ( !! setting.callback.onNodeCreated || !! setting.view.addDiyDom) {
                        var root = data.getRoot(setting);
                        while (root.createdNodes.length > 0) {
                            var node = root.createdNodes.shift();
                            tools.apply(setting.view.addDiyDom, [setting.treeId, node]);
                            if ( !! setting.callback.onNodeCreated) {
                                setting.treeObj.trigger(consts.event.NODECREATED, [setting.treeId, node])
                            }
                        }
                    }
                },
                createNodes: function (setting, level, nodes, parentNode) {
                    if (!nodes || nodes.length == 0) {
                        return
                    }
                    var root = data.getRoot(setting),
                        childKey = setting.data.key.children,
                        openFlag = !parentNode || parentNode.open || !! $("#" + parentNode[childKey][0].tId).get(0);
                    root.createdNodes = [];
                    var zTreeHtml = view.appendNodes(setting, level, nodes, parentNode, true, openFlag);
                    if (!parentNode) {
                        setting.treeObj.append(zTreeHtml.join(""))
                    } else {
                        var ulObj = $("#" + parentNode.tId + consts.id.UL);
                        if (ulObj.get(0)) {
                            ulObj.append(zTreeHtml.join(""))
                        }
                    }
                    view.createNodeCallback(setting)
                },
                expandCollapseNode: function (setting, node, expandFlag, animateFlag, callback) {
                    var root = data.getRoot(setting),
                        childKey = setting.data.key.children;
                    if (!node) {
                        tools.apply(callback, []);
                        return
                    }
                    if (root.expandTriggerFlag) {
                        var _callback = callback;
                        callback = function () {
                            if (_callback) {
                                _callback()
                            }
                            if (node.open) {
                                setting.treeObj.trigger(consts.event.EXPAND, [setting.treeId, node])
                            } else {
                                setting.treeObj.trigger(consts.event.COLLAPSE, [setting.treeId, node])
                            }
                        };
                        root.expandTriggerFlag = false
                    }
                    if (node.open == expandFlag) {
                        tools.apply(callback, []);
                        return
                    }
                    if (!node.open && node.isParent && ((!$("#" + node.tId + consts.id.UL).get(0)) || (node[childKey] && node[childKey].length > 0 && !$("#" + node[childKey][0].tId).get(0)))) {
                        view.appendParentULDom(setting, node)
                    }
                    var ulObj = $("#" + node.tId + consts.id.UL),
                        switchObj = $("#" + node.tId + consts.id.SWITCH),
                        icoObj = $("#" + node.tId + consts.id.ICON);
                    if (node.isParent) {
                        node.open = !node.open;
                        if (node.iconOpen && node.iconClose) {
                            icoObj.attr("style", view.makeNodeIcoStyle(setting, node))
                        }
                        if (node.open) {
                            view.replaceSwitchClass(node, switchObj, consts.folder.OPEN);
                            view.replaceIcoClass(node, icoObj, consts.folder.OPEN);
                            if (animateFlag == false || setting.view.expandSpeed == "") {
                                ulObj.show();
                                tools.apply(callback, [])
                            } else {
                                if (node[childKey] && node[childKey].length > 0) {
                                    ulObj.slideDown(setting.view.expandSpeed, callback)
                                } else {
                                    ulObj.show();
                                    tools.apply(callback, [])
                                }
                            }
                        } else {
                            view.replaceSwitchClass(node, switchObj, consts.folder.CLOSE);
                            view.replaceIcoClass(node, icoObj, consts.folder.CLOSE);
                            if (animateFlag == false || setting.view.expandSpeed == "") {
                                ulObj.hide();
                                tools.apply(callback, [])
                            } else {
                                ulObj.slideUp(setting.view.expandSpeed, callback)
                            }
                        }
                    } else {
                        tools.apply(callback, [])
                    }
                },
                expandCollapseParentNode: function (setting, node, expandFlag, animateFlag, callback) {
                    if (!node) {
                        return
                    }
                    if (!node.parentTId) {
                        view.expandCollapseNode(setting, node, expandFlag, animateFlag, callback);
                        return
                    } else {
                        view.expandCollapseNode(setting, node, expandFlag, animateFlag)
                    } if (node.parentTId) {
                        view.expandCollapseParentNode(setting, node.getParentNode(), expandFlag, animateFlag, callback)
                    }
                },
                expandCollapseSonNode: function (setting, node, expandFlag, animateFlag, callback) {
                    var root = data.getRoot(setting),
                        childKey = setting.data.key.children,
                        treeNodes = (node) ? node[childKey] : root[childKey],
                        selfAnimateSign = (node) ? false : animateFlag,
                        expandTriggerFlag = data.getRoot(setting).expandTriggerFlag;
                    data.getRoot(setting).expandTriggerFlag = false;
                    if (treeNodes) {
                        for (var i = 0, l = treeNodes.length; i < l; i++) {
                            if (treeNodes[i]) {
                                view.expandCollapseSonNode(setting, treeNodes[i], expandFlag, selfAnimateSign)
                            }
                        }
                    }
                    data.getRoot(setting).expandTriggerFlag = expandTriggerFlag;
                    view.expandCollapseNode(setting, node, expandFlag, animateFlag, callback)
                },
                makeNodeFontCss: function (setting, node) {
                    var fontCss = tools.apply(setting.view.fontCss, [setting.treeId, node], setting.view.fontCss);
                    return (fontCss && ((typeof fontCss) != "function")) ? fontCss : {}
                },
                makeNodeIcoClass: function (setting, node) {
                    var icoCss = ["ico"];
                    if (!node.isAjaxing) {
                        icoCss[0] = (node.iconSkin ? node.iconSkin + "_" : "") + icoCss[0];
                        if (node.isParent) {
                            icoCss.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE)
                        } else {
                            icoCss.push(consts.folder.DOCU)
                        }
                    }
                    return icoCss.join("_")
                },
                makeNodeIcoStyle: function (setting, node) {
                    var icoStyle = [];
                    if (!node.isAjaxing) {
                        var icon = (node.isParent && node.iconOpen && node.iconClose) ? (node.open ? node.iconOpen : node.iconClose) : node.icon;
                        if (icon) {
                            icoStyle.push("background:url(", icon, ") 0 0 no-repeat;")
                        }
                        if (setting.view.showIcon == false || !tools.apply(setting.view.showIcon, [setting.treeId, node], true)) {
                            icoStyle.push("width:0px;height:0px;")
                        }
                    }
                    return icoStyle.join("")
                },
                makeNodeLineClass: function (setting, node) {
                    var lineClass = [];
                    if (setting.view.showLine) {
                        if (node.level == 0 && node.isFirstNode && node.isLastNode) {
                            lineClass.push(consts.line.ROOT)
                        } else {
                            if (node.level == 0 && node.isFirstNode) {
                                lineClass.push(consts.line.ROOTS)
                            } else {
                                if (node.isLastNode) {
                                    lineClass.push(consts.line.BOTTOM)
                                } else {
                                    lineClass.push(consts.line.CENTER)
                                }
                            }
                        }
                    } else {
                        lineClass.push(consts.line.NOLINE)
                    } if (node.isParent) {
                        lineClass.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE)
                    } else {
                        lineClass.push(consts.folder.DOCU)
                    }
                    return view.makeNodeLineClassEx(node) + lineClass.join("_")
                },
                makeNodeLineClassEx: function (node) {
                    return "level" + node.level + " switch "
                },
                makeNodeTarget: function (node) {
                    return (node.target || "_blank")
                },
                makeNodeUrl: function (setting, node) {
                    return node.url ? node.url : null
                },
                makeUlHtml: function (setting, node, html, content) {
                    html.push("<ul id='", node.tId, consts.id.UL, "' class='level", node.level, " ", view.makeUlLineClass(setting, node), "' style='display:", (node.open ? "block" : "none"), "'>");
                    html.push(content);
                    html.push("</ul>")
                },
                makeUlLineClass: function (setting, node) {
                    return ((setting.view.showLine && !node.isLastNode) ? consts.line.LINE : "")
                },
                replaceIcoClass: function (node, obj, newName) {
                    if (!obj || node.isAjaxing) {
                        return
                    }
                    var tmpName = obj.attr("class");
                    if (tmpName == undefined) {
                        return
                    }
                    var tmpList = tmpName.split("_");
                    switch (newName) {
                    case consts.folder.OPEN:
                    case consts.folder.CLOSE:
                    case consts.folder.DOCU:
                        tmpList[tmpList.length - 1] = newName;
                        break
                    }
                    obj.attr("class", tmpList.join("_"))
                },
                replaceSwitchClass: function (node, obj, newName) {
                    if (!obj) {
                        return
                    }
                    var tmpName = obj.attr("class");
                    if (tmpName == undefined) {
                        return
                    }
                    var tmpList = tmpName.split("_");
                    switch (newName) {
                    case consts.line.ROOT:
                    case consts.line.ROOTS:
                    case consts.line.CENTER:
                    case consts.line.BOTTOM:
                    case consts.line.NOLINE:
                        tmpList[0] = view.makeNodeLineClassEx(node) + newName;
                        break;
                    case consts.folder.OPEN:
                    case consts.folder.CLOSE:
                    case consts.folder.DOCU:
                        tmpList[1] = newName;
                        break
                    }
                    obj.attr("class", tmpList.join("_"));
                    if (newName !== consts.folder.DOCU) {
                        obj.removeAttr("disabled")
                    } else {
                        obj.attr("disabled", "disabled")
                    }
                },
                selectNode: function (setting, node, addFlag) {
                    if (!addFlag) {
                        view.cancelPreSelectedNode(setting)
                    }
                    $("#" + node.tId + consts.id.A).addClass(consts.node.CURSELECTED);
                    data.addSelectedNode(setting, node)
                },
                setNodeFontCss: function (setting, treeNode) {
                    var aObj = $("#" + treeNode.tId + consts.id.A),
                        fontCss = view.makeNodeFontCss(setting, treeNode);
                    if (fontCss) {
                        aObj.css(fontCss)
                    }
                },
                setNodeLineIcos: function (setting, node) {
                    if (!node) {
                        return
                    }
                    var switchObj = $("#" + node.tId + consts.id.SWITCH),
                        ulObj = $("#" + node.tId + consts.id.UL),
                        icoObj = $("#" + node.tId + consts.id.ICON),
                        ulLine = view.makeUlLineClass(setting, node);
                    if (ulLine.length == 0) {
                        ulObj.removeClass(consts.line.LINE)
                    } else {
                        ulObj.addClass(ulLine)
                    }
                    switchObj.attr("class", view.makeNodeLineClass(setting, node));
                    if (node.isParent) {
                        switchObj.removeAttr("disabled")
                    } else {
                        switchObj.attr("disabled", "disabled")
                    }
                    icoObj.removeAttr("style");
                    icoObj.attr("style", view.makeNodeIcoStyle(setting, node));
                    icoObj.attr("class", view.makeNodeIcoClass(setting, node))
                },
                setNodeName: function (setting, node) {
                    var nameKey = setting.data.key.name,
                        titleKey = data.getTitleKey(setting),
                        nObj = $("#" + node.tId + consts.id.SPAN);
                    nObj.empty();
                    if (setting.view.nameIsHTML) {
                        nObj.html(node[nameKey])
                    } else {
                        nObj.text(node[nameKey])
                    } if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle) && node[titleKey]) {
                        var aObj = $("#" + node.tId + consts.id.A);
                        aObj.attr("title", node[titleKey])
                    }
                },
                setNodeTarget: function (node) {
                    var aObj = $("#" + node.tId + consts.id.A);
                    aObj.attr("target", view.makeNodeTarget(node))
                },
                setNodeUrl: function (setting, node) {
                    var aObj = $("#" + node.tId + consts.id.A),
                        url = view.makeNodeUrl(setting, node);
                    if (url == null || url.length == 0) {
                        aObj.removeAttr("href")
                    } else {
                        aObj.attr("href", url)
                    }
                },
                switchNode: function (setting, node) {
                    if (node.open || !tools.canAsync(setting, node)) {
                        view.expandCollapseNode(setting, node, !node.open)
                    } else {
                        if (setting.async.enable) {
                            if (!view.asyncNode(setting, node)) {
                                view.expandCollapseNode(setting, node, !node.open);
                                return
                            }
                        } else {
                            if (node) {
                                view.expandCollapseNode(setting, node, !node.open)
                            }
                        }
                    }
                }
            };
        $.fn.zTree = {
            consts: _consts,
            _z: {
                tools: tools,
                view: view,
                event: event,
                data: data
            },
            getZTreeObj: function (treeId) {
                var o = data.getZTreeTools(treeId);
                return o ? o : null
            },
            init: function (obj, zSetting, zNodes) {
                var setting = tools.clone(_setting);
                $.extend(true, setting, zSetting);
                setting.treeId = obj.attr("id");
                setting.treeObj = obj;
                setting.treeObj.empty();
                settings[setting.treeId] = setting;
                if ($.browser.msie && parseInt($.browser.version) < 7) {
                    setting.view.expandSpeed = ""
                }
                data.initRoot(setting);
                var root = data.getRoot(setting),
                    childKey = setting.data.key.children;
                zNodes = zNodes ? tools.clone(tools.isArray(zNodes) ? zNodes : [zNodes]) : [];
                if (setting.data.simpleData.enable) {
                    root[childKey] = data.transformTozTreeFormat(setting, zNodes)
                } else {
                    root[childKey] = zNodes
                }
                data.initCache(setting);
                event.bindTree(setting);
                event.bindEvent(setting);
                var zTreeTools = {
                    setting: setting,
                    cancelSelectedNode: function (node) {
                        view.cancelPreSelectedNode(this.setting, node)
                    },
                    expandAll: function (expandFlag) {
                        expandFlag = !! expandFlag;
                        view.expandCollapseSonNode(this.setting, null, expandFlag, true);
                        return expandFlag
                    },
                    expandNode: function (node, expandFlag, sonSign, focus, callbackFlag) {
                        if (!node || !node.isParent) {
                            return null
                        }
                        if (expandFlag !== true && expandFlag !== false) {
                            expandFlag = !node.open
                        }
                        callbackFlag = !! callbackFlag;
                        if (callbackFlag && expandFlag && (tools.apply(setting.callback.beforeExpand, [setting.treeId, node], true) == false)) {
                            return null
                        } else {
                            if (callbackFlag && !expandFlag && (tools.apply(setting.callback.beforeCollapse, [setting.treeId, node], true) == false)) {
                                return null
                            }
                        } if (expandFlag && node.parentTId) {
                            view.expandCollapseParentNode(this.setting, node.getParentNode(), expandFlag, false)
                        }
                        if (expandFlag === node.open && !sonSign) {
                            return null
                        }
                        data.getRoot(setting).expandTriggerFlag = callbackFlag;
                        if (sonSign) {
                            view.expandCollapseSonNode(this.setting, node, expandFlag, true, function () {
                                    if (focus !== false) {
                                        $("#" + node.tId + consts.id.ICON).focus().blur()
                                    }
                                })
                        } else {
                            node.open = !expandFlag;
                            view.switchNode(this.setting, node);
                            if (focus !== false) {
                                $("#" + node.tId + consts.id.ICON).focus().blur()
                            }
                        }
                        return expandFlag
                    },
                    getNodes: function () {
                        return data.getNodes(this.setting)
                    },
                    getNodeByParam: function (key, value, parentNode) {
                        if (!key) {
                            return null
                        }
                        return data.getNodeByParam(this.setting, parentNode ? parentNode[this.setting.data.key.children] : data.getNodes(this.setting), key, value)
                    },
                    getNodeByTId: function (tId) {
                        return data.getNodeCache(this.setting, tId)
                    },
                    getNodesByParam: function (key, value, parentNode) {
                        if (!key) {
                            return null
                        }
                        return data.getNodesByParam(this.setting, parentNode ? parentNode[this.setting.data.key.children] : data.getNodes(this.setting), key, value)
                    },
                    getNodesByParamFuzzy: function (key, value, parentNode) {
                        if (!key) {
                            return null
                        }
                        return data.getNodesByParamFuzzy(this.setting, parentNode ? parentNode[this.setting.data.key.children] : data.getNodes(this.setting), key, value)
                    },
                    getNodeIndex: function (node) {
                        if (!node) {
                            return null
                        }
                        var childKey = setting.data.key.children,
                            parentNode = (node.parentTId) ? node.getParentNode() : data.getRoot(this.setting);
                        for (var i = 0, l = parentNode[childKey].length; i < l; i++) {
                            if (parentNode[childKey][i] == node) {
                                return i
                            }
                        }
                        return -1
                    },
                    getSelectedNodes: function () {
                        var r = [],
                            list = data.getRoot(this.setting).curSelectedList;
                        for (var i = 0, l = list.length; i < l; i++) {
                            r.push(list[i])
                        }
                        return r
                    },
                    isSelectedNode: function (node) {
                        return data.isSelectedNode(this.setting, node)
                    },
                    reAsyncChildNodes: function (parentNode, reloadType, isSilent) {
                        if (!this.setting.async.enable) {
                            return
                        }
                        var isRoot = !parentNode;
                        if (isRoot) {
                            parentNode = data.getRoot(this.setting)
                        }
                        if (reloadType == "refresh") {
                            parentNode[this.setting.data.key.children] = [];
                            if (isRoot) {
                                this.setting.treeObj.empty()
                            } else {
                                var ulObj = $("#" + parentNode.tId + consts.id.UL);
                                ulObj.empty()
                            }
                        }
                        view.asyncNode(this.setting, isRoot ? null : parentNode, !! isSilent)
                    },
                    refresh: function () {
                        this.setting.treeObj.empty();
                        var root = data.getRoot(this.setting),
                            nodes = root[this.setting.data.key.children];
                        data.initRoot(this.setting);
                        root[this.setting.data.key.children] = nodes;
                        data.initCache(this.setting);
                        view.createNodes(this.setting, 0, root[this.setting.data.key.children])
                    },
                    selectNode: function (node, addFlag) {
                        if (!node) {
                            return
                        }
                        if (tools.uCanDo(this.setting)) {
                            addFlag = setting.view.selectedMulti && addFlag;
                            if (node.parentTId) {
                                view.expandCollapseParentNode(this.setting, node.getParentNode(), true, false, function () {
                                        $("#" + node.tId + consts.id.ICON).focus().blur()
                                    })
                            } else {
                                $("#" + node.tId + consts.id.ICON).focus().blur()
                            }
                            view.selectNode(this.setting, node, addFlag)
                        }
                    },
                    transformTozTreeNodes: function (simpleNodes) {
                        return data.transformTozTreeFormat(this.setting, simpleNodes)
                    },
                    transformToArray: function (nodes) {
                        return data.transformToArrayFormat(this.setting, nodes)
                    },
                    updateNode: function (node, checkTypeFlag) {
                        if (!node) {
                            return
                        }
                        var nObj = $("#" + node.tId);
                        if (nObj.get(0) && tools.uCanDo(this.setting)) {
                            view.setNodeName(this.setting, node);
                            view.setNodeTarget(node);
                            view.setNodeUrl(this.setting, node);
                            view.setNodeLineIcos(this.setting, node);
                            view.setNodeFontCss(this.setting, node)
                        }
                    }
                };
                root.treeTools = zTreeTools;
                data.setZTreeTools(setting, zTreeTools);
                if (root[childKey] && root[childKey].length > 0) {
                    view.createNodes(setting, 0, root[childKey])
                } else {
                    if (setting.async.enable && setting.async.url && setting.async.url !== "") {
                        view.asyncNode(setting)
                    }
                }
                return zTreeTools
            }
        };
        var zt = $.fn.zTree,
            consts = zt.consts
    })(jQuery);
(function (e) {
        var w = {
            event: {
                CHECK: "ztree_check"
            },
            id: {
                CHECK: "_check"
            },
            checkbox: {
                STYLE: "checkbox",
                DEFAULT: "chk",
                DISABLED: "disable",
                FALSE: "false",
                TRUE: "true",
                FULL: "full",
                PART: "part",
                FOCUS: "focus"
            },
            radio: {
                STYLE: "radio",
                TYPE_ALL: "all",
                TYPE_LEVEL: "level"
            }
        }, k = {
                check: {
                    enable: false,
                    autoCheckTrigger: false,
                    chkStyle: w.checkbox.STYLE,
                    nocheckInherit: false,
                    radioType: w.radio.TYPE_LEVEL,
                    chkboxType: {
                        Y: "ps",
                        N: "ps"
                    }
                },
                data: {
                    key: {
                        checked: "checked"
                    }
                },
                callback: {
                    beforeCheck: null,
                    onCheck: null
                }
            }, t = function (x) {
                var y = v.getRoot(x);
                y.radioCheckedList = []
            }, c = function (x) {}, l = function (x) {
                var y = x.treeObj,
                    z = o.event;
                y.unbind(z.CHECK);
                y.bind(z.CHECK, function (B, C, A) {
                        r.apply(x.callback.onCheck, [B, C, A])
                    })
            }, m = function (D) {
                var E = D.target,
                    G = v.getSetting(D.data.treeId),
                    B = "",
                    y = null,
                    z = "",
                    C = "",
                    x = null,
                    A = null;
                if (r.eqs(D.type, "mouseover")) {
                    if (G.check.enable && r.eqs(E.tagName, "button") && E.getAttribute("treeNode" + o.id.CHECK) !== null) {
                        B = E.parentNode.id;
                        z = "mouseoverCheck"
                    }
                } else {
                    if (r.eqs(D.type, "mouseout")) {
                        if (G.check.enable && r.eqs(E.tagName, "button") && E.getAttribute("treeNode" + o.id.CHECK) !== null) {
                            B = E.parentNode.id;
                            z = "mouseoutCheck"
                        }
                    } else {
                        if (r.eqs(D.type, "click")) {
                            if (G.check.enable && r.eqs(E.tagName, "button") && E.getAttribute("treeNode" + o.id.CHECK) !== null) {
                                B = E.parentNode.id;
                                z = "checkNode"
                            }
                        }
                    }
                } if (B.length > 0) {
                    y = v.getNodeCache(G, B);
                    switch (z) {
                    case "checkNode":
                        x = j.onCheckNode;
                        break;
                    case "mouseoverCheck":
                        x = j.onMouseoverCheck;
                        break;
                    case "mouseoutCheck":
                        x = j.onMouseoutCheck;
                        break
                    }
                }
                var F = {
                    stop: false,
                    node: y,
                    nodeEventType: z,
                    nodeEventCallback: x,
                    treeEventType: C,
                    treeEventCallback: A
                };
                return F
            }, s = function (A, E, D, x, C, z, B) {
                if (!D) {
                    return
                }
                var y = A.data.key.checked;
                if (typeof D[y] == "string") {
                    D[y] = r.eqs(D[y], "true")
                }
                D[y] = !! D[y];
                D.checkedOld = D[y];
                D.nocheck = !! D.nocheck || (A.check.nocheckInherit && x && !! x.nocheck);
                D.chkDisabled = !! D.chkDisabled || (x && !! x.chkDisabled);
                if (typeof D.halfCheck == "string") {
                    D.halfCheck = r.eqs(D.halfCheck, "true")
                }
                D.halfCheck = !! D.halfCheck;
                D.check_Child_State = -1;
                D.check_Focus = false;
                D.getCheckStatus = function () {
                    return v.getCheckStatus(A, D)
                };
                if (z) {
                    v.makeChkFlag(A, x)
                }
            }, a = function (z, B, y) {
                var x = z.data.key.checked;
                if (z.check.enable) {
                    v.makeChkFlag(z, B);
                    if (z.check.chkStyle == o.radio.STYLE && z.check.radioType == o.radio.TYPE_ALL && B[x]) {
                        var A = v.getRoot(z);
                        A.radioCheckedList.push(B)
                    }
                    y.push("<button type='button' ID='", B.tId, o.id.CHECK, "' class='", h.makeChkClass(z, B), "' treeNode", o.id.CHECK, " onfocus='this.blur();' ", (B.nocheck === true ? "style='display:none;'" : ""), "></button>")
                }
            }, i = function (z, y) {
                y.checkNode = function (E, D, F, C) {
                    var A = this.setting.data.key.checked;
                    if (E.chkDisabled === true) {
                        return
                    }
                    if (D !== true && D !== false) {
                        D = !E[A]
                    }
                    C = !! C;
                    if (E[A] === D && !F) {
                        return
                    } else {
                        if (C && r.apply(this.setting.callback.beforeCheck, [this.setting.treeId, E], true) == false) {
                            return
                        }
                    } if (r.uCanDo(this.setting) && this.setting.check.enable && E.nocheck !== true) {
                        E[A] = D;
                        var B = e("#" + E.tId + o.id.CHECK);
                        if (F || this.setting.check.chkStyle === o.radio.STYLE) {
                            h.checkNodeRelation(this.setting, E)
                        }
                        h.setChkClass(this.setting, B, E);
                        h.repairParentChkClassWithSelf(this.setting, E);
                        if (C) {
                            z.treeObj.trigger(o.event.CHECK, [z.treeId, E])
                        }
                    }
                };
                y.checkAllNodes = function (A) {
                    h.repairAllChk(this.setting, !! A)
                };
                y.getCheckedNodes = function (B) {
                    var A = this.setting.data.key.children;
                    B = (B !== false);
                    return v.getTreeCheckedNodes(this.setting, v.getRoot(z)[A], B)
                };
                y.getChangeCheckedNodes = function () {
                    var A = this.setting.data.key.children;
                    return v.getTreeChangeCheckedNodes(this.setting, v.getRoot(z)[A])
                };
                y.setChkDisabled = function (B, A) {
                    A = !! A;
                    h.repairSonChkDisabled(this.setting, B, A);
                    if (!A) {
                        h.repairParentChkDisabled(this.setting, B, A)
                    }
                };
                var x = y.updateNode;
                y.updateNode = function (C, D) {
                    if (x) {
                        x.apply(y, arguments)
                    }
                    if (!C || !this.setting.check.enable) {
                        return
                    }
                    var A = e("#" + C.tId);
                    if (A.get(0) && r.uCanDo(this.setting)) {
                        var B = e("#" + C.tId + o.id.CHECK);
                        if (D == true || this.setting.check.chkStyle === o.radio.STYLE) {
                            h.checkNodeRelation(this.setting, C)
                        }
                        h.setChkClass(this.setting, B, C);
                        h.repairParentChkClassWithSelf(this.setting, C)
                    }
                }
            }, n = {
                getRadioCheckedList: function (A) {
                    var z = v.getRoot(A).radioCheckedList;
                    for (var y = 0, x = z.length; y < x; y++) {
                        if (!v.getNodeCache(A, z[y].tId)) {
                            z.splice(y, 1);
                            y--;
                            x--
                        }
                    }
                    return z
                },
                getCheckStatus: function (y, A) {
                    if (!y.check.enable || A.nocheck) {
                        return null
                    }
                    var x = y.data.key.checked,
                        z = {
                            checked: A[x],
                            half: A.halfCheck ? A.halfCheck : (y.check.chkStyle == o.radio.STYLE ? (A.check_Child_State === 2) : (A[x] ? (A.check_Child_State > -1 && A.check_Child_State < 2) : (A.check_Child_State > 0)))
                        };
                    return z
                },
                getTreeCheckedNodes: function (C, z, E, B) {
                    if (!z) {
                        return []
                    }
                    var D = C.data.key.children,
                        y = C.data.key.checked;
                    B = !B ? [] : B;
                    for (var A = 0, x = z.length; A < x; A++) {
                        if (z[A].nocheck !== true && z[A][y] == E) {
                            B.push(z[A])
                        }
                        v.getTreeCheckedNodes(C, z[A][D], E, B)
                    }
                    return B
                },
                getTreeChangeCheckedNodes: function (C, z, B) {
                    if (!z) {
                        return []
                    }
                    var D = C.data.key.children,
                        y = C.data.key.checked;
                    B = !B ? [] : B;
                    for (var A = 0, x = z.length; A < x; A++) {
                        if (z[A].nocheck !== true && z[A][y] != z[A].checkedOld) {
                            B.push(z[A])
                        }
                        v.getTreeChangeCheckedNodes(C, z[A][D], B)
                    }
                    return B
                },
                makeChkFlag: function (G, A) {
                    if (!A) {
                        return
                    }
                    var z = G.data.key.children,
                        x = G.data.key.checked,
                        C = -1;
                    if (A[z]) {
                        var y = false;
                        for (var E = 0, B = A[z].length; E < B; E++) {
                            var F = A[z][E];
                            var D = -1;
                            if (G.check.chkStyle == o.radio.STYLE) {
                                if (F.nocheck === true) {
                                    D = F.check_Child_State
                                } else {
                                    if (F.halfCheck === true) {
                                        D = 2
                                    } else {
                                        if (F.nocheck !== true && F[x]) {
                                            D = 2
                                        } else {
                                            D = F.check_Child_State > 0 ? 2 : 0
                                        }
                                    }
                                } if (D == 2) {
                                    C = 2;
                                    break
                                } else {
                                    if (D == 0) {
                                        C = 0
                                    }
                                }
                            } else {
                                if (G.check.chkStyle == o.checkbox.STYLE) {
                                    if (F.nocheck === true) {
                                        D = F.check_Child_State
                                    } else {
                                        if (F.halfCheck === true) {
                                            D = 1
                                        } else {
                                            if (F.nocheck !== true && F[x]) {
                                                D = (F.check_Child_State === -1 || F.check_Child_State === 2) ? 2 : 1
                                            } else {
                                                D = (F.check_Child_State > 0) ? 1 : 0
                                            }
                                        }
                                    } if (D === 1) {
                                        C = 1;
                                        break
                                    } else {
                                        if (D === 2 && y && D !== C) {
                                            C = 1;
                                            break
                                        } else {
                                            if (C === 2 && D > -1 && D < 2) {
                                                C = 1;
                                                break
                                            } else {
                                                if (D > -1) {
                                                    C = D
                                                }
                                            }
                                        }
                                    } if (!y) {
                                        y = (F.nocheck !== true)
                                    }
                                }
                            }
                        }
                    }
                    A.check_Child_State = C
                }
            }, f = {}, j = {
                onCheckNode: function (B, A) {
                    if (A.chkDisabled === true) {
                        return false
                    }
                    var z = v.getSetting(B.data.treeId),
                        x = z.data.key.checked;
                    if (r.apply(z.callback.beforeCheck, [z.treeId, A], true) == false) {
                        return true
                    }
                    A[x] = !A[x];
                    h.checkNodeRelation(z, A);
                    var y = e("#" + A.tId + o.id.CHECK);
                    h.setChkClass(z, y, A);
                    h.repairParentChkClassWithSelf(z, A);
                    z.treeObj.trigger(o.event.CHECK, [z.treeId, A]);
                    return true
                },
                onMouseoverCheck: function (A, z) {
                    if (z.chkDisabled === true) {
                        return false
                    }
                    var y = v.getSetting(A.data.treeId),
                        x = e("#" + z.tId + o.id.CHECK);
                    z.check_Focus = true;
                    h.setChkClass(y, x, z);
                    return true
                },
                onMouseoutCheck: function (A, z) {
                    if (z.chkDisabled === true) {
                        return false
                    }
                    var y = v.getSetting(A.data.treeId),
                        x = e("#" + z.tId + o.id.CHECK);
                    z.check_Focus = false;
                    h.setChkClass(y, x, z);
                    return true
                }
            }, g = {}, d = {
                checkNodeRelation: function (G, A) {
                    var E, C, B, z = G.data.key.children,
                        y = G.data.key.checked,
                        x = o.radio;
                    if (G.check.chkStyle == x.STYLE) {
                        var F = v.getRadioCheckedList(G);
                        if (A[y]) {
                            if (G.check.radioType == x.TYPE_ALL) {
                                for (C = F.length - 1; C >= 0; C--) {
                                    E = F[C];
                                    E[y] = false;
                                    F.splice(C, 1);
                                    h.setChkClass(G, e("#" + E.tId + o.id.CHECK), E);
                                    if (E.parentTId != A.parentTId) {
                                        h.repairParentChkClassWithSelf(G, E)
                                    }
                                }
                                F.push(A)
                            } else {
                                var D = (A.parentTId) ? A.getParentNode() : v.getRoot(G);
                                for (C = 0, B = D[z].length; C < B; C++) {
                                    E = D[z][C];
                                    if (E[y] && E != A) {
                                        E[y] = false;
                                        h.setChkClass(G, e("#" + E.tId + o.id.CHECK), E)
                                    }
                                }
                            }
                        } else {
                            if (G.check.radioType == x.TYPE_ALL) {
                                for (C = 0, B = F.length; C < B; C++) {
                                    if (A == F[C]) {
                                        F.splice(C, 1);
                                        break
                                    }
                                }
                            }
                        }
                    } else {
                        if (A[y] && (!A[z] || A[z].length == 0 || G.check.chkboxType.Y.indexOf("s") > -1)) {
                            h.setSonNodeCheckBox(G, A, true)
                        }
                        if (!A[y] && (!A[z] || A[z].length == 0 || G.check.chkboxType.N.indexOf("s") > -1)) {
                            h.setSonNodeCheckBox(G, A, false)
                        }
                        if (A[y] && G.check.chkboxType.Y.indexOf("p") > -1) {
                            h.setParentNodeCheckBox(G, A, true)
                        }
                        if (!A[y] && G.check.chkboxType.N.indexOf("p") > -1) {
                            h.setParentNodeCheckBox(G, A, false)
                        }
                    }
                },
                makeChkClass: function (y, B) {
                    var x = y.data.key.checked,
                        D = o.checkbox,
                        A = o.radio,
                        C = "";
                    if (B.chkDisabled === true) {
                        C = D.DISABLED
                    } else {
                        if (B.halfCheck) {
                            C = D.PART
                        } else {
                            if (y.check.chkStyle == A.STYLE) {
                                C = (B.check_Child_State < 1) ? D.FULL : D.PART
                            } else {
                                C = B[x] ? ((B.check_Child_State === 2 || B.check_Child_State === -1) ? D.FULL : D.PART) : ((B.check_Child_State < 1) ? D.FULL : D.PART)
                            }
                        }
                    }
                    var z = y.check.chkStyle + "_" + (B[x] ? D.TRUE : D.FALSE) + "_" + C;
                    z = (B.check_Focus && B.chkDisabled !== true) ? z + "_" + D.FOCUS : z;
                    return D.DEFAULT + " " + z
                },
                repairAllChk: function (B, E) {
                    if (B.check.enable && B.check.chkStyle === o.checkbox.STYLE) {
                        var z = B.data.key.checked,
                            D = B.data.key.children,
                            y = v.getRoot(B);
                        for (var A = 0, x = y[D].length; A < x; A++) {
                            var C = y[D][A];
                            if (C.nocheck !== true) {
                                C[z] = E
                            }
                            h.setSonNodeCheckBox(B, C, E)
                        }
                    }
                },
                repairChkClass: function (y, z) {
                    if (!z) {
                        return
                    }
                    v.makeChkFlag(y, z);
                    var x = e("#" + z.tId + o.id.CHECK);
                    h.setChkClass(y, x, z)
                },
                repairParentChkClass: function (y, z) {
                    if (!z || !z.parentTId) {
                        return
                    }
                    var x = z.getParentNode();
                    h.repairChkClass(y, x);
                    h.repairParentChkClass(y, x)
                },
                repairParentChkClassWithSelf: function (x, z) {
                    if (!z) {
                        return
                    }
                    var y = x.data.key.children;
                    if (z[y] && z[y].length > 0) {
                        h.repairParentChkClass(x, z[y][0])
                    } else {
                        h.repairParentChkClass(x, z)
                    }
                },
                repairSonChkDisabled: function (B, D, A) {
                    if (!D) {
                        return
                    }
                    var C = B.data.key.children;
                    if (D.chkDisabled != A) {
                        D.chkDisabled = A;
                        if (D.nocheck !== true) {
                            h.repairChkClass(B, D)
                        }
                    }
                    if (D[C]) {
                        for (var z = 0, y = D[C].length; z < y; z++) {
                            var x = D[C][z];
                            h.repairSonChkDisabled(B, x, A)
                        }
                    }
                },
                repairParentChkDisabled: function (y, z, x) {
                    if (!z) {
                        return
                    }
                    if (z.chkDisabled != x) {
                        z.chkDisabled = x;
                        if (z.nocheck !== true) {
                            h.repairChkClass(y, z)
                        }
                    }
                    h.repairParentChkDisabled(y, z.getParentNode(), x)
                },
                setChkClass: function (x, z, y) {
                    if (!z) {
                        return
                    }
                    if (y.nocheck === true) {
                        z.hide()
                    } else {
                        z.show()
                    }
                    z.removeClass();
                    z.addClass(h.makeChkClass(x, y))
                },
                setParentNodeCheckBox: function (H, A, G, D) {
                    var z = H.data.key.children,
                        x = H.data.key.checked,
                        E = e("#" + A.tId + o.id.CHECK);
                    if (!D) {
                        D = A
                    }
                    v.makeChkFlag(H, A);
                    if (A.nocheck !== true && A.chkDisabled !== true) {
                        A[x] = G;
                        h.setChkClass(H, E, A);
                        if (H.check.autoCheckTrigger && A != D && A.nocheck !== true) {
                            H.treeObj.trigger(o.event.CHECK, [H.treeId, A])
                        }
                    }
                    if (A.parentTId) {
                        var F = true;
                        if (!G) {
                            var y = A.getParentNode()[z];
                            for (var C = 0, B = y.length; C < B; C++) {
                                if ((y[C].nocheck !== true && y[C][x]) || (y[C].nocheck === true && y[C].check_Child_State > 0)) {
                                    F = false;
                                    break
                                }
                            }
                        }
                        if (F) {
                            h.setParentNodeCheckBox(H, A.getParentNode(), G, D)
                        }
                    }
                },
                setSonNodeCheckBox: function (H, A, G, D) {
                    if (!A) {
                        return
                    }
                    var z = H.data.key.children,
                        x = H.data.key.checked,
                        E = e("#" + A.tId + o.id.CHECK);
                    if (!D) {
                        D = A
                    }
                    var y = false;
                    if (A[z]) {
                        for (var C = 0, B = A[z].length; C < B && A.chkDisabled !== true; C++) {
                            var F = A[z][C];
                            h.setSonNodeCheckBox(H, F, G, D);
                            if (F.chkDisabled === true) {
                                y = true
                            }
                        }
                    }
                    if (A != v.getRoot(H) && A.chkDisabled !== true) {
                        if (y && A.nocheck !== true) {
                            v.makeChkFlag(H, A)
                        }
                        if (A.nocheck !== true) {
                            A[x] = G;
                            if (!y) {
                                A.check_Child_State = (A[z] && A[z].length > 0) ? (G ? 2 : 0) : -1
                            }
                        } else {
                            A.check_Child_State = -1
                        }
                        h.setChkClass(H, E, A);
                        if (H.check.autoCheckTrigger && A != D && A.nocheck !== true) {
                            H.treeObj.trigger(o.event.CHECK, [H.treeId, A])
                        }
                    }
                }
            }, q = {
                tools: g,
                view: d,
                event: f,
                data: n
            };
        e.extend(true, e.fn.zTree.consts, w);
        e.extend(true, e.fn.zTree._z, q);
        var b = e.fn.zTree,
            r = b._z.tools,
            o = b.consts,
            h = b._z.view,
            v = b._z.data,
            p = b._z.event;
        v.exSetting(k);
        v.addInitBind(l);
        v.addInitCache(c);
        v.addInitNode(s);
        v.addInitProxy(m);
        v.addInitRoot(t);
        v.addBeforeA(a);
        v.addZTreeTools(i);
        var u = h.createNodes;
        h.createNodes = function (z, A, y, x) {
            if (u) {
                u.apply(h, arguments)
            }
            if (!y) {
                return
            }
            h.repairParentChkClassWithSelf(z, x)
        }
    })(jQuery);
(function (e) {
        var y = {
            event: {
                DRAG: "ztree_drag",
                DROP: "ztree_drop",
                REMOVE: "ztree_remove",
                RENAME: "ztree_rename"
            },
            id: {
                EDIT: "_edit",
                INPUT: "_input",
                REMOVE: "_remove"
            },
            move: {
                TYPE_INNER: "inner",
                TYPE_PREV: "prev",
                TYPE_NEXT: "next"
            },
            node: {
                CURSELECTED_EDIT: "curSelectedNode_Edit",
                TMPTARGET_TREE: "tmpTargetzTree",
                TMPTARGET_NODE: "tmpTargetNode"
            }
        }, k = {
                edit: {
                    enable: false,
                    editNameSelectAll: false,
                    showRemoveBtn: true,
                    showRenameBtn: true,
                    removeTitle: "remove",
                    renameTitle: "rename",
                    drag: {
                        autoExpandTrigger: false,
                        isCopy: true,
                        isMove: true,
                        prev: true,
                        next: true,
                        inner: true,
                        minMoveSize: 5,
                        borderMax: 10,
                        borderMin: -5,
                        maxShowNodeNum: 5,
                        autoOpenTime: 500
                    }
                },
                view: {
                    addHoverDom: null,
                    removeHoverDom: null
                },
                callback: {
                    beforeDrag: null,
                    beforeDragOpen: null,
                    beforeDrop: null,
                    beforeEditName: null,
                    beforeRemove: null,
                    beforeRename: null,
                    onDrag: null,
                    onDrop: null,
                    onRemove: null,
                    onRename: null
                }
            }, u = function (z) {
                var A = w.getRoot(z);
                A.curEditNode = null;
                A.curEditInput = null;
                A.curHoverNode = null;
                A.dragFlag = 0;
                A.dragNodeShowBefore = [];
                A.dragMaskList = new Array();
                A.showHoverDom = true
            }, b = function (z) {}, l = function (z) {
                var A = z.treeObj;
                var B = o.event;
                A.unbind(B.RENAME);
                A.bind(B.RENAME, function (C, E, D) {
                        s.apply(z.callback.onRename, [C, E, D])
                    });
                A.unbind(B.REMOVE);
                A.bind(B.REMOVE, function (C, E, D) {
                        s.apply(z.callback.onRemove, [C, E, D])
                    });
                A.unbind(B.DRAG);
                A.bind(B.DRAG, function (C, E, D) {
                        s.apply(z.callback.onDrag, [C, E, D])
                    });
                A.unbind(B.DROP);
                A.bind(B.DROP, function (D, F, E, G, C) {
                        s.apply(z.callback.onDrop, [D, F, E, G, C])
                    })
            }, m = function (G) {
                var H = G.target,
                    K = w.getSetting(G.data.treeId),
                    I = G.relatedTarget,
                    E = "",
                    A = null,
                    B = "",
                    F = "",
                    z = null,
                    D = null,
                    C = null;
                if (s.eqs(G.type, "mouseover")) {
                    C = s.getMDom(K, H, [{
                                tagName: "a",
                                attrName: "treeNode" + o.id.A
                            }
                        ]);
                    if (C) {
                        E = C.parentNode.id;
                        B = "hoverOverNode"
                    }
                } else {
                    if (s.eqs(G.type, "mouseout")) {
                        C = s.getMDom(K, I, [{
                                    tagName: "a",
                                    attrName: "treeNode" + o.id.A
                                }
                            ]);
                        if (!C) {
                            E = "remove";
                            B = "hoverOutNode"
                        }
                    } else {
                        if (s.eqs(G.type, "mousedown")) {
                            C = s.getMDom(K, H, [{
                                        tagName: "a",
                                        attrName: "treeNode" + o.id.A
                                    }
                                ]);
                            if (C) {
                                E = C.parentNode.id;
                                B = "mousedownNode"
                            }
                        }
                    }
                } if (E.length > 0) {
                    A = w.getNodeCache(K, E);
                    switch (B) {
                    case "mousedownNode":
                        z = j.onMousedownNode;
                        break;
                    case "hoverOverNode":
                        z = j.onHoverOverNode;
                        break;
                    case "hoverOutNode":
                        z = j.onHoverOutNode;
                        break
                    }
                }
                var J = {
                    stop: false,
                    node: A,
                    nodeEventType: B,
                    nodeEventCallback: z,
                    treeEventType: F,
                    treeEventCallback: D
                };
                return J
            }, t = function (B, F, E, z, D, A, C) {
                if (!E) {
                    return
                }
                E.isHover = false;
                E.editNameFlag = false
            }, i = function (A, z) {
                z.addNodes = function (B, C, F) {
                    if (!C) {
                        return null
                    }
                    if (!B) {
                        B = null
                    }
                    if (B && !B.isParent && A.data.keep.leaf) {
                        return null
                    }
                    var E = s.clone(s.isArray(C) ? C : [C]);

                    function D() {
                        h.addNodes(A, B, E, (F == true))
                    }
                    if (A.async.enable && s.canAsync(A, B)) {
                        h.asyncNode(A, B, F, D)
                    } else {
                        D()
                    }
                    return E
                };
                z.cancelEditName = function (C) {
                    var B = w.getRoot(A),
                        D = A.data.key.name,
                        E = B.curEditNode;
                    if (!B.curEditNode) {
                        return
                    }
                    h.cancelCurEditNode(A, C ? C : E[D])
                };
                z.copyNode = function (F, E, D, G) {
                    if (!E) {
                        return null
                    }
                    if (F && !F.isParent && A.data.keep.leaf && D === o.move.TYPE_INNER) {
                        return null
                    }
                    var B = s.clone(E);
                    if (!F) {
                        F = null;
                        D = o.move.TYPE_INNER
                    }
                    if (D == o.move.TYPE_INNER) {
                        function C() {
                            h.addNodes(A, F, [B], G)
                        }
                        if (A.async.enable && s.canAsync(A, F)) {
                            h.asyncNode(A, F, G, C)
                        } else {
                            C()
                        }
                    } else {
                        h.addNodes(A, F.parentNode, [B], G);
                        h.moveNode(A, F, B, D, false, G)
                    }
                    return B
                };
                z.editName = function (B) {
                    if (!B || !B.tId || B !== w.getNodeCache(A, B.tId)) {
                        return
                    }
                    if (B.parentTId) {
                        h.expandCollapseParentNode(A, B.getParentNode(), true)
                    }
                    h.editNode(A, B)
                };
                z.moveNode = function (D, C, B, F) {
                    if (!C) {
                        return C
                    }
                    if (D && !D.isParent && A.data.keep.leaf && B === o.move.TYPE_INNER) {
                        return null
                    } else {
                        if (D && ((C.parentTId == D.tId && B == o.move.TYPE_INNER) || e("#" + C.tId).find("#" + D.tId).length > 0)) {
                            return null
                        } else {
                            if (!D) {
                                D = null
                            }
                        }
                    }

                    function E() {
                        h.moveNode(A, D, C, B, false, F)
                    }
                    if (A.async.enable && s.canAsync(A, D)) {
                        h.asyncNode(A, D, F, E)
                    } else {
                        E()
                    }
                    return C
                };
                z.removeNode = function (C, B) {
                    if (!C) {
                        return
                    }
                    B = !! B;
                    if (B && s.apply(A.callback.beforeRemove, [A.treeId, C], true) == false) {
                        return
                    }
                    h.removeNode(A, C);
                    if (B) {
                        this.setting.treeObj.trigger(o.event.REMOVE, [A.treeId, C])
                    }
                };
                z.removeChildNodes = function (D) {
                    if (!D) {
                        return null
                    }
                    var C = A.data.key.children,
                        B = D[C];
                    h.removeChildNodes(A, D);
                    return B ? B : null
                };
                z.setEditable = function (B) {
                    A.edit.enable = B;
                    return this.refresh()
                }
            }, n = {
                setSonNodeLevel: function (C, z, E) {
                    if (!E) {
                        return
                    }
                    var D = C.data.key.children;
                    E.level = (z) ? z.level + 1 : 0;
                    if (!E[D]) {
                        return
                    }
                    for (var B = 0, A = E[D].length; B < A; B++) {
                        if (E[D][B]) {
                            w.setSonNodeLevel(C, E, E[D][B])
                        }
                    }
                }
            }, f = {}, j = {
                onHoverOverNode: function (C, B) {
                    var A = w.getSetting(C.data.treeId),
                        z = w.getRoot(A);
                    if (z.curHoverNode != B) {
                        j.onHoverOutNode(C)
                    }
                    z.curHoverNode = B;
                    h.addHoverDom(A, B)
                },
                onHoverOutNode: function (C, B) {
                    var A = w.getSetting(C.data.treeId),
                        z = w.getRoot(A);
                    if (z.curHoverNode && !w.isSelectedNode(A, z.curHoverNode)) {
                        h.removeTreeDom(A, z.curHoverNode);
                        z.curHoverNode = null
                    }
                },
                onMousedownNode: function (L, F) {
                    var T, Q, K = w.getSetting(L.data.treeId),
                        P = w.getRoot(K);
                    if (L.button == 2 || !K.edit.enable || (!K.edit.drag.isCopy && !K.edit.drag.isMove)) {
                        return true
                    }
                    var W = L.target,
                        E = w.getRoot(K).curSelectedList,
                        M = [];
                    if (!w.isSelectedNode(K, F)) {
                        M = [F]
                    } else {
                        for (T = 0, Q = E.length; T < Q; T++) {
                            if (E[T].editNameFlag && s.eqs(W.tagName, "input") && W.getAttribute("treeNode" + o.id.INPUT) !== null) {
                                return true
                            }
                            M.push(E[T]);
                            if (M[0].parentTId !== E[T].parentTId) {
                                M = [F];
                                break
                            }
                        }
                    }
                    h.editNodeBlur = true;
                    h.cancelCurEditNode(K, null, true);
                    var Z = e(document),
                        S, G, U, V = false,
                        X = K,
                        z, D, N = null,
                        C = null,
                        J = null,
                        A = o.move.TYPE_INNER,
                        R = L.clientX,
                        O = L.clientY,
                        H = (new Date()).getTime();
                    if (s.uCanDo(K)) {
                        Z.bind("mousemove", I)
                    }

                    function I(aU) {
                        if (P.dragFlag == 0 && Math.abs(R - aU.clientX) < K.edit.drag.minMoveSize && Math.abs(O - aU.clientY) < K.edit.drag.minMoveSize) {
                            return true
                        }
                        var aQ, aO, aq, aK, aC, aJ = K.data.key.children;
                        s.noSel(K);
                        e("body").css("cursor", "pointer");
                        if (P.dragFlag == 0) {
                            if (s.apply(K.callback.beforeDrag, [K.treeId, M], true) == false) {
                                Y(aU);
                                return true
                            }
                            for (aQ = 0, aO = M.length; aQ < aO; aQ++) {
                                if (aQ == 0) {
                                    P.dragNodeShowBefore = []
                                }
                                aq = M[aQ];
                                if (aq.isParent && aq.open) {
                                    h.expandCollapseNode(K, aq, !aq.open);
                                    P.dragNodeShowBefore[aq.tId] = true
                                } else {
                                    P.dragNodeShowBefore[aq.tId] = false
                                }
                            }
                            P.dragFlag = 1;
                            P.showHoverDom = false;
                            s.showIfameMask(K, true);
                            var ab = true,
                                ae = -1;
                            if (M.length > 1) {
                                var ao = M[0].parentTId ? M[0].getParentNode()[aJ] : w.getNodes(K);
                                aC = [];
                                for (aQ = 0, aO = ao.length; aQ < aO; aQ++) {
                                    if (P.dragNodeShowBefore[ao[aQ].tId] !== undefined) {
                                        if (ab && ae > -1 && (ae + 1) !== aQ) {
                                            ab = false
                                        }
                                        aC.push(ao[aQ]);
                                        ae = aQ
                                    }
                                    if (M.length === aC.length) {
                                        M = aC;
                                        break
                                    }
                                }
                            }
                            if (ab) {
                                z = M[0].getPreNode();
                                D = M[M.length - 1].getNextNode()
                            }
                            S = e("<ul class='zTreeDragUL'></ul>");
                            for (aQ = 0, aO = M.length; aQ < aO; aQ++) {
                                aq = M[aQ];
                                aq.editNameFlag = false;
                                h.selectNode(K, aq, aQ > 0);
                                h.removeTreeDom(K, aq);
                                aK = e("<li id='" + aq.tId + "_tmp'></li>");
                                aK.append(e("#" + aq.tId + o.id.A).clone());
                                aK.css("padding", "0");
                                aK.children("#" + aq.tId + o.id.A).removeClass(o.node.CURSELECTED);
                                S.append(aK);
                                if (aQ == K.edit.drag.maxShowNodeNum - 1) {
                                    aK = e("<li id='" + aq.tId + "_moretmp'><a>  ...  </a></li>");
                                    S.append(aK);
                                    break
                                }
                            }
                            S.attr("id", M[0].tId + o.id.UL + "_tmp");
                            S.addClass(K.treeObj.attr("class"));
                            S.appendTo("body");
                            G = e("<button class='tmpzTreeMove_arrow'></button>");
                            G.attr("id", "zTreeMove_arrow_tmp");
                            G.appendTo("body");
                            K.treeObj.trigger(o.event.DRAG, [K.treeId, M])
                        }
                        if (P.dragFlag == 1 && G.attr("id") != aU.target.id) {
                            if (U) {
                                U.removeClass(o.node.TMPTARGET_TREE);
                                if (J) {
                                    e("#" + J + o.id.A, U).removeClass(o.node.TMPTARGET_NODE)
                                }
                            }
                            U = null;
                            J = null;
                            V = false;
                            X = K;
                            var aR = w.getSettings();
                            for (var aL in aR) {
                                if (aR[aL].treeId && aR[aL].edit.enable && aR[aL].treeId != K.treeId && (aU.target.id == aR[aL].treeId || e(aU.target).parents("#" + aR[aL].treeId).length > 0)) {
                                    V = true;
                                    X = aR[aL]
                                }
                            }
                            var an = Z.scrollTop(),
                                aT = Z.scrollLeft(),
                                ac = X.treeObj.offset(),
                                aw = X.treeObj.get(0).scrollHeight,
                                aM = X.treeObj.get(0).scrollWidth,
                                aS = (aU.clientY + an - ac.top),
                                aI = (X.treeObj.height() + ac.top - aU.clientY - an),
                                aD = (aU.clientX + aT - ac.left),
                                am = (X.treeObj.width() + ac.left - aU.clientX - aT),
                                ap = (aS < K.edit.drag.borderMax && aS > K.edit.drag.borderMin),
                                aV = (aI < K.edit.drag.borderMax && aI > K.edit.drag.borderMin),
                                aG = (aD < K.edit.drag.borderMax && aD > K.edit.drag.borderMin),
                                ak = (am < K.edit.drag.borderMax && am > K.edit.drag.borderMin),
                                ad = aS > K.edit.drag.borderMin && aI > K.edit.drag.borderMin && aD > K.edit.drag.borderMin && am > K.edit.drag.borderMin,
                                aA = (ap && X.treeObj.scrollTop() <= 0),
                                az = (aV && (X.treeObj.scrollTop() + X.treeObj.height() + 10) >= aw),
                                ag = (aG && X.treeObj.scrollLeft() <= 0),
                                au = (ak && (X.treeObj.scrollLeft() + X.treeObj.width() + 10) >= aM);
                            if (aU.target.id && X.treeObj.find("#" + aU.target.id).length > 0) {
                                var al = aU.target;
                                while (al && al.tagName && !s.eqs(al.tagName, "li") && al.id != X.treeId) {
                                    al = al.parentNode
                                }
                                var at = true;
                                for (aQ = 0, aO = M.length; aQ < aO; aQ++) {
                                    aq = M[aQ];
                                    if (al.id === aq.tId) {
                                        at = false;
                                        break
                                    } else {
                                        if (e("#" + aq.tId).find("#" + al.id).length > 0) {
                                            at = false;
                                            break
                                        }
                                    }
                                }
                                if (at) {
                                    if (aU.target.id && (aU.target.id == (al.id + o.id.A) || e(aU.target).parents("#" + al.id + o.id.A).length > 0)) {
                                        U = e(al);
                                        J = al.id
                                    }
                                }
                            }
                            aq = M[0];
                            if (ad && (aU.target.id == X.treeId || e(aU.target).parents("#" + X.treeId).length > 0)) {
                                if (!U && (aU.target.id == X.treeId || aA || az || ag || au) && (V || (!V && aq.parentTId))) {
                                    U = X.treeObj
                                }
                                if (ap) {
                                    X.treeObj.scrollTop(X.treeObj.scrollTop() - 10)
                                } else {
                                    if (aV) {
                                        X.treeObj.scrollTop(X.treeObj.scrollTop() + 10)
                                    }
                                } if (aG) {
                                    X.treeObj.scrollLeft(X.treeObj.scrollLeft() - 10)
                                } else {
                                    if (ak) {
                                        X.treeObj.scrollLeft(X.treeObj.scrollLeft() + 10)
                                    }
                                } if (U && U != X.treeObj && U.offset().left < X.treeObj.offset().left) {
                                    X.treeObj.scrollLeft(X.treeObj.scrollLeft() + U.offset().left - X.treeObj.offset().left)
                                }
                            }
                            S.css({
                                    top: (aU.clientY + an + 3) + "px",
                                    left: (aU.clientX + aT + 3) + "px"
                                });
                            var ay = 0;
                            var ax = 0;
                            if (U && U.attr("id") != X.treeId) {
                                var aH = J == null ? null : w.getNodeCache(X, J),
                                    aB = (aU.ctrlKey && K.edit.drag.isMove && K.edit.drag.isCopy) || (!K.edit.drag.isMove && K.edit.drag.isCopy),
                                    ai = !! (z && J === z.tId),
                                    aF = !! (D && J === D.tId),
                                    aP = (aq.parentTId && aq.parentTId == J),
                                    aE = (aB || !aF) && s.apply(X.edit.drag.prev, [X.treeId, M, aH], !! X.edit.drag.prev),
                                    ah = (aB || !ai) && s.apply(X.edit.drag.next, [X.treeId, M, aH], !! X.edit.drag.next),
                                    aa = (aB || !aP) && !(X.data.keep.leaf && !aH.isParent) && s.apply(X.edit.drag.inner, [X.treeId, M, aH], !! X.edit.drag.inner);
                                if (!aE && !ah && !aa) {
                                    U = null;
                                    J = "";
                                    A = o.move.TYPE_INNER;
                                    G.css({
                                            display: "none"
                                        });
                                    if (window.zTreeMoveTimer) {
                                        clearTimeout(window.zTreeMoveTimer);
                                        window.zTreeMoveTargetNodeTId = null
                                    }
                                } else {
                                    var av = e("#" + J + o.id.A, U);
                                    av.addClass(o.node.TMPTARGET_NODE);
                                    var aN = aE ? (aa ? 0.25 : (ah ? 0.5 : 1)) : -1,
                                        aj = ah ? (aa ? 0.75 : (aE ? 0.5 : 0)) : -1,
                                        af = (aU.clientY + an - av.offset().top) / av.height();
                                    if ((aN == 1 || af <= aN && af >= -0.2) && aE) {
                                        ay = 1 - G.width();
                                        ax = 0 - G.height() / 2;
                                        A = o.move.TYPE_PREV
                                    } else {
                                        if ((aj == 0 || af >= aj && af <= 1.2) && ah) {
                                            ay = 1 - G.width();
                                            ax = av.height() - G.height() / 2;
                                            A = o.move.TYPE_NEXT
                                        } else {
                                            ay = 5 - G.width();
                                            ax = 0;
                                            A = o.move.TYPE_INNER
                                        }
                                    }
                                    G.css({
                                            display: "block",
                                            top: (av.offset().top + ax) + "px",
                                            left: (av.offset().left + ay) + "px"
                                        });
                                    if (N != J || C != A) {
                                        H = (new Date()).getTime()
                                    }
                                    if (aH && aH.isParent && A == o.move.TYPE_INNER) {
                                        var ar = true;
                                        if (window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== aH.tId) {
                                            clearTimeout(window.zTreeMoveTimer);
                                            window.zTreeMoveTargetNodeTId = null
                                        } else {
                                            if (window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === aH.tId) {
                                                ar = false
                                            }
                                        } if (ar) {
                                            window.zTreeMoveTimer = setTimeout(function () {
                                                    if (A != o.move.TYPE_INNER) {
                                                        return
                                                    }
                                                    if (aH && aH.isParent && !aH.open && (new Date()).getTime() - H > X.edit.drag.autoOpenTime && s.apply(X.callback.beforeDragOpen, [X.treeId, aH], true)) {
                                                        h.switchNode(X, aH);
                                                        if (X.edit.drag.autoExpandTrigger) {
                                                            X.treeObj.trigger(o.event.EXPAND, [X.treeId, aH])
                                                        }
                                                    }
                                                }, X.edit.drag.autoOpenTime + 50);
                                            window.zTreeMoveTargetNodeTId = aH.tId
                                        }
                                    }
                                }
                            } else {
                                A = o.move.TYPE_INNER;
                                if (U && s.apply(X.edit.drag.inner, [X.treeId, M, null], !! X.edit.drag.inner)) {
                                    U.addClass(o.node.TMPTARGET_TREE)
                                } else {
                                    U = null
                                }
                                G.css({
                                        display: "none"
                                    });
                                if (window.zTreeMoveTimer) {
                                    clearTimeout(window.zTreeMoveTimer);
                                    window.zTreeMoveTargetNodeTId = null
                                }
                            }
                            N = J;
                            C = A
                        }
                        return false
                    }
                    Z.bind("mouseup", Y);

                    function Y(aa) {
                        if (window.zTreeMoveTimer) {
                            clearTimeout(window.zTreeMoveTimer);
                            window.zTreeMoveTargetNodeTId = null
                        }
                        N = null;
                        C = null;
                        Z.unbind("mousemove", I);
                        Z.unbind("mouseup", Y);
                        Z.unbind("selectstart", B);
                        e("body").css("cursor", "auto");
                        if (U) {
                            U.removeClass(o.node.TMPTARGET_TREE);
                            if (J) {
                                e("#" + J + o.id.A, U).removeClass(o.node.TMPTARGET_NODE)
                            }
                        }
                        s.showIfameMask(K, false);
                        P.showHoverDom = true;
                        if (P.dragFlag == 0) {
                            return
                        }
                        P.dragFlag = 0;
                        var af, ad, ac, ab = K.data.key.children;
                        for (af = 0, ad = M.length; af < ad; af++) {
                            ac = M[af];
                            if (ac.isParent && P.dragNodeShowBefore[ac.tId] && !ac.open) {
                                h.expandCollapseNode(K, ac, !ac.open);
                                delete P.dragNodeShowBefore[ac.tId]
                            }
                        }
                        if (S) {
                            S.remove()
                        }
                        if (G) {
                            G.remove()
                        }
                        var ah = (aa.ctrlKey && K.edit.drag.isMove && K.edit.drag.isCopy) || (!K.edit.drag.isMove && K.edit.drag.isCopy);
                        if (!ah && U && J && M[0].parentTId && J == M[0].parentTId && A == o.move.TYPE_INNER) {
                            U = null
                        }
                        if (U) {
                            var ai = J == null ? null : w.getNodeCache(X, J);
                            if (s.apply(K.callback.beforeDrop, [X.treeId, M, ai, A], true) == false) {
                                return
                            }
                            var ae = ah ? s.clone(M) : M;

                            function ag() {
                                if (V) {
                                    if (!ah) {
                                        for (var ak = 0, aj = M.length; ak < aj; ak++) {
                                            h.removeNode(K, M[ak])
                                        }
                                    }
                                    if (A == o.move.TYPE_INNER) {
                                        h.addNodes(X, ai, ae)
                                    } else {
                                        h.addNodes(X, ai.getParentNode(), ae);
                                        if (A == o.move.TYPE_PREV) {
                                            for (ak = 0, aj = ae.length; ak < aj; ak++) {
                                                h.moveNode(X, ai, ae[ak], A, false)
                                            }
                                        } else {
                                            for (ak = -1, aj = ae.length - 1; ak < aj; aj--) {
                                                h.moveNode(X, ai, ae[aj], A, false)
                                            }
                                        }
                                    }
                                } else {
                                    if (ah && A == o.move.TYPE_INNER) {
                                        h.addNodes(X, ai, ae)
                                    } else {
                                        if (ah) {
                                            h.addNodes(X, ai.getParentNode(), ae)
                                        }
                                        if (A == o.move.TYPE_PREV) {
                                            for (ak = 0, aj = ae.length; ak < aj; ak++) {
                                                h.moveNode(X, ai, ae[ak], A, false)
                                            }
                                        } else {
                                            for (ak = -1, aj = ae.length - 1; ak < aj; aj--) {
                                                h.moveNode(X, ai, ae[aj], A, false)
                                            }
                                        }
                                    }
                                }
                                for (ak = 0, aj = ae.length; ak < aj; ak++) {
                                    h.selectNode(X, ae[ak], ak > 0)
                                }
                                e("#" + ae[0].tId + o.id.ICON).focus().blur()
                            }
                            if (A == o.move.TYPE_INNER && s.canAsync(X, ai)) {
                                h.asyncNode(X, ai, false, ag)
                            } else {
                                ag()
                            }
                            K.treeObj.trigger(o.event.DROP, [X.treeId, ae, ai, A])
                        } else {
                            for (af = 0, ad = M.length; af < ad; af++) {
                                h.selectNode(X, M[af], af > 0)
                            }
                            K.treeObj.trigger(o.event.DROP, [K.treeId, null, null, null])
                        }
                    }
                    Z.bind("selectstart", B);

                    function B() {
                        return false
                    }
                    if (L.preventDefault) {
                        L.preventDefault()
                    }
                    return true
                }
            }, g = {
                getAbs: function (z) {
                    var A = z.getBoundingClientRect();
                    return [A.left, A.top]
                },
                inputFocus: function (z) {
                    if (z.get(0)) {
                        z.focus();
                        s.setCursorPosition(z.get(0), z.val().length)
                    }
                },
                inputSelect: function (z) {
                    if (z.get(0)) {
                        z.focus();
                        z.select()
                    }
                },
                setCursorPosition: function (A, B) {
                    if (A.setSelectionRange) {
                        A.focus();
                        A.setSelectionRange(B, B)
                    } else {
                        if (A.createTextRange) {
                            var z = A.createTextRange();
                            z.collapse(true);
                            z.moveEnd("character", B);
                            z.moveStart("character", B);
                            z.select()
                        }
                    }
                },
                showIfameMask: function (G, E) {
                    var D = w.getRoot(G);
                    while (D.dragMaskList.length > 0) {
                        D.dragMaskList[0].remove();
                        D.dragMaskList.shift()
                    }
                    if (E) {
                        var H = e("iframe");
                        for (var C = 0, A = H.length; C < A; C++) {
                            var B = H.get(C),
                                z = s.getAbs(B),
                                F = e("<div id='zTreeMask_" + C + "' class='zTreeMask' style='background-color:yellow;opacity: 0.3;filter: alpha(opacity=30);    top:" + z[1] + "px; left:" + z[0] + "px; width:" + B.offsetWidth + "px; height:" + B.offsetHeight + "px;'></div>");
                            F.appendTo("body");
                            D.dragMaskList.push(F)
                        }
                    }
                }
            }, c = {
                addEditBtn: function (A, B) {
                    if (B.editNameFlag || e("#" + B.tId + o.id.EDIT).length > 0) {
                        return
                    }
                    if (!s.apply(A.edit.showRenameBtn, [A.treeId, B], A.edit.showRenameBtn)) {
                        return
                    }
                    var C = e("#" + B.tId + o.id.A),
                        z = "<button type='button' class='edit' id='" + B.tId + o.id.EDIT + "' title='" + s.apply(A.edit.renameTitle, [A.treeId, B], A.edit.renameTitle) + "' treeNode" + o.id.EDIT + " onfocus='this.blur();' style='display:none;'></button>";
                    C.append(z);
                    e("#" + B.tId + o.id.EDIT).bind("click", function () {
                            if (!s.uCanDo(A) || s.apply(A.callback.beforeEditName, [A.treeId, B], true) == false) {
                                return true
                            }
                            h.editNode(A, B);
                            return false
                        }).show()
                },
                addRemoveBtn: function (z, A) {
                    if (A.editNameFlag || e("#" + A.tId + o.id.REMOVE).length > 0) {
                        return
                    }
                    if (!s.apply(z.edit.showRemoveBtn, [z.treeId, A], z.edit.showRemoveBtn)) {
                        return
                    }
                    var C = e("#" + A.tId + o.id.A),
                        B = "<button type='button' class='remove' id='" + A.tId + o.id.REMOVE + "' title='" + s.apply(z.edit.removeTitle, [z.treeId, A], z.edit.removeTitle) + "' treeNode" + o.id.REMOVE + " onfocus='this.blur();' style='display:none;'></button>";
                    C.append(B);
                    e("#" + A.tId + o.id.REMOVE).bind("click", function () {
                            if (!s.uCanDo(z) || s.apply(z.callback.beforeRemove, [z.treeId, A], true) == false) {
                                return true
                            }
                            h.removeNode(z, A);
                            z.treeObj.trigger(o.event.REMOVE, [z.treeId, A]);
                            return false
                        }).bind("mousedown", function (D) {
                            return true
                        }).show()
                },
                addHoverDom: function (z, A) {
                    if (w.getRoot(z).showHoverDom) {
                        A.isHover = true;
                        if (z.edit.enable) {
                            h.addEditBtn(z, A);
                            h.addRemoveBtn(z, A)
                        }
                        s.apply(z.view.addHoverDom, [z.treeId, A])
                    }
                },
                cancelCurEditNode: function (G, H, F) {
                    var E = w.getRoot(G),
                        C = G.data.key.name,
                        A = E.curEditNode;
                    if (A) {
                        var B = E.curEditInput;
                        var D = H ? H : B.val();
                        if (!H && s.apply(G.callback.beforeRename, [G.treeId, A, D], true) === false) {
                            A.editNameFlag = true;
                            return false
                        } else {
                            A[C] = D ? D : B.val();
                            if (!H) {
                                G.treeObj.trigger(o.event.RENAME, [G.treeId, A])
                            }
                        }
                        var z = e("#" + A.tId + o.id.A);
                        z.removeClass(o.node.CURSELECTED_EDIT);
                        B.unbind();
                        h.setNodeName(G, A);
                        A.editNameFlag = false;
                        E.curEditNode = null;
                        E.curEditInput = null;
                        h.selectNode(G, A, false)
                    }
                    E.noSelection = true;
                    return true
                },
                editNode: function (C, D) {
                    var z = w.getRoot(C);
                    h.editNodeBlur = false;
                    if (w.isSelectedNode(C, D) && z.curEditNode == D && D.editNameFlag) {
                        setTimeout(function () {
                                s.inputFocus(z.curEditInput)
                            }, 0);
                        return
                    }
                    var B = C.data.key.name;
                    D.editNameFlag = true;
                    h.removeTreeDom(C, D);
                    h.cancelCurEditNode(C);
                    h.selectNode(C, D, false);
                    e("#" + D.tId + o.id.SPAN).html("<input type=text class='rename' id='" + D.tId + o.id.INPUT + "' treeNode" + o.id.INPUT + " >");
                    var A = e("#" + D.tId + o.id.INPUT);
                    A.attr("value", D[B]);
                    if (C.edit.editNameSelectAll) {
                        s.inputSelect(A)
                    } else {
                        s.inputFocus(A)
                    }
                    A.bind("blur", function (E) {
                            if (!h.editNodeBlur) {
                                h.cancelCurEditNode(C)
                            }
                        }).bind("keydown", function (E) {
                            if (E.keyCode == "13") {
                                h.editNodeBlur = true;
                                h.cancelCurEditNode(C, null, true)
                            } else {
                                if (E.keyCode == "27") {
                                    h.cancelCurEditNode(C, D[B])
                                }
                            }
                        }).bind("click", function (E) {
                            return false
                        }).bind("dblclick", function (E) {
                            return false
                        });
                    e("#" + D.tId + o.id.A).addClass(o.node.CURSELECTED_EDIT);
                    z.curEditInput = A;
                    z.noSelection = false;
                    z.curEditNode = D
                },
                moveNode: function (J, C, M, B, W, D) {
                    var O = w.getRoot(J),
                        H = J.data.key.children;
                    if (C == M) {
                        return
                    }
                    if (J.data.keep.leaf && C && !C.isParent && B == o.move.TYPE_INNER) {
                        return
                    }
                    var R = (M.parentTId ? M.getParentNode() : O),
                        L = (C === null || C == O);
                    if (L && C === null) {
                        C = O
                    }
                    if (L) {
                        B = o.move.TYPE_INNER
                    }
                    var z = (C.parentTId ? C.getParentNode() : O);
                    if (B != o.move.TYPE_PREV && B != o.move.TYPE_NEXT) {
                        B = o.move.TYPE_INNER
                    }
                    var E, F;
                    if (L) {
                        E = J.treeObj;
                        F = E
                    } else {
                        if (!D) {
                            if (B == o.move.TYPE_INNER) {
                                h.expandCollapseNode(J, C, true, false)
                            } else {
                                h.expandCollapseNode(J, C.getParentNode(), true, false)
                            }
                            E = e("#" + C.tId);
                            F = e("#" + C.tId + o.id.UL)
                        }
                    }
                    var T = e("#" + M.tId).remove();
                    if (F && B == o.move.TYPE_INNER) {
                        F.append(T)
                    } else {
                        if (E && B == o.move.TYPE_PREV) {
                            E.before(T)
                        } else {
                            if (E && B == o.move.TYPE_NEXT) {
                                E.after(T)
                            }
                        }
                    }
                    var Q, P, G = -1,
                        S = 0,
                        V = null,
                        A = null,
                        U = M.level;
                    if (M.isFirstNode) {
                        G = 0;
                        if (R[H].length > 1) {
                            V = R[H][1];
                            V.isFirstNode = true
                        }
                    } else {
                        if (M.isLastNode) {
                            G = R[H].length - 1;
                            V = R[H][G - 1];
                            V.isLastNode = true
                        } else {
                            for (Q = 0, P = R[H].length; Q < P; Q++) {
                                if (R[H][Q].tId == M.tId) {
                                    G = Q;
                                    break
                                }
                            }
                        }
                    } if (G >= 0) {
                        R[H].splice(G, 1)
                    }
                    if (B != o.move.TYPE_INNER) {
                        for (Q = 0, P = z[H].length; Q < P; Q++) {
                            if (z[H][Q].tId == C.tId) {
                                S = Q
                            }
                        }
                    }
                    if (B == o.move.TYPE_INNER) {
                        if (L) {
                            M.parentTId = null
                        } else {
                            C.isParent = true;
                            C.open = false;
                            M.parentTId = C.tId
                        } if (!C[H]) {
                            C[H] = new Array()
                        }
                        if (C[H].length > 0) {
                            A = C[H][C[H].length - 1];
                            A.isLastNode = false
                        }
                        C[H].splice(C[H].length, 0, M);
                        M.isLastNode = true;
                        M.isFirstNode = (C[H].length == 1)
                    } else {
                        if (C.isFirstNode && B == o.move.TYPE_PREV) {
                            z[H].splice(S, 0, M);
                            A = C;
                            A.isFirstNode = false;
                            M.parentTId = C.parentTId;
                            M.isFirstNode = true;
                            M.isLastNode = false
                        } else {
                            if (C.isLastNode && B == o.move.TYPE_NEXT) {
                                z[H].splice(S + 1, 0, M);
                                A = C;
                                A.isLastNode = false;
                                M.parentTId = C.parentTId;
                                M.isFirstNode = false;
                                M.isLastNode = true
                            } else {
                                if (B == o.move.TYPE_PREV) {
                                    z[H].splice(S, 0, M)
                                } else {
                                    z[H].splice(S + 1, 0, M)
                                }
                                M.parentTId = C.parentTId;
                                M.isFirstNode = false;
                                M.isLastNode = false
                            }
                        }
                    }
                    w.fixPIdKeyValue(J, M);
                    w.setSonNodeLevel(J, M.getParentNode(), M);
                    h.setNodeLineIcos(J, M);
                    h.repairNodeLevelClass(J, M, U);
                    if (!J.data.keep.parent && R[H].length < 1) {
                        R.isParent = false;
                        R.open = false;
                        var K = e("#" + R.tId + o.id.UL),
                            N = e("#" + R.tId + o.id.SWITCH),
                            I = e("#" + R.tId + o.id.ICON);
                        h.replaceSwitchClass(R, N, o.folder.DOCU);
                        h.replaceIcoClass(R, I, o.folder.DOCU);
                        K.css("display", "none")
                    } else {
                        if (V) {
                            h.setNodeLineIcos(J, V)
                        }
                    } if (A) {
                        h.setNodeLineIcos(J, A)
                    }
                    if (J.check.enable && h.repairChkClass) {
                        h.repairChkClass(J, R);
                        h.repairParentChkClassWithSelf(J, R);
                        if (R != M.parent) {
                            h.repairParentChkClassWithSelf(J, M)
                        }
                    }
                    if (!D) {
                        h.expandCollapseParentNode(J, M.getParentNode(), true, W)
                    }
                },
                removeChildNodes: function (E, G) {
                    if (!G) {
                        return
                    }
                    var F = E.data.key.children,
                        C = G[F];
                    if (!C) {
                        return
                    }
                    e("#" + G.tId + o.id.UL).remove();
                    for (var D = 0, z = C.length; D < z; D++) {
                        w.removeNodeCache(E, C[D])
                    }
                    w.removeSelectedNode(E);
                    delete G[F];
                    if (!E.data.keep.parent) {
                        G.isParent = false;
                        G.open = false;
                        var B = e("#" + G.tId + o.id.SWITCH),
                            A = e("#" + G.tId + o.id.ICON);
                        h.replaceSwitchClass(G, B, o.folder.DOCU);
                        h.replaceIcoClass(G, A, o.folder.DOCU)
                    }
                },
                removeEditBtn: function (z) {
                    e("#" + z.tId + o.id.EDIT).unbind().remove()
                },
                removeNode: function (K, A) {
                    var I = w.getRoot(K),
                        z = K.data.key.children,
                        G = (A.parentTId) ? A.getParentNode() : I;
                    if (I.curEditNode === A) {
                        I.curEditNode = null
                    }
                    A.isFirstNode = false;
                    A.isLastNode = false;
                    A.getPreNode = function () {
                        return null
                    };
                    A.getNextNode = function () {
                        return null
                    };
                    e("#" + A.tId).remove();
                    w.removeNodeCache(K, A);
                    w.removeSelectedNode(K, A);
                    for (var F = 0, B = G[z].length; F < B; F++) {
                        if (G[z][F].tId == A.tId) {
                            G[z].splice(F, 1);
                            break
                        }
                    }
                    var H, C, E;
                    if (!K.data.keep.parent && G[z].length < 1) {
                        G.isParent = false;
                        G.open = false;
                        H = e("#" + G.tId + o.id.UL);
                        C = e("#" + G.tId + o.id.SWITCH);
                        E = e("#" + G.tId + o.id.ICON);
                        h.replaceSwitchClass(G, C, o.folder.DOCU);
                        h.replaceIcoClass(G, E, o.folder.DOCU);
                        H.css("display", "none")
                    } else {
                        if (K.view.showLine && G[z].length > 0) {
                            var D = G[z][G[z].length - 1];
                            D.isLastNode = true;
                            D.isFirstNode = (G[z].length == 1);
                            H = e("#" + D.tId + o.id.UL);
                            C = e("#" + D.tId + o.id.SWITCH);
                            E = e("#" + D.tId + o.id.ICON);
                            if (G == I) {
                                if (G[z].length == 1) {
                                    h.replaceSwitchClass(D, C, o.line.ROOT)
                                } else {
                                    var J = e("#" + G[z][0].tId + o.id.SWITCH);
                                    h.replaceSwitchClass(G[z][0], J, o.line.ROOTS);
                                    h.replaceSwitchClass(D, C, o.line.BOTTOM)
                                }
                            } else {
                                h.replaceSwitchClass(D, C, o.line.BOTTOM)
                            }
                            H.removeClass(o.line.LINE)
                        }
                    }
                },
                removeRemoveBtn: function (z) {
                    e("#" + z.tId + o.id.REMOVE).unbind().remove()
                },
                removeTreeDom: function (z, A) {
                    A.isHover = false;
                    h.removeEditBtn(A);
                    h.removeRemoveBtn(A);
                    s.apply(z.view.removeHoverDom, [z.treeId, A])
                },
                repairNodeLevelClass: function (A, C, B) {
                    if (B === C.level) {
                        return
                    }
                    var D = e("#" + C.tId),
                        G = e("#" + C.tId + o.id.A),
                        F = e("#" + C.tId + o.id.UL),
                        z = "level" + B,
                        E = "level" + C.level;
                    D.removeClass(z);
                    D.addClass(E);
                    G.removeClass(z);
                    G.addClass(E);
                    F.removeClass(z);
                    F.addClass(E)
                }
            }, q = {
                tools: g,
                view: c,
                event: p,
                data: n
            };
        e.extend(true, e.fn.zTree.consts, y);
        e.extend(true, e.fn.zTree._z, q);
        var a = e.fn.zTree,
            s = a._z.tools,
            o = a.consts,
            h = a._z.view,
            w = a._z.data,
            p = a._z.event;
        w.exSetting(k);
        w.addInitBind(l);
        w.addInitCache(b);
        w.addInitNode(t);
        w.addInitProxy(m);
        w.addInitRoot(u);
        w.addZTreeTools(i);
        var r = h.cancelPreSelectedNode;
        h.cancelPreSelectedNode = function (B, C) {
            var D = w.getRoot(B).curSelectedList;
            for (var A = 0, z = D.length; A < z; A++) {
                if (!C || C === D[A]) {
                    h.removeTreeDom(B, D[A]);
                    if (C) {
                        break
                    }
                }
            }
            if (r) {
                r.apply(h, arguments)
            }
        };
        var v = h.createNodes;
        h.createNodes = function (B, C, A, z) {
            if (v) {
                v.apply(h, arguments)
            }
            if (!A) {
                return
            }
            if (h.repairParentChkClassWithSelf) {
                h.repairParentChkClassWithSelf(B, z)
            }
        };
        h.makeNodeUrl = function (z, A) {
            return (A.url && !z.edit.enable) ? A.url : null
        };
        var x = h.selectNode;
        h.selectNode = function (B, C, A) {
            var z = w.getRoot(B);
            if (w.isSelectedNode(B, C) && z.curEditNode == C && C.editNameFlag) {
                return false
            }
            if (x) {
                x.apply(h, arguments)
            }
            h.addHoverDom(B, C);
            return true
        };
        var d = s.uCanDo;
        s.uCanDo = function (A, B) {
            var z = w.getRoot(A);
            if (B && (s.eqs(B.type, "mouseover") || s.eqs(B.type, "mouseout") || s.eqs(B.type, "mousedown") || s.eqs(B.type, "mouseup"))) {
                return true
            }
            return (!z.curEditNode) && (d ? d.apply(h, arguments) : true)
        }
    })(jQuery);