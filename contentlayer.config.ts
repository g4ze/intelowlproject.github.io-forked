import { defineDocumentType, makeSource } from '@contentlayer/source-files'
import highlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/blogs/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: 'Blogs', documentTypes: [Post], mdx: {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [highlight],
},})
