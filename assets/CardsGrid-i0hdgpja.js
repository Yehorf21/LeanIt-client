import{r as t,l as g,u as P,a as E,b as v,j as e,i as f,m as p}from"./index-BCKjXBWs.js";import{C as F}from"./Card-D09MqPk7.js";const S=({title:a})=>{const[c,x]=t.useState(0),[m,u]=t.useState(0),{cards:o}=g(s=>s.cards),{liked:n}=g(s=>s.user),d=P(),{addNotification:i}=E(),h=v(),b={isGrid:!0,bgColor:"#FFFFFF",hasButton:!1},j=s=>{d(p.setCards(s))},C=s=>{d(p.addCards(s))},N=()=>x(c+1),k=()=>{h(-1)},l=async(s,r)=>{f(a,r).then(y=>s(y.data.content)).catch(()=>i("Cards did not load","Error"))};t.useEffect(()=>{if(a!=="Liked"){l(j,0);return}},[a]),t.useEffect(()=>{c!==0&&a!=="Liked"&&l(C,c)},[c]),t.useEffect(()=>{a!=="Liked"&&(async()=>{try{const r=(await f(a)).data.totalPages;u(r)}catch{i("Could not fetch max pages","Error")}})()},[a]);const w=t.useMemo(()=>a!=="Liked"?o:n,[o,n]);return e.jsxs("section",{className:"padding pt-[100px] pb-[100px] lg:pt-[200px] flex flex-col gap-8 lg:gap-12",children:[e.jsxs("div",{className:"flex flex-col justify-center lg:justify-normal lg:items-center lg:flex-row gap-2 lg:gap-4",children:[e.jsx("button",{className:"arrow-left bg-no-repeat bg-contain h-4 sm:h-8 w-4 sm:w-8",onClick:k}),e.jsx("h3",{className:"font-secondary text-primary text-32 lg:text-64 font-bold uppercase",children:a})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-6 justify-items-center",children:w.map((s,r)=>e.jsx(F,{card:s,settings:b},r))}),c!==m-1&&a!=="Liked"&&e.jsxs("button",{className:"flex items-center justify-center gap-4 w-[100%] h-14 lg:h-16 sm:max-w-[292px] bg-additional rounded-[100px]",onClick:N,children:[e.jsx("p",{className:"font-main text-16 lg:text-20 text-primary font-semibold uppercase",children:"Show more"}),e.jsx("div",{className:"chevron-dark bg-no-repeat bg-contain h-4 w-4"})]})]})};export{S as CardsGrid,S as default};
