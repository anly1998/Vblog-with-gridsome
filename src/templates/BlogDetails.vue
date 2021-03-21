<template>
  <Layout v-slot:default="slotProps">
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <h1>{{ blog.title }}</h1>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right">
                <el-button
                  @click="$share()"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                  >分享</el-button
                >
                <el-button
                  @click="edit"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-edit"
                  v-if="slotProps.token"
                  >编辑</el-button
                >
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                  @click="more"
                  >更多博客</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布于 {{ blog.created_at | toTime }} <br />
          更新于 {{ blog.updated_at | toTime }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div
          v-html="mdToHtml(blog.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  post: userPost (id: $id) {
    id
    title
    description
    created_at
    updated_at
    content
  }
}
</page-query>

<script>
import MarkDownIt from "markdown-it";
import Cookie from 'js-cookie';
const md = new MarkDownIt();
export default {
  data() {
    return {
      blog: {},
    };
  },
  computed: {
  },
  mounted() {
    this.blog = this.$page.post;
  },
  methods: {
    mdToHtml(markdown) {
      if (markdown) {
        return md.render(markdown);
      }
    },
    edit() {
      const token = Cookie.get('token');
      if (!token) {
        this.$message({
          message: "请绑定有效的Token",
          type: "warning",
        });
        return;
      }
      this.$router.push("/blog/edit/" + this.blog.id);
    },
    more() {
      this.$router.push("/blog");
    },
  },
};
</script>