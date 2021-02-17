# useReducer
actionとreducerによるグローバルな状態管理を個別のコンポーネントで行うAPI

```ts
const [state, dispatch] = useReducer(reducer, initialState);
```

* コンポーネントの機能が複雑化してくると、stateの数が増え、あるstateの更新ロジック別のstateを参照するようになる
* 多くのstateが相互参照し、それがuseEffectの副作用処理の中で行われたりすると、人間の頭では追いつかなくなり、予期せぬ更新が予期せぬ場所で起きる
* そこでuseRedcerの出番となる
* Reduxのようにシングルツリーのオブジェクトに格納して、その中身をreducerによって副作用を排除しつつ更新できる

* useStateの実体は、一つのsetter actionしか持たないuseReducerである

* useReducerは一つのstateごとにちっちゃいReduxのようなものをポコポコ作ってコンポーネントにくっつけているイメージ
