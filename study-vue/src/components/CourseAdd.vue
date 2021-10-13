<template>
  <div>
    <!-- 用户输入 -->
    <p>
      <input
        type="text"
        :value="val"
        @change="onChange"
        @keydown.enter="addCourse"
        class="inp"
      />
      <!-- 新增课程 -->
      <button @click="addCourse">添加课程</button>
    </p>
  </div>
</template>

<script>
export default {
  props: ["val"],
  model:{
    value:  "val",
    event:  "change"
  },
  methods: {
    addCourse() {
      this.$emit("add-course");
    },
    onChange(e) {
      this.$emit("change", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.inp{
  margin: 10px;
}
</style>