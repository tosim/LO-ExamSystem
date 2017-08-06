import Vue from 'vue';

import Layout from 'component/layout/html';
import head from 'component/head'
import bkhead from 'component/bkhead'

Vue.component(Layout.name, Layout);
Vue.component('lo-head',head);
Vue.component('lo-bkhead',bkhead);
