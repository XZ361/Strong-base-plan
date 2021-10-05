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
    <div class="courseList" v-else>
      <!-- style绑定 -->
      <div
        v-for="item in courses"
        :key="item.name"
        :style="{
          backgroundColor: selectCourse === item ? '#ddd' : 'transparent',
        }"
        @click="selectCourse = item"
      >
        {{ item.name }} -- {{ item.price | currency("$") }}
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
  filters: {
    currency(value, symbol = "￥") {
      return symbol + value;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #ddd;
}
</style>