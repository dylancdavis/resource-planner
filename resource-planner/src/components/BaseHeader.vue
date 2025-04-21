<template>
    <header>
        <h1>
            Recipe Planner
        </h1>
    </header>
</template>

<script lang="ts">
export default {
    name: 'BaseHeader',
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    background-color: var(--primary-light);
    height: 64px;
    align-items: center;
    justify-content: center;
}
</style>
