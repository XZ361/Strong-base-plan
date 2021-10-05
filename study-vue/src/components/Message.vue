<template>
  <div>
    <div class="message-box" v-if="show">
      <strong>
        <slot name="title" title="来自message子组件"></slot>
      </strong>
      <slot></slot>
      <span class="message-box-close" @click="toggle()">X</span>
    </div>
  </div>
</template>

<script>
export default {
  // props:['show'],
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.$bus.$on("message-close", () => {
      this.toggle();
    });
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.message-box {
  padding: 10px 20px;
}

.message-box-close {
  float: right;
}
</style>