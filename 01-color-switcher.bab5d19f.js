!function(){const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let d=null;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,d=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.bab5d19f.js.map
