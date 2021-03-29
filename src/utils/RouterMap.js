export const constantRouterMap = [
  {
      path: '/',
      redirect: '/user/new/main',
      meta: {
          type: "user",
          icon: 'el-icon-star-off',
          title: '最新动态'
      },
      children: [
          {
              path: 'main',
              meta: { title: '最新动态' }
          }
      ]
  },
  {
      path: '/social',
      redirect: '/user/social/main',
      meta: {
          type: "user",
          icon: 'el-icon-mobile-phone',
          title: '社交圈'
      },
      children: [
          {
              path: 'main',
              meta: { title: '社交圈' }
          },
          {
              path: 'details/:name',
              meta: { title: '用户资料' }
          }
      ]
  },
  {
      path: '/blog',
      redirect: '/user/blog/main',
      meta: {
          type: "user",
          icon: 'el-icon-edit-outline',
          title: '博客列表'
      },
      children: [
          {
              path: 'main',
              meta: { title: '博客列表' }
          },
          {
              path: 'add',
              meta: { title: '发表博客' }
          },
          {
              path: 'edit/:id',
              meta: { title: '编辑博客' }
          },
          {
              path: 'details/:id',
              meta: { title: '博客详情' }
          }
      ]
  },
  {
      path: '/project',
      redirect: '/user/project/main',
      meta: {
          type: "user",
          icon: 'el-icon-service',
          title: '开源项目'
      },
      children: [
          {
              path: 'main',
              meta: { title: '项目列表' }
          },
          {
              path: 'details/:name',
              meta: { title: '项目详情' }
          }
      ]
  },
  {
      path: '/helper',
      redirect: '/user/helper/main',
      meta: {
          type: "user",
          icon: 'el-icon-printer',
          title: '使用帮助',
          mini: true
      },
      children: [
          {
              path: 'main',
              meta: { title: '使用帮助' }
          }
      ]
  },
  {
      path: '/readme',
      redirect: '/user/readme/main',
      meta: {
          type: "user",
          icon: 'el-icon-document',
          title: 'README.md'
      },
      children: [
          {
              path: 'main',
              meta: { title: 'README.md' }
          }
      ]
  },
  {
      path: '/configure',
      redirect: '/user/configure/main',
      meta: {
          type: "user",
          icon: 'el-icon-setting',
          title: '系统配置',
          LoginRequired: true
      },
      children: [
          {
              path: 'main',
              meta: { title: '系统配置' }
          }
      ]
  },



//   {
//       path: "/404",
//   },
//   {
//       path: '/',
//       redirect: '/user/new',
//   },
//   {
//       path: "*",
//       redirect: "/404"
//   },

//   //mobile
//   {
//       path: '/mobile/user/blog',
//       redirect: '/mobile/user/blog/main',
//       meta: {
//           type: "mobile",
//           icon: 'edit',
//           title: '博客'
//       },
//       children: [
//           {
//               path: 'main',
//               meta: {
//                   scrollTop: true
//               }
//           },
//           {
//               path: 'details/:id',
//               meta: {
//                   scrollTop: true
//               }
//           }
//       ]

//   },
//   {
//       path: '/mobile/user/project',
//       redirect: '/mobile/user/project/main',
//       meta: {
//           type: "mobile",
//           icon: 'like-o',
//           title: '项目'
//       },
//       children: [
//           {
//               path: 'main',
//               meta: {
//                   scrollTop: true
//               }
//           },
//           {
//               path: 'details/:name',
//               meta: {
//                   scrollTop: true
//               }
//           }
//       ]

//   },
//   {
//       path: '/mobile/user/self',
//       redirect: '/mobile/user/self/main',
//       meta: {
//           type: "mobile",
//           icon: 'contact',
//           title: '个人'
//       },
//       children: [
//           {
//               path: 'main',
//               meta: {
//                   scrollTop: true
//               }
//           }
//       ]

//   },
]