<template>
  <div class="tinymce-box" id="tinymceeditor">
    <!-- disabled: true只读 -->
    <Editor
      id="myedit"
      v-model="content"
      :init="init"
      tag-name="div"
      :disabled="isReadonly"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// 编辑器主题 必须
import "tinymce/themes/silver";
// 引入编辑器图标icon，不引入则不显示对应图标
import "tinymce/icons/default";
// ★
import "tinymce/models/dom";
// 引入编辑器插件
import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/anchor"; //锚点
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/autoresize"; //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import "tinymce/plugins/autosave"; //自动存稿
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/code"; //编辑源码
import "tinymce/plugins/codesample"; //代码示例
import "tinymce/plugins/directionality"; //文字方向
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/insertdatetime"; //插入日期时间
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/lists"; //列表插件
import "tinymce/plugins/media"; //插入编辑媒体
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/pagebreak"; //插入分页符
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/save"; //保存
import "tinymce/plugins/searchreplace"; //查找替换
import "tinymce/plugins/table"; //表格
import "tinymce/plugins/template"; //内容模板
import "tinymce/plugins/visualblocks"; //显示元素范围
import "tinymce/plugins/visualchars"; //显示不可见字符
import "tinymce/plugins/wordcount"; //字数统计
import "tinymce/plugins/quickbars"; //快速工具栏
export default defineComponent({
  // tinymce-vue需要在components注册
  components: { Editor },
  props: {
    // 富文本内容
    value: {
      type: String,
      default: "",
    },
    isReadonly: {
      type: Boolean,
      default: false,
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
    height: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    const content = ref();
    const bodyHeight = ref();
    bodyHeight.value = document.body.clientHeight * 0.9;
    // 静态资源路径，不配置的话生产环境下会在静态资源路径前面拼上服务器地址，导致找不到资源
    const publicPath = import.meta.env.VITE_PUBLIC_PATH || "/";
    const init = {
      selector: "#tinymceeditor",
      language_url: publicPath + `resource/tinymce/langs/zh-Hans.js`, //引入语言包文件
      skin_url: publicPath + "resource/tinymce/skins/ui/oxide-light", //皮肤：浅色 oxide-dark 暗色
      language: "zh-Hans", //语言类型
      toolbar_sticky: true, //固定工具栏
      importcss_append: true,
      toolbar_persist: true,
      fixed_toolbar_container: "#tool-fixed",
      min_height: bodyHeight.value, //富文本最小高度
      max_height: bodyHeight.value,
      convert_urls: false, //图片上传 不使用相对路径
      content_style: "p {font-family: '宋体';}", // 自定义css
      plugins: props.plugins, //插件配置
      toolbar: props.toolbar, //工具栏配置，设为false则隐藏
      // toolbar_mode: 'scrolling',
      width: 595,
      menubar: false, //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置
      menu: {
        // file: { title: '文件', items: 'newdocument' },
        edit: {
          title: "编辑",
          items: "undo redo | cut copy paste pastetext | selectall",
        },
        insert: { title: "插入", items: "link image" },
        view: { title: "查看", items: "visualaid" },
        // format: {
        //   title: '格式',
        //   items:
        //     'bold italic underline strikethrough superscript subscript | formats | removeformat',
        // },
        // table: { title: '表格', items: 'inserttable tableprops deletetable | cell row column' },
        // tools: { title: '工具', items: 'spellchecker code' },
      },
      // 字体大小列表
      // font_size_formats: '12px 13px 14px 15px 16px 19px 22px 24px 29px 32px 40px 48px', 
      // 字体列表
      font_family_formats:
        "黑体=SimHei;仿宋=FangSong,楷体=KaiTi;标楷体=BiauKai;华文仿宋=STFangSong;华文楷体=STKaiti;宋体=宋体;微软雅黑=Microsoft YaHei",
      placeholder: "在这里输入文字",
      branding: false, //tiny技术支持信息是否显示
      resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
      statusbar: false, //最下方的元素路径和字数统计那一栏是否显示
      elementpath: false, //元素路径是否显示
      init_instance_callback: (editor) => {
        editor.focus(); // 初始化聚焦，让内联模式的编辑器工具显示
        console.log(editor);
      },
      // content_css: '/tinycontent.css',  //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入

      // images_upload_url: '/demo/upimg.php',  //后端处理程序的url
      // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
      // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
      // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
      images_upload_handler: (blobInfo, progress) =>
        //progress: 上传进度 取1到100之间的值的回调
        new Promise((resolve, reject) => {}),
    };
    // 初始化
    tinymce.init; 
    return {
      init,
      content,
    };
  },
});
</script>

<style>
</style>