import HomePage from './containers/HomePage';
import DetailPage from './containers/DetailPage';
import PaymentPage from './containers/PaymentPage';
import OrderListPage from './containers/OrderListPage';
import AuthPage from './containers/AuthPage';

export default [
  { exact: true, path: '/', component: HomePage },
  { exact: true, path: '/home', component: HomePage },
  { exact: true, path: '/detail/:id', component: DetailPage },
  { exact: true, path: '/payment', component: PaymentPage },
  { exact: true, path: '/order-list', component: OrderListPage },
  { exact: true, path: '/auth', component: AuthPage }
];
