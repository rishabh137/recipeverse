"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[499,79],{6499:(e,r,t)=>{t.r(r),t.d(r,{default:()=>h});var n=t(835),i=t(5475),o=t(6446),s=t(5865),c=t(4079),a=t(5043),d=t(6213),l=t(579);const h=()=>{const e=(0,n.Zp)(),{openDrawer:r}=(0,n.KC)(),[t,h]=(0,a.useState)([]),[p,m]=(0,a.useState)("");(0,a.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("token"),r={headers:{Authorization:"Bearer ".concat(e)}},{data:t}=await d.A.get("/api/recipes/myrecipes",r);h(t)}catch(p){console.error(p),m("Failed to fetch recipes")}})()}),[]);return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c.RecipeContainer,{style:r?{marginLeft:280}:{marginLeft:0},children:[p&&(0,l.jsx)("p",{style:{color:"red"},children:p}),0===t.length?(0,l.jsx)("h1",{style:{fontWeight:"400",color:"#eb6b16"},children:"Create your first post"}):(0,l.jsx)(l.Fragment,{children:t.map((r=>(0,l.jsxs)(o.A,{children:[(0,l.jsx)("img",{src:"/".concat(r.image),alt:r.name}),(0,l.jsxs)(o.A,{children:[(0,l.jsx)("h1",{children:r.name}),(0,l.jsx)("h2",{children:"Ingredients: "}),(0,l.jsxs)(s.A,{style:{marginBottom:"1rem"},children:[r.ingredients.slice(0,2),"..."]}),(0,l.jsxs)(s.A,{children:[r.description.slice(0,100),"..."]})]}),(0,l.jsx)("button",{children:(0,l.jsx)(i.k2,{to:"/recipes/".concat(r._id),children:"Read more"})}),(0,l.jsx)("button",{style:{color:"#fff",textDecoration:"none",fontSize:"18px",background:"#eb6b16",padding:"12px 12px",cursor:"pointer"},onClick:()=>(async r=>{const t=localStorage.getItem("token");if(!1===window.confirm("Are you sure to delete your recipe?"))return;(await fetch("/api/recipes/".concat(r),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t)}})).ok&&e("/recipes")})(r._id),children:"Delete Recipe"})]})))})]})})}},4079:(e,r,t)=>{t.r(r),t.d(r,{RecipeContainer:()=>p,default:()=>m});var n=t(4535),i=t(6446),o=t(835),s=t(5865),c=t(5475),a=t(5043),d=t(6213),l=t(579);const h=()=>{const[e,r]=(0,a.useState)([]);return(0,a.useEffect)((()=>{(async()=>{const{data:e}=await d.A.get("/api/recipes");r(e)})()}),[]),(0,l.jsx)(l.Fragment,{children:e.map((e=>(0,l.jsxs)(i.A,{children:[(0,l.jsx)("img",{src:"/".concat(e.image),alt:e.name}),(0,l.jsxs)(i.A,{children:[(0,l.jsx)("h1",{children:e.name}),(0,l.jsx)("h2",{children:"Ingredients: "}),(0,l.jsxs)(s.A,{style:{marginBottom:"1rem"},children:[e.ingredients.slice(0,2),"..."]}),(0,l.jsxs)(s.A,{children:[e.description.slice(0,100),"..."]})]}),(0,l.jsx)("button",{children:(0,l.jsx)(c.k2,{to:"/recipes/".concat(e._id),children:"Read more"})})]})))})},p=(0,n.Ay)(i.A)({padding:"4rem",display:"flex",alignItems:"center",flexWrap:"wrap","& > div":{background:"#282828",width:"320px",borderRadius:"12px",paddingBottom:"2rem",transition:"0.1s",marginRight:"3rem",marginBottom:"3rem"},"& > div:hover":{transform:"scale(1.1)"},"& > div > img":{width:"100%",height:"300px",borderTopLeftRadius:"12px",borderTopRightRadius:"12px"},"& > div > div":{paddingLeft:"1rem","& > h1, h2":{color:"#eb6b16",fontWeight:400},"& > h2":{marginBottom:"1rem"}},"& > div > button":{background:"none",border:"none",outline:"none",marginTop:"1rem",marginLeft:"10px"},"& > div > button > a":{color:"#fff",textDecoration:"none",fontSize:"18px",background:"#eb6b16",padding:"12px 28px",marginTop:"1rem"}}),m=()=>{const{openDrawer:e}=(0,o.KC)();return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(p,{style:e?{marginLeft:280}:{marginLeft:0},children:(0,l.jsx)(h,{})})})}}}]);
//# sourceMappingURL=499.644eb756.chunk.js.map