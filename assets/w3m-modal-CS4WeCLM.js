const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DNfjtiM6.js","assets/index-BSVOad49.js","assets/index-CAumgMRP.css"])))=>i.map(i=>d[i]);
import{aF as k,aG as C,M as a,A as w,O as b,aH as S,E as x,aI as A,R as p,aJ as g,U as E,i as O,S as _,aK as m,aL as c,c as L,aM as K}from"./index-BSVOad49.js";const N=k`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var l=function(u,e,t,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(u,e,t,o);else for(var d=u.length-1;d>=0;d--)(r=u[d])&&(i=(s<3?r(i):s>3?r(e,t,i):r(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};const v="scroll-lock";let n=class extends C{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=a.state.open,this.caipAddress=w.state.caipAddress,this.isSiweEnabled=b.state.isSiweEnabled,this.connected=w.state.isConnected,this.loading=a.state.loading,this.shake=a.state.shake,this.initializeTheming(),S.prefetch(),this.unsubscribe.push(a.subscribeKey("open",e=>e?this.onOpen():this.onClose()),a.subscribeKey("shake",e=>this.shake=e),a.subscribeKey("loading",e=>{this.loading=e,this.onNewAddress(w.state.caipAddress)}),w.subscribeKey("isConnected",e=>this.connected=e),w.subscribeKey("caipAddress",e=>this.onNewAddress(e)),b.subscribeKey("isSiweEnabled",e=>this.isSiweEnabled=e)),x.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?A`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e=p.state.view==="ConnectingSiwe",t=p.state.view==="ApproveTransaction";if(this.isSiweEnabled){const{SIWEController:o}=await g(async()=>{const{SIWEController:i}=await import("./index-DNfjtiM6.js");return{SIWEController:i}},__vite__mapDeps([0,1,2]));o.state.status!=="success"&&(e||t)?a.shake():a.close()}else a.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=K.state,o=E.getColorTheme(t);O(e,o)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),_.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=v,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${v}"]`);e&&e.remove()}onAddKeyboardListener(){var t;this.abortController=new AbortController;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("wui-card");e==null||e.focus(),window.addEventListener("keydown",o=>{if(o.key==="Escape")this.handleClose();else if(o.key==="Tab"){const{tagName:s}=o.target;s&&!s.includes("W3M-")&&!s.includes("WUI-")&&(e==null||e.focus())}},this.abortController)}onRemoveKeyboardListener(){var e;(e=this.abortController)==null||e.abort(),this.abortController=void 0}async onNewAddress(e){var r,d;if(!this.connected||this.loading)return;const t=m.getPlainAddress(this.caipAddress),o=m.getPlainAddress(e),s=m.getNetworkId(this.caipAddress),i=m.getNetworkId(e);if(this.caipAddress=e,this.isSiweEnabled){const{SIWEController:h}=await g(async()=>{const{SIWEController:y}=await import("./index-DNfjtiM6.js");return{SIWEController:y}},__vite__mapDeps([0,1,2])),f=await h.getSession();if(f&&t&&o&&t!==o){(r=h.state._client)!=null&&r.options.signOutOnAccountChange&&(await h.signOut(),this.onSiweNavigation());return}if(f&&s&&i&&s!==i){(d=h.state._client)!=null&&d.options.signOutOnNetworkChange&&(await h.signOut(),this.onSiweNavigation());return}this.onSiweNavigation()}}onSiweNavigation(){this.open?p.push("ConnectingSiwe"):a.open({view:"ConnectingSiwe"})}};n.styles=N;l([c()],n.prototype,"open",void 0);l([c()],n.prototype,"caipAddress",void 0);l([c()],n.prototype,"isSiweEnabled",void 0);l([c()],n.prototype,"connected",void 0);l([c()],n.prototype,"loading",void 0);l([c()],n.prototype,"shake",void 0);n=l([L("w3m-modal")],n);export{n as W3mModal};
