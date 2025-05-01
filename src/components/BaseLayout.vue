<template>
    <slot name="header">
        <BaseHeader />
    </slot>
    <main>
        <slot />
    </main>
    <slot name="footer">
        <BaseFooter />
    </slot>
</template>

<script lang="ts">
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'

export default {
    name: 'BaseLayout',
    components: {
        BaseHeader,
        BaseFooter,
    },
}
</script>

<style lang="scss">
main {
    padding: 16px;
    flex: 1;
}
</style>
