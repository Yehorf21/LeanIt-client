import{l as z,r,a as A,u as B,c as G,b as M,j as e,$ as f,e as O,B as q,C as Q,L as V,g as E,D as W,E as H,F as J,G as K}from"./index-CREGoHIF.js";const I={oldPassword:"",newPassword:"",repeatPassword:""},g={email:"",name:""},X=()=>{const{user:s}=z(t=>t.user),[u,n]=r.useState(g),{email:h,name:w}=u,[b,j]=r.useState(I),{oldPassword:N,newPassword:i,repeatPassword:x}=b,[p,o]=r.useState(null),[m,y]=r.useState(!1),{addNotification:a}=A(),v=B(),k=G({minWidth:1024}),P=M(),F=t=>{v(E.setUserImage(t))},U=()=>{P(-1)},L=()=>{v(E.setUser(W)),localStorage.removeItem("user"),localStorage.removeItem("logged-in-notification"),P("/")},C=(t,l)=>{n(d=>({...d,[l]:t.target.value}))},c=(t,l)=>{j(d=>({...d,[l]:t.target.value}))},$=async t=>{o(t);try{if(t==="profile"){await J(u),a("Profile data got updated","Success");return}await K(b),a("Password was updated","Success")}catch{a("Something went wrong","Error")}finally{o(null)}},D=t=>{if(t==="profile"&&(!h.trim()||!w.trim()))return a("Enter valid data in all fields","Error"),!1;if(t==="password"){if(!N.trim()||!i.trim()||!x.trim())return a("Enter valid data in all fields","Error"),!1;if(i!==x)return a("Passwords must match","Error"),!1}return!0},S=async(t,l)=>{if(t.preventDefault(),!!D(l)){if(await $(l),l==="profile"){n(g);return}j(I)}},R=async t=>{o("image");try{await H(t),F(t),a("Image was updated","Success")}catch{}finally{o(null)}};return r.useEffect(()=>{n(g)},[]),r.useEffect(()=>{y(!1)},[s==null?void 0:s.imageId]),e.jsxs("section",{className:"padding mt-10 lg:mt-20 pb-10 lg:pb-[150px]",children:[e.jsxs("div",{className:"mb-10 lg:mb-12 flex justify-normal items-center gap-7",children:[e.jsx("button",{className:"arrow-left bg-no-repeat bg-contain h-4 sm:h-8 w-4 sm:w-8",onClick:U}),e.jsx("h4",{className:"font-secondary text-primary text-28 lg:text-38 font-bold",children:"My Profile"})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-[72px]",children:[e.jsxs("div",{className:"lg:w-[50%] flex flex-col gap-[96px] lg:gap-[274px] lg:order-1",children:[e.jsxs("div",{className:"flex flex-col items-center gap-6 lg:gap-10",children:[e.jsx("h5",{className:"font-main text-20 lg:text-28 text-text-primary font-semibold",children:"Replace photo"}),e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:`/images/profile/profile-${(s==null?void 0:s.imageId)||1}.png`,alt:"profile",className:"w-40 h-40 lg:w-[200px] lg:h-[200px] rounded-full"}),e.jsx("button",{className:"absolute -bottom-7 left-14 lg:left-[72px] flex justify-center items-center h-12 w-12 lg:h-14 lg:w-14 bg-secondary rounded-full",onClick:()=>y(!m),children:p==="image"?e.jsx(f,{height:"30",width:"30",color:"#fff",ariaLabel:"circles-loading",wrapperStyle:{},wrapperClass:"",visible:!0}):e.jsx("div",{className:O("camera h-6 lg:h-8 w-6 lg:w-8 bg-contain bg-no-repeat",{"camera-filled":m})})}),m&&e.jsx("ul",{className:"profile-images absolute left-[14px] lg:left-[unset] top-[200px] lg:top-[256px] h-fit z-50 flex flex-col gap-8 lg:gap-[50px] rounded-[24px] bg-additional p-6 lg:p-10",children:q.map(t=>{if(t!==(s==null?void 0:s.imageId))return e.jsx("li",{children:e.jsx("button",{className:"h-20 w-20 lg:h-[120px] lg:w-[120px] bg-contain bg-center rounded-full",style:{backgroundImage:`url(/images/profile/profile-${t}.png)`},onClick:()=>R(t)})})})})]})]}),e.jsx("div",{className:"flex flex-col gap-20 lg:gap-[134px] sm:self-center",children:Q.map(t=>e.jsxs(V,{path:`/${t.title.toLowerCase()}`,className:"group relative flex sm:w-[70vw] lg:w-[503px] items-center gap-6 max-w-[503px] bg-[#FEF99F] p-6 lg:p-10 rounded-[24px] cursor-pointer",children:[e.jsx("div",{className:`${t.icon} h-6 w-6 bg-contain bg-no-repeat`}),e.jsx("h4",{className:"font-secondary text-28 lg:text-38 text-primary",children:t.title}),e.jsx("img",{className:"absolute bottom-10 lg:group-hover:bottom-[104px] left-0 rounded-[16px] rounded-b-none w-[100%] h-[100%] object-cover object-top -z-10 transition-all duration-300 ease-in-out",src:t.img,alt:"page-image"})]},t.title))}),k&&e.jsx("a",{href:"/",className:"-mt-[216px] w-[292px] font-main text-16 sm:text-20 font-semibold text-primary uppercase self-end",onClick:L,children:"Log Out"})]}),e.jsxs("div",{className:"lg:w-[50%] flex flex-col gap-[90px] lg:gap-20",children:[e.jsxs("form",{action:"#",className:"flex flex-col gap-8 lg:gap-10",onSubmit:t=>S(t,"profile"),children:[e.jsx("legend",{className:"font-main text-20 sm:text-28 font-semibold text-text-primary",children:"Edit info"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h5",{className:"ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary",children:"Email"}),e.jsx("input",{type:"email",className:"pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary",placeholder:"Enter your email",value:h,onChange:t=>C(t,"email")})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h5",{className:"ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary",children:"Name or Nickname"}),e.jsx("input",{type:"text",className:"pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary",placeholder:"Enter your name",value:w,onChange:t=>C(t,"name")})]})]}),e.jsx("button",{className:"flex justify-center items-center h-14 sm:h-16 max-w-[500px] lg:max-w-[292px] bg-primary rounded-[100px] font-main text-white text-16 sm:text-20 font-semibold uppercase",children:p==="profile"?e.jsx(f,{height:"30",width:"30",color:"#fff",ariaLabel:"circles-loading",wrapperStyle:{},wrapperClass:"",visible:!0}):"Save"})]}),e.jsxs("form",{action:"#",className:"flex flex-col gap-8 lg:gap-10",onSubmit:t=>S(t,"password"),children:[e.jsx("legend",{className:"font-main text-20 sm:text-28 font-semibold text-text-primary",children:"Change password"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h5",{className:"ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary",children:"Current Password"}),e.jsx("input",{type:"password",className:"pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary",placeholder:"Enter current password",value:N,onChange:t=>c(t,"oldPassword")})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h5",{className:"ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary",children:"New Password"}),e.jsx("input",{type:"password",className:"pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary",placeholder:"Enter new password",value:i,onChange:t=>c(t,"newPassword")})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h5",{className:"ml-6 sm:ml-[30px] font-main text-20 sm:text-28 font-semibold text-text-primary",children:"Confirm Password"}),e.jsx("input",{type:"password",className:"pt-[15px] pb-[15px] px-6 sm:px-[30px] rounded-[80px] font-main text-20 sm:text-24 text-text-secondary",placeholder:"Confirm new password",value:x,onChange:t=>c(t,"repeatPassword")})]})]}),e.jsx("button",{className:"flex justify-center items-center h-14 sm:h-16 max-w-[500px] lg:max-w-[292px] bg-primary rounded-[100px] font-main text-white text-16 sm:text-20 font-semibold uppercase",children:p==="password"?e.jsx(f,{height:"30",width:"30",color:"#fff",ariaLabel:"circles-loading",wrapperStyle:{},wrapperClass:"",visible:!0}):"Save"})]})]})]})]})};export{X as Profile,X as default};
