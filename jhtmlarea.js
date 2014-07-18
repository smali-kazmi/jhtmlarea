// jHtmlArea - http://jhtmlarea.codeplex.com - (c)2012 Chris Pietschmann
; 
(function(e){e.fn.htmlarea=function(e){if(e&&typeof e==="string"){var n=[];for(var r=1;r<arguments.length;r++){n.push(arguments[r])}var i=t(this[0]);var s=i[e];if(s){return s.apply(i,n)}}return this.each(function(){t(this,e)})};var t=window.jHtmlArea=function(e,n){if(e.jquery){return t(e[0])}if(e.jhtmlareaObject){return e.jhtmlareaObject}else{return new t.fn.init(e,n)}};t.fn=t.prototype={jhtmlarea:"0.7.5",init:function(r,i){if(r.nodeName.toLowerCase()==="textarea"){var s=e.extend({},t.defaultOptions,i);r.jhtmlareaObject=this;var o=this.textarea=e(r);var u=this.container=e("<div/>").addClass("jHtmlArea").width(o.width()).insertAfter(o);var a=this.toolbar=e("<div/>").addClass("ToolBar").appendTo(u);n.initToolBar.call(this,s);var f=this.iframe=e("<iframe/>").height(o.height());f.width(o.width()-(e.browser.msie?0:4));var l=this.htmlarea=e("<div/>").append(f);u.append(l).append(o.hide());n.initEditor.call(this,s);n.attachEditorEvents.call(this);f.height(f.height()-a.height());a.width(o.width()-2);if(s.loaded){s.loaded.call(this)}}},dispose:function(){this.textarea.show().insertAfter(this.container);this.container.remove();this.textarea[0].jhtmlareaObject=null},execCommand:function(e,t,n){this.iframe[0].contentWindow.focus();this.editor.execCommand(e,t||false,n||null);this.updateTextArea()},ec:function(e,t,n){this.execCommand(e,t,n)},queryCommandValue:function(e){this.iframe[0].contentWindow.focus();return this.editor.queryCommandValue(e)},qc:function(e){return this.queryCommandValue(e)},getSelectedHTML:function(){if(e.browser.msie){return this.getRange().htmlText}else{var t=this.getRange().cloneContents();return e("<p/>").append(e(t)).html()}},getSelection:function(){if(e.browser.msie){return this.editor.selection}else{return this.iframe[0].contentDocument.defaultView.getSelection()}},getRange:function(){var e=this.getSelection();if(!e){return null}return e.getRangeAt?e.getRangeAt(0):e.createRange()},html:function(e){if(e){this.textarea.val(e);this.updateHtmlArea()}else{return this.toHtmlString()}},pasteHTML:function(t){this.iframe[0].contentWindow.focus();var n=this.getRange();if(e.browser.msie){n.pasteHTML(t)}else if(e.browser.mozilla){n.deleteContents();n.insertNode(e(t.indexOf("<")!=0?e("<span/>").append(t):t)[0])}else{n.deleteContents();n.insertNode(e(this.iframe[0].contentWindow.document.createElement("span")).append(e(t.indexOf("<")!=0?"<span>"+t+"</span>":t))[0])}n.collapse(false);n.select()},cut:function(){this.ec("cut")},copy:function(){this.ec("copy")},paste:function(){this.ec("paste")},bold:function(){this.ec("bold")},italic:function(){this.ec("italic")},underline:function(){this.ec("underline")},strikeThrough:function(){this.ec("strikethrough")},image:function(t){if(e.browser.msie&&!t){this.ec("insertImage",true)}else{this.ec("insertImage",false,t||prompt("Image URL:","http://"))}},removeFormat:function(){this.ec("removeFormat",false,[]);this.unlink()},link:function(t){if(e.browser.msie&&!t){this.ec("createLink",true)}else{this.ec("createLink",false,t||prompt("Link URL:","http://"))}},unlink:function(){this.ec("unlink",false,[])},orderedList:function(){this.ec("insertorderedlist")},unorderedList:function(){this.ec("insertunorderedlist")},superscript:function(){this.ec("superscript")},subscript:function(){this.ec("subscript")},p:function(){this.formatBlock("<p>")},h1:function(){this.heading(1)},h2:function(){this.heading(2)},h3:function(){this.heading(3)},h4:function(){this.heading(4)},h5:function(){this.heading(5)},h6:function(){this.heading(6)},heading:function(t){this.formatBlock(e.browser.msie?"Heading "+t:"h"+t)},indent:function(){this.ec("indent")},outdent:function(){this.ec("outdent")},insertHorizontalRule:function(){this.ec("insertHorizontalRule",false,"ht")},justifyLeft:function(){this.ec("justifyLeft")},justifyCenter:function(){this.ec("justifyCenter")},justifyRight:function(){this.ec("justifyRight")},increaseFontSize:function(){if(e.browser.msie){this.ec("fontSize",false,this.qc("fontSize")+1)}else if(e.browser.safari){this.getRange().surroundContents(e(this.iframe[0].contentWindow.document.createElement("span")).css("font-size","larger")[0])}else{this.ec("increaseFontSize",false,"big")}},decreaseFontSize:function(){if(e.browser.msie){this.ec("fontSize",false,this.qc("fontSize")-1)}else if(e.browser.safari){this.getRange().surroundContents(e(this.iframe[0].contentWindow.document.createElement("span")).css("font-size","smaller")[0])}else{this.ec("decreaseFontSize",false,"small")}},forecolor:function(e){this.ec("foreColor",false,e||prompt("Enter HTML Color:","#"))},formatBlock:function(e){this.ec("formatblock",false,e||null)},showHTMLView:function(){this.updateTextArea();this.textarea.show();this.htmlarea.hide();e("ul li:not(li:has(a.html))",this.toolbar).hide();e("ul:not(:has(:visible))",this.toolbar).hide();e("ul li a.html",this.toolbar).addClass("highlighted")},hideHTMLView:function(){this.updateHtmlArea();this.textarea.hide();this.htmlarea.show();e("ul",this.toolbar).show();e("ul li",this.toolbar).show().find("a.html").removeClass("highlighted")},toggleHTMLView:function(){this.textarea.is(":hidden")?this.showHTMLView():this.hideHTMLView()},toHtmlString:function(){return this.editor.body.innerHTML},toString:function(){return this.editor.body.innerText},updateTextArea:function(){this.textarea.val(this.toHtmlString())},updateHtmlArea:function(){this.editor.body.innerHTML=this.textarea.val()}};t.fn.init.prototype=t.fn;t.defaultOptions={toolbar:[["html"],["bold","italic","underline","strikethrough","|","subscript","superscript"],["increasefontsize","decreasefontsize"],["orderedlist","unorderedlist"],["indent","outdent"],["justifyleft","justifycenter","justifyright"],["link","unlink","image","horizontalrule"],["p","h1","h2","h3","h4","h5","h6"],["cut","copy","paste"]],css:null,toolbarText:{bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strike-Through",cut:"Cut",copy:"Copy",paste:"Paste",h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6",p:"Paragraph",indent:"Indent",outdent:"Outdent",horizontalrule:"Insert Horizontal Rule",justifyleft:"Left Justify",justifycenter:"Center Justify",justifyright:"Right Justify",increasefontsize:"Increase Font Size",decreasefontsize:"Decrease Font Size",forecolor:"Text Color",link:"Insert Link",unlink:"Remove Link",image:"Insert Image",orderedlist:"Insert Ordered List",unorderedlist:"Insert Unordered List",subscript:"Subscript",superscript:"Superscript",html:"Show/Hide HTML Source View"}};var n={toolbarButtons:{strikethrough:"strikeThrough",orderedlist:"orderedList",unorderedlist:"unorderedList",horizontalrule:"insertHorizontalRule",justifyleft:"justifyLeft",justifycenter:"justifyCenter",justifyright:"justifyRight",increasefontsize:"increaseFontSize",decreasefontsize:"decreaseFontSize",html:function(e){this.toggleHTMLView()}},initEditor:function(e){var t=this.editor=this.iframe[0].contentWindow.document;t.designMode="on";t.open();t.write(this.textarea.val());t.close();if(e.css){var n=t.createElement("link");n.rel="stylesheet";n.type="text/css";n.href=e.css;t.getElementsByTagName("head")[0].appendChild(n)}},initToolBar:function(t){function s(s){var o=e("<ul/>").appendTo(r.toolbar);for(var u=0;u<s.length;u++){var a=s[u];if((typeof a).toLowerCase()==="string"){if(a==="|"){o.append(e('<li class="separator"/>'))}else{var f=function(e){var t=n.toolbarButtons[e]||e;if((typeof t).toLowerCase()==="function"){return function(e){t.call(this,e)}}else{return function(){this[t]();this.editor.body.focus()}}}(a.toLowerCase());var l=t.toolbarText[a.toLowerCase()];o.append(i(a.toLowerCase(),l||a,f))}}else{o.append(i(a.css,a.text,a.action))}}}var r=this;var i=function(t,n,i){return e("<li/>").append(e("<a href='javascript:void(0);'/>").addClass(t).attr("title",n).click(function(){i.call(r,e(this))}))};if(t.toolbar.length!==0&&n.isArray(t.toolbar[0])){for(var o=0;o<t.toolbar.length;o++){s(t.toolbar[o])}}else{s(t.toolbar)}},attachEditorEvents:function(){var t=this;var n=function(){t.updateHtmlArea()};this.textarea.click(n).keyup(n).keydown(n).mousedown(n).blur(n);var r=function(){t.updateTextArea()};e(this.editor.body).click(r).keyup(r).keydown(r).mousedown(r).blur(r);e("form").submit(function(){t.toggleHTMLView();t.toggleHTMLView()});if(window.__doPostBack){var i=__doPostBack;window.__doPostBack=function(){if(t){if(t.toggleHTMLView){t.toggleHTMLView();t.toggleHTMLView()}}return i.apply(window,arguments)}}},isArray:function(e){return e&&typeof e==="object"&&typeof e.length==="number"&&typeof e.splice==="function"&&!e.propertyIsEnumerable("length")}}})(jQuery);