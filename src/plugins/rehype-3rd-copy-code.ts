import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'

import type { Element, Root } from 'hast';

import { h } from 'hastscript';

export type Build = () => Element;

interface Options {
    content?: string | Build
}

const emptyOptions: Options = {};

/**
 * Process headlines for my blog.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehype3rdCopyCode(options?: Options | undefined | null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const settings = options || emptyOptions;

  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
    return function (tree: Root): undefined {
        const codeList: Element[] = [];

        visit(tree, 'element', function (node: Element, _, parent: Element | null | Root) {
            if ( node.tagName !== 'code' || parent?.type !== 'element' || parent?.tagName !== 'pre' )
                return;

            codeList.push(parent);
        });

        for(const code of codeList){
            const node = structuredClone(code);

            const container = h('div.code-container', [
                node,
                h(
                    'button.copy-button',
                    { onclick: 'dispatchEvent(new Event("codecopy", { bubbles: true, cancelable: true }))', data: toString(node) },
                    typeof settings.content === 'function' ? settings.content() : settings.content
                )
            ]);
            
            Object.assign(code, container);
        }
  }
}
