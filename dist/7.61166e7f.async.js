(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"9kvl":function(e,r,t){"use strict";t.d(r,"a",(function(){return o["b"]})),t.d(r,"b",(function(){return n["a"]})),t.d(r,"c",(function(){return m}));var a,o=t("FfOG"),n=t("bCY9"),s=(t("I5X1"),t("WmNS")),i=t.n(s),c=t("9og8"),u=(t("/xke"),t("TeRw")),d=(t("miYZ"),t("tsqr")),l=(t("PpiC"),t("k1fw")),p=t("io9h"),f=t("LtsZ");t("TTbB");(function(e){e[e["SILENT"]=0]="SILENT",e[e["WARN_MESSAGE"]=1]="WARN_MESSAGE",e[e["ERROR_MESSAGE"]=2]="ERROR_MESSAGE",e[e["NOTIFICATION"]=4]="NOTIFICATION",e[e["REDIRECT"]=9]="REDIRECT"})(a||(a={}));var v,E="/exception",b=()=>{var e;if(v)return v;var r=n["a"].applyPlugins({key:"request",type:f["ApplyPluginsType"].modify,initialValue:{}}),t=(null===(e=r.errorConfig)||void 0===e?void 0:e.adaptor)||(e=>e);v=Object(p["b"])(Object(l["a"])({errorHandler:e=>{var n,s,i,c;if(null===e||void 0===e||null===(n=e.request)||void 0===n||null===(s=n.options)||void 0===s?void 0:s.skipErrorHandler)throw e;if("ResponseError"===e.name&&e.data&&e.request){var l,p={req:e.request,res:e.response};c=t(e.data,p),e.message=(null===(l=c)||void 0===l?void 0:l.errorMessage)||e.message,e.data=e.data,e.info=c}if(c=e.info,c){var f,v,b,m=null===(f=c)||void 0===f?void 0:f.errorMessage,R=null===(v=c)||void 0===v?void 0:v.errorCode,w=(null===(b=r.errorConfig)||void 0===b?void 0:b.errorPage)||E;switch(null===(i=c)||void 0===i?void 0:i.showType){case a.SILENT:break;case a.WARN_MESSAGE:d["a"].warn(m);break;case a.ERROR_MESSAGE:d["a"].error(m);break;case a.NOTIFICATION:u["a"].open({message:m});break;case a.REDIRECT:o["b"].push({pathname:w,query:{errorCode:R,errorMessage:m}});break;default:d["a"].error(m);break}}else d["a"].error(e.message||"Request error, please retry.");throw e}},r)),v.use(function(){var e=Object(c["a"])(i.a.mark((function e(r,a){var o,n,s,c,u,d,l,p;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a();case 2:if(n=r.req,s=r.res,!(null===(o=n.options)||void 0===o?void 0:o.skipErrorHandler)){e.next=5;break}return e.abrupt("return");case 5:if(c=n.options,u=c.getResponse,d=u?s.data:s,l=t(d,r),!1!==l.success){e.next=15;break}throw p=new Error(l.errorMessage),p.name="BizError",p.data=d,p.info=l,p;case 15:case"end":return e.stop()}}),e)})));return function(r,t){return e.apply(this,arguments)}}());var s=r.middlewares||[];s.forEach(e=>{v.use(e)});var b=r.requestInterceptors||[],m=r.responseInterceptors||[];return b.map(e=>{v.interceptors.request.use(e)}),m.map(e=>{v.interceptors.response.use(e)}),v},m=(e,r)=>{var t=b();return t(e,r)}},DEH5:function(e,r,t){"use strict";r["a"]={accessToken:"pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w",style:"mapbox://styles/mapbox/streets-v11",center:{lon:114.305215,lat:30.592935},zoom:10}},a4f4:function(e,r,t){"use strict";t.r(r);var a=t("tJVT"),o=t("q1tI"),n=t.n(o),s=t("45In"),i=t("DEH5"),c=t("9kvl"),u=()=>{Object(o["useRef"])();var e="https://wanderdrone.appspot.com/",r=Object(o["useState"])({data:null,size:1,center:[-114.36500971520232,-8.13046865403699]}),t=Object(a["a"])(r,2),u=t[0],d=t[1],l=Object(o["useRef"])(),p=Object(o["useRef"])(),f=Object(o["useRef"])();Object(o["useEffect"])(()=>(l.current=setInterval(v,3e3),()=>{clearInterval(l.current)}),[]);var v=Object(o["useCallback"])(()=>{Object(c["c"])(e,{method:"get"}).then(e=>{d({data:e,center:e.geometry.coordinates,size:10*Math.random()+1})})},[]);return n.a.createElement(s["h"],{ref:e=>{window.map=e},flyToOptions:{speed:.8},accessToken:i["a"].accessToken,style:i["a"].style,center:u.center,zoom:4,workercount:16},n.a.createElement(s["d"],{ref:p,id:"drone",option:{data:u.data||e}},n.a.createElement(s["f"],{ref:f,id:"layer-id",type:"symbol",source:"drone",layout:{"icon-image":"rocket-15","icon-size":u.size}})))};r["default"]=u}}]);