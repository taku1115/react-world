# Flux / Redux

## Fluxアーキテクチャ
  * stateをグローバルに扱いたい時（ログインユーザー情報など）
  * 一つは親コンポーネントで状態を持たせてバケツリレーさせていく方法
  * しかし、これでは可読性も落ちるため、Fluxパターンが提唱された
  * Fluxは単方向データフローを実現するためのアーキテクチャ
  * ReduxがFluxの代表例

### Fluxで用いられる用語
  * Store: アプリケーション全体で参照したい状態データの保管庫
  * Action: イベントにおける『何をどうしたいか』という意図を表現したもの
  * Dispatcher: actionの種類を判断して、それにひもづけられたstoreの更新処理を行うもの

## Redux

### Reduxの思想
1. Single source of truth（信頼できる唯一の情報源）
  * 状態がただひとつのstoreオブジェクトによるツリー構造で一元管理
2. State is read-only（状態は読み取り専用）
  * 直接書き換えることができない
  * 変更手段をactionだけに集約し、厳密にひとつずつ処理するようにする
  * 書き換えの競合や予期せぬ書き換えを防ぐ
3. Changes are made with pure functions（変更は純粋関数にて行われる）
  * Reducerという純粋関数でstoreの更新がされる
  * 極限まで抽象化すると、(prevState, action) => newState となる
  * つまり、stateとactionを引数に取り、新しいstateを返す
  * reducerでは状態を内部に抱えず、ただの入出力値として扱う
  * actionが同じであれば、入力した状態と出力された状態の差分も常に同一であることが保証される

### Reduxの構造とデータフロー
1. viewから発行されたactionはdispatcherによってreducerに渡される
2. reducerはそのactionと現在のstateを受け取って、新しいstateを生成する

* dispatcherはstoreの構造や状態については一切関知しない
* その名の通り、actionをreducerに送りつける（＝ dispatch）ことだけに限定される

### Reduxを導入する
インストールコマンド
`yarn add redux react-redux`
