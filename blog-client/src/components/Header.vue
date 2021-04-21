<template>
  <div class="header">
      <div class="right">
        <el-menu
            class="el-menu-demo d-flex"
            mode="horizontal"
            active-text-color="#ffd04b"
        >
        <el-menu-item class="header-title" >OKOK 个人博客</el-menu-item>
        <el-menu-item @click="$router.push('/home')">首页</el-menu-item>
        <el-menu-item  @click="$router.push('/itArticle')">技术文章</el-menu-item>
        <el-menu-item @click="$router.push('/recordLife')">生活小记</el-menu-item>
        <el-menu-item @click="$router.push('/about')">关于自己</el-menu-item>
        <el-submenu index="">
            <template slot="title" >语言</template>
            <el-menu-item class="lang-item">中文</el-menu-item>
            <el-menu-item class="lang-item">英文</el-menu-item>
        </el-submenu>
      </el-menu>
      </div>
  </div>
</template>

<script>
export default {
  name: "headder",
  data() {
    return {
      activeIndex: "/home",
    };
  },
};
</script>

<style lang="scss" scoped>

</style>