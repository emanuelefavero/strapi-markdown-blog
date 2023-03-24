import Link from 'next/link'
import { GetStaticProps } from 'next'
import { server } from '@/config/server'

import ReactMarkdown from 'react-markdown'

import { IPost } from '@/types'

type Props = {
  posts: IPost[]
}

// * Home (Posts)
export default function Home({ posts }: Props) {
  return (
    <div className='posts'>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.attributes.slug}>
            <h3>
              <Link href={`/posts/${post.attributes.slug}`}>
                {post.attributes.title}
              </Link>
            </h3>

            {/* // * React Markdown - Post Content */}
            <ReactMarkdown>{post.attributes.content}</ReactMarkdown>

            {/* display and format publishedAt Date */}
            <span className='date'>
              {new Date(post.attributes.publishedAt).toLocaleDateString(
                'en-US',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// * fetch posts data with staticProps
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${server}/posts`)
  const { data } = await response.json()

  return {
    props: {
      posts: data,
    },
  }
}

// TIP: you can always use serverSideProps or useFetch hook to fetch data more dynamically
