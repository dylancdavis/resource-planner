<template>
    <header>
        <h1 class="title">Resource Planner</h1>
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

.title {
    font-size: 2rem;
    font-weight: 600;
}
</style>
