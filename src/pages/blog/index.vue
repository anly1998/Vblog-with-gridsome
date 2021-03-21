<template>
  <Layout v-slot:default="slotProps">
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          @click="search"
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <el-button
          @click="$share()"
          style="margin-left: 10px"
          icon="el-icon-share"
          type="warning"
          plain
          circle
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          round
          plain
          style="float: right"
          @click="goAdd"
          >写博文</el-button
        >
      </el-card>

      <div v-if="blogs && blogs.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in blogs"
          :key="'p' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link
                    style="text-decoration: none; cursor: pointer"
                    :to="item.node.path"
                  >
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.node.title }}
                  </g-link>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button
                    @click="$share('/blog/details/' + item.node.id)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                  <el-button
                    @click="editBlog(item.node.id)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-edit"
                    v-if="slotProps.token"
                  ></el-button>
                  <el-button
                    @click="deleteBlog(index)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-delete"
                    v-if="slotProps.token"
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            最近更新 {{ item.node.updated_at | toTime }}
          </div>
          <div
            style="
              font-size: 1.1rem;
              line-height: 1.5;
              color: #303133;
              padding: 10px 0px 0px 0px;
            "
          >
            {{ item.node.description }}
          </div>
        </el-card>
      </div>

      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query> 
query {
  allUserPost {
    edges {
      node {
        id
        title
        description
        created_at
        updated_at
        path
      }
    }
  }
}
</page-query>

<script>
import axios from 'axios';
import Cookie from 'js-cookie';
export default {
  name: "BlogIndex",
  data() {
    return {
      searchKey: "",
      blogs: [],
    };
  },
  computed: {
  },
  mounted() {
    this.blogs = this.$page.allUserPost.edges;
  },
  methods: {
    search() {
      this.blogs = this.$page.allUserPost.edges.filter((item) => {
        return item.node.title.includes(this.searchKey);
      });
    },
    goAdd() {
      const token = Cookie.get('token');
      if (!token) {
        this.$message({
          message: "请绑定有效的Token",
          type: "warning",
        });
        return;
      }
      this.$router.push("/blog/add");
    },
    editBlog(id) {
      this.$router.push(`/blog/edit/${id}`);
    },
    deleteBlog(index) {
      this.$confirm("是否永久删除该博客?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let blog = this.blogs[index];
        this.delete(blog.node.id).then((result) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.blogs.splice(index, 1);
        });
      });
    },
    delete (id) {
      const token = Cookie.get('token');
      return axios({
        url: `https://api.github.com/gists/${id}?access_token=${token}`,
        method: 'DELETE',
      })
    }
  },
};
</script>

<style>
</style>