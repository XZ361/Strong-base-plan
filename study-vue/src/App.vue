<!-- APP是整个程序的入口文件 -->
<template>
  <div id="app">
    <!-- 相对路径 -->
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- 绝对路径  需要将assets文件移到public目录下，因为webpack在打包时不回去处理该目录下的文件 -->
    <!-- <img alt="Vue logo" src="/assets/logo.png" /> -->
    <!-- 以@开头 ：默认会指向 src-->
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
    <!-- 结合vue.config.js自动配置公共路径 -->
    <img :src="`${publicPath}assets/logo.png`">

    <message ref="msgSuccess" class="success">
      <!-- 具名插槽 -->
      <template v-slot:title="slotProps">
        {{ slotProps.title }}
      </template>
      <!-- 默认插槽 -->
      <template> 课程新增成功！ </template>
    </message>

    <!-- 弹窗警告组件 -->
    <message ref="msgWarning" class="warning">
      <!-- 具名插槽 -->
      <template v-slot:title> 警告！ </template>
      <!-- 默认插槽 -->
      <template v-slot:default> 请输入课程名称！ </template>
    </message>

    <course-add v-model="course" @add-course="addCourse"></course-add>

    <course-list :courses="courses"></course-list>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import CourseAdd from "@/components/CourseAdd.vue";
import CourseList from "@/components/CourseList.vue";

// 具名导入
import { getCourses } from "@/api/course.js";

export default {
  name: "App",
  data() {
    return {
      courses: [],
      course: "",
      title: "购物车!",
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    Message,
    CourseAdd,
    CourseList,
  },
  // vue实例一旦创建就执行
  async created() {
    //异步获取课程
    const courses = await getCourses();
    this.courses = courses;
  },
  methods: {
    addCourse() {
      if (this.course) {
        this.courses.push({ name: this.course });
        this.course = "";
        // 显示提示信息
        // this.isShow = true;
        this.$refs.msgSuccess.toggle();
        console.log(this.courses);
      } else {
        // 显示警告信息
        // this.isShowWarn = true;
        this.$refs.msgWarning.toggle();
      }
    },
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
/* .success {
  background-color: #4fc08d;
  border: 1px solid #42b983;
}

.warning {
  background-color: #f66;
  border: 1px solid rgb(255, 41, 34);
} */
</style>