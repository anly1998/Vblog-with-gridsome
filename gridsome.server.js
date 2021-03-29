// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const configuration = require('./static/configuration.json')
// const Cookies = require('js-cookie')
const axios = require('axios')

const baseUrl = 'http://api.github.com'

const token = '?access_token=' + configuration.token

const githubUsername = configuration.githubUsername;

module.exports = function (api) {
  // 加载资源/GraphQL集合
  api.loadSource(async actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    // 创建配置集合  读取配置文件数据
    const config_collection = actions.addCollection('Config')
    config_collection.addNode(configuration)

    // 创建用户数据集合 读取用户数据
    const user_collection = actions.addCollection('User')
    const users = []
    // 添加登录用户数据
    const { data: userData } = await axios.get(`${baseUrl}/users/${githubUsername}`)
    users.push({
      id: userData.id,
      name: userData.name,
      login: userData.login,
      location: userData.location,
      bio: userData.bio,
      email: userData.email? userData.email : '',
      blog: userData.blog,
      avatar_url: userData.avatar_url,
      followers: userData.followers,
      following: userData.following,
    })

    // 创建用户文章数据集合  获取用户文章
    const userPost_collection = actions.addCollection('UserPost')
    const { data: userPost } = await axios.get(`${baseUrl}/users/${githubUsername}/gists`)
    userPost.reverse()
    for (let item of userPost) {
      let { data: detailsPost } = await axios.get(`${baseUrl}/gists/${item.id}`)
      const key = Object.keys(detailsPost.files)[0]
      // console.log(detailsPost.files[key].content);
      userPost_collection.addNode({
        id: item.id,
        title: Object.keys(item.files)[0],
        description: item.description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        content: detailsPost.files[key].content
      })
    }

    // 创建用户开源项目的数据集合  获取用户开源数据
    const userProject_collection = actions.addCollection('UserProject')
    const { data: userProject } = await axios.get(`${baseUrl}/users/${githubUsername}/repos`);
    userProject.reverse()
    for (let item of userProject) {
      let { data: detailsProject } = await axios.get(`${baseUrl}/repos/${githubUsername}/${item.name}/contents/README.md`)
      userProject_collection.addNode({
        id: item.id,
        name: item.name,
        url: item.html_url,
        description: item.description,
        stargazersCount: item.stargazers_count,
        watchersCount: item.watchers_count,
        forksCount: item.forks_count,
        language: item.language,
        license: item.license ? item.license.spdx_id : null,
        created_at: item.created_at,
        updated_at: item.updated_at,
        content: detailsProject.content
      })
    }

    // 创建用户追随者的数据集合  获取关注用户的人的数据
    const follower_collection = actions.addCollection('Follower')
    const { data: followers } = await axios.get(`${baseUrl}/users/${githubUsername}/followers`)
    for (let item of followers) {
      follower_collection.addNode(item)
      // 添加用户数据
      const { data: itemData } = await axios.get(`${baseUrl}/users/${item.login}`)
      users.push({
        id: itemData.id,
        name: itemData.name,
        login: itemData.login,
        location: itemData.location,
        bio: itemData.bio,
        email: itemData.email? userData.email : '',
        blog: itemData.blog,
        avatar_url: itemData.avatar_url,
        followers: itemData.followers,
        following: itemData.following,
      })
    }

    // 创建用户关注者的数据集合  获取用户关注的人的数据
    const following_collection = actions.addCollection('Following')
    const { data: following } = await axios.get(`${baseUrl}/users/${githubUsername}/following`)
    for (let item of following) {
      following_collection.addNode(item)
      // 添加用户数据
      const { data: itemData } = await axios.get(`${baseUrl}/users/${item.login}`)
      users.push({
        id: itemData.id,
        name: itemData.name,
        login: itemData.login,
        location: itemData.location,
        bio: itemData.bio,
        email: itemData.email? userData.email : '',
        blog: itemData.blog,
        avatar_url: itemData.avatar_url,
        followers: itemData.followers,
        following: itemData.following,
      })
    }

    users.reverse().forEach(item => {
      user_collection.addNode(item)
    })
  })

  // 添加页面路由
  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/blog/edit/:id',
      component: './src/pages/blog/edit/index.vue'
    })
  })

  api.configureWebpack(config => {
    config.output['globalObject'] = 'this';
    return config;
  })  
}
