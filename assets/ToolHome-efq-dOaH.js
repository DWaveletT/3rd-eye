import{d as w,o,c as l,w as t,a as c,t as d,u as r,E as y,p as E,b as T,_ as x,e as B,f as I,L as M,g as i,h,i as g,r as b,F as k,j as S,k as v}from"./index-jQSCyoNF.js";const F=s=>(E("data-v-2cb1b967"),s=s(),T(),s),L={class:"header"},N={class:"content"},V=F(()=>c("div",{class:"footer"}," 点击进入 ",-1)),j=w({__name:"ToolCard",props:{tool:{}},setup(s){const p=s;return(n,u)=>(o(),l(r(y),{class:"card",shadow:"hover"},{default:t(()=>[c("div",L,[c("h3",null,d(p.tool.name),1)]),c("div",N,d(p.tool.description),1),V]),_:1}))}}),C=x(j,[["__scopeId","data-v-2cb1b967"]]),H={class:"main"},$=w({__name:"ToolHome",setup(s){const n=B().listTool,u=I(()=>{const f={},m={},e={};console.log(Object.fromEntries(Array.from({length:20},(a,_)=>["test-"+_,{id:"test"+_,name:"测试"+_,description:"a".repeat(Math.floor(Math.random()*100))}])));for(const a in n)switch(console.log(a),Math.ceil(Math.random()*3)){case 1:f[a]=n[a];break;case 2:m[a]=n[a];break;default:e[a]=n[a];break}return console.log(n),[f,m,e]});return(f,m)=>(o(),l(M,null,{default:t(()=>[c("main",H,[i(r(S),{gutter:20},{default:t(()=>[i(r(h),{span:8},{default:t(()=>[(o(!0),g(k,null,b(u.value[0],e=>(o(),l(C,{key:e.id,tool:e},{default:t(()=>[v(d(e.name),1)]),_:2},1032,["tool"]))),128))]),_:1}),i(r(h),{span:8},{default:t(()=>[(o(!0),g(k,null,b(u.value[1],e=>(o(),l(C,{key:e.id,tool:e},{default:t(()=>[v(d(e.name),1)]),_:2},1032,["tool"]))),128))]),_:1}),i(r(h),{span:8},{default:t(()=>[(o(!0),g(k,null,b(u.value[2],e=>(o(),l(C,{key:e.id,tool:e},{default:t(()=>[v(d(e.name),1)]),_:2},1032,["tool"]))),128))]),_:1})]),_:1})])]),_:1}))}}),D=x($,[["__scopeId","data-v-4fd27e8d"]]);export{D as default};
