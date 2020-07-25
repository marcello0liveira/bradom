# bradom

**bradom** é um estudo em português sobre alternativas eficientes de renderização no front-end. O repositório está organizado em monorepo, com os packages:

- **bradom-vdom-nodiff**: abordagem com virtual dom porém sem utilizar o algoritmo de diferenciação de nós.
- **bradom-vdom**: abordagem com uma virtual dom completa.
- **bradom-ttl**: abordagem utilizando tagged template literals (incompleta).
- **bradom-react**: benchmark com react.
- **bradom-docfrag**: abordagem ingênua utilizando Document Fragment.
- **bradom-innerhtml**: abordagem ingênua utilizando innerHTML.

As abordagens estudadas até agora são: virtual dom (utilizada por react, vue, stencil entre outros) e tagged template literals (utilizada por hyperHTML, litElement entre outros).

Além dessas técnicas também há duas abordagens simples utilizando innerHTML e documentFragment. Essas abordagens não são eficientes na manutenção de estado.

Existem várias formas de contribuir com o estudo, alguma delas:
- da suporte para namespaces diferentes
- processar a diferenciação de nós em webworker
- utilizar wasm para simular a virtual DOM
- formas mais eficientes de salvar o template e reutilizá-lo
- benchmark com outras techs
- implementar lifecycles

## Testando:

rodar `npm run gendata` para gerar dados para: `bradom-docfrag`, `bradom-innerhtml`, `bradom-react` e `bradom-vdom`.