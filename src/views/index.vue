<template>
  <div @click="goTinyMce">富文本编辑器TinyMCE</div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    let goTinyMce = function () {
      router.push({
        path: "/tinymce",
      });
    };
    return {
        goTinyMce
    }
  },
});
</script>

<style scoped>
div {
    cursor: pointer;
}
</style>