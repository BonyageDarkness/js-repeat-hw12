import{a as h,S as L,i as y}from"./assets/vendor-CRsTpldL.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();async function p(r,n){const s="44822574-4b43621c9303530917b2f490d",e=new URLSearchParams({per_page:15,page:n});return(await h.get(`https://pixabay.com/api/?key=${s}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&${e}`)).data}const w=new L(".gallery a");function b(){document.getElementById("loader").classList.remove("is-visible")}function f(r){const n=document.querySelector(".gallery"),s=r.map(e=>`
    <li class="gallery-item" style="list-style-type: none;">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"
            style="width: 360px; height: 200px; flex-shrink: 0; font-size: 0;" />
      </a>
      <div class="description">
      <p class="likes"><strong>Likes</strong>${e.likes}</p>
      <p class="views"><strong>Views</strong>${e.views}</p>
      <p class="comments"><strong>Comments</strong>${e.comments}</p>
      <p class="downloads"><strong>Downloads</strong>${e.downloads}</p>
      </div>

    </li>
  `).join("");n.insertAdjacentHTML("beforeend",s),w.refresh(),b()}const m=document.querySelector(".form"),i=document.querySelector(".loadBtn");let l=1,u="",a=0;const d=15;i.style.display="none";m.addEventListener("submit",v);function v(r){r.preventDefault();const s=r.currentTarget.elements["search-text"].value.toLowerCase();s!==u&&(l=1,document.querySelector(".gallery").innerHTML=""),u=s,p(s,l).then(e=>{if(e.hits.length===0)return i.style.display="none",y.error({message:`Sorry, there are no images matching your ${s}. Please try again!`});f(e.hits),a=e.totalHits,g()}).catch(e=>console.log("error catch",e)),m.reset()}i.addEventListener("click",async()=>{const r=await p(u,l+1);if(r.hits.length===0)return i.style.display="none",y.error({position:"topRight",message:"We're sorry, there are no more posts to load"});l+=1,f(r.hits),a=r.totalHits,g();const n=document.querySelectorAll(".gallery-item"),s=(l-1)*d,e=n[s];e&&e.scrollIntoView({behavior:"smooth",block:"start"})});function g(){l*d>=a||a<=d?(i.style.display="none",y.success({message:"We're sorry, but you've reached the end of search results."})):i.style.display="block"}
//# sourceMappingURL=index.js.map
