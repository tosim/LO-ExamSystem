import App from 'app';
import BeforeLogin from './beforelogin/beforelogin.vue';
// import HtmlLayout from 'component/layout/html';
// import ElementUI from 'element-ui';
// App.use(ElementUI);
// App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...BeforeLogin
});
