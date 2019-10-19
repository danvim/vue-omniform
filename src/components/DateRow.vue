<template>
  <form-group-row>
    <template slot="label">
      <v-label
        :for="_uid + '-input'"
        :required="required"
      >
        {{ label }}
      </v-label>
    </template>
    <slot
      slot="help"
      name="help"
    />
    <date
      :value="value"
      :options="options"
      :placeholder="label + '...'"
      @input="propagateInput"
    />
  </form-group-row>
</template>

<script>
import FormGroupRow from './FormGroupRow'
import VLabel from './VLabel'
import Date from './Date'
export default {
  name: 'DateRow',
  components: { Date, VLabel, FormGroupRow },
  props: {
    value: {
      type: null,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
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
  methods: {
    propagateInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
