import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { counterReducer, initialState } from 'reducer';

const store = createStore(counterReducer, initialState);
// createStoreはreducerとstateを引数にstoreを初期化する関数
// 最初にstoreを初期化してそのpropsとして渡してあげる必要がある

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

serviceWorker.unregister();