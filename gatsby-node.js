
const path = require('path')

// this is for markdown stuff
/* module.exports.onCreateNode = ({node, actions}) => {
    const { createNodeField } = actions



        if (node.internal.type === 'MarkdownRemark') {
            const slug = path.basename(node.fileAbsolutePath, '.md')
            createNodeField({

                node, 
                name: 'slug',
                value: slug


            })
        }
} */

module.exports.createPages = async function ({graphql, actions}) { // async/await are used to fetch the data and then we will use create page to create a page with each of the slugs (which are string values fetched from the API and created here)
    const {createPage} = actions
    const blogTemplate = path.resolve('./src/templates/blog.js')
    // res stands for response
    const res = await graphql(` 
        query{
            allContentfulBlogPost{
                edges{
                    node{
                        slug
                    }
                }
            }
        }
    `)

        res.data.allContentfulBlogPost.edges.forEach((edge) => {
              createPage({
                  component: blogTemplate,
                  path: `/blog/${edge.node.slug}`,
                  context: {
                      slug: edge.node.slug
                  }
              })
        })

}