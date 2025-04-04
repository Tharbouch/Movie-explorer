<template>
  <button :class="[baseClasses, customClasses]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseButton",
  props: {
    bgColor: {
      type: String,
      default: "bg-blue-500",
    },
    hoverBgColor: {
      type: String,
      default: "hover:bg-blue-600",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    hoverTextColor: {
      type: String,
      default: "hover:text-white",
    },
    customClasses: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return {
      baseClasses: `${props.bgColor} ${props.hoverBgColor} ${props.textColor} ${props.hoverTextColor} font-bold py-2 px-4 min-w-32 rounded ${props.customClasses}`,
    };
  },
});
</script>
