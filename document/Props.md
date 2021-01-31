```ts
// App.tsx
const App: FC = () => (
  <Greets name="Patty" times={4}>
    <span role="img" aria-label="rabbit">〇〇</span>
  </Greets>
);
```
```ts
// Greet.tsx
type Props = {
   name: string;
   times?: number
};
const Greets: FC<Props> = (props) => {
  const { name, times = 1, children } = props;
  return (
    <>
    {[...Array(times)].map((_) => (
      <p>Hello, {name}! {children}</p>
    ))}
    </>
  );
};
```
* `React.FunctionComponents<P>` インターフェー
スで関数コンポーネントの型定義をしている
* ジェネリクスPがpropsの型
* `name="Patty" times={4}`がpropsとして渡されている
* timesは省略可能なため初期値に1を代入している
* `children`は暗黙のpropsであり、子要素が渡される（ここではspan要素がchildrenとなる

