<template>
  <div>
    <!-- 用户输入 -->
    <p>
      <input
        type="text"
        :value="value"
        @input="onInput"
        @keydown.enter="addCourse"
      />
      <!-- 新增课程 -->
      <button @click="addCourse">添加课程</button>
    </p>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    addCourse() {
      this.$emit("add-course", this.course);
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style scoped>
</style>