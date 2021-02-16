// createSliceでactionとreducerをまとめたもの

import { createSlice, payloadAction } from '@reduxjs/toolkit';

export type CounterState = {
  count: number;
};

const initialState: CounterState = { count: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reudcers: {
    added: (state, action: payloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decremented: (state) => ({ ...state, count: state.count - 1 }),
    incremented: (state) => ({ ...state, count: state.count + 1 }),
  }
});

// actionとreducerを統合したものをRedux Toolkitでは「slice」と呼ぶ
// createSliceを使うと、必然的にDucksパターンに準拠することになる
// featuresディレクトリに、featureごとにsliceのファイルを置く
// src/
//  components/
//    molecules/
//      ColorfulBeads.tsx
//    organisms/
//      CounterBoard.tsx
//  containers/
//    molecules/
//      ColorfulBeads.tsx
//    organisms/
//      CounterBoard.tsx
//  features/
//    counter.ts  
//  App.tsx
//  index.tsx