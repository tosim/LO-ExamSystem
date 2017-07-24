import App from 'app';
import AfterLogin from './afterlogin/afterlogin.vue';
// import HtmlLayout from 'component/layout/html';

// App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...AfterLogin
});
