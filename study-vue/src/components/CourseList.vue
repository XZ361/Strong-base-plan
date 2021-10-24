<template>
  <!-- 列表渲染 -->
  <!-- class绑定 -->
  <!-- <div v-for="item in courses" :key="item" :class="{active: selectCourse === item}"
            @click = "selectCourse = item">
                {{ item }}
            </div> -->
  <!--v-if&v-else¥ -->
  <div>
    <p v-if="courses.length == 0">没有任何课程信息</p>
    <div :class="['courseList',$style.red]" v-else>
      <!-- style绑定 -->
      <div
        v-for="item in courses"
        :key="item.name"
        :class="{[$style.active]: selectCourse === item}"
        
        @click="onClick(item)"
      >
      <!-- 用编程式导航实现路由跳转 -->
      {{ item.name }} -- {{ item.price | currency("$") }}
        <!-- <router-link :to="`/admin/course/${item.name}`">
          {{ item.name }} -- {{ item.price | currency("$") }}
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectCourse: "",
    };
  },
  props: {
    courses: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created(){
    console.log(this.$style.red);
  },
  filters: {
    currency(value, symbol = "￥") {
      return symbol + value;
    },
  },
  methods: {
    onClick(item) {
      this.selectCourse = item;
      this.$router.push(`/admin/course/${item.name}`);
    }
  },
};
</script>

<style module>
.active {
  background-color: #ddd;
}
.red{
  color: red;
}
</style>