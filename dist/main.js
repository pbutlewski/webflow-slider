(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";const s="project-slider_item",o="slider_image";function c(){const a="https://api.dribbble.com/v2/user/shots?access_token=742adcb3360f4ae797bf06755fb7f0e20e17ee900d2957118a55eb38a57a4753",i=(e,n)=>{const t=document.getElementsByClassName(s)[n];t.href=e.html_url,t.target="_blank",t.title=e.title;const r=document.getElementsByClassName(o)[n];r.dataset.src=e.images.hidpi},l=e=>{e.forEach(function(n,t){i(n,t)})};fetch(a,{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>{if(e.ok)return e.json()}).then(e=>{l(e.slice(0,8))}).catch(e=>{console.log(e)})}var d="";window.Webflow||(window.Webflow=[]),window.Webflow.push(c)});
