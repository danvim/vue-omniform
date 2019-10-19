<template>
  <form-group-row
    label-col-class="col-10 col-sm-3 col-md-2"
    input-col-class="col-2 col-sm-9 col-md-10"
  >
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
    <div class="my-2">
      <checkbox
        :id="_uid + '-input'"
        :value="value"
        label=""
        :disabled="disabled"
        @input="propagateInput"
      />
    </div>
  </form-group-row>
</template>

<script>
import FormGroupRow from './FormGroupRow'
import VLabel from './VLabel'
import Checkbox from './Checkbox'
export default {
  name: 'CheckboxRow',
  components: { Checkbox, VLabel, FormGroupRow },
  props: {
    value: {
      type: Boolean,
      default: false
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
      this.$emit('input', input)
    }
  }
}
</script>

<style scoped>

</style>
