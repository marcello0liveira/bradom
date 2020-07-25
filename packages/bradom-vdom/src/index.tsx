import { h } from './utils/jsx';

import list from './data';
import Component from './types/component';
import BraDOM from './types/bra-dom';

class App extends Component {
  render() {
    const { value } = this.props;
    return (
      <ul class="red">
        {
          list
            .filter(item => value ? value === item.substr(0, value.length) : true)
            .map(item => (<li>{item}</li>))
        }
      </ul>
    )
  }
}

const app = new App();

BraDOM.mount('#app', app);

class Filter extends Component {
  render() {
    return (
      <input
        onKeyUp={ev => app.props['value'] = ev?.target?.value}
      />
    )
  }
}

const filter = new Filter();

BraDOM.mount('#filter', filter);
