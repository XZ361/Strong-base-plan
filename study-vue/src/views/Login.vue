<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // 不能直接变更状态，必须通过提交mutations的方式变更状态
      // this.$store.commit('login');
      // 派发动作，来触发Actions
      this.$store
        .dispatch("login", "admin")
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
      this.$store
        .dispatch("logout", "yes")
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          alert("口令错误");
        });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>