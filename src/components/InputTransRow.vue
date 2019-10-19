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
    <input-trans
      :value="value"
      @input="propagateInput"
    />
    <slot
      slot="help"
      name="help"
    />
  </form-group-row>
</template>

<script>
import InputTrans from './InputTrans'
import FormGroupRow from './FormGroupRow'
import VLabel from './VLabel'
export default {
  name: 'InputTransRow',
  components: { VLabel, FormGroupRow, InputTrans },
  props: {
    value: {
      type: Object,
      default: Object
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    propagateInput (input) {
      this.$emit('input', input)
    }
  }
}
</script>

<style scoped>

</style>
