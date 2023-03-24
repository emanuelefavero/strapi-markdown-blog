import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'

import { server } from '@/config/server'

import { IPost } from '@/types'

type Props = {
  post: IPost
}

// * Post
export default function Post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.attributes.title}</title>
      </Head>

      <div>
        <Link href='/'>Home</Link>
      </div>

      <div className='post'>
        <h1>{post.attributes.title}</h1>

        <p>{post.attributes.content}</p>

        {/* display and format publishedAt Date */}
        <span className='date'>
          {new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
    </>
  )
}

// * Fetch Data
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/posts`)
  const { data } = await res.json()

  const paths = data.map((post: IPost) => ({
    params: { slug: post.attributes.slug.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/posts/${params?.slug}`)
  const { data } = await res.json()

  return {
    props: {
      post: data,
    },
  }
}
