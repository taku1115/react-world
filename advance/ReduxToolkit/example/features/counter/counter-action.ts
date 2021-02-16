import { createAction } from '@reduxjs/toolkit';

const FEATURE = 'counter';
export const added = createAction<number>(`${FEATURE}/added`);
export const decremented = createAction(`${FEATURE}/decremented`);
export const incremented = createAction(`${FEATURE}/incremented`);

// createActionの型引数がFSAのpayloadに相当するものの型
// payloadがないdecrementedとincrementedでは省略している

// 型パズルを使っていた複雑なactionの定義がtoolkitでシンプルになる

