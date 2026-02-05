<template>
    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
        <router-view />
    </a-layout-content>
</template>
<script>
export default {
    name: 'Content',
    setup () {
        return {};
    },
}
</script>