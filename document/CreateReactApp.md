## React/JSXのコンパイル環境を構築する

- create-react-appというアプリを使ってコンパイル環境を構築
- Facebookが用意しているアプリ

---

### 1. create-react-appをグローバルインストール

`$	npm install -g create-react-app`

### 2. 作業ディレクトリ直下にsample1というプロジェクトフォルダを作成


`$	create-react-app sample1`

※ インストールしない方法（１〜２の別の方法）

`$ npx create-react-app react_app`

Node.jsに組み込まれているnpxというプログラムを利用
- こちらが推奨されている
- 毎回アップデートしながら使うより、ネット経由で最新版を直接実行したほうが効率いい
- npx というのは npm パッケージで提供されてるコマンドを実行するためのもの
- 該当パッケージがローカルにインストールされていればそれを、なければ最新版をダウンロードしてき
てそれを実行する
- そしてダウンロード実行の場合は、実行後、そのコマンドのパッケージを削除してくれる

### 3. アプリ起動

`$	cd sample1`

`$	npm start` ： localhost:3000が自動で起動（Ctrl+Cで中断）

→ 生成されるフォルダ

- node_modules : インストールされたNode.jsのモジュールが存在
- src : コンパイル前のソースコードが存在
- public : index.htmlのひな型となるファイルが存在

### 4. ファイル編集（srcの中のApp.js)
```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>こんにちは</h1>
    </div>
  );
}

export default App;
```

※ 画面表示の流れ
- index.htmlが読み込まれる。
- index.htmlを読み込む際、index.jsが読み込まれ実行される。
- index.jsの中でAppコンポーネントが読み込まれ表示される。


### 5. 公開（ビルド）

`$	npm run build` ： buildというフォルダが生成

### 6. Webサーバーでビルドを確認

`$npm install -g serve` ： serveコマンドインストール

`$serve -s build` ： localhost:5000が起動

---
参考サイト

- [create-react-appを用いて，React/JSXのコンパイル環境を構築する](https://qiita.com/y518gaku/items/d23cb4fda18bb04db600)
- [【React初心者】create-react-appからReactプロジェクトの環境構築](https://qiita.com/emochi/items/ff608a55383fc72e222f)











