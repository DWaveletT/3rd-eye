import type { BoardId, PostId, ReplyId, TagId } from "./enum";
import type { User } from "./blog";

interface Board {
    id: BoardId;

    name: string;
    description: string;
}

interface Tag {
    id: number;
    name: string;
    color: string;
};

interface Post {
    id: PostId;
    time: number;

    auth: User;

    board: BoardId;

    title: string;
    summary?: string;

    like: number;
    dislike: number;

    tag: TagId[];

    banner?: string;

    extension?: object;
};

interface Front {
    time: number;
    title: string;

    tag?: TagId[];
    border?: BoardId;

    auth?: User;
    summary?: string;
    banner?: string;

    extension?: object;
}

interface Reply {
    id: ReplyId;
    time: number;
    
    replyer: User;

    post: PostId;

    content: string;

    like: number;
    dislike: number;
};

export type { Post, Reply, Tag, Board, Front };