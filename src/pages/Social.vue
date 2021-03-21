<!--
  问题一： GraphQL中如何分批查询  实现follower中有数据后查询 login\avatar_url\html_url等字段
  问题二： 此处有两个字段都使用了分页查询，使用Pager导致组件共用页码 $page 
 -->
<template>
  <Layout>
    <el-card
      shadow="never"
      style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px"
    >
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane
          :label="'粉丝 ' + followersTotal"
          name="followers"
          style="padding: 5px"
        >
          <div>
            <div v-if="followers.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in followers"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="item.node.path"
                      style="text-decoration: none; cursor: pointer"
                      >{{ item.node.login }}</g-link
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.html_url"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatar_url"
                      style="width: 100%; border-radius: 5px; margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :current-page="$page.follower.pageInfo.currentPage"
                  :page-size="9"
                  :total="followers.length"
                  :hide-on-single-page="$page.following.pageInfo.totalPages == 1 ? true : false"
                >
                </el-pagination>
                <!-- <Pager :info="$page.follower.pageInfo"/> -->
              </div>
            </div>
            <div
              style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              "
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="'关注 ' + followingTotal"
          name="following"
          style="padding: 5px"
        >
          <div>
            <div v-if="following.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in following"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="item.node.path"
                      style="text-decoration: none; cursor: pointer"
                      >{{ item.node.login }}</g-link
                    >
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.html_url"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatar_url"
                      style="width: 100%; border-radius: 5px; margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="following.length"
                  :page-size="9"
                  :current-page="$page.following.pageInfo.currentPage"
                  :hide-on-single-page="$page.following.pageInfo.totalPages == 1 ? true : false"
                >
                </el-pagination>
                <!-- <Pager :info="$page.following.pageInfo" /> -->
              </div>
            </div>
            <div
              style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              "
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  allUser {
    edges {
      node {
        followers
        following
      }
    }
  }

  follower: allFollower (perPage: 9, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        login
        html_url
        avatar_url
        path
      }
    }
  }

  following: allFollowing (perPage: 9, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        login
        html_url
        avatar_url
        path
      }
    }
  }
}
</page-query>

<script>
import { Pager } from "gridsome";

export default {
  name: "SocialIndex",
  metaInfo: {
    title: "social",
  },
  data() {
    return {
      activeTab: "followers",
    };
  },
  components: {
    Pager,
  },
  computed: {
    followersTotal() {
      return this.$page.allUser.edges[0].node.followers;
    },

    followingTotal() {
      return this.$page.allUser.edges[0].node.following;
    },
    followers() {
      return this.$page.follower.edges;
    },
    following() {
      return this.$page.following.edges;
    },
  },
  methods: {
    onSelect() {
      switch (this.activeTab) {
        case "followers":
          this.listFollowers();
          break;
        case "following":
          this.listFollowing();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>