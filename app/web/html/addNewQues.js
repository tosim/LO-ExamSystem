import App from 'app';
import ElementUI from 'element-ui';
import addNewQues from './addNewQues/addNewQues.vue';
// import HtmlLayout from 'component/layout/html';

App.use(ElementUI);
// App.component(HtmlLayout.name, HtmlLayout);
export default App.client({
  ...addNewQues
});
