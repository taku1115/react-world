### 3ページ構成
* /
* /characters
* /characters/:schoolCode

### ディレクトリ構造
```
src/
  components/
    molecules/
      HomeButton.tsx
      Spinner.tsx
    organisms/
      CharacterList.tsx
      SchoolList.tsx
    pages/
      Characters.tsx
      Home.tsx
    templates/
      AllCharacters.tsx
      SchoolCharacters.tsx
  containers/
    molecules/
      HomeButton.tsx
    organisms/
      SchoolList.tsx
    templates/
      AllCharacters.tsx
      SchoolCharacters.tsx
    data/
      characters.ts
  App.tsx
  index.tsx
```
* presentational components => components/
* container components => container/
* Atomic Design : Atoms < Molecules < Organisms < Templates < Pages
  * atoms : それ以上分割できない最小単位のコンポーネント( <Button>, <Icon> )
  * molecules : atomsの組み合わせ
  * organisms : atomsとmoleculesの組み合わせ
  * template : organismsとpagesの間
  * pages: ルーティング対象となるページ全体