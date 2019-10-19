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
      v-model="storedValue"
      class="form-control"
      :placeholder="label + '...'"
      :disabled="disabled"
      @input="propagateInput"
    >
  </form-group-row>
</template>

<script>
import FormGroupRow from './FormGroupRow'
import VLabel from './VLabel'

const toFloat = (str) => {
  const n = str.match(/^\d+(?:\.\d*)?$/)
  if (n === null) {
    // Not a real number
    return null
  }
  return parseFloat(str)
}

export default {
  name: 'NumberRow',
  components: { VLabel, FormGroupRow },
  props: {
    value: {
      type: Number,
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      storedValue: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        if (this.value !== toFloat(this.storedValue)) {
          this.storedValue = ['number', 'string'].indexOf(typeof this.value) > -1 ? String(this.value) : ''
        }
      }
    }
  },
  methods: {
    propagateInput () {
      const n = this.storedValue.match(/^\d+(?:\.\d*)?$/)
      if (n === null) {
        // Not a real number
        if (this.value !== null) {
          this.$emit('input', null)
        }
        return
      }
      this.$emit('input', parseFloat(this.storedValue))
    }
  }
}
</script>

<style scoped>

</style>
