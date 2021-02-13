export type Character = {
  id: number;
  name: string;
  grade: number;
  height?: number;
};
  
type SchoolPlayers = {
  school: string;
  players: Character[];
};
  
export type CharactersData = {
  [schoolCode: string]: SchoolPlayers;
  // schoolCodeをURLパラメータとして用いる
};

export const charactersData: CharactersData = {
  shohoku: {
    school: '湘北高校',
    players: [
      {
        id: 1,
        name: '桜木花道',
        grade: 1,
        height: 189.2,
      },
  // 以下省略