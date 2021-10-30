<!-- APP是整个程序的入口文件 -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Admin</router-link>
    </nav>

    <span v-if="isLogin">
      {{welcome}}
      <button>注销</button>
    </span>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <!-- 利用keepalive做组件缓存，保留admin组件状态，提高执行效率 -->
      <!-- include依赖的是具体组件 -->
      <keep-alive include="admin">
        <router-view></router-view>
      </keep-alive>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default{
  computed: {
    ...mapState('user',['isLogin']),
    ...mapGetters('user',['welcome'])
  },
}
</script>

<style lang="scss" scoped> 
a {
  color: $color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 添加全局样式，重写cart.html文件 */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.success {
  background-color: #4fc08d;
  border: 0px solid #42b983;
}

.warning {
  background-color: #f66;
  border: 0px solid rgb(255, 41, 34);
}
</style>