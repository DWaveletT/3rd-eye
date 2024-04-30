import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'

import type { Element, Root } from 'hast';

export interface Options {
    
}

const emptyOptions: Options = {}

/**
 * Process headlines for my blog.
 */
export default function rehype3rdNotice(options?: Options | undefined | null) {
    const settings = options || emptyOptions;

    return function (tree: Root): undefined {
        
        console.log(tree);
    }
}