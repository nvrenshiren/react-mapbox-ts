(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[31],{DEH5:function(e,t,a){"use strict";t["a"]={accessToken:"pk.eyJ1IjoiMTg2MjcwMjE1NDMiLCJhIjoiY2s4dHh3dnJ6MDBlMDNmb2l2bDQ4aDF1YSJ9.f6-80XxhwYLNJRDdntMF2w",style:"mapbox://styles/mapbox/streets-v11",center:{lon:114.305215,lat:30.592935},zoom:10}},fKow:function(e,t,a){"use strict";a.r(t);var o=a("DEH5"),r=a("q1tI"),l=a.n(r),c=a("PYKl"),n=()=>{var e=Object(r["useRef"])();return l.a.createElement(c["Map"],{ref:t=>{e.current=t,window.map=t},accessToken:o["a"].accessToken,style:{version:8,sprite:"mapbox://sprites/mapbox/dark-v10",glyphs:"mapbox://fonts/mapbox/{fontstack}/{range}.pbf",sources:{},layers:[]},zoom:5,maxZoom:6,minZoom:4,center:[-75.789,41.874],workercount:16},l.a.createElement(c["Layer"],{id:"background",type:"background",paint:{"background-color":"#111"}}),l.a.createElement(c["ImageSource"],{id:"overlay",option:{url:"https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif",coordinates:[[-80.425,46.437],[-71.516,46.437],[-71.516,37.936],[-80.425,37.936]]}},l.a.createElement(c["Layer"],{id:"overlay",source:"overlay",type:"raster",paint:{"raster-opacity":.85}})),l.a.createElement(c["VectorSource"],{id:"mapbox",option:{url:"mapbox://mapbox.mapbox-streets-v8"}},l.a.createElement(c["Layer"],{id:"water",source:"mapbox",sourceLayer:"water",type:"fill",paint:{"fill-color":"#2c2c2c"}}),l.a.createElement(c["Layer"],{id:"boundaries",source:"mapbox",sourceLayer:"admin",type:"line",paint:{"line-color":"#797979","line-dasharray":[2,2,6,2]},filter:["all",["==","maritime",0]]}),l.a.createElement(c["Layer"],{id:"cities",source:"mapbox",sourceLayer:"place_label",type:"symbol",paint:{"text-color":"#969696","text-halo-width":2,"text-halo-color":"rgba(0, 0, 0, 0.85)"},layout:{"text-field":"{name_en}","text-font":["DIN Offc Pro Bold","Arial Unicode MS Bold"],"text-size":["interpolate",["linear"],["zoom"],4,9,6,12]}}),l.a.createElement(c["Layer"],{id:"states",source:"mapbox",sourceLayer:"place_label",type:"symbol",paint:{"text-color":"#969696","text-halo-width":2,"text-halo-color":"rgba(0, 0, 0, 0.85)"},layout:{"text-transform":"uppercase","text-field":"{name_en}","text-font":["DIN Offc Pro Bold","Arial Unicode MS Bold"],"text-letter-spacing":.15,"text-max-width":7,"text-size":["interpolate",["linear"],["zoom"],4,10,6,14]},filter:["==",["get","class"],"state"]})))};t["default"]=n}}]);