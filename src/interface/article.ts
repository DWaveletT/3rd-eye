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

    create_time: number;
    update_time: number;

    author: User;
    title: string;
    banner?: string;
    abstract?: string;
    priority?: number;

    board: BoardId;
    tag: TagId[];

    uvote: number;
    dvote: number;

    extension?: object;
};

interface Front {
    create_time: number;
    update_time: number;

    title: string;
    author?: User;
    banner?: string;
    abstract?: string;
    priority?: number;

    board: BoardId;
    tag: TagId[];

    extension?: object;
}

interface Reply {
    id: ReplyId;
    time: number;
    
    replyer: User;

    post: PostId;

    content: string;

    uvote: number;
    dvote: number;
};

export type { Post, Reply, Tag, Board, Front };