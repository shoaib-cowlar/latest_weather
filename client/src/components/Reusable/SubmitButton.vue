<template>
  <button
    type="submit"
    :class="['custom-button', { 'disabled': disabled }]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    disabled: {
      type: Boolean,
      default: true,
    }
  },
    data(){
        return {
            // disabled :true,
        }
    },

  mounted(){
    console.log(this.disabled)
  }
};
</script>

<style>
.custom-button {
  @apply w-full text-white dark:bg-gradient-to-br from-purple-600 to-blue-500 dark:hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2;
}

.custom-button.disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
