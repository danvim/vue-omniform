<template>
  <div class="form-group row">
    <div :class="labelColClass">
      <slot name="label" />
    </div>
    <div :class="inputColClass">
      <slot />
      <slot name="help" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroupRow',
  props: {
    labelColClass: {
      type: String,
      default: 'col-12 col-sm-3 col-md-2'
    },
    inputColClass: {
      type: String,
      default: 'col-12 col-sm-9 col-md-10'
    }
  }
}
</script>

<style scoped>

</style>
