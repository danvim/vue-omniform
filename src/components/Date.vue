<template>
  <vue-bootstrap-datetime-picker
    ref="dp"
    :value="value"
    :bootstrap-styling="true"
    :config="options"
    @input="propagateInput"
  />
</template>

<script>
import VueBootstrapDatetimePicker from 'vue-bootstrap-datetimepicker'
export default {
  name: 'Date',
  components: { VueBootstrapDatetimePicker },
  props: {
    value: {
      type: null,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({
        format: 'YYYY-MM-DD HH:mm',
        useCurrent: false,
        showClear: true,
        showClose: true
      })
    }
  },
  mounted () {
    this.$refs.dp.elem[0].placeholder = this.placeholder
  },
  methods: {
    propagateInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
