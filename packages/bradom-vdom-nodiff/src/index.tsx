import { h } from './utils/jsx';
import VTree from './types/vtree';

const app = new VTree(
  <div class="red">
    hello World
    <div>
      <h1>bradom-vdom-nodiff</h1>
    </div>
  </div>
);

app.mount('#app');