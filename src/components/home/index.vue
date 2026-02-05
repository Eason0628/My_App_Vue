<template>
  <a-layout>
    <Header />
    <a-layout>
      <Sider />
      <a-layout style="padding: 0 24px 24px">
        <TabsCard />
        <Content />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { reactive, toRefs } from 'vue';
import Header from './Header.vue';
import Sider from './Sider.vue';
import Content from './Content.vue';
import TabsCard from './TabsCard.vue';
export default {
  name: 'Home',
  components: {
    Header,
    Sider,
    Content,
    TabsCard
  },
  setup () {
    const state = reactive({
      selectedKeys2: ['1'],
      openKeys: ['sub1']
    });

    return {
      ...toRefs(state)
    };

  },
};


</script>

<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>