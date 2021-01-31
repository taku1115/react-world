## JSXの本質

React.createElementメソッドのコールへの変換を前提に
XMLのタグとその組み合わせによるノードツリーを JavaScriptの中でシームレスに書けるようにしたもの
```js
// 変換前
<button type="submit" autoFocus>
  Click Here
</button>

// 変換後
React.createElement(
  'button',
  { type: 'submit', autoFocus: true },
  'Click Here'
);
```
**☆ 本質：ReactElementオブジェクトを生成するための式**

---

## なぜReactは見た目とロジックを混在させるのか

* 関心の分離の単位が MVC のような技術の役割ではない
* アプリケーションの機能がその単位である
* 機能単位で分割された独立性の高いパーツを組み合わせるのがReactの開発思想
* そのパーツがコンポーネントであり、パーツ同士が疎結合となるためには、見た目とロジックを閉じ込める必要がある

---


## コンポーネントのviewレンダリング2大派閥

* HTMLテンプレート派
  * AngularJS、Angular、Vue.js、Aurelia、Svelteなど
* JSファースト派
  * React、Preact、Mithril、Cycle.js、hyperappなど
* Webアプリケーションをどうとらえるかの世界観のちがい
  * テンプレート派：『動的な Web ページ』
  * JSファースト派：
    * デスクトップやモバイルアプリと同じ
    * ブラウザがプラットフォームになっているだけ
* HTMLテンプレートの呪い
  * テンプレート形式を維持しながら複雑な挙動に対応しようとすると、フレームワークは独自の決まりごとが増えて複雑化していく
  * Reactのコンポーネントが保守性と拡張性に優れているのは、この呪縛から開放されたおかげ

---

## なぜReactはViewをタグツリーで表現するのか

* 囲みタグ形式は視認性において優れているため
* < > タグによるブロックがマークアップとそれ以外のコードを視覚的に分けてくれるので、人間の認知にやさしい。
* 制御ロジックにマークアップが混在するからこそ、視認性は大切

## HTMLには存在しない2つの属性
* ref属性
```ts
const TextInput: FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = (): void => {
    if (inputRef.current) inputRef.current.focus();
  };
  return (
    <div>
      <input type="text" ref={inputRef} />
      <input type="button" value="Focus" onClick={handleClick}/>
    </div>
  );
};
```
ref属性の中に任意のオブジェクトを設定しておくと、組み込みコンポーネントがリアルDOM
としてレンダリングされた際に、渡されたオブジェクトの.currentプロパティにそのリアル DOM
への参照値を入れてくれる

= リアルDOMへの参照がrefでできる

* key属性
```ts
{[...Array(times)].map((_, i) => (
  <p key={i}>Hello, {name}! {children}</p>
))}
```
* 繰り返し処理で同階層に同じ要素のリストを表示させる際、Reactはユニークなkey属性
値を必要とする
* 再レンダリングのための差分検出を効率的に行うのに必要とする
もの
* 並べ替えがあるリストのときは再レンダリングに悪影響があるので、keyにインデックスは使う
べきじゃない
* ば外部APIから取得したコレクションデータとかを
リスト表示する場合なら、そのデータが持つユニークIDをkeyに使うのがよい