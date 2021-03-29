<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active">
        <g-link
          v-for="item in constantRouterMap"
          :key="item.path"
          :to="item.path"
        >
          <el-menu-item :index="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </g-link>
      </el-menu>
    </el-card>

    <el-card shadow="never" style="margin-top: 20px; text-align: center">
      <div
        v-if="!token"
        style="font-size: 0.9rem; line-height: 1.5; color: #606c71"
      >
        <span style="color: red; font-size: 1em" class="el-icon-warning"></span>
        Token未绑定&nbsp;&nbsp;
        <el-button type="text" @click="openTokenDialog">绑定</el-button>
      </div>
      <div
        v-if="token"
        style="font-size: 0.9rem; line-height: 1.5; color: #303133"
      >
        <span
          style="color: green; font-size: 1em"
          class="el-icon-success"
        ></span>
        Token已绑定&nbsp;&nbsp;
        <el-button type="text" @click="cancellation">注销</el-button>
      </div>
      <div style="margin-top: 10px; text-align: left">
        <el-alert
          title="Token获取"
          type="info"
          description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
          :closable="false"
        >
        </el-alert>
      </div>
    </el-card>
    <token-dialog ref="tokenDialog"></token-dialog>
  </div>
</template>

<script>
import { constantRouterMap } from "~/utils/RouterMap.js";
import tokenDialog from "~/components/TokenDialog";
import Cookies from "js-cookie";
export default {
  name: "SideBar",
  data() {
    return {
      active: "",
      constantRouterMap,
      token: "",
    };
  },
  props: {
    changeToken: {
      type: Function,
    },
  },
  mounted() {
    if (Cookies.get("token")) {
      this.token = true;
    } else {
      this.token = false;
    }
  },
  components: {
    tokenDialog,
  },
  methods: {
    openTokenDialog() {
      this.$refs.tokenDialog.open(() => {});
    },
    cancellation() {
      Cookies.remove("token");
      this.token = false;
      this.changeToken(false);
      this.$message({
        message: "Token取消绑定",
        type: "info",
      });
    },
  },
};
</script>

<style>
</style>