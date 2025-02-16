export type Comment = {
    id: string;
    content: string;
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
    comments: Comment[];
    author: {
      firstName: string;
      lastName: string;
      id:string;
    };
  };