import{L as O}from"./LayoutSide-TZ-FkNoZ.js";import{d as U,u as j,r as x,c as G,a as H,b as L,e as N,o as J,f as v,g as f,h as d,w as h,i as a,t as b,j as n,E as I,k as $,l as F,F as C,m as T,n as Q,p as Y,_ as W,q as z,s as A,v as R,x as X,y as Z,z as ee,A as te,B as ae,C as le,D as S,G as se}from"./index-AtDTwzgP.js";const K=p=>(z("data-v-addea13f"),p=p(),A(),p),oe={class:"result-area"},ne={class:"result-header"},ie=K(()=>a("h2",{style:{color:"var(--text-minor-color-h)",display:"inline-block"}},"搜索结果",-1)),ue={style:{"margin-left":"0.5em",color:"var(--text-minor-color-i)"}},re={class:"result-container"},de={class:"header"},ce={class:"title-container"},me=["onClick"],ve={class:"tag-list"},pe={class:"author"},ge=["onClick"],fe={class:"summary"},_e=K(()=>a("div",{class:"decoration"},null,-1)),he=U({__name:"BlockResult",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(p,{expose:_}){const g=j(),l=x([]),r=x(1),i=x("default"),w=G(()=>{const c=[],s=Math.max(r.value*20-20,0),e=Math.min(r.value*20,l.value.length);for(let m=s;m<e;m++)c.push(l.value[m]);return c}),E=H(),B=L(),u=N(p,"modelValue");function t(c){var e;let s="";for(const m of c)s+=(((e=B.listTag[m])==null?void 0:e.name)||"")+"#";return s}async function o(){const c=await E.readPostList();l.value=[];for(const s in c){const e=c[s];if(u.value.board&&e.board!==u.value.board||u.value.time&&!(u.value.time[0]<=e.time&&e.time<=u.value.time[1]))continue;let m=!0;for(let y of u.value.tag)if(!e.tag.includes(y)){m=!1;break}if(m===!1)continue;const V=e.title+"#"+e.auth+"#"+e.summary+"#"+t(e.tag);let M=1,D=0,q=-1;for(let y=0;y<V.length&&!(V[y]===u.value.keyword[D]&&(D++,y===q+1?M+=3:M+=1,q=y,D===u.value.keyword.length));y++);D===u.value.keyword.length&&l.value.push({weight:M/Math.sqrt(V.length+1),post:e})}i.value==="default"?l.value.sort((s,e)=>e.weight-s.weight):i.value==="time-old"?l.value.sort((s,e)=>s.post.time-e.post.time):i.value==="time-new"&&l.value.sort((s,e)=>e.post.time-s.post.time)}function P(){i.value==="default"?l.value.sort((c,s)=>s.weight-c.weight):i.value==="time-old"?l.value.sort((c,s)=>c.post.time-s.post.time):i.value==="time-new"&&l.value.sort((c,s)=>s.post.time-c.post.time)}return _({doSearch:o}),J(()=>{o()}),(c,s)=>(v(),f("div",oe,[d(n(Q),{class:"result"},{default:h(()=>[a("div",ne,[a("div",null,[ie,a("span",ue,"共 "+b(l.value.length)+" 条",1)]),a("div",null,[d(n(I),{placeholder:"排序方式",modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=e=>i.value=e),onChange:P,style:{width:"100px"}},{default:h(()=>[d(n($),{label:"默认",value:"default"}),d(n($),{label:"最新文章",value:"time-new"}),d(n($),{label:"最旧文章",value:"time-old"})]),_:1},8,["modelValue"])])]),d(n(F),{total:l.value.length,"page-size":20,"current-page":r.value,"onUpdate:currentPage":s[1]||(s[1]=e=>r.value=e),layout:"prev, pager, next","hide-on-single-page":"",background:"",class:"pagination"},null,8,["total","current-page"]),a("div",re,[(v(!0),f(C,null,T(w.value,({post:e})=>(v(),f("div",{class:"item",key:e.id},[a("div",de,[a("div",ce,[a("span",{class:"title",onClick:m=>n(g).push("/article/"+e.id)},b(e.title),9,me)]),a("div",ve,[(v(!0),f(C,null,T(e.tag,m=>{var V;return v(),f("span",{class:"tag",key:m},b(((V=n(B).listTag[m])==null?void 0:V.name)||"未知标签"),1)}),128))]),a("div",pe,[Y(b(e.auth.name)+" / ",1),d(W,{date:new Date(e.time)},null,8,["date"])])]),a("div",{class:"summary-container",onClick:m=>n(g).push("/article/"+e.id)},[a("div",fe,b(e.summary),1),_e],8,ge)]))),128))]),d(n(F),{total:l.value.length,"page-size":20,"current-page":r.value,"onUpdate:currentPage":s[2]||(s[2]=e=>r.value=e),layout:"prev, pager, next","hide-on-single-page":"",background:"",class:"pagination"},null,8,["total","current-page"])]),_:1})]))}}),ke=R(he,[["__scopeId","data-v-addea13f"]]),k=p=>(z("data-v-02042b17"),p=p(),A(),p),ye={class:"aside"},we={class:"filter"},Ve={class:"param"},xe=k(()=>a("h3",{class:"title"},"关键词",-1)),be=k(()=>a("p",{class:"explain"}," 将会从文章标题、作者、标签、摘要里进行匹配。 ",-1)),$e={class:"param"},Ce=k(()=>a("h3",{class:"title"},"标签",-1)),Te=k(()=>a("p",{class:"explain"}," 将会匹配拥有所有标签的文章。 ",-1)),Be={class:"param"},De=k(()=>a("h3",{class:"title"},"类别",-1)),Se=k(()=>a("p",{class:"explain"}," 将会匹配属于指定类别的文章。 ",-1)),Ee={class:"param time"},Me=k(()=>a("h3",{class:"title"},"时间",-1)),Ie=k(()=>a("p",{class:"explain"}," 将会匹配起止时间之内的文章。 ",-1)),Ue={class:"confirm"},Pe=U({__name:"BlockFilter",props:{modelValue:{required:!0},modelModifiers:{}},emits:X(["search"],["update:modelValue"]),setup(p,{emit:_}){const g=L(),l=N(p,"modelValue"),r=_,i=x(void 0);function w(){i.value!==void 0&&(l.value.tag.includes(i.value)||l.value.tag.push(i.value),i.value=void 0)}function E(u){l.value.tag=l.value.tag.filter(t=>t!==u)}const B=[{text:"一个月内",value:()=>{const u=new Date,t=new Date;return t.setTime(t.getTime()-3600*1e3*24*30),[t,u]}},{text:"半年以内",value:()=>{const u=new Date,t=new Date;return t.setTime(t.getTime()-3600*1e3*24*180),[t,u]}},{text:"一年以内",value:()=>{const u=new Date,t=new Date;return t.setTime(t.getTime()-3600*1e3*24*365),[t,u]}}];return(u,t)=>(v(),f("aside",ye,[d(n(le),{offset:25,target:".aside"},{default:h(()=>[a("section",we,[a("div",Ve,[xe,d(n(Z),{class:"input",modelValue:l.value.keyword,"onUpdate:modelValue":t[0]||(t[0]=o=>l.value.keyword=o),clearable:"",onKeydown:t[1]||(t[1]=ee(o=>r("search"),["enter"]))},null,8,["modelValue"]),be]),a("div",$e,[Ce,(v(!0),f(C,null,T(l.value.tag,o=>(v(),S(se,{key:o,tag:n(g).listTag[o],closeable:"",onClose:P=>E(o)},null,8,["tag","onClose"]))),128)),d(n(I),{modelValue:i.value,"onUpdate:modelValue":t[2]||(t[2]=o=>i.value=o),placeholder:"新增标签",onChange:w},{default:h(()=>[(v(!0),f(C,null,T(n(g).listTag,o=>(v(),S(n($),{key:o.id,label:o.name,value:o.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),Te]),a("div",Be,[De,d(n(I),{modelValue:l.value.board,"onUpdate:modelValue":t[3]||(t[3]=o=>l.value.board=o),placeholder:"选择类别",clearable:""},{default:h(()=>[(v(!0),f(C,null,T(n(g).listBoard,o=>(v(),S(n($),{key:o.id,label:o.name,value:o.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),Se]),a("div",Ee,[Me,d(n(te),{style:{width:"100%"},modelValue:l.value.time,"onUpdate:modelValue":t[4]||(t[4]=o=>l.value.time=o),type:"monthrange","unlink-panels":"","range-separator":"至","start-placeholder":"起始时间","end-placeholder":"终止时间",shortcuts:B,format:"YYYY/MM/DD","value-format":"x"},null,8,["modelValue"]),Ie]),a("div",Ue,[d(n(ae),{onClick:t[5]||(t[5]=o=>r("search")),type:"primary",plain:""},{default:h(()=>[Y("搜索")]),_:1})])])]),_:1})]))}}),qe=R(Pe,[["__scopeId","data-v-02042b17"]]),Ne=U({__name:"BlogSearch",setup(p){const _=x({keyword:"",tag:[],time:[0,1/0]}),g=x();return(l,r)=>(v(),S(O,{background:"purity"},{main:h(()=>[d(ke,{modelValue:_.value,"onUpdate:modelValue":r[0]||(r[0]=i=>_.value=i),ref_key:"engine",ref:g},null,8,["modelValue"])]),aside:h(()=>[d(qe,{modelValue:_.value,"onUpdate:modelValue":r[1]||(r[1]=i=>_.value=i),onSearch:r[2]||(r[2]=i=>{var w;return(w=g.value)==null?void 0:w.doSearch()})},null,8,["modelValue"])]),_:1}))}});export{Ne as default};
