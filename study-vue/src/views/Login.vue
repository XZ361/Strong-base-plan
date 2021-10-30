<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";
export default {
  methods: {
    login() {
      // 不能直接变更状态，必须通过提交mutations的方式变更状态
      // this.$store.commit('login');
      // 派发动作，来触发Actions
      this.$store.state.user.isLogin =true;
      this["user/login"]("admin")
        .then(() => {
          //添加动态路由
          this.$router.addRoutes([
            {
              path: "/admin",
              name: "Admin",
              component: () =>
                import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
              children: [
                {
                  path: "/admin/course/:name",
                  name: "Detail",
                  component: () => import("../views/Detail.vue"),
                },
              ],
              meta: {
                auth: true,
              },
            },
          ]);
          this.$router.push(this.$route.query.redirect);
        })
        .catch(() => {
          alert("用户名或密码错误");
        });
    },
    logout() {
      //   this.$store.commit("logout");
      this["user/logout"]("yes")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("口令错误");
        });
    },
    ...mapActions(['user/login','user/logout'])
  },
  computed: {
    // isLogin() {
    //   // 通过user命名空间拿到状态数据
    //   return this.$store.state.user.isLogin;
    // },
    // 状态的映射
    ...mapState('user',['isLogin'])
  },
};
</script>

<style lang="scss" scoped>
</style>