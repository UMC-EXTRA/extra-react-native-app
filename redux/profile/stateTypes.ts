type Term = {
  id: number;
  title: string;
  content: string;
  agree: boolean;
  optional: boolean;
};

type TermState = (Term | undefined)[];

export type { TermState };
