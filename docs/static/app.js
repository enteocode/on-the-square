!function(e){function t(t){for(var r,i,c=t[0],s=t[1],l=t[2],p=0,f=[];p<c.length;p++)i=c[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);f.length;)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var s=n[c];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/static/";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=s;a.push([73,1]),n()}({12:function(e,t,n){e.exports={container:"ce1907",header:"fc8258",status:"abaa86",wrapper:"_4571d2",visible:"a270f4",error:"_187525"}},135:function(e,t,n){},136:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(33),a=n(9),i=(n(81),n(69));n(36),n(25),n(22),n(44),n(28);var c={center:null,message:"",error:!1},s=Object(a.combineReducers)({application:function(e,t){void 0===e&&(e=c);var n=t.type,r=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["type"]);switch(n){case"Application/MESSAGE":return Object.assign({},e,{},r);case"Application/SET_CENTER":return Object.assign({},e,{center:r.center});default:return e}},location:function(e,t){void 0===e&&(e=null);var n=t.type,r=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["type"]);switch(n){case"Location/CHANGE":return Object.assign({},e,{},r);default:return e}},orientation:function(e,t){void 0===e&&(e=null);var n=t.type,r=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["type"]);switch(n){case"Orientation/CHANGE":return Object.assign({},e,{},r);default:return e}},venues:function(e,t){void 0===e&&(e=null);var n=t.type,r=t.data;switch(n){case"Venues/UPDATE":return[].concat(r);default:return e}}}),l=(n(58),n(91),function(e){return[e.lng,e.lat]}),u=n(35),p=n.n(u),f=n(6),h=n.n(f);p.a.accessToken="pk.eyJ1IjoiYWRhbS1zemVrZWx5IiwiYSI6ImNqYW1jOTNjMjRoNGcyd2p1ZXpmbXRwdDUifQ.7wMdv63YzYVjPI9HVaZC6A";var d={id:"3d-buildings",source:"composite","source-layer":"building",minzoom:15,filter:["==","extrude","true"],type:"fill-extrusion",paint:{"fill-extrusion-color":"#fff","fill-extrusion-height":9,"fill-extrusion-base":0,"fill-extrusion-opacity":.15}},m=function(e,t){return void 0===e&&(e=h.a.marker),void 0===t&&(t=""),Object.assign(document.createElement("div"),{className:e,innerHTML:t})},v=function(e,t,n){var r=new u.Marker(n);return r.setLngLat(e),r.addTo(t),r},y=function(e){var t,n;function o(){for(var t,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(t=e.call.apply(e,[this].concat(o))||this).container=r.createRef(),t.map=null,t.you=null,t.markers=[],t}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var a=o.prototype;return a.componentDidMount=function(){var e=this.props,t=e.location,n=e.onLoaded,r=l(t),o=this.map=new u.Map({antialias:!0,center:r,container:this.container.current,style:"mapbox://styles/mapbox/dark-v9?optimize=true",minZoom:15,maxZoom:16,zoom:15,bearing:0,pitch:60,keyboard:!1,boxZoom:!1,doubleClickZoom:!1,scrollZoom:!1,dragPan:!1,dragRotate:!1,localIdeographFontFamily:"Roboto"});this.you=v(r,o,m(h.a.marker)),o.on("load",(function(e){var t=e.target;t.addLayer(d,function(e){return e.getStyle().layers.find((function(e){var t=e.type,n=e.layout;return"symbol"===t&&n["text-field"]}))}(t).id),n()})),o.touchZoomRotate.disableRotation()},a.componentWillUnmount=function(){this.map.remove()},a.componentDidUpdate=function(e){var t=this.props,n=t.location,r=t.orientation,o=t.venues;n!==e.location&&this.setLocation(n),o!==e.venues&&this.setVenues(o),r!==e.orientation&&this.setOrientation(r)},a.setLocation=function(e){var t=l(e);this.you.setLngLat(t),this.map.setCenter(t)},a.setOrientation=function(e){this.map.setBearing(360-e.alpha).setPitch(e.beta)},a.setVenues=function(e){var t=this;this.markers.forEach((function(e){e.remove()})),this.markers=e.map((function(e){return v(e,t.map,(r=(n=e).name,o=n.type,m(h.a.venue,["<div>"+r+"</div>",'<div class="'+h.a.type+'">'+o+"</div>"].join(""))));var n,r,o}))},a.render=function(){return r.createElement("section",{className:h.a.container,role:"presentation"},r.createElement("div",{ref:this.container,className:h.a.map}),r.createElement("footer",{className:h.a.info},r.createElement("svg",{viewBox:"0 0 503.84 503.84",className:h.a.icon},r.createElement("path",{d:"M412.624 113.576c4.273-52.847-35.104-99.152-87.951-103.424-49.76-4.023-94.3 30.763-102.449 80.016a91.881 91.881 0 0 0-.736 11.792 95.887 95.887 0 0 0 38.224 76.416l-15.712 128-12.8-19.92c.192-2.4.448-4.8.448-7.2.344-48.6-38.775-88.277-87.375-88.621-44.956-.318-82.924 33.301-88.049 77.965a86.459 86.459 0 0 0-.656 10.704c.046 44.402 33.163 81.815 77.232 87.248a83.489 83.489 0 0 0 24-.368l53.536 83.056-3.2 26.016 31.76 3.904 4.624-37.52-85.008-131.872c-6.164-9.592-3.493-22.356 6-28.672 9.748-6.184 22.647-3.489 29.104 6.08l23.488 36.448c9.575 14.854 29.38 19.134 44.234 9.559A32.001 32.001 0 0 0 275.76 310.2l21.856-178.464c1.113-8.766 9.122-14.97 17.888-13.857a16 16 0 0 1 13.984 15.745 19.94 19.94 0 0 1-.112 2L316.24 242.728l42.08 18.48 12.8-29.296-20.304-8.928 4.032-32.96a95.312 95.312 0 0 0 57.776-76.448zM175.952 245.592c-29.205.001-52.88 23.676-52.879 52.881a52.881 52.881 0 0 0 8.479 28.719l4.896 7.6c-27.901-3.576-48.819-27.295-48.88-55.424.005-2.289.143-4.575.416-6.848 3.645-30.606 31.41-52.462 62.016-48.817a55.807 55.807 0 0 1 39.296 23.665 52.783 52.783 0 0 0-13.344-1.776zM319.36 85.864v.16c-26.222-3.308-50.161 15.268-53.469 41.491l-.035.285-1.232 10a63.68 63.68 0 0 1-11.2-35.856c.005-2.674.171-5.346.496-8 4.648-35.039 36.821-59.676 71.86-55.028 31.537 4.184 55.214 30.897 55.58 62.708a69.01 69.01 0 0 1-.496 8 63.347 63.347 0 0 1-20.992 40l1.264-10.32c3.2-26.287-15.493-50.2-41.776-53.44zM459.104 270.488l-12.864 29.296 22.944 10.08-11.552 94.064-55.44 57.68-4.544 37.04 31.744 3.904 3.264-26.464 55.44-57.68 15.744-128.272zM400.508 244.784l29.306 12.854-12.848 29.29-29.305-12.854zM187.312 60.6h-25.376l36.688-36.688L176 1.288l-36.688 36.688V12.6h-32v80h80zM59.312 188.6h32v-80h-80v32h25.376L0 177.288l22.624 22.624 36.688-36.688z"})),r.createElement("small",{className:h.a.text},"The compass works on Earth's magnetic field, so strong electrical interferences around you may affect it's operation")))},o}(r.Component),b=n(70),g=n.n(b),E=function(){return r.createElement("svg",{className:g.a.logo,width:250,height:40,viewBox:"0 0 250 36.269",preserveAspectRatio:"xMinYMid meet"},r.createElement("path",{d:"M18.239,34.783q0,3.306-3.282,3.306H3.213Q0,38.088,0,34.783V5.24Q0,1.912,3.213,1.912H14.956q3.282,0,3.282,3.329V34.783Zm-5.409-1.341V6.558H5.409V33.442h7.42Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M40.915,38.088H36.177L27.508,15.319a13.665,13.665,0,0,1,.347,2.612V38.088h-5.27V1.912h4.739l8.669,22.307a13.663,13.663,0,0,1-.347-2.612V1.912h5.27V38.088Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M70.735,6.7H64.771V38.088H59.385V6.7H53.421V1.912H70.735V6.7Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M91.678,38.088H86.223V21.861H78.9V38.088H73.486V1.912H78.9v14.91h7.328V1.912h5.455V38.088Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M110.98,38.088h-15V1.912h14.864V6.7h-9.454V17.261h8.137v4.693h-8.137V33.3h9.593v4.785Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M141.771,34.783q0,3.306-3.282,3.306H127.6q-3.259,0-3.259-3.306V26.16h5.409v7.374h6.611v-7.1L125.52,16.174a3.833,3.833,0,0,1-1.179-2.89V5.24q0-3.329,3.259-3.329h10.888q3.282,0,3.282,3.282v8.091h-5.409V6.466H129.75v6.542l10.841,10.217a3.843,3.843,0,0,1,1.179,2.936v8.622Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M166.759,38.135h-0.37l-2.427-1.849a2.769,2.769,0,0,1-2.936,1.8H149.283q-3.214,0-3.213-3.306V5.24q0-3.329,3.282-3.329h11.674q3.282,0,3.282,3.329V31.408l2.45,1.757v4.97ZM158.9,33.442V32.171l-3.167-2.4V24.843h0.324l2.843,2.127V6.558h-7.42V33.442h7.42Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M187.471,34.783q0,3.306-3.329,3.306H172.654q-3.283,0-3.282-3.306V1.912h5.409v31.53h7.282V1.912h5.409V34.783Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M210.148,38.088h-5.363L203.7,31.223h-6.773l-1.086,6.865H190.5V38l7-36.13h5.687Zm-7.212-11.512L200.3,10.257l-2.658,16.32h5.294Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M231.692,38.088h-5.64l-5.964-16.805V18.024H225.4V6.558h-6.819v31.53h-5.409V1.912h14.355q3.259,0,3.259,3.329V18.393q0,2.288-1.549,2.959a11.136,11.136,0,0,1-3.514.347Z",transform:"translate(0 -1.865)",fill:"#fff"}),r.createElement("path",{d:"M250,38.088H235V1.912h14.864V6.7h-9.454V17.261h8.137v4.693h-8.137V33.3H250v4.785Z",transform:"translate(0 -1.865)",fill:"#fff"}))},V=n(51),w=n.n(V),x=n(12),O=n.n(x),M=function(e){var t,n;function o(){return e.apply(this,arguments)||this}return n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.prototype.render=function(){var e=this.props,t=e.message,n=e.error,o=e.isVisible;return r.createElement("section",{className:w()(O.a.container,o&&O.a.visible)},r.createElement("div",{className:O.a.wrapper},r.createElement("header",{className:O.a.header},r.createElement(E,null)),r.createElement("small",{className:w()(O.a.status,n&&O.a.error)},t)))},o}(r.PureComponent),j=n(34),k=(n(60),n(17)),_=n.n(k),H=(n(46),function(e){return{type:"Venues/UPDATE",data:e}}),L=n(71);function A(e,t,n,r,o,a,i){try{var c=e[a](i),s=c.value}catch(l){return void n(l)}c.done?t(s):Promise.resolve(s).then(r,o)}var N,P,Z=/[hm]otel|atm|ban[k\u212A]|bar|beer|bi[s\u017F]tro|brea[k\u212A]fa[s\u017F]t|brewery|caf\xE9|club|di[s\u017F]tillery|food|ho[s\u017F]tel|hou[s\u017F]e|joint|lounge|marijuana|mar[k\u212A]et|night|place|pub|re[s\u017F]taurant|[s\u017F]hop|[s\u017F]mo[k\u212A]e|[s\u017F]tore|taxi/i,S=function(e,t){return void 0===t&&(t=""),"https://api.foursquare.com/v2/venues/"+e+Object(L.stringify)({client_id:"5S11GGEZ2A5JZPISTD4CPMQN5CL0NYKNF0AHJUK4AAOLVV1L",client_secret:"RFAWFOP4KERR3XESXVM3VI5K0UKR42TEP2XQW5IPTIZYJNK4",ll:t,openNow:1,section:"topPicks",sortByDistance:1,v:20180503},!0)},C=function(e){var t,n=e.meta,r=e.response;if(200!==n.code)throw new Error(n.errorDetail);return(t=r,t.groups.reduce((function(e,t){return e.concat(t.items)}),[])).reduce((function(e,t){var n=t.venue;return e.concat([{guid:n.id,lat:n.location.lat,lng:n.location.lng,name:n.name,type:n.categories[0].name}])}),[]).filter((function(e){return Z.test(e.type)}))},F=(N=_.a.mark((function e(t){var n,r,o,a,i;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.lat,r=t.lng,o=[n,r].join(","),a=S("explore",o),e.next=5,fetch(a);case 5:if(200===(i=e.sent).status){e.next=8;break}throw new Error(i.statusText);case 8:return e.t0=C,e.next=11,i.json();case 11:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 13:case"end":return e.stop()}}),e)})),P=function(){var e=this,t=arguments;return new Promise((function(n,r){var o=N.apply(e,t);function a(e){A(o,n,r,a,i,"next",e)}function i(e){A(o,n,r,a,i,"throw",e)}a(void 0)}))},function(e){return P.apply(this,arguments)});function q(e,t,n,r,o,a,i){try{var c=e[a](i),s=c.value}catch(l){return void n(l)}c.done?t(s):Promise.resolve(s).then(r,o)}var R,T=function(e,t){return void 0===t&&(t=!1),{type:"Application/MESSAGE",message:e,error:t}},I=n(72),z=function(e,t,n){return void 0===n&&(n=300),function(r,o){null===o().location&&r(T("Hit the road Jack")),r(function(e,t){return{type:"Location/CHANGE",lat:e,lng:t}}(e,t));var a=o().application.center,i={lat:e,lng:t};(null===a||n<Object(I.getDistance)(a,i,50))&&r(function(e){return t=function(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){q(a,r,o,i,c,"next",e)}function c(e){q(a,r,o,i,c,"throw",e)}i(void 0)}))}}(_.a.mark((function t(n){return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"Application/SET_CENTER",center:e}),t.prev=1,t.t0=n,t.t1=H,t.next=6,F(e);case 6:t.t2=t.sent,t.t3=(0,t.t1)(t.t2),(0,t.t0)(t.t3),t.next=14;break;case 11:t.prev=11,t.t4=t.catch(1),n(T(t.t4.message,!0));case 14:case"end":return t.stop()}}),t,null,[[1,11]])}))),function(e){return t.apply(this,arguments)};var t}(i))}},D=function(e,t){return void 0===e&&(e=0),void 0===t&&(t=0),{type:"Orientation/CHANGE",alpha:e.toFixed(1),beta:t.toFixed(1)}},G=window.navigator.geolocation,Y=function(e){var t,n;function o(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=e.call.apply(e,[this].concat(r))||this).handleOrientationChange=function(e){var n=e.alpha,r=e.beta,o=e.webkitCompassHeading,a=t.props.dispatch;null!==n&&requestAnimationFrame((function(){a(D(o||n,r))}))},t.handleLocationChange=function(e){var n=e.coords,r=n.latitude,o=n.longitude,a=t.props.dispatch;requestAnimationFrame((function(){a(z(r,o))}))},t.handleLocationError=function(e){var n=t.props.dispatch;e.code===e.PERMISSION_DENIED&&n(T("Geolocation is denied, change your settings and reload the page",!0))},t.onMapLoaded=function(){t.props.dispatch(T(""))},t}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var a=o.prototype;return a.componentDidMount=function(){var e=this.props.dispatch,t="ondeviceorientationabsolute"in window?"deviceorientationabsolute":"ondeviceorientation"in window?"deviceorientation":"";e(T("Geolocation support is essential to run the application",!0)),G?(e(T("Requesting location")),G.watchPosition(this.handleLocationChange,this.handleLocationError),t&&window.addEventListener(t,this.handleOrientationChange,!1)):e(T("Geolocation is not supported by your device",!0))},a.render=function(){var e=this.props,t=e.message,n=e.error,o=e.location,a=e.orientation,i=e.venues;return r.createElement(r.Fragment,null,o&&r.createElement(y,{location:o,venues:i,orientation:a,onLoaded:this.onMapLoaded}),r.createElement(M,{message:t,error:n,isVisible:!(o&&""===t)}))},o}(r.PureComponent),J=Object(j.b)((function(e){var t=e.application;return{message:t.message,error:t.error,location:e.location,orientation:e.orientation,venues:e.venues}}))(Y),U=(n(135),function(e){var t=e.store;return r.createElement(j.a,{store:t},r.createElement(J,null))}),K=(R=a.compose,Object(a.createStore)(s,R(Object(a.applyMiddleware)(i.a))));Object(o.render)(r.createElement(U,{store:K}),document.getElementById("root"))},35:function(e,t){e.exports=mapboxgl},6:function(e,t,n){e.exports={container:"fcb6d4",info:"_767c01",text:"_696730",icon:"fba91c",map:"e9f7ea",marker:"_13f243","fx-marker-pulse":"fec78c",venue:"b417a8",type:"_748b77"}},70:function(e,t,n){e.exports={logo:"_8e2c59"}},73:function(e,t,n){n(74),n(77),e.exports=n(136)}});