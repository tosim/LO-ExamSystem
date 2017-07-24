import App from 'app';
import Front from './front/front.vue';
import HtmlLayout from 'component/layout/html';

App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...Front
});
