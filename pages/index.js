import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>dev blog</title>
      </Head>

      <div className="posts">
        {posts.map((post,index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // ler arquivos do diretório posts
  const files = fs.readdirSync(path.join('posts'))

  //  ler slug e frontmatter dos posts
  const posts = files.map(filename => {
    // criar slug
    const slug = filename.replace('.md', '')

    // ler frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts',filename), 
      'utf-8'
    )

    const {data:frontmatter} = matter(markdownWithMeta)
    return {
      slug,
      frontmatter
    }
  })
  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}
