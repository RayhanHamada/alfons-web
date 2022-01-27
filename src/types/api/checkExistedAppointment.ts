export type Query = {
  tanggal: string;
  stylishId: string;
  jamId: string;
};

export type Response = {
  exists: boolean;
  error?: string;
};
