export type Task = {
  id?: string;
  title: string;
  description: string;
  created_on?: string;
};

export type NewTask = {
  title: string;
  decription: string;
};

export type BaseTask = NewTask & {
  id: string;
  created_on: string;
};
