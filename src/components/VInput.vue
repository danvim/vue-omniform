<template>
  <input
    :id="_id"
    class="form-control"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="propagateInput"
  >
</template>

<script>

export default {
  name: 'VInput',
  props: {
    id: {
      type: String,
      default: null
    },
    value: {
      type: null,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    _id () {
      return this.id || this._uid + '-input'
    }
  },
  methods: {
    propagateInput (input) {
      this.$emit('input', input.target.value)
    }
  }
}
</script>

<style scoped>

</style>
