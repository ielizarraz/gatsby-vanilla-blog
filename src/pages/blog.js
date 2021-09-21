import React from 'react'
import Layout from '../components/layout'
import {Link, graphql, useStaticQuery } from "gatsby"
import * as blogStyles from "../pages/blog.module.scss"
import Head from '../components/head'

const BlogPage = (props) => {

        const data = useStaticQuery(graphql`
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
        
        `)



return (

        <Layout>
        <Head title="Blog"/>
                <h1>Blog</h1>
                <p>Posts will show up here when I'm smart enough to do it</p>
                <ol className={blogStyles.posts}>
                        {data.allContentfulBlogPost.edges.map((edge) => {
                                return (

                                        <li className={blogStyles.post}>
                                             <Link to={`/blog/${edge.node.slug}`} >   
                                             <h2>{edge.node.title}</h2> </Link>
                                                <p>{edge.node.publishedDate}</p>
                                        </li>
                                )

                        })}


                </ol>
        </Layout>


)



}

export default BlogPage