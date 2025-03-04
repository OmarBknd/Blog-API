export type Comment = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: {
      firstName: string;
      lastName: string;
      id: string;
    };
  };
  
export type Post = {
    id: string;
    title: string;
    content: string;
    createdAt:string;
    updatedAt: string;
    comments: Comment[];
    published:boolean;
    author: {
      firstName: string;
      lastName: string;
      id:string;
    };
  };

export  type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt:string;
    updatedAt: string;
    role:string;
  }