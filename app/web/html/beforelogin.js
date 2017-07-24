import App from 'app';
import BeforeLogin from './beforelogin/beforelogin.vue';
// import HtmlLayout from 'component/layout/html';

// App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...BeforeLogin
});
