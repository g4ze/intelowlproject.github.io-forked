import { format, parseISO } from 'date-fns'
import { allPosts } from '../../../../.contentlayer/generated'
import { Header } from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { useMDXComponent } from 'next-contentlayer/hooks'


export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

//params are written a specfic way as a workaround to make the contentlayer url routing work.
const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const MDXContent = useMDXComponent(post.body)

  return (
    <>
    <Header blogsection={true}></Header>
    <main className='h-full mx-16 md:mt-52 mt-28'>
    <div className="mb-8 md:space-y-4">
        <time dateTime={post.date} className="font-SpaceGrotesk text-white py-5 opacity-70 text-sm md:text-md mb-5 ">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-white font-SpaceGrotesk font-bold text-3xl md:text-6xl ">{post.title}</h1>
      </div>
      <MDXContent />
    </main>
    <Footer></Footer>
    </>
  )
}
 
export default PostLayout