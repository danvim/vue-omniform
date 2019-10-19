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
    <select-resource
      :id="_uid + '-input'"
      :get="get"
      :options="options"
      :label="selectLabel"
      :multiple="multiple"
      :disabled="disabled"
      :clearable="clearable"
      :get-all="getAll"
      :placeholder="label + '...'"
      :value="value"
      :map="map"
      @input="propagateInput"
    />
    <slot
      slot="help"
      name="help"
    />
  </form-group-row>
</template>

<script>
import SelectResource from './SelectResource'
import FormGroupRow from './FormGroupRow'
import VLabel from './VLabel'
export default {
  name: 'SelectResourceRow',
  components: { VLabel, FormGroupRow, SelectResource },
  props: {
    value: {
      type: null,
      default: null
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
      type: Array,
      default: Array
    },
    get: {
      type: String,
      default: null
    },
    selectLabel: {
      type: String,
      default: 'text'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    getAll: {
      type: Boolean,
      default: false
    },
    map: {
      type: String,
      default: null
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
