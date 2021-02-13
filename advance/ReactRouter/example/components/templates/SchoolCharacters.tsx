import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
// React Helmet: どこからでもHTMLドキュメントヘッダを動的に上書きできるライブラリ
// SPAでは意図して書き換えないと常に public/index.htmlの <title> がどこのページでもページタイトルになってしまう
import CharactersList from 'components/organisms/CharactersList';
import { Character } from 'data/characters';

type Props = {
  school: string;
  characters: Character[];
  isLoading?: boolean;
};

const SchoolCharacters: FC<Props> = ({ school, characters, isLoading = false }) => (
  <>
    <Helmet>
      <title>登場人物一覧 | {school}</title>
    </Helmet>
    <header>{school}</header>
    <CharactersList characters={characters} isLoading={isLoading} />
  </>
);

export default SchoolCharacters;