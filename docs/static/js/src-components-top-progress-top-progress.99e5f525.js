(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"./src/components/TopProgress/TopProgress.mdx":function(e,n,t){"use strict";t.r(n);t("./node_modules/antd/es/button/style/index.js");var o=t("./node_modules/antd/es/button/index.js"),r=(t("./node_modules/antd/es/form/style/index.js"),t("./node_modules/antd/es/form/index.js")),a=(t("./node_modules/antd/es/col/style/index.js"),t("./node_modules/antd/es/col/index.js")),s=(t("./node_modules/antd/es/row/style/index.js"),t("./node_modules/antd/es/row/index.js")),i=(t("./node_modules/antd/es/input/style/index.js"),t("./node_modules/antd/es/input/index.js")),p=t("./node_modules/react/index.js"),l=t.n(p),u=t("./node_modules/@mdx-js/tag/dist/index.js"),c=t("./node_modules/docz/dist/index.m.js"),m=t("./node_modules/nprogress/nprogress.js"),d=t.n(m);t("./src/components/TopProgress/TopProgress.scss");function f(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],o=!0,r=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(o=(s=i.next()).done)&&(t.push(s.value),!n||t.length!==n);o=!0);}catch(p){r=!0,a=p}finally{try{o||null==i.return||i.return()}finally{if(r)throw a}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function y(){return(y=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}var g=function(e){y({},e);return l.a.createElement(p.Fragment,null)};Object.entries(d.a).forEach(function(e){var n=f(e,2),t=n[0],o=n[1];g[t]=o}),g.defaultProps={status:!1,"options.minimum":.08,"options.template":'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',"options.easing":"ease","options.speed":200,"options.trickle":!0,"options.trickleSpeed":200,"options.showSpinner":!1,"options.parent":"body"};var v=g;function b(e){return(b="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}function _(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function E(e,n){return!n||"object"!==b(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,n){return(T=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}g.__docgenInfo={description:"",methods:[],displayName:"topProgress",props:{status:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"\u8fdb\u5ea6\u6761\u5b8c\u6210\u4ee5\u540e\u662f\u5426\u7ee7\u7eed\u663e\u793a, true \u4e3a\u663e\u793a false \u4e3a\u4e0d\u663e\u793a"},"options.minimum":{defaultValue:{value:"0.08",computed:!1},type:{name:"number"},required:!1,description:"\u8fdb\u5ea6\u6761\u542f\u52a8\u65f6\u5019\u9ed8\u8ba4\u586b\u5145\u591a\u5c11\u8fdb\u5ea6 0 - 1 \u4ee5\u5185\u4efb\u4f55\u6d6e\u70b9\u6570"},"options.template":{defaultValue:{value:'\'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>\'',computed:!1},type:{name:"string"},required:!1,description:"\u8fdb\u5ea6\u6761\u81ea\u5b9a\u4e49 html \u6a21\u677f, \u4e3a\u4e86\u6b63\u5e38\u9009\u53d6\u5230\u8fdb\u5ea6\u6761\u5143\u7d20, \u5fc5\u987b\u6dfb\u52a0 role='bar' \u5c5e\u6027,"},"options.easing":{defaultValue:{value:"'ease'",computed:!1},type:{name:"string"},required:!1,description:"\u8fdb\u5ea6\u6761\u52a8\u753b\u6548\u679c ease | linear |...,"},"options.speed":{defaultValue:{value:"200",computed:!1},type:{name:"number"},required:!1,description:"\u8fdb\u5ea6\u6761\u589e\u957f\u901f\u5ea6"},"options.trickle":{defaultValue:{value:"true",computed:!1},type:{name:"bool"},required:!1,description:"\u662f\u5426\u5f00\u542f\u81ea\u52a8\u9012\u589e"},"options.trickleSpeed":{defaultValue:{value:"200",computed:!1},type:{name:"number"},required:!1,description:"\u81ea\u52a8\u9012\u589e\u9891\u7387, \u5355\u4f4d: ms"},"options.showSpinner":{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:"\u662f\u5426\u5f00\u542f\u65cb\u8f6c loading \u5143\u7d20"},"options.parent":{defaultValue:{value:"'body'",computed:!1},type:{name:"string"},required:!1,description:"\u8fdb\u5ea6\u6761\u6240\u5728\u7236\u5143\u7d20, css \u9009\u62e9\u5668"}}},t.d(n,"default",function(){return P});var P=function(e){function n(e){var t;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(t=E(this,j(n).call(this,e))).layout=null,t}var t,m,d;return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&T(e,n)}(n,l.a.Component),t=n,(m=[{key:"render",value:function(){var e=this.props,n=e.components,t=h(e,["components"]);return l.a.createElement(u.MDXTag,{name:"wrapper",components:n},l.a.createElement(u.MDXTag,{name:"h1",components:n,props:{id:"topprogress"}},"TopProgress"),l.a.createElement(u.MDXTag,{name:"p",components:n},"\u9876\u90e8\u8fdb\u5ea6\u6761\u3002"),l.a.createElement(u.MDXTag,{name:"h2",components:n,props:{id:"\u4ee3\u7801\u6f14\u793a"}},"\u4ee3\u7801\u6f14\u793a"),l.a.createElement(u.MDXTag,{name:"p",components:n},"\u7b80\u5355\u793a\u4f8b"),l.a.createElement(c.e,{__position:0,__code:'{/* \n  \u63d0\u524d\u5f15\u5165 import topProgress from \'./TopProgress.jsx\'\n   */}\n<div style={{ height: 50 }}>\n  <div style={{ marginTop: 20 }}>\n    <Button\n      type="primary"\n      onClick={() => {\n        topProgress.start()\n      }}\n    >\n      \u5f00\u59cb\n    </Button>\n    <Button\n      type="primary"\n      onClick={() => {\n        topProgress.done()\n      }}\n      style={{ marginLeft: 20 }}\n    >\n      \u5b8c\u6210\n    </Button>\n  </div>\n</div>',__scope:{props:this?this.props:t,Component:p.Component,Fragment:p.Fragment,Input:i.a,Row:s.a,Col:a.a,Form:r.a,Button:o.a,topProgress:v}},l.a.createElement("div",{style:{height:50}},l.a.createElement("div",{style:{marginTop:20}},l.a.createElement(o.a,{type:"primary",onClick:function(){v.start()}},"\u5f00\u59cb"),l.a.createElement(o.a,{type:"primary",onClick:function(){v.done()},style:{marginLeft:20}},"\u5b8c\u6210")))),l.a.createElement(u.MDXTag,{name:"p",components:n},"\u8bbe\u7f6e\u521d\u59cb\u8fdb\u5ea6"),l.a.createElement(c.e,{__position:1,__code:'{/* \n  \u63d0\u524d\u5f15\u5165 import topProgress from \'./TopProgress.jsx\'\n   */}\n<div style={{ height: 50 }}>\n  <div style={{ marginTop: 20 }}>\n    <Button\n      type="primary"\n      onClick={() => {\n        topProgress.set(0.5)\n        topProgress.start()\n      }}\n    >\n      \u5f00\u59cb\n    </Button>\n    <Button\n      type="primary"\n      onClick={() => {\n        topProgress.done()\n      }}\n      style={{ marginLeft: 20 }}\n    >\n      \u5b8c\u6210\n    </Button>\n  </div>\n</div>',__scope:{props:this?this.props:t,Component:p.Component,Fragment:p.Fragment,Input:i.a,Row:s.a,Col:a.a,Form:r.a,Button:o.a,topProgress:v}},l.a.createElement("div",{style:{height:50}},l.a.createElement("div",{style:{marginTop:20}},l.a.createElement(o.a,{type:"primary",onClick:function(){v.set(.5),v.start()}},"\u5f00\u59cb"),l.a.createElement(o.a,{type:"primary",onClick:function(){v.done()},style:{marginLeft:20}},"\u5b8c\u6210")))),l.a.createElement(u.MDXTag,{name:"h2",components:n,props:{id:"api"}},"API"),l.a.createElement(u.MDXTag,{name:"h3",components:n,props:{id:"\u9759\u6001\u65b9\u6cd5\uff1a"}},"\u9759\u6001\u65b9\u6cd5\uff1a"),l.a.createElement(u.MDXTag,{name:"ul",components:n},l.a.createElement(u.MDXTag,{name:"li",components:n,parentName:"ul"},"start: \u5f00\u542f\u8fdb\u5ea6\u6761"),l.a.createElement(u.MDXTag,{name:"li",components:n,parentName:"ul"},"done(status): \u8fdb\u5ea6\u6761\u5b8c\u6210"),l.a.createElement(u.MDXTag,{name:"li",components:n,parentName:"ul"},"inc: \u968f\u673a\u589e\u52a0\u8fdb\u5ea6, \u4f46\u662f\u4e0d\u4f1a\u589e\u52a0\u5230 100%"),l.a.createElement(u.MDXTag,{name:"li",components:n,parentName:"ul"},"set: \u8fdb\u5ea6\u6761\u8fdb\u5ea6, (0 - 1)"),l.a.createElement(u.MDXTag,{name:"li",components:n,parentName:"ul"},"configure(options): \u8fdb\u5ea6\u6761\u914d\u7f6e \u53c2\u6570\u89c1\u4e0b\u65b9"),l.a.createElement(u.MDXTag,{name:"li",components:n,parentName:"ul"},"remove: \u79fb\u9664\u8fdb\u5ea6\u6761\u5143\u7d20")),l.a.createElement(c.f,{of:v}))}}])&&_(t.prototype,m),d&&_(t,d),n}();P.__docgenInfo={description:"",methods:[],displayName:"MDXContent"}},"./src/components/TopProgress/TopProgress.scss":function(e,n,t){}}]);