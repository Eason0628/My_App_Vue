<template>
    <div class="container">
        <div class="not-found"></div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "NotFound",
});
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
    background: #fff;
}
.not-found {
    height: 100%;
    width: 100%;
    background: url("/images/404.svg");
    background-repeat: no-repeat;
    background-position: center;
}
</style>
