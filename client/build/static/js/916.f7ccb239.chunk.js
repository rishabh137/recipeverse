"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[916],{2916:(e,r,n)=>{n.r(r),n.d(r,{default:()=>L});var i=n(5043),o=n(4535),t=n(2314),s=n(5263),a=n(6446),c=n(645),l=n(1485),d=n(3287),p=n(9484),x=n(4802),g=n(4536),h=n(9906),f=n(5865),u=n(835),m=n(579);const j=(0,o.Ay)(a.A)({position:"absolute",right:"1.8rem",width:"280px",padding:"15px",borderRadius:"15px",background:"#282828","& > #user-info":{display:"flex",alignItems:"center",margin:"1rem auto",paddingBottom:"1rem",borderBottom:"1px solid gray","& > .user-icon":{fontSize:"18px",padding:"8px 16px",fontWeight:"bold",borderRadius:"50%",background:"#eb6b16",marginRight:"1rem"}},"& > #user-action":{"& >  p":{display:"flex",textDecoration:"none",color:"#fff",fontSize:"18px",width:"100%",padding:"1rem 0",cursor:"pointer",fontWeight:400,"& > svg":{marginRight:"1rem"}},"& >  p:hover":{background:"#383737"}}}),b=e=>{let{setShowDropDown:r}=e;const n=(0,u.Zp)();return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(j,{children:[(0,m.jsxs)(a.A,{id:"user-info",children:[(0,m.jsx)(f.A,{className:"user-icon",children:localStorage.getItem("username").slice(0,1).toUpperCase()}),(0,m.jsx)(f.A,{children:localStorage.getItem("username")})]}),(0,m.jsx)(a.A,{id:"user-action",children:(0,m.jsxs)("p",{onClick:()=>{localStorage.removeItem("token"),localStorage.removeItem("username"),r(!1),n("/login")},children:[(0,m.jsx)(h.A,{})," Sign Out"]})})]})})};var y=n(5475),k=n(3950),A=n.n(k);const S=(0,o.Ay)(t.A)({background:"#0f0f18",boxShadow:"none"}),v={background:"#fff",height:"60%",width:"80%","& > #close-icon ":{display:"flex",justifyContent:"flex-end","& > svg":{cursor:"pointer"}},"& > div":{display:"flex",padding:"20px 1rem",borderBottom:"1px solid gray","& > div > a":{color:"#fff",textDecoration:"none",fontSize:"18px",background:"#eb6b16",padding:"12px 12px"}}},w=(0,o.Ay)(s.A)({display:"flex",justifyContent:"space-between","#topBar":{display:"flex",justifyContent:"center",alignItems:"center"},"& > #topBar > #brand-name":{color:"#fff",marginLeft:"2rem",fontWeight:400,display:"flexbox",marginTop:"4px"},"& > div > div > .userIcon":{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:100,height:"2.3rem",cursor:"pointer",background:"#eb6b16",fontSize:"18px",fontWeight:"Bold",padding:"8px",paddingLeft:"10px"}}),C=(0,o.Ay)(a.A)({border:"1px solid gray",outline:"none",borderRadius:5,minWidth:570,maxWidth:610,height:48,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px","& > div":{color:"#fff",width:"100%",padding:"0 10px"},"& > svg":{color:"gray"}}),D=e=>{let{toggleDrawer:r}=e;const[n,o]=(0,i.useState)(!1),[t,s]=(0,i.useState)(!1),[h,f]=(0,i.useState)(""),[u,j]=(0,i.useState)([]),k=(0,i.useCallback)(A()((async e=>{if(""===e.trim())return void j([]);const r=await fetch("/api/recipes/search?q=".concat(e)),n=await r.json();j(n)}),300),[]);(0,i.useEffect)((()=>{k(h)}),[h,k]);const D=()=>{s(!t)};return(0,m.jsx)(S,{position:"sticky",children:(0,m.jsxs)(w,{children:[(0,m.jsxs)(a.A,{id:"topBar",children:[(0,m.jsx)(d.A,{color:"action",style:{color:"#fff",cursor:"pointer"},onClick:r}),(0,m.jsxs)("h1",{id:"brand-name",children:[(0,m.jsx)("span",{style:{color:"#eb6b16",fontSize:"3rem"},children:"R"}),"ecipe",(0,m.jsx)("span",{style:{color:"#eb6b16"},children:"V"}),"erse"]})]}),(0,m.jsxs)(C,{onClick:D,children:[(0,m.jsx)(p.A,{color:"action"}),(0,m.jsx)(c.Ay,{placeholder:"Search recipe"})]}),(0,m.jsxs)(l.A,{open:t,PaperProps:{sx:v},children:[(0,m.jsx)(a.A,{id:"close-icon",children:(0,m.jsx)(x.A,{onClick:D})}),(0,m.jsx)(c.Ay,{placeholder:"Search recipe",value:h,onChange:e=>f(e.target.value),style:{color:"#111"}}),u.map((e=>(0,m.jsxs)("div",{style:{color:"#111"},children:[(0,m.jsx)("img",{src:"/".concat(e.image),alt:"",style:{width:"100px",marginRight:"20px"}}),(0,m.jsxs)(a.A,{children:[(0,m.jsx)("h2",{children:e.name}),(0,m.jsxs)("p",{children:[e.description.slice(0,100),"..."]}),(0,m.jsx)(y.k2,{to:"/recipes/".concat(e._id),onClick:D,children:"Read more"})]})]},e._id)))]}),(0,m.jsxs)(a.A,{children:[localStorage.getItem("token")?(0,m.jsx)(a.A,{children:(0,m.jsxs)("p",{onClick:()=>{o(!n)},className:"userIcon",children:[localStorage.getItem("username").slice(0,1).toUpperCase(),(0,m.jsx)(g.A,{})]})}):(0,m.jsx)(y.k2,{to:"/login",style:{color:"#fff",textDecoration:"none",fontSize:"18px",background:"#eb6b16",padding:"12px 25px",borderRadius:"5px"},children:"Login"}),n?(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(b,{setShowDropDown:o})}):""]})]})})};var I=n(4109),R=n(5721),B=n(1322);const z=[{id:0,title:"Home",link:"/recipes"},{id:1,title:"Add Recipe",link:"/add-recipe"},{id:2,title:"My Recipe",link:"/my-recipe"}],W=(0,o.Ay)(a.A)({"& >ul > li> .active":{background:"#383737"},"& > ul > li > a":{textDecoration:"none",width:"100%",color:"#fff",padding:"1rem 4.5rem",fontWeight:400,fontSize:"19px"},"& > ul > li > a:hover":{background:"#383737"}}),F=()=>{var e=localStorage.getItem("token");return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(W,{children:(0,m.jsx)(R.A,{children:z.map((r=>(0,m.jsx)(B.Ay,{children:(0,m.jsx)(y.k2,{to:e?r.link:"/login",children:r.title})},r.id)))})})})},M=e=>{let{openDrawer:r}=e;return(0,m.jsx)(I.Ay,{anchor:"left",open:r,hideBackdrop:!0,ModalProps:{keepMounted:!0},variant:"persistent",sx:{"& .MuiDrawer-paper":{marginTop:"80px",width:280,background:"#0f0f18",borderRight:"none",height:"calc(100vh - 67px)"}},children:(0,m.jsx)(F,{})})},L=()=>{const[e,r]=(0,i.useState)(!0);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(D,{toggleDrawer:()=>{r(!0!==e)}}),(0,m.jsx)(M,{openDrawer:e}),(0,m.jsx)(u.sv,{context:{openDrawer:e}})]})}}}]);
//# sourceMappingURL=916.f7ccb239.chunk.js.map