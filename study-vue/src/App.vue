<!-- APP是整个程序的入口文件 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <course-list :courses="courses"></course-list>
  </div>
</template>

<script>
import CourseList from "@/components/CourseList.vue";
// 具名导入
import { getCourses } from "@/api/course.js";

export default {
  name: "App",
  data() {
    return {
      courses: [],
      course: "",
    };
  },
  components: {
    CourseList,
  },
  // vue实例一旦创建就执行
  async created() {
    //异步获取课程
    const courses = await getCourses();
    this.courses = courses;
  },
};
</script>

<style>
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
</style>