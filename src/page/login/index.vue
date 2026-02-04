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

        <a-form :model="user" :rules="rules" ref="formRef" class="login-form">
          <a-form-item name="username">
            <a-input :value="user.username" placeholder="Please input your username">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password :value="user.password" placeholder="Please input your password">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block :loading="loading" @click="handleLogin">
              Login
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { login } from "@/js/service/user.js";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const formRef = ref();
    const state = reactive({
      user: {
        username: "",
        password: "",
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "Please input your username", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input your password", trigger: "blur" },
        ],
      },
      title: "Intelegent",
      logo: "/images/logo.png",
    });

    const handleLogin = async () => {
      try {
        state.loading = true;
        await formRef.value.validate();
        await login(state.user);
        if (router.currentRoute.value.query.redirect){
          router.push(router.currentRoute.value.query.redirect);
        }else{
          router.push("/");
        }
        sessionStorage.removeItem("ROUTES");
      } catch (err) {
        console.error(err);
        message.error("Login failed");
      } finally {
        state.loading = false;
      }
    };

    return {
      ...toRefs(state),
      formRef,
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
