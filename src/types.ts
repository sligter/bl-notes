export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  parentId: string | null;
  children: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children: string[];
}