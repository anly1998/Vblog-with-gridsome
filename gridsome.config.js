// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Vblog',
  port: 3309,
  plugins: [],
  templates: {
    Follower: [
      {
        path: '/follower/:login',
        component: './src/templates/UserDetails.vue'
      }
    ],
    Following: [
      {
        path: '/following/:login',
        component: './src/templates/UserDetails.vue'
      }
    ],
    UserPost: [
      {
        path: '/blog/details/:id',
        component: './src/templates/BlogDetails.vue'
      }
    ],
    UserProject: [
      {
        path: '/project/details/:name',
        component: './src/templates/ProjectDetails.vue'
      }
    ]
  }
}
