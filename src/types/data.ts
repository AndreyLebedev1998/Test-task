export interface IFoldersLetters {
  name: String;
  element: String;
}

export type Letters = {
  userId: Number | undefined;
  id: Number | undefined;
  title: String | undefined;
  body: String | undefined;
  date: String | undefined;
  name: String | undefined;
  status: String | undefined;
};

export type Folder = {
  id?: Number;
  name: string | undefined;
  letters: Letters[] | [] | undefined | any;
};
