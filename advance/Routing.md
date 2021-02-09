### SPAにおけるRouting
* SPAでは、初回リクエストに対してURLにかかわらずアプリケーション全体のJSが返される
* 2回目以降は、動的にDOMを書き換えることでページ遷移をしているように見せている
* URL書き換えが伴うページ遷移も、リクエストがサーバーに行くことなくクライアントサイドで完結する
* 擬似的なページ遷移とともに、ブラウザのセッション履歴を同期させる

## デファクトスタンダード : React Router
5系と6系は別物と捉えるべき

### React Router (5系)
* インストール
```
$ yarn add react-router react-router-dom
```
* プロバイダをトップレベルで設定
src/index.tsx
```ts
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter> // 各種APIが下の階層で使えるようになる
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
```
* プロバイダコンポーネントには4種類ある
  * BrowserRouter : 一般的なSPA開発はこれでOK
  * HashRouter : URLに＃がつく機能を提供
  * StaticRouter : SSRで用いる
  * MemoryRouter : ほぼ使うことなし

* プロバイダコンポーネントの役割
  * LinkタグやRedirectタグが使える
  * match, location, historyなどのオブジェクトにアクセス可能となる
 
* Routeコンポーネント
```ts
import { Route } from 'react-router';

const App: FC = () => {
  <>
    <p>Welcome!</p>
    <Route exact path="/" component={Home}>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/contact">
      <Contact address="abc@company.com" />
    </Route>
  </>
}
// pathは絶対パスを使用
// デフォルトは前方一致
// exactは完全一致
// exactを使わないと、Homeコンポーネントが /about と /contact にもマッチする
// strictは末尾のスラッシュの有無を厳密にする
// sensitiveは大文字小文字を区別する
```
* Routeが増えた時のためのSwitchコンポーネント
```ts
const App: FC = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/user/:userId">
      <User />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);
```
初回のマッチでルーチンを抜けるため、複数マッチのリスクを回避できるため、RouteとSwitchはセットで使うべき
