# Redux Toolkit
ReactでいうCRAのようにReduxのDXを快適にするもの

### 主要APIは４つ

* configureStore: 各種デフォルト値が設定可能なcreateStoreのカスタム版
* createReducer: reducerの作成を簡単にしてくれる
* createAction: action creator を作成する
* createSlice: actionの定義とaction creater, reducerをまとめて生成できる

実践
* exampleディレクトリで、Reduxのexampleをtoolkitで書き換え
* ディレクトリ構造はfeature folderを採用
* action名もイベントに変更