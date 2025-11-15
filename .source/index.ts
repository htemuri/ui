// @ts-nocheck -- skip type checking
import * as d_docs_1 from "../lib/docs/test.mdx?collection=docs"
import * as d_docs_0 from "../lib/docs/index.mdx?collection=docs"
import { _runtime } from "fumadocs-mdx/runtime/next"
import * as _source from "../source.config"
export const docs = _runtime.docs<typeof _source.docs>([{ info: {"path":"index.mdx","fullPath":"lib/docs/index.mdx"}, data: d_docs_0 }, { info: {"path":"test.mdx","fullPath":"lib/docs/test.mdx"}, data: d_docs_1 }], [])