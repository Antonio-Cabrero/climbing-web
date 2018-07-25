(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(1),o=f(r),l=f(n(628)),i=(n(137),n(267)),u=f(n(192)),s=n(265),c=f(n(647)),d=f(n(191)),h=(f(n(266)),f(n(138)));function f(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"componentDidMount",value:function(){var e=this;u.default.get(d.default.getUrl("problems?regionId="+d.default.getRegion()+"&id="+this.props.match.params.problemId)).withCredentials().end(function(t,n){t?e.setState({error:t}):e.setState({id:n.body[0].id,newMedia:[]})})}},{key:"onNewMediaChanged",value:function(e){this.setState({newMedia:e})}},{key:"save",value:function(e){var t=this;e.preventDefault(),this.setState({isSaving:!0});var n=this.state.newMedia.map(function(e){return{name:e.file.name.replace(/[^-a-z0-9.]/gi,"_"),photographer:e.photographer,inPhoto:e.inPhoto}}),a=u.default.post(d.default.getUrl("problems/media")).withCredentials().field("json",JSON.stringify({id:this.state.id,newMedia:n})).set("Accept","application/json");this.state.newMedia.forEach(function(e){return a.attach(e.file.name.replace(/[^-a-z0-9.]/gi,"_"),e.file)}),a.end(function(e,n){e?t.setState({error:e}):t.setState({pushUrl:"/problem/"+n.body.id})})}},{key:"onCancel",value:function(){window.history.back()}},{key:"render",value:function(){return this.state&&this.state.id?this.state.error?o.default.createElement("span",null,o.default.createElement("h3",null,this.state.error.status),this.state.error.toString()):this.state.pushUrl?o.default.createElement(i.Redirect,{to:this.state.pushUrl,push:!0}):o.default.createElement("span",null,o.default.createElement(l.default,null,o.default.createElement("title",null,d.default.getTitle("Problem edit (media)")),o.default.createElement("meta",{name:"description",content:"Add new media"})),o.default.createElement(s.Well,null,o.default.createElement("form",{onSubmit:this.save.bind(this)},o.default.createElement(s.FormGroup,{controlId:"formControlsMedia"},o.default.createElement(c.default,{onMediaChanged:this.onNewMediaChanged.bind(this)})),o.default.createElement(s.ButtonGroup,null,o.default.createElement(s.Button,{bsStyle:"danger",onClick:this.onCancel.bind(this)},"Cancel"),o.default.createElement(s.Button,{type:"submit",bsStyle:"success",disabled:this.state.isSaving},this.state.isSaving?"Saving...":"Save"))))):o.default.createElement("center",null,o.default.createElement(h.default,{icon:"spinner",spin:!0,size:"3x"}))}}]),t}();t.default=p},647:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(1),o=c(r),l=c(n(651)),i=c(n(192)),u=n(265),s=c(n(191));function c(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var p=function(e){function t(e){d(this,t);var n=h(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={searchResults:[],value:""},n}return f(t,r.Component),a(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({value:e.value})}},{key:"inputChange",value:function(e){var t=this,n=e.target.value;this.props.onValueChanged(this.props.m,n),n.length>0?i.default.get(s.default.getUrl("users/search?value="+n)).withCredentials().end(function(e,a){e&&console.log(e);var r=a.body.filter(function(e){return e.name.toUpperCase()!==n.toUpperCase()});t.setState({searchResults:r})}):this.setState({searchResults:[]})}},{key:"menuItemSelect",value:function(e,t){this.setState({searchResults:[]}),this.props.onValueChanged(this.props.m,e.name)}},{key:"render",value:function(){var e=this,t=null;if(this.state.searchResults.length>0){var n=this.state.searchResults.map(function(t,n){return o.default.createElement(u.MenuItem,{key:n,href:"#",onSelect:e.menuItemSelect.bind(e,t)},t.name)});t=o.default.createElement("div",null,o.default.createElement("ul",{className:"dropdown-menu open",style:{position:"absolute",display:"inline"}},n))}return o.default.createElement("div",{style:{position:"relative",width:"100%"}},o.default.createElement("div",{style:{width:"100%"}},o.default.createElement(u.FormControl,{style:{display:"inline-block"},type:"text",placeholder:this.props.placeholder,value:this.state.value,onChange:this.inputChange.bind(this)})),t)}}]),t}(),m=function(e){function t(e){d(this,t);var n=h(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={media:[]},n}return f(t,r.Component),a(t,[{key:"onDrop",value:function(e){var t=this.state.media;e.forEach(function(e){return t.push({file:e})}),this.setState({media:t}),this.props.onMediaChanged(t)}},{key:"onPhotographerChanged",value:function(e,t){e.photographer=t,this.props.onMediaChanged(this.state.media)}},{key:"onInPhotoChanged",value:function(e,t){e.inPhoto=t,this.props.onMediaChanged(this.state.media)}},{key:"onRemove",value:function(e){var t=this.state.media.filter(function(t){return t!=e});this.setState({media:t}),this.props.onMediaChanged(t)}},{key:"render",value:function(){var e=this;return o.default.createElement(u.FormGroup,null,o.default.createElement(u.ControlLabel,null,"Upload image(s)"),o.default.createElement("br",null),o.default.createElement(l.default,{onDrop:this.onDrop.bind(this),style:{width:"220px",height:"75px",padding:"15px",borderWidth:"1px",borderColor:"#666",borderStyle:"dashed",borderRadius:"5px"},accept:"image/*"},o.default.createElement("i",null,"Drop JPG-image(s) here or click to select files to upload.")),this.state.media.length>0?o.default.createElement(u.Grid,null,o.default.createElement(u.Row,null,this.state.media.map(function(t,n){return o.default.createElement(u.Col,{key:n,xs:8,sm:6,md:4,lg:2},o.default.createElement(u.Thumbnail,{src:t.file.preview},o.default.createElement(p,{m:t,placeholder:"In photo",value:t?t.inPhoto:"",onValueChanged:e.onInPhotoChanged.bind(e)}),o.default.createElement(p,{m:t,placeholder:"Photographer",value:t?t.photographer:"",onValueChanged:e.onPhotographerChanged.bind(e)}),o.default.createElement(u.Button,{style:{width:"100%"},bsStyle:"danger",onClick:e.onRemove.bind(e,t)},"Remove")))}))):null)}}]),t}();t.default=m}}]);
//# sourceMappingURL=17.index.js.map