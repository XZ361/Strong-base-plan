<template>
  <div id="admin">
    <!-- 相对路径 -->
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- 绝对路径  需要将assets文件移到public目录下，因为webpack在打包时不回去处理该目录下的文件 -->
    <!-- <img alt="Vue logo" src="/assets/logo.png" /> -->
    <!-- 以@开头 ：默认会指向 src-->
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
    <!-- 结合vue.config.js自动配置公共路径 -->
    <img :src="`${publicPath}assets/logo.png`" />
    <a href="">hahha</a>
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
    <!-- 嵌套内容出口 -->
    <router-view></router-view>
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
      publicPath: process.env.BASE_URL,
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
  // 组件内路由守卫
  beforeRouteEnter(to, from, next) {
    if (window.isLogin) {
      next();
    } else {
      next("/login?redirect=" + to.fullPath);
    }
  },
};
</script>
