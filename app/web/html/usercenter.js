import App from 'app';
import UserCenter from './usercenter/usercenter.vue';
// import HtmlLayout from 'component/layout/html';

// App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...UserCenter
});