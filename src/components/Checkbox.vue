<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="id || (_uid + '-input')"
      :checked="value"
      type="checkbox"
      class="custom-control-input"
      :disabled="disabled"
      @input="propagateInput"
    >
    <label
      class="custom-control-label"
      :for="id || (_uid + '-input')"
    >{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    id: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    propagateInput (input) {
      this.$emit('input', input.target.checked)
    }
  }
}
</script>

<style scoped>

</style>
