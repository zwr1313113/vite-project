<template>
  <div>
    <tinymce
      v-model:modelValue="modelValue"
      :isReadonly="false"
      ref="editor"
    ></tinymce>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted, watch } from "vue";
import tinymce from "@/components/tinymce/index.vue";

export default defineComponent({
  components: { tinymce },
  setup() {
    let modelValue = ref("");
    return {
        modelValue
    }
  },
});
</script>

<style>
</style>