<template>
  <label
    class="col-form-label"
    :for="$props.for"
  >
    <slot />
    <span
      v-if="required"
      class="text-danger"
    >*</span>
  </label>
</template>

<script>
export default {
  name: 'VLabel',
  props: {
    for: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
