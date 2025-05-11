<template>
    <div class="flex flex-col gap-0_5">
        <label
            class="xs-regular"
            for="base-input"
        >
            {{ labelText }}
            <slot name="label" />
        </label>
        <input
            id="base-input"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="base-input"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType, InputTypeHTMLAttribute } from 'vue'

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        type: {
            type: String as PropType<InputTypeHTMLAttribute>,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        labelText: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue'],
})
</script>

<style scoped>
.base-input {
    border-style: none;
    border: 1px solid var(--gray-500);
    border-radius: var(--br-small);
    padding: var(--space-1);
}

input:focus {
    outline: 1px solid var(--primary-light);
    border: 1px solid var(--primary-light);
}

input::placeholder {
    color: var(--gray-400);
}

.base-input__label {
}
</style>
