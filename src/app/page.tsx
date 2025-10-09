"use client";

import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { useRouter } from 'next/navigation'

function PostCard(post: Post) {
  return (
    <div className="_mb-8">
      <h2 className="_mb-1 _text-xl">
        <Link href={post.url} className="_text-blue-700 _hover:text-blue-900 _dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="_mb-2 _block _text-xs _text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <div className="_text-sm [&>*]:_mb-3 [&>*:last-child]:_mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  )
}

export default function Home() {
  const router = useRouter();
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  function toLogin() {
    router.push("/login");
  }
  return (
    <div className="mx-auto max-w-xl py-8">
      <div><button className="_text-xl _border-2 _p-1 _m-1 _bg-adminBlue" onClick={toLogin}>Login-admin</button></div>
      <h1 className="_mb-8 _text-center _text-2xl _font-black">Next.js + Contentlayer Example</h1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
      <h3>GITHUB LINK</h3>
      <a href="https://github.com/lincolngarcia/Startup-LinC-MS">Lincoln Garcia</a>
    </div>
  )
}