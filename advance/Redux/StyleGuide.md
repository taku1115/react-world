# Redux Style Guide

* Reduxはコードがカオスになりやすい
* 公式なガイドラインとして『Redux Style Guide』が発表された
* 設計パターンや開発ベストプラクティスなどの寄せ集め

## 必須のルール
* stateを直接書き換えない
* reducerに副作用を持たせない（純粋関数であるべき）
    * 副作用の生じる処理とは、、、
      * 外部システムとの通信
      * reducerの外の変数の書き換え
      * ランダムな値を不要にstoreに渡す など
* シリアライズできない値をstateやactionに入れない
    * Promiseや関数など、Json.stringfy()したときにあたいが同一でないものをstateやactionに入れてはいけない
    * テストやデバッグが困難になる
* storeは一つのアプリにつき一つだけ

## Actionに関するルール
* actionをsetterではなくイベントとしてモデリングする
```ts
// setterの例
{
  type: 'user/setName',
  payload: { id: 38792, name: 'Taku' },
},
{
  type: 'user/setBirthday',
  payload: { id: 38792, birthday: new Date('1996-11-15T09:00:00') },
}
// 発生したイベントとして表現
{
  type: 'user/profileUpdated',
  payload: { id: 38792, name: 'Taku', birthday: new Date('1996-11-15T09:00:00') },
}
// イベントとして扱う方が、 dispatchされるactionの数が減り、actionログも見やすくなる上、次の命名ルールも同時に満たせる
```
* actionの名前は意味を的確に表現したものとする
* actionタイプ名を「ドメインモデル/イベント種別」のフォーマットで書く
* actionをFSA(Flux Standard Action)に準拠させる
  * actionはtype, payload, error, metaの4つの要素で構成される
  ```ts
  type ActionType = {
    type: string;
    payload?: any;
    error?: boolean;
    meta?: { [key: string]: any };
  };
  // エラーを表現するアクションならerrorをtrueにし、error情報をmetaに格納する
  // 正常系はほぼtypeとpayloadしか使わない
  // dataは上の階層にそのまま入れず、payloadに格納するのを徹底すること
  ```
* dispatchするactionは直に書かずaction creatorを使う
  * dispatch({ type: 'counter/ increment' })としない

## ツールやデザインパターンに関するルール









