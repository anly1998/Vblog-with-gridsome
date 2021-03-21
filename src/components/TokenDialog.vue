<template>
  <div>
    <el-dialog title="绑定Token" :visible.sync="show" width="500px">
      <el-form :model="tokenForm" ref="tokenForm" label-width="100px">
        <el-form-item label="GitHub">
          <el-tag>{{ githubUserName }}</el-tag>
        </el-form-item>
        <el-form-item
          prop="token"
          label="Token"
          :rules="[
            { required: true, message: '请输入accessToken', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="tokenForm.token"
            placeholder="请保管好Token"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<static-query>
query {
  allConfig {
    edges {
      node {
        githubUsername
      }
    }
  }
}

</static-query>

<script>
import Cookies from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      handleClose: null,
      tokenForm: {
        token: "",
      },
    };
  },
  computed: {
    githubUserName() {
      return this.$static.allConfig.edges[0].node.githubUsername;
    },
  },
  methods: {
    open(handleClose) {
      this.handleClose = handleClose;
      this.show = true;
    },
    onSubmit() {
      this.$refs["tokenForm"].validate((valid) => {
        if (valid) {
          this.verifyToken(this.tokenForm.token)
            .then((response) => {
              let result = response.data;
              let githubUsername = this.githubUserName;
              if (githubUsername == result["login"]) {
                Cookies.set("token", this.tokenForm.token);
                this.$parent.token = true;
                this.$parent.changeToken(true);
                this.$notify({
                  title: "成功",
                  message: "Token绑定成功",
                  type: "success",
                });
                // Vue.prototype.$message({
                //     message: 'Token绑定成功',
                //     type: 'success'
                // })
              } else {
                this.$message({
                  message: "Token用户不一致",
                  type: "error",
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "Token错误",
                type: "error",
              });
            });
          //   this.$store.dispatch("Authentication", this.tokenForm.token);
          if (typeof this.handleClose == "function") {
            this.handleClose();
          }
        }
      });
      this.show = false;
    },
    verifyToken(token) {
      return axios.get(`http://api.github.com/user?access_token=${token}`);
    },
  },
};
</script>