// need to import react component for template
import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import * as blogStyles from "../pages/blog.module.scss"
import Head from '../components/head'

/*
export const query = graphql`
query{
    allContentfulBlogPost (sort:{fields:publishedDate, order:DESC})
    {
      edges{
        node{
          title
          slug
          publishedDate(formatString:"MMMM Do, YYYY")
        }
      }
    }
  }

`

const Blog = (props) => {
    return (
        <Layout>
            {data.allContentfulBlogPost.edges.map((edge) => {
                                return (
              <h1>{edge.node.title}</h1>
              <p>{props.data.markdownRemark.frontmatter.date}</p>
              <div dangerouslySetInnerHTML= {{ __html: props.data.markdownRemark.html}}></div>
        </Layout>
    )
    
}

*/
 //used for markdown files but we are using contentful now

/* export const query = graphql`
 query($slug:String!) 
{
      markdownRemark (fields:{slug:{ eq: $slug}})	
      {  
        frontmatter{
              title
              date
                  }
        html
      }
}

`
 */
export const query = graphql`
query($slug: String!) {
  contentfulBlogPost(slug: { eq: $slug }) {
    title
    publishedDate(formatString: "MMMM Do, YYYY")
    body {
      raw
      references {
        title
        ... on ContentfulAsset {
          contentful_id
          __typename
          fixed(width: 1600) {
            width
            height
            src
            srcSet
          }
        }
      }
    }
  }
}

`
const Blog = ({data}) => {
  const options = {
        renderNode: {
          "embedded-asset-block": (node) => {
            return (
              <>
              <pre>
                <code>{JSON.stringify(node, null, 2)}</code>
              </pre>
              <img
                src={node.data.target.fixed.src}
                alt={node.data.target.title}
              />
            </>
            )
          },
        },
  }
  
    return (
        <Layout>
            
        <Head title={data.contentfulBlogPost.title}/>

            <h1>{data.contentfulBlogPost.title}</h1>
            <p>{data.contentfulBlogPost.publishedDate}</p>
         {/*     {documentToReactComponents(JSON.parse(props.data.contentfulBlogPost.body.raw), options)} */}
            {renderRichText(data.contentfulBlogPost.body, options)}
            {/* 
              <h1>{props.data.markdownRemark.frontmatter.title}</h1>
              <p>{props.data.markdownRemark.frontmatter.date}</p>
              <div dangerouslySetInnerHTML= {{ __html: props.data.markdownRemark.html}}></div> 
              */}
        </Layout>
    )
    
}

export default Blog