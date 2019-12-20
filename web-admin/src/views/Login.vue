<template>
  <div class="login">
    <p class="logo-box">
      <img class="logo" src="@/assets/images/welcome.jpeg" alt />
    </p>
    <p class="title">豆宝快来</p>
    <div class="form-box">
      <Form class="form" ref="form" :model="form" :rules="rules">
        <FormItem prop="accout">
          <Input
            prefix="ios-contact"
            v-model="form.account"
            placeholder="请输入用户名"
            size="large"
            @keydown.native.enter="onLogin"
          />
        </FormItem>
        <FormItem prop="pwd">
          <Input
            prefix="ios-lock"
            v-model="form.pwd"
            placeholder="请输入密码"
            size="large"
            @keydown.native.enter="onLogin"
          />
        </FormItem>
        <FormItem>
          <Button class="btn-login" type="primary" size="large" @click="onLogin"
            >登陆</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        account: "admin",
        pwd: ""
      },
      rules: {
        account: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    // on event
    onLogin() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.$api.login(this.form).then(data => {
          this.$store.commit("setToken", data.token);
          this.$Message.success("登陆成功");
          setTimeout(() => {
            this.$router.push({
              name: "Home"
            });
          }, 300);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 700px;
  margin: 100px auto;
  .logo-box {
    text-align: center;
    .logo {
      width: 250px;
      border-radius: 50%;
    }
  }
  .title {
    font-size: 16px;
    color: #999;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
  .form-box {
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .form {
      text-align: center;
      width: 100%;
      .btn-login {
        width: 100%;
      }
    }
  }
}
</style>
