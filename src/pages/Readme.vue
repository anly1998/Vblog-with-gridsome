<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never">
        <div v-html="$markdown(content)" class="markdown-body" v-if="content"></div>
        <div
          style="
            min-height: 400px;
            margin-bottom: 20px;
            padding: 20px 0px 20px 0px;
            text-align: center;
          "
          v-else
        >
          <font style="font-size: 30px; color: #dddddd">
            <b>◔ ‸◔？没有博客介绍</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query {
  allUserProject (filter: { name: { in: ["Vblog-with-gridsome"]}}) {
    edges {
      node {
        id
        name
        url
        description
        stargazersCount
        watchersCount
        forksCount
        language
        created_at
        updated_at
        content
      }
    }
  }
}
</page-query>
<script>
// import ProjectApi from '@/api/project'
export default {
  name: "ReadMe",
  metaInfo: {
    title: "readme",
  },
  data() {
    return {};
  },
  computed: {
    project() {
      return this.$page.allUserProject.edges[0].node;
    },
    content() {
      if (process.isClient) {
        let base64 = require("js-base64").Base64;
        return this.$markdown(base64.decode(this.project.content));
      }
    },
  },
  mounted() {
    // ProjectApi.getBlogReadme().then((response) => {
    //   let result = response.data
    //   let base64 = require('js-base64').Base64
    //   this.text = base64.decode(result.content)
    // }).then(() => this.loading = false).catch(() => this.loading = false)
  },
};
</script>

<style>
</style>
