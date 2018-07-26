(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{643:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1),i=h(o),a=h(n(199)),l=n(281),s=n(279),u=h(n(680)),c=n(677),p=h(n(198)),f=h(n(280)),d=n(140);function h(e){return e&&e.__esModule?e:{default:e}}var m=(0,c.withGoogleMap)(function(e){return i.default.createElement(c.GoogleMap,{defaultZoom:e.defaultZoom,defaultCenter:e.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN,onClick:e.onClick.bind(void 0)},e.markers)}),v=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"componentWillMount",value:function(){f.default.isAdmin()||this.setState({pushUrl:"/login",error:null})}},{key:"componentDidMount",value:function(){var e=this;-1==this.props.match.params.areaId?this.setState({id:-1,visibility:0,name:"",comment:"",lat:0,lng:0,newMedia:[]}):a.default.get(p.default.getUrl("areas?regionId="+p.default.getRegion()+"&id="+this.props.match.params.areaId)).withCredentials().end(function(t,n){t?e.setState({error:t}):e.setState({id:n.body.id,visibility:n.body.visibility,name:n.body.name,comment:n.body.comment,lat:n.body.lat,lng:n.body.lng,newMedia:[]})})}},{key:"onNameChanged",value:function(e){this.setState({name:e.target.value})}},{key:"onVisibilityChanged",value:function(e,t){this.setState({visibility:e})}},{key:"onCommentChanged",value:function(e){this.setState({comment:e.target.value})}},{key:"onNewMediaChanged",value:function(e){this.setState({newMedia:e})}},{key:"save",value:function(e){var t=this;e.preventDefault(),this.setState({isSaving:!0});var n=this.state.newMedia.map(function(e){return{name:e.file.name.replace(/[^-a-z0-9.]/gi,"_"),photographer:e.photographer,inPhoto:e.inPhoto}}),r=a.default.post(p.default.getUrl("areas")).withCredentials().field("json",JSON.stringify({regionId:p.default.getRegion(),id:this.state.id,visibility:this.state.visibility,name:this.state.name,comment:this.state.comment,lat:this.state.lat,lng:this.state.lng,newMedia:n})).set("Accept","application/json");this.state.newMedia.forEach(function(e){return r.attach(e.file.name.replace(/[^-a-z0-9.]/gi,"_"),e.file)}),r.end(function(e,n){e?t.setState({error:e}):t.setState({pushUrl:"/area/"+n.body.id})})}},{key:"onMarkerClick",value:function(e){this.setState({lat:e.latLng.lat(),lng:e.latLng.lng()})}},{key:"onCancel",value:function(){window.history.back()}},{key:"render",value:function(){if(!this.state)return i.default.createElement("center",null,i.default.createElement(d.FontAwesomeIcon,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return i.default.createElement("span",null,i.default.createElement("h3",null,this.state.error.status),this.state.error.toString());if(this.state.pushUrl)return i.default.createElement(l.Redirect,{to:this.state.pushUrl,push:!0});if(!(this.props&&this.props.match&&this.props.match.params&&this.props.match.params.areaId))return i.default.createElement("span",null,i.default.createElement("h3",null,"Invalid action..."));var e="Visible for everyone";1===this.state.visibility?e="Only visible for administrators":2===this.state.visibility&&(e="Only visible for super administrators");var t=this.props&&this.props.location&&this.props.location.query&&this.props.location.query.lat&&parseFloat(this.props.location.query.lat)>0?{lat:parseFloat(this.props.location.query.lat),lng:parseFloat(this.props.location.query.lng)}:p.default.getDefaultCenter(),n=this.props&&this.props.location&&this.props.location.query&&this.props.location.query.lat&&parseFloat(this.props.location.query.lat)>0?8:p.default.getDefaultZoom();return i.default.createElement("span",null,i.default.createElement(s.Well,null,i.default.createElement("form",{onSubmit:this.save.bind(this)},i.default.createElement(s.FormGroup,{controlId:"formControlsName"},i.default.createElement(s.ControlLabel,null,"Area name"),i.default.createElement(s.FormControl,{type:"text",value:this.state.name,placeholder:"Enter name",onChange:this.onNameChanged.bind(this)})),i.default.createElement(s.FormGroup,{controlId:"formControlsComment"},i.default.createElement(s.ControlLabel,null,"Comment"),i.default.createElement(s.FormControl,{style:{height:"100px"},componentClass:"textarea",placeholder:"Enter comment",value:this.state.comment,onChange:this.onCommentChanged.bind(this)})),i.default.createElement(s.FormGroup,{controlId:"formControlsVisibility"},i.default.createElement(s.ControlLabel,null,"Visibility"),i.default.createElement("br",null),i.default.createElement(s.DropdownButton,{title:e,id:"bg-nested-dropdown"},i.default.createElement(s.MenuItem,{eventKey:"0",onSelect:this.onVisibilityChanged.bind(this,0)},"Visible for everyone"),i.default.createElement(s.MenuItem,{eventKey:"1",onSelect:this.onVisibilityChanged.bind(this,1)},"Only visible for administrators"),f.default.isSuperAdmin()&&i.default.createElement(s.MenuItem,{eventKey:"2",onSelect:this.onVisibilityChanged.bind(this,2)},"Only visible for super administrators"))),i.default.createElement(s.FormGroup,{controlId:"formControlsMedia"},i.default.createElement(u.default,{onMediaChanged:this.onNewMediaChanged.bind(this)})),i.default.createElement(s.FormGroup,{controlId:"formControlsMap"},i.default.createElement(s.ControlLabel,null,"Click to mark area center on map"),i.default.createElement("br",null),i.default.createElement("section",{style:{height:"600px"}},i.default.createElement(m,{containerElement:i.default.createElement("div",{style:{height:"100%"}}),mapElement:i.default.createElement("div",{style:{height:"100%"}}),defaultZoom:n,defaultCenter:t,onClick:this.onMarkerClick.bind(this),markers:0!=this.state.lat&&0!=this.state.lng?i.default.createElement(c.Marker,{position:{lat:this.state.lat,lng:this.state.lng}}):""}))),i.default.createElement(s.ButtonGroup,null,i.default.createElement(s.Button,{bsStyle:"danger",onClick:this.onCancel.bind(this)},"Cancel"),i.default.createElement(s.Button,{type:"submit",bsStyle:"success",disabled:this.state.isSaving},this.state.isSaving?"Saving...":"Save area")))))}}]),t}();t.default=v},680:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1),i=c(o),a=c(n(684)),l=c(n(199)),s=n(279),u=c(n(198));function c(e){return e&&e.__esModule?e:{default:e}}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var h=function(e){function t(e){p(this,t);var n=f(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={searchResults:[],value:""},n}return d(t,o.Component),r(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({value:e.value})}},{key:"inputChange",value:function(e){var t=this,n=e.target.value;this.props.onValueChanged(this.props.m,n),n.length>0?l.default.get(u.default.getUrl("users/search?value="+n)).withCredentials().end(function(e,r){e&&console.log(e);var o=r.body.filter(function(e){return e.name.toUpperCase()!==n.toUpperCase()});t.setState({searchResults:o})}):this.setState({searchResults:[]})}},{key:"menuItemSelect",value:function(e,t){this.setState({searchResults:[]}),this.props.onValueChanged(this.props.m,e.name)}},{key:"render",value:function(){var e=this,t=null;if(this.state.searchResults.length>0){var n=this.state.searchResults.map(function(t,n){return i.default.createElement(s.MenuItem,{key:n,href:"#",onSelect:e.menuItemSelect.bind(e,t)},t.name)});t=i.default.createElement("div",null,i.default.createElement("ul",{className:"dropdown-menu open",style:{position:"absolute",display:"inline"}},n))}return i.default.createElement("div",{style:{position:"relative",width:"100%"}},i.default.createElement("div",{style:{width:"100%"}},i.default.createElement(s.FormControl,{style:{display:"inline-block"},type:"text",placeholder:this.props.placeholder,value:this.state.value,onChange:this.inputChange.bind(this)})),t)}}]),t}(),m=function(e){function t(e){p(this,t);var n=f(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={media:[]},n}return d(t,o.Component),r(t,[{key:"onDrop",value:function(e){var t=this.state.media;e.forEach(function(e){return t.push({file:e})}),this.setState({media:t}),this.props.onMediaChanged(t)}},{key:"onPhotographerChanged",value:function(e,t){e.photographer=t,this.props.onMediaChanged(this.state.media)}},{key:"onInPhotoChanged",value:function(e,t){e.inPhoto=t,this.props.onMediaChanged(this.state.media)}},{key:"onRemove",value:function(e){var t=this.state.media.filter(function(t){return t!=e});this.setState({media:t}),this.props.onMediaChanged(t)}},{key:"render",value:function(){var e=this;return i.default.createElement(s.FormGroup,null,i.default.createElement(s.ControlLabel,null,"Upload image(s)"),i.default.createElement("br",null),i.default.createElement(a.default,{onDrop:this.onDrop.bind(this),style:{width:"220px",height:"75px",padding:"15px",borderWidth:"1px",borderColor:"#666",borderStyle:"dashed",borderRadius:"5px"},accept:"image/*"},i.default.createElement("i",null,"Drop JPG-image(s) here or click to select files to upload.")),this.state.media.length>0?i.default.createElement(s.Grid,null,i.default.createElement(s.Row,null,this.state.media.map(function(t,n){return i.default.createElement(s.Col,{key:n,xs:8,sm:6,md:4,lg:2},i.default.createElement(s.Thumbnail,{src:t.file.preview},i.default.createElement(h,{m:t,placeholder:"In photo",value:t?t.inPhoto:"",onValueChanged:e.onInPhotoChanged.bind(e)}),i.default.createElement(h,{m:t,placeholder:"Photographer",value:t?t.photographer:"",onValueChanged:e.onPhotographerChanged.bind(e)}),i.default.createElement(s.Button,{style:{width:"100%"},bsStyle:"danger",onClick:e.onRemove.bind(e,t)},"Remove")))}))):null)}}]),t}();t.default=m},681:function(e,t){e.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){var n=e.exports={version:"2.5.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){e.exports=!n(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(32)("wks"),o=n(9),i=n(0).Symbol,a="function"==typeof i;(e.exports=function(e){return r[e]||(r[e]=a&&i[e]||(a?i:o)("Symbol."+e))}).store=r},function(e,t,n){var r=n(0),o=n(2),i=n(8),a=n(22),l=n(10),s=function(e,t,n){var u,c,p,f,d=e&s.F,h=e&s.G,m=e&s.S,v=e&s.P,g=e&s.B,y=h?r:m?r[t]||(r[t]={}):(r[t]||{}).prototype,b=h?o:o[t]||(o[t]={}),C=b.prototype||(b.prototype={});for(u in h&&(n=t),n)p=((c=!d&&y&&void 0!==y[u])?y:n)[u],f=g&&c?l(p,r):v&&"function"==typeof p?l(Function.call,p):p,y&&a(y,u,p,e&s.U),b[u]!=p&&i(b,u,f),v&&C[u]!=p&&(C[u]=p)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},function(e,t,n){var r=n(16),o=n(21);e.exports=n(3)?function(e,t,n){return r.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){var r=n(24);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(28),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(e&&t){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",o=e.type||"",i=o.replace(/\/.*$/,"");return n.some(function(e){var t=e.trim();return"."===t.charAt(0)?r.toLowerCase().endsWith(t.toLowerCase()):t.endsWith("/*")?i===t.replace(/\/.*$/,""):o===t})}return!0},n(14),n(34)},function(e,t,n){n(15),e.exports=n(2).Array.some},function(e,t,n){"use strict";var r=n(7),o=n(25)(3);r(r.P+r.F*!n(33)([].some,!0),"Array",{some:function(e){return o(this,e,arguments[1])}})},function(e,t,n){var r=n(17),o=n(18),i=n(20),a=Object.defineProperty;t.f=n(3)?Object.defineProperty:function(e,t,n){if(r(e),t=i(t,!0),r(n),o)try{return a(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(1);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){e.exports=!n(3)&&!n(4)(function(){return 7!=Object.defineProperty(n(19)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(1),o=n(0).document,i=r(o)&&r(o.createElement);e.exports=function(e){return i?o.createElement(e):{}}},function(e,t,n){var r=n(1);e.exports=function(e,t){if(!r(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!r(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(0),o=n(8),i=n(23),a=n(9)("src"),l=Function.toString,s=(""+l).split("toString");n(2).inspectSource=function(e){return l.call(e)},(e.exports=function(e,t,n,l){var u="function"==typeof n;u&&(i(n,"name")||o(n,"name",t)),e[t]!==n&&(u&&(i(n,a)||o(n,a,e[t]?""+e[t]:s.join(String(t)))),e===r?e[t]=n:l?e[t]?e[t]=n:o(e,t,n):(delete e[t],o(e,t,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[a]||l.call(this)})},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(10),o=n(26),i=n(27),a=n(12),l=n(29);e.exports=function(e,t){var n=1==e,s=2==e,u=3==e,c=4==e,p=6==e,f=5==e||p,d=t||l;return function(t,l,h){for(var m,v,g=i(t),y=o(g),b=r(l,h,3),C=a(y.length),E=0,D=n?d(t,C):s?d(t,0):void 0;C>E;E++)if((f||E in y)&&(v=b(m=y[E],E,g),e))if(n)D[E]=v;else if(v)switch(e){case 3:return!0;case 5:return m;case 6:return E;case 2:D.push(m)}else if(c)return!1;return p?-1:u||c?c:D}}},function(e,t,n){var r=n(5);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(11);e.exports=function(e){return Object(r(e))}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(30);e.exports=function(e,t){return new(r(e))(t)}},function(e,t,n){var r=n(1),o=n(31),i=n(6)("species");e.exports=function(e){var t;return o(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!o(t.prototype)||(t=void 0),r(t)&&null===(t=t[i])&&(t=void 0)),void 0===t?Array:t}},function(e,t,n){var r=n(5);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){var r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});e.exports=function(e){return o[e]||(o[e]={})}},function(e,t,n){"use strict";var r=n(4);e.exports=function(e,t){return!!e&&r(function(){t?e.call(null,function(){},1):e.call(null)})}},function(e,t,n){n(35),e.exports=n(2).String.endsWith},function(e,t,n){"use strict";var r=n(7),o=n(12),i=n(36),a="".endsWith;r(r.P+r.F*n(38)("endsWith"),"String",{endsWith:function(e){var t=i(this,e,"endsWith"),n=arguments.length>1?arguments[1]:void 0,r=o(t.length),l=void 0===n?r:Math.min(o(n),r),s=String(e);return a?a.call(t,s,l):t.slice(l-s.length,l)===s}})},function(e,t,n){var r=n(37),o=n(11);e.exports=function(e,t,n){if(r(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(o(e))}},function(e,t,n){var r=n(1),o=n(5),i=n(6)("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==o(e))}},function(e,t,n){var r=n(6)("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,!"/./"[e](t)}catch(e){}}return!0}}])},684:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i=n(0),a=n.n(i),l=n(681),s=n.n(l),u="undefined"==typeof document||!document||!document.createElement||"multiple"in document.createElement("input");function c(e){var t=[];if(e.dataTransfer){var n=e.dataTransfer;n.files&&n.files.length?t=n.files:n.items&&n.items.length&&(t=n.items)}else e.target&&e.target.files&&(t=e.target.files);return Array.prototype.slice.call(t)}function p(e,t){return"application/x-moz-file"===e.type||s()(e,t)}function f(e){e.preventDefault()}var d={borderStyle:"solid",borderColor:"#c66",backgroundColor:"#eee"},h={opacity:.5},m={borderStyle:"solid",borderColor:"#6c6",backgroundColor:"#eee"},v={width:200,height:200,borderWidth:2,borderColor:"#666",borderStyle:"dashed",borderRadius:5},g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},y=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function b(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var C=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.renderChildren=function(e,t,n,o){return"function"==typeof e?e(g({},r.state,{isDragActive:t,isDragAccept:n,isDragReject:o})):e},r.composeHandlers=r.composeHandlers.bind(r),r.onClick=r.onClick.bind(r),r.onDocumentDrop=r.onDocumentDrop.bind(r),r.onDragEnter=r.onDragEnter.bind(r),r.onDragLeave=r.onDragLeave.bind(r),r.onDragOver=r.onDragOver.bind(r),r.onDragStart=r.onDragStart.bind(r),r.onDrop=r.onDrop.bind(r),r.onFileDialogCancel=r.onFileDialogCancel.bind(r),r.onInputElementClick=r.onInputElementClick.bind(r),r.setRef=r.setRef.bind(r),r.setRefs=r.setRefs.bind(r),r.isFileDialogActive=!1,r.state={draggedFiles:[],acceptedFiles:[],rejectedFiles:[]},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.a.Component),y(t,[{key:"componentDidMount",value:function(){var e=this.props.preventDropOnDocument;this.dragTargets=[],e&&(document.addEventListener("dragover",f,!1),document.addEventListener("drop",this.onDocumentDrop,!1)),this.fileInputEl.addEventListener("click",this.onInputElementClick,!1),window.addEventListener("focus",this.onFileDialogCancel,!1)}},{key:"componentWillUnmount",value:function(){this.props.preventDropOnDocument&&(document.removeEventListener("dragover",f),document.removeEventListener("drop",this.onDocumentDrop)),null!=this.fileInputEl&&this.fileInputEl.removeEventListener("click",this.onInputElementClick,!1),window.removeEventListener("focus",this.onFileDialogCancel,!1)}},{key:"composeHandlers",value:function(e){return this.props.disabled?null:e}},{key:"onDocumentDrop",value:function(e){this.node&&this.node.contains(e.target)||(e.preventDefault(),this.dragTargets=[])}},{key:"onDragStart",value:function(e){this.props.onDragStart&&this.props.onDragStart.call(this,e)}},{key:"onDragEnter",value:function(e){e.preventDefault(),-1===this.dragTargets.indexOf(e.target)&&this.dragTargets.push(e.target),this.setState({isDragActive:!0,draggedFiles:c(e)}),this.props.onDragEnter&&this.props.onDragEnter.call(this,e)}},{key:"onDragOver",value:function(e){e.preventDefault(),e.stopPropagation();try{e.dataTransfer.dropEffect=this.isFileDialogActive?"none":"copy"}catch(e){}return this.props.onDragOver&&this.props.onDragOver.call(this,e),!1}},{key:"onDragLeave",value:function(e){var t=this;e.preventDefault(),this.dragTargets=this.dragTargets.filter(function(n){return n!==e.target&&t.node.contains(n)}),this.dragTargets.length>0||(this.setState({isDragActive:!1,draggedFiles:[]}),this.props.onDragLeave&&this.props.onDragLeave.call(this,e))}},{key:"onDrop",value:function(e){var t=this,n=this.props,r=n.onDrop,o=n.onDropAccepted,i=n.onDropRejected,a=n.multiple,l=n.disablePreview,s=n.accept,u=c(e),f=[],d=[];e.preventDefault(),this.dragTargets=[],this.isFileDialogActive=!1,u.forEach(function(e){if(!l)try{e.preview=window.URL.createObjectURL(e)}catch(e){}p(e,s)&&function(e,t,n){return e.size<=t&&e.size>=n}(e,t.props.maxSize,t.props.minSize)?f.push(e):d.push(e)}),a||d.push.apply(d,function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(f.splice(1))),r&&r.call(this,f,d,e),d.length>0&&i&&i.call(this,d,e),f.length>0&&o&&o.call(this,f,e),this.draggedFiles=null,this.setState({isDragActive:!1,draggedFiles:[],acceptedFiles:f,rejectedFiles:d})}},{key:"onClick",value:function(e){var t=this.props,n=t.onClick;t.disableClick||(e.stopPropagation(),n&&n.call(this,e),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return function(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}(e)||function(e){return-1!==e.indexOf("Edge/")}(e)}()?setTimeout(this.open.bind(this),0):this.open())}},{key:"onInputElementClick",value:function(e){e.stopPropagation(),this.props.inputProps&&this.props.inputProps.onClick&&this.props.inputProps.onClick()}},{key:"onFileDialogCancel",value:function(){var e=this,t=this.props.onFileDialogCancel;this.isFileDialogActive&&setTimeout(function(){null!=e.fileInputEl&&(e.fileInputEl.files.length||(e.isFileDialogActive=!1)),"function"==typeof t&&t()},300)}},{key:"setRef",value:function(e){this.node=e}},{key:"setRefs",value:function(e){this.fileInputEl=e}},{key:"open",value:function(){this.isFileDialogActive=!0,this.fileInputEl.value=null,this.fileInputEl.click()}},{key:"render",value:function(){var e=this.props,t=e.accept,n=e.acceptClassName,r=e.activeClassName,i=e.children,a=e.disabled,l=e.disabledClassName,s=e.inputProps,c=e.multiple,f=e.name,y=e.rejectClassName,C=b(e,["accept","acceptClassName","activeClassName","children","disabled","disabledClassName","inputProps","multiple","name","rejectClassName"]),E=C.acceptStyle,D=C.activeStyle,S=C.className,w=void 0===S?"":S,k=C.disabledStyle,O=C.rejectStyle,x=C.style,j=b(C,["acceptStyle","activeStyle","className","disabledStyle","rejectStyle","style"]),_=this.state,P=_.isDragActive,F=_.draggedFiles,M=F.length,A=c||M<=1,I=M>0&&function(e,t){return e.every(function(e){return p(e,t)})}(F,this.props.accept),R=M>0&&(!I||!A),T=!(w||x||D||E||O||k);P&&r&&(w+=" "+r),I&&n&&(w+=" "+n),R&&y&&(w+=" "+y),a&&l&&(w+=" "+l),T&&(x=v,D=m,E=m,O=d,k=h);var L=g({position:"relative"},x);D&&P&&(L=g({},L,D)),E&&I&&(L=g({},L,E)),O&&R&&(L=g({},L,O)),k&&a&&(L=g({},L,k));var N={accept:t,disabled:a,type:"file",style:g({position:"absolute",top:0,right:0,bottom:0,left:0,opacity:1e-5,pointerEvents:"none"},s.style),multiple:u&&c,ref:this.setRefs,onChange:this.onDrop,autoComplete:"off"};f&&f.length&&(N.name=f),j.acceptedFiles,j.preventDropOnDocument,j.disablePreview,j.disableClick,j.onDropAccepted,j.onDropRejected,j.onFileDialogCancel,j.maxSize,j.minSize;var z=b(j,["acceptedFiles","preventDropOnDocument","disablePreview","disableClick","onDropAccepted","onDropRejected","onFileDialogCancel","maxSize","minSize"]);return o.a.createElement("div",g({className:w,style:L},z,{onClick:this.composeHandlers(this.onClick),onDragStart:this.composeHandlers(this.onDragStart),onDragEnter:this.composeHandlers(this.onDragEnter),onDragOver:this.composeHandlers(this.onDragOver),onDragLeave:this.composeHandlers(this.onDragLeave),onDrop:this.composeHandlers(this.onDrop),ref:this.setRef,"aria-disabled":a}),this.renderChildren(i,P,I,R),o.a.createElement("input",g({},s,N)))}}]),t}();t.default=C,C.propTypes={accept:a.a.oneOfType([a.a.string,a.a.arrayOf(a.a.string)]),children:a.a.oneOfType([a.a.node,a.a.func]),disableClick:a.a.bool,disabled:a.a.bool,disablePreview:a.a.bool,preventDropOnDocument:a.a.bool,inputProps:a.a.object,multiple:a.a.bool,name:a.a.string,maxSize:a.a.number,minSize:a.a.number,className:a.a.string,activeClassName:a.a.string,acceptClassName:a.a.string,rejectClassName:a.a.string,disabledClassName:a.a.string,style:a.a.object,activeStyle:a.a.object,acceptStyle:a.a.object,rejectStyle:a.a.object,disabledStyle:a.a.object,onClick:a.a.func,onDrop:a.a.func,onDropAccepted:a.a.func,onDropRejected:a.a.func,onDragStart:a.a.func,onDragEnter:a.a.func,onDragOver:a.a.func,onDragLeave:a.a.func,onFileDialogCancel:a.a.func},C.defaultProps={preventDropOnDocument:!0,disabled:!1,disablePreview:!1,disableClick:!1,inputProps:{},multiple:!0,maxSize:1/0,minSize:0}}}]);
//# sourceMappingURL=8.index.js.map