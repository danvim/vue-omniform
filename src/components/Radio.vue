<template>
  <div class="custom-control custom-radio">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      :id="_uid"
      type="radio"
      :name="name"
      class="custom-control-input"
      :checked="storedValue === value"
      :value="storedValue"
      @input="propagateInput"
    >
    <label
      class="custom-control-label"
      :for="_uid"
    >{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: null,
      default: 1
    },
    storedValue: {
      type: null,
      default: 1
    }
  },
  methods: {
    propagateInput (input) {
      if (input.target.checked) {
        this.$emit('input', this.storedValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
