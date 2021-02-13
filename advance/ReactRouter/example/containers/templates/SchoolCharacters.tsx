import React, { FC } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';

import { parse } from 'query-string';
// URLクエリ文字列をパースしてオブジェクトにしてくれるライブラリ

import SchoolCharacters from 'components/templates/SchoolCharacters';

// 通常は外部APIから取得するため、副作用処理とみなし、containersで扱う
import { charactersData } from 'data/characters';

const EnhancedSchoolCharacters: FC = () => {

  const { schoolCode } = useParams<{ schoolCode: string }>();

  const { search } = useLocation();
  // URLクエリパラメータを抽出

  // 外部APIにリクエストしてデータが返ってくるまでローダー表示
  // URLに ?loading=true のようなクエリを追加するとそれが表示される
  const isLoading = !!parse(search)?.loading;
  // perse関数で、クエリパラメータからloadingに設定されてる値をさらに抽出
  // !! は二重否定という技法で、値の型を boolean にキャストする
  // http://localhost:3000/characters/shohoku?loading=true
  // -> キャラ一覧が表示されてたところがローダーに変わる

  const schoolCodeList = Object.keys(charactersData);

  if (schoolCodeList.includes(schoolCode)) {
    const { school, players } = charactersData[schoolCode]; // データを抽出
    
    return (
      <SchoolCharacters school={school} characters={players} isLoading={isLoading} />
    );
  }

  return <Redirect to="/" />;
};

export default EnhancedSchoolCharacters;