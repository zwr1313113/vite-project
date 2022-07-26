<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// 编辑器主题 必须
import "tinymce/themes/silver";
export default defineComponent({
    // tinymce-vue需要在components注册
  components: { Editor },
  props: {
    // 富文本内容
    value: {
      type: String,
      default: "",
    },
    // 默认插件
    plugins: {
      type: [String, Array],
      default:
        "quickbars autoresize preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave",
    },
    // 默认工具栏
    toolbar: {
      type: [String, Array],
      default:
        "undo redo restoredraft | forecolor backcolor bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify outdent indent lineheight formatpainter | \
    fontfamily fontsize blocks | bullist numlist | \
    table image hr pagebreak insertdatetime | bdmap preview",
    },
  },
});
</script>

<style>
</style>