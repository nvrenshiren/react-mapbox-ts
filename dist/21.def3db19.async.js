(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{Y6BE:function(e,a,t){"use strict";t.r(a);var r=t("DEH5"),o=t("q1tI"),i=t.n(o),n=t("t9Se"),l=()=>{Object(o["useRef"])();return Object(o["useEffect"])(()=>{},[]),i.a.createElement(n["h"],{ref:e=>{window.map=e},accessToken:r["a"].accessToken,style:"mapbox://styles/mapbox/dark-v10",center:[-120,50],zoom:2,workercount:100},i.a.createElement(n["d"],{id:"earthquakes",option:{data:"https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"}},i.a.createElement(n["f"],{id:"earthquakes-heat",type:"heatmap",source:"earthquakes",maxzoom:9,paint:{"heatmap-weight":["interpolate",["linear"],["get","mag"],0,0,6,1],"heatmap-intensity":["interpolate",["linear"],["zoom"],0,1,9,3],"heatmap-color":["interpolate",["linear"],["heatmap-density"],0,"rgba(33,102,172,0)",.2,"rgb(103,169,207)",.4,"rgb(209,229,240)",.6,"rgb(253,219,199)",.8,"rgb(239,138,98)",1,"rgb(178,24,43)"],"heatmap-radius":["interpolate",["linear"],["zoom"],0,2,9,20],"heatmap-opacity":["interpolate",["linear"],["zoom"],7,1,9,0]},before:"waterway-label"}),i.a.createElement(n["f"],{id:"earthquakes-point",type:"circle",source:"earthquakes",minzoom:7,paint:{"circle-radius":["interpolate",["linear"],["zoom"],7,["interpolate",["linear"],["get","mag"],1,1,6,4],16,["interpolate",["linear"],["get","mag"],1,5,6,50]],"circle-color":["interpolate",["linear"],["get","mag"],1,"rgba(33,102,172,0)",2,"rgb(103,169,207)",3,"rgb(209,229,240)",4,"rgb(253,219,199)",5,"rgb(239,138,98)",6,"rgb(178,24,43)"],"circle-stroke-color":"white","circle-stroke-width":1,"circle-opacity":["interpolate",["linear"],["zoom"],7,0,8,1]},before:"waterway-label"})))};a["default"]=l}}]);