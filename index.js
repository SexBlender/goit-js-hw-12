import{a as b,S as w,i as d}from"./assets/vendor-CFFvTae-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const M="55520229-6b38dd18315a985816c1e4a23",v=b.create({baseURL:"https://pixabay.com/api/"});async function f(e,o){const a={key:M,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};return(await v.get("",{params:a})).data}const s={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")},S=new w(".gallery a",{captionsData:"alt",captionDelay:250});function P(e){return`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>

      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </li>
  `}function m(e){const o=e.map(P).join("");s.gallery.insertAdjacentHTML("beforeend",o),S.refresh()}function q(){s.gallery.innerHTML=""}function p(){s.loader.classList.remove("hidden")}function y(){s.loader.classList.add("hidden")}function B(){s.loadMoreBtn.classList.remove("hidden")}function u(){s.loadMoreBtn.classList.add("hidden")}const g=document.querySelector(".form"),E=document.querySelector(".load-more");let l,i,h;const D=15;g.addEventListener("submit",$);E.addEventListener("click",O);async function $(e){if(e.preventDefault(),l=new FormData(e.target).get("search-text").trim(),i=1,!l){d.error({title:"Error",message:"Please enter a search term!"});return}q(),p(),u();try{const a=await f(l,i),n=a.hits||[];if(!n.length){d.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}m(n),h=Math.ceil(a.total/D),console.log(a.total)}catch{d.error({title:"Error",message:"Something went wrong. Try again later."})}finally{y(),L()}g.reset()}async function O(){i+=1,u(),p();try{const e=await f(l,i);m(e.hits),L()}catch(e){console.log(e.message)}finally{y()}}function L(){i<h?B():u()}
//# sourceMappingURL=index.js.map
