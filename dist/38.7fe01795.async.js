(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{uR4u:function(e,t,a){"use strict";a.r(t);a("7Kak");var o=a("9yH6"),n=a("PpiC"),s=a("tJVT"),i=a("t9Se"),l=a("q1tI"),r=a.n(l),m=a("DEH5"),c={fastly:{name:"Fastly",tiles:["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],attribution:"fastly.net"},gaode:{name:"\u9ad8\u5fb7",tiles:["//webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"],attribution:"\u9ad8\u5fb7",maxzoom:18,minzoom:2},google:{name:"\u8c37\u6b4c",tiles:["//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"],attribution:"\u8c37\u6b4c"},geoq:{name:"Geoq",tiles:["//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}"],attribution:"Geoq"},osm:{name:"OSM",tiles:["//c.tile.osm.org/{z}/{x}/{y}.png"],attribution:"OSM"}},u=Object.keys(c);t["default"]=()=>{var e=Object(l["useState"])(0),t=Object(s["a"])(e,2),a=t[0],y=t[1],p=Object(l["useCallback"])(e=>{y(e.target.value)},[]),b=Object(l["useMemo"])(()=>c[u[a]],[a]),z=(b.name,Object(n["a"])(b,["name"]));return r.a.createElement("div",{className:"full"},r.a.createElement(i["h"],{ref:e=>{window.map=e},accessToken:m["a"].accessToken,style:{version:8,sources:{},layers:[]},center:m["a"].center,zoom:m["a"].zoom,maxZoom:z.maxzoom,minZoom:z.minzoom},r.a.createElement(i["l"],{id:"raster-tiles",option:{tiles:z.tiles,tileSize:z.tileSize||256,attribution:z.attribution||""}},r.a.createElement(i["f"],{id:"raster-layer",source:"raster-tiles",type:"raster"}))),r.a.createElement("div",{style:{position:"absolute",top:0}},r.a.createElement(o["a"].Group,{defaultValue:0,onChange:p,buttonStyle:"solid"},u.map((e,t)=>r.a.createElement(o["a"].Button,{key:"".concat(e,"-btn"),value:t},c[e].name)))))}}}]);