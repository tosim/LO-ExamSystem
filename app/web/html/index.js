import App from 'app';
import Index from './index/index.vue';
import HtmlLayout from 'component/layout/html';

App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...Index
});
