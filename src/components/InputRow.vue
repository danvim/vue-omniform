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
    <input
      :id="_uid + '-input'"
      class="form-control"
      :value="value"
      :placeholder="label + '...'"
      :disabled="disabled"
      @input="propagateInput"
    >
  </form-group-row>
</template>

<script>
import FormGroupRow from './FormGroupRow'
import VLabel from './VLabel'
export default {
  name: 'InputRow',
  components: { VLabel, FormGroupRow },
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
    disabled: {
      type: Boolean,
      default: false
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
