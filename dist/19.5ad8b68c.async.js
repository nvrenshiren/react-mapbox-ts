(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{RN1p:function(e,t,n){"use strict";n.r(t);var r=n("tJVT"),c=n("DEH5"),a=n("q1tI"),u=n.n(a),o=n("ktp3"),i=()=>{var e=Object(a["useRef"])(),t=Object(a["useRef"])(),n=Object(a["useState"])([[0,0]]),i=Object(r["a"])(n,2),s=i[0],l=i[1],p=Object(a["useRef"])([[0,0]]),b=Object(a["useRef"])(!1),f=Object(a["useRef"])(0),m=Object(a["useRef"])(0),d=Object(a["useCallback"])(()=>{var e=30;function n(r){if(b.current?(f.current=performance.now()-m.current,b.current=!1):m.current=r-f.current,m.current>360*e)f.current=r,p.current=[];else{var c=m.current/e,a=40*Math.sin(c*Math.PI/90);p.current.push([c,a]),l([...p.current])}t.current=requestAnimationFrame(n)}n()},[]),j=Object(a["useCallback"])(()=>{t.current?(cancelAnimationFrame(t.current),t.current=null):(b.current=!0,d())},[]);return u.a.createElement(o["h"],{ref:t=>{window.map=t,e.current=t},onLoad:()=>{f.current=performance.now(),d()},onClick:j,accessToken:c["a"].accessToken,style:"mapbox://styles/mapbox/streets-v11",zoom:.5,center:[0,0]},u.a.createElement(o["d"],{id:"line",option:{data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:s}}]}}},u.a.createElement(o["f"],{id:"line-animation",source:"line",type:"line",paint:{"line-color":"#ed6498","line-width":5,"line-opacity":.8},layout:{"line-cap":"round","line-join":"round"}})))};t["default"]=i}}]);