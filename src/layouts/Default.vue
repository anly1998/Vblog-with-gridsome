<template>
  <div class="layout">
    <!-- Header -->
    <section
      class="page-header"
      :style="
        'background-image: linear-gradient(120deg, ' +
        Config.backgroundColorLeft +
        ', ' +
        Config.backgroundColorRight +
        ');color: ' +
        Config.fontColor +
        ';'
      "
    >
      <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
        <el-tooltip
          effect="dark"
          :content="fullButton.full ? '退出' : '全屏'"
          placement="bottom-end"
        >
          <el-button
            @click="full"
            :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
            circle
          ></el-button>
        </el-tooltip>
      </div>
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="
          'position:absolute; top:' +
          item.top +
          'px; left:' +
          item.left +
          'px; z-index:1;'
        "
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
      <h1 class="project-name">{{ Config.blogTitle }}</h1>
      <h2 class="project-tagline">{{ Config.blogDescribe }}</h2>
      <a
        :href="'https://github.com/' + Config.githubUsername"
        class="btn"
        target="_blank"
        >GitHub主页</a
      >
      <a
        :href="Config.VblogSource"
        class="btn"
        target="_blank"
        v-if="!Config.mini"
        >博客源码</a
      >
    </section>

    <!-- Header Nav -->
    <div
      style="position: relative; z-index: 2; margin: auto; margin-top: -30px; width: 64rem;"
    >
      <el-card shadow="never" :body-style="{ padding: '0px' }">
        <el-row>
          <!-- 菜单栏 -->
          <el-col :span="10">
            <el-menu
              @select="selectTopbar"
              :unique-opened="true"
              mode="horizontal"
              menu-trigger="click"
            >
              <el-submenu index="#more">
                <template slot="title">了解博主</template>
                <el-menu-item index="#githubHome">github主页</el-menu-item>
                <el-menu-item index="#blog">其他博客</el-menu-item>
              </el-submenu>
              <el-submenu index="#webSites" v-if="Config.webSites.length > 0">
                <template slot="title">其他网站</template>
                <el-menu-item
                  :index="'#webSites-' + index"
                  v-for="(item, index) in Config.webSites"
                  :key="'#webSites' + index"
                  >{{ item.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
          <!-- 背景音乐 -->
          <el-col
            :span="8"
            style="text-align: center; padding: 12px 0px 0px 10px"
          >
            <el-row>
              <el-col :span="4">
                <!-- 使用el弹出框组件 -->
                <el-popover placement="top" trigger="hover">
                  <!-- 音量控制 -->
                  <div style="text-align: center">
                    <el-progress
                      color="#67C23A"
                      type="circle"
                      :percentage="music.volume"
                    ></el-progress>
                    <br />
                    <el-button
                      @click="changeVolume(-10)"
                      icon="el-icon-minus"
                      circle
                    ></el-button>
                    <el-button
                      @click="changeVolume(10)"
                      icon="el-icon-plus"
                      circle
                    ></el-button>
                  </div>
                  <!-- 播放控制 -->
                  <el-button
                    @click="play"
                    id="play"
                    slot="reference"
                    :icon="
                      music.isPlay ? 'el-icon-refresh' : 'el-icon-caret-right'
                    "
                    circle
                  ></el-button>
                </el-popover>
              </el-col>
              <!-- 音乐播放进度条 -->
              <el-col :span="14" style="padding-left: 20px">
                <el-slider
                  @change="changeTime"
                  :format-tooltip="$util.formatTime"
                  :max="music.maxTime"
                  v-model="music.currentTime"
                  style="width: 100%"
                ></el-slider>
              </el-col>
              <!-- 音乐时长 -->
              <el-col
                :span="6"
                style="
                  padding: 9px 0px 0px 10px;
                  color: #909399;
                  font-size: 13px;
                "
              >
                {{ $util.formatTime(music.currentTime) }}/{{
                  $util.formatTime(music.maxTime)
                }}
              </el-col>
            </el-row>

            <audio ref="music" loop autoplay v-if="Config.musicAutoPlay">
              <source :src="require('~/assets/More_KDA.mp3')" type="audio/mpeg" />
            </audio>
            <audio ref="music" loop v-else>
              <source :src="require('~/assets/More_KDA.mp3')" type="audio/mpeg" />
            </audio>
          </el-col>
          <!-- 个人信息 -->
          <el-col :span="4" style="text-align: right">
            <div style="font-size: 20px; color: #606266; margin-top: 5px">
              <b>{{ Config.githubUsername }}</b>
            </div>
            <div style="color: #606266">
              <i class="el-icon-location"></i>&nbsp;{{
                User.location ? User.location : "未填写地址"
              }}
              <br />
            </div>
          </el-col>
          <!-- 头像及个人信息弹出卡片 -->
          <el-col :span="2" style="text-align: center">
            <img
              v-popover:bigAvatar
              :src="User.avatar_url"
              style="
                margin-top: 4px;
                margin-right: 10px;
                width: 52px;
                height: 52px;
                border-radius: 5px;
                border: 1px solid #ebeef5;
              "
            />
            <el-popover
              ref="bigAvatar"
              placement="top-start"
              :title="Config.githubUsername"
              width="200"
              trigger="hover"
            >
              <i class="el-icon-star-on"></i>&emsp;{{ User.name }}
              <br />
              <i class="el-icon-location"></i>&emsp;{{ User.location }}
              <br />
              <img :src="User.avatar_url" style="width: 200px; height: 200px" />
            </el-popover>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- Content -->
    <section class="main-content">
      <el-row>
        <!-- Side Bar -->
        <el-col :span="6" style="padding-right: 10px">
          <SideBar ref="sideBar" :changeToken="changeToken" />
        </el-col>
        <!-- Content -->
        <el-col :span="18" style="padding-left: 10px">
          <slot :token="token" />
        </el-col>
      </el-row>
    </section>

    <!-- Footer -->
    <section class="foot">
      <div
        style="
          border-top: 1px #e1e4e8 solid !important;
          padding: 45px 0px 45px 0px;
        "
      >
        <el-row>
          <el-col :span="10">
            <div>
              © 2018 GitHub-Laziji&emsp;&emsp;
              <a
                :href="'https://github.com/' + Config.githubUsername"
                target="_blank"
                >Profile</a
              >&emsp;&emsp;
              <a :href="Config.VblogUrl" target="_blank">VBlog</a>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center; font-size: 18px">
              <i class="el-icon-location-outline"></i>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="float: right">
              <a href="https://developer.github.com" target="_blank"
                >GitHub-API</a
              >&emsp;&emsp;
              <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a
              >&emsp;&emsp;
              <a href="http://element.eleme.io/" target="_blank">Element</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<static-query>
query {
  allConfig {
    edges {
      node {
        backgroundColorLeft
        backgroundColorRight
        fontColor
        blogTitle
        blogDescribe
        githubUsername
        mini
        webSites {
          name
          url
        }
        musicAutoPlay
      }
    }
  }

  allUser {
    edges {
      node {
        blog
        avatar_url
        location
        name
      }
    }
  }
}
</static-query>

<script>
import SideBar from "~/components/SideBar";
export default {
  name: "Default",
  data() {
    return {
      token: "",
      fullButton: {
        full: false,
      },
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 50,
      },
      randomIcon: [],
    };
  },
  computed: {
    Config() {
      return this.$static.allConfig.edges[0].node;
    },
    User() {
      return this.$static.allUser.edges[0].node;
    },
  },
  components: {
    SideBar,
  },
  methods: {
    // 操作页面全屏
    full() {
      if (!this.fullButton.full) {
        this.$util.fullScreen();
        this.fullButton.full = true;
      } else {
        this.$util.fullExit();
        this.fullButton.full = false;
      }
    },
    // 菜单栏
    selectTopbar(index) {
      if (process.isClient) {
        //取消菜单选中状态
        switch (index) {
          case "#githubHome":
            window?.open("https://github.com/" + this.Config.githubUsername);
            break;
          case "#blog":
            if (this.User.blog) {
              window?.open(
                (this.User.blog.match(/https?:\/\//i) ? "" : "https://") +
                  this.User.blog
              );
            } else {
              this.$message({
                message: "博主没有其他博客",
                type: "info",
              });
            }
            break;
          default:
            if (/#webSites-\d+/.test(index)) {
              let i = parseInt(index.split("-")[1]);
              let url = this.Config.webSites[i].url;
              window?.open((url.match(/https?:\/\//i) ? "" : "https://") + url);
            }
            break;
        }
      }
    },
    // 音乐音量控制
    changeVolume(v) {
      this.music.volume += v;
      if (this.music.volume > 100) {
        this.music.volume = 100;
      }
      if (this.music.volume < 0) {
        this.music.volume = 0;
      }
      this.$refs.music.volume = this.music.volume / 100;
    },
    // 音乐播放/暂停
    play() {
      if (this.$refs.music.paused) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.$nextTick(() => {
        document.getElementById("play").blur();
      });
    },
    // 音乐加载时获取音乐时长以及播放状态
    listenMusic() {
      if (!this.$refs.music) {
        return;
      }
      if (this.$refs.music.readyState) {
        this.music.maxTime = this.$refs.music.duration;
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.music.currentTime = this.$refs.music.currentTime;
    },
    // 改变音乐播放进度
    changeTime(time) {
      this.$refs.music.currentTime = time;
    },
    // 子组件token变化
    changeToken(token) {
      this.token = token;
    },
  },
  mounted() {
    this.token = this.$refs.sideBar.token;

    // 页面渲染完毕延迟执行音乐信息获取方法
    this.$nextTick(() => {
      setInterval(this.listenMusic, 1000);
    });

    // 根据浏览器窗口宽度 随机生成星星位置
    let width = window?.innerWidth;
    for (let i = 0; i < 12; i++) {
      let temp = {};
      // 随机生成星星距离左边长度 10 - (宽度-310)之间
      let left = this.$util.randomInt(10, width - 310);
      // 避开中间主体部分
      if (left > width / 2 - 150) {
        left += 300;
      }
      temp["left"] = left;
      // 随机生成星星距离顶部高度 20-300px之间
      temp["top"] = this.$util.randomInt(20, 300);
      // 随机生成星星大小 20-40px之间
      temp["size"] = this.$util.randomInt(20, 40);
      this.randomIcon.push(temp);
    }
  },
};
</script>

<style>
body {
  margin: 0;
}

.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: none;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn + .btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>
