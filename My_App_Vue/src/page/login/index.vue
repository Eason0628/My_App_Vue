<template>
  <div class="login">
    <div class="lgbg">
      <div class="part">
        <div class="title">
          <div class="logo">
            <img :src="logo" :width="100" alt="logo" />
          </div>
          <h1>{{ title }}</h1>
        </div>

        <!-- 登录表单 -->
        <a-form :model="user" :rules="rules" :form="form" class="login-form">
          <a-form-item name="username">
            <a-input
              :value="user.username"
              placeholder="Please input your username"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
              :value="user.password"
              placeholder="Please input your password"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              block
              :loading="loading"
              @click="handleLogin"
            >
              Login
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Form, message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { login } from "@/js/service/user.js";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = Form.useForm();
    const loading = ref(false);
    store.dispatch("user/SetMenus");
    const user = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: [
        { required: true, message: "Please input your username", trigger: "blur" },
      ],
      password: [
        { required: true, message: "Please input your password", trigger: "blur" },
      ],
    };

    const title = "Intelegent Park";
    const logo = "/images/logo.png";


    const handleLogin = async () => {
      try {
        loading.value = true;
        await form.validate();
        const { data } = await login(user);
        const { token, username, btnAuth } = data;
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("btnAuth", JSON.stringify(btnAuth));
        sessionStorage.setItem("token", token);
        message.success("Login success");
        router.replace("/");
      } catch (err) {
        console.error(err);
        message.error("Login failed");
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      user,
      rules,
      title,
      logo,
      handleLogin,
      UserOutlined,
      LockOutlined,
    };
  },
};
</script>


<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/bg.jpg');

  .lgbg {
    width: 1200px;
    height: 700px;
    background-image: url('/images/lgbg.jpg');
    .part {
      width: 364px;
      height: 700px;
      padding: 140px 20px 0px 20px;
      background-color: white;
      margin-left: auto;
      .title {
        margin-bottom: 50px;
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        h1 {
          text-align: center;
          color: #027cc5;
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
