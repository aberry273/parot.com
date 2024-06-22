
function ahref(x) {
  return `<a href="${x.href}" >${x.text}</a>`
}

function li(x) {
  if(x.disabled) return `<li>${x.text}</li>`
  return `<li>${ ahref(x) }</li>`
}

function list(links) {
  let link = ''
  if (links != null && links.length > 0) {
    link = `${links.map(x => li(x)).join('')}`
  }
  return link
}

export default function navbar(data) {
  return {
      data: null,
      fixed: false,
      init() {
          this.data = data;
          const header = `<ul><li><strong><a href="${data.href}">${data.title}</a></strong></li></ul>`;
          let links = list(data.items)
          let dropdownLinks = list(data.dropdown.items || [])
          var html = `
        <nav style="height:50px" :class="fixed ? 'show' : 'hide'" ><ul></ul></nav>
        <nav 
          :class="fixed ? 'container sticky floating' : ''" 
          @scroll.window="fixed = (window.pageYOffset < 1) ? false: true">
          ${header}
          <ul>
            ${links}
            <template x-if="data.dropdown">
              <details class="dropdown avatar">
                <summary role="link">
                  <template x-if="data.dropdown.img+'?w=50'">
                    <img :src="data.dropdown.img" /> 
                  </template>
                  <template x-if="!data.dropdown.img">
                   <i class="icon material-icons icon-click">person</i>
                  </template>
                </summary>
              <ul>
                ${dropdownLinks}
              </ul>
            </details>
            </template>
          </ul>
        </nav>
      `;
          this.$nextTick(() => {
              this.$root.innerHTML = html;
          })
      }
  };
}