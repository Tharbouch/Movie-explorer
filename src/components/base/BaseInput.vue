<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="border rounded p-2"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
});
</script>
