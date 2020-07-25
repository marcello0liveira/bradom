const parseObject = obj => JSON.stringify(obj);


const $divTemplate = document.getElementById('div-template');
const $divTemplate2 = document.getElementById('div-template2');

// [TODO] criar $divTemplate de maneira dinâmica
// [E.G] um parser de string para template DOM
const templates = {
  '<div>$</div>': $divTemplate,
  '<div>$</div><div class="red">$</div>': $divTemplate2,

}

const $app = document.getElementById('app') as any;

function html(strings: TemplateStringsArray, ...interpolations: (any)[]) {
  return (props?) => {
    const cacheKey = strings.join('$');
    const $template = templates[cacheKey]

    if ($template) {
      // [TODO] como achar os valores a serem substituidos no template?
      // [E.G] seleciono todos e busco em cada elemento quem possui {{}}
      let index = 0;

      const clone = document.importNode($template.content, true);
      const content = clone.querySelectorAll('*');

      content.forEach(el => {
        console.log(el, el.textContent)
        if (el.textContent === '{{}}') {
          el.textContent = interpolations[index];
          index++;
        }
      });

      $app.appendChild(clone);
    }

  }
}
const item = header => html`<div>${header}</div>`;
const item2 = (a, b) => html`<div>${a}</div><div class="red">${b}</div>`;

item('title')();
item('titl1')();
item('4124124124')();
item2('xxx', 'yyy')();
