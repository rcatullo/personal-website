import Link from 'next/link'
import Image from 'next/image'
import { KatexOptions } from 'katex'
import { highlight } from 'sugar-high'
import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { generateMacros } from 'app/stacks/katex-utils'
import CopyButton from './ui/copy-button'

const katexCSS = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossOrigin="anonymous"/>
`

function Quiver({ src }) {
  return (
    <div className="flex justify-center">
      <iframe className="relative quiver-embed rounded-lg border-none size-full" src={src}/>
    </div>
  )
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return (
    <div className="relative group code-container">
      <CopyButton textToCopy={children.trim()} />
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    </div>
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

function Strong(props) {
  return <strong className="font-semiboldfont-bold bg-clip-text text-transparent bg-gradient-to-r from-light-platinum via-light-aztec-gold to-light-dirty-brown dark:from-dirty-brown dark:via-aztec-gold dark:to-platinum" {...props} />
}

function Blockquote(props) {
  return (
    <blockquote className="border-l-4 border-gradient-b-brown-platinum pl-4 md:mx-5">
      {props.children}
    </blockquote>
  )
}

function OrderedList(props) {
  return (
    <ol className="latex-style">
      {props.children}
    </ol>
  )
}

export const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  strong: Strong,
  blockquote: Blockquote,
  ol: OrderedList,
  Table,
  Quiver,
}

export async function CustomMDX(post) {
  const macros = await generateMacros();
  const options: KatexOptions = {
    macros: macros,
    trust: true,
    strict: false,
    throwOnError: false,
    globalGroup: true
  }
  const { content } = await compileMDX({
      source: post.concat(katexCSS),
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, options]]
        }
      },
      components: components
    })
  return content
}
