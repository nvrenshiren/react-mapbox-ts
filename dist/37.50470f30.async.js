(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[37],{DEH5:function(e,t,a){"use strict";t["a"]={accessToken:"pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w",style:"mapbox://styles/mapbox/streets-v11",center:{lon:114.305215,lat:30.592935},zoom:10}},MUQv:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),o=a.n(n),r=a("45In"),s=a("DEH5"),i=()=>{Object(n["useRef"])();var e=64,t=Object(n["useMemo"])(()=>{for(var t=4,a=new Uint8Array(e*e*t),n=0;n<e;n++)for(var o=0;o<e;o++){var r=(o*e+n)*t;a[r+0]=o/e*255,a[r+1]=n/e*255,a[r+2]=128,a[r+3]=255}return a},[]);return o.a.createElement(r["h"],{ref:e=>{window.map=e},accessToken:s["a"].accessToken,style:s["a"].style},o.a.createElement(r["a"],{name:"gradient",image:{width:e,height:e,data:t}},o.a.createElement(r["d"],{id:"point",option:{data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[0,0]}}]}}},o.a.createElement(r["f"],{id:"points",type:"symbol",source:"point",layout:{"icon-image":"gradient"}}))))};t["default"]=i}}]);