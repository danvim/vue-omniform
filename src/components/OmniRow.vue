<template>
  <div v-show="actualShow">
    <slot
      v-if="field.type === 'slot'"
      name="help"
    />
    <component
      :is="componentName(field.type)"
      v-else-if="componentName(field.type)"
      v-bind="field"
      :value="value"
      :type="field.type"
      :label="$t(field.label)"
      :required="field.required"
      :disabled="actualDisabled"
      @input="propagateInput"
    >
      <slot
        slot="help"
      >
        <div
          v-if="field.help !== ''"
          slot="event_rsvp_start"
          class="form-text small text-muted"
        >
          <vue-markdown
            class="omni-row-form-text text-muted"
            :source="field.help"
          />
        </div>
        <slot name="help" />
      </slot>
    </component>
  </div>
</template>

<script>
import InputRow from './InputRow'
import InputTransRow from './InputTransRow'
import SelectResourceRow from './SelectResourceRow'
import VueMarkdown from 'vue-markdown'
import NumberRow from './NumberRow'

export default {
  name: 'OmniRow',
  components: { SelectResourceRow, InputTransRow, InputRow, NumberRow, VueMarkdown },
  props: {
    value: {
      type: null,
      default: undefined
    },
    field: {
      type: Object,
      required: true
    },
    transformers: {
      type: Object,
      required: true
    },
    transformed: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
  computed: {
    actualDisabled () {
      return this.field.disabled ||
        (this.field.disableUnless && !this.model[this.field.disableUnless]) ||
        ((this.field.disableIf && this.model[this.field.disableIf]) || false)
    },
    actualShow () {
      return !(
        (this.field.showUnless && this.model[this.field.showUnless]) ||
        (this.field.showIf && !this.model[this.field.showIf]) ||
        false
      )
    }
  },
  mounted () {
    this.$t = this.$t || (i => i)
    this.propagateInput(this.value)
  },
  methods: {
    componentName (name) {
      return {
        input: 'InputRow',
        number: 'NumberRow',
        'input-trans': 'InputTransRow',
        select: 'SelectResourceRow',
        checkbox: 'CheckboxRow',
        date: 'DateRow'
      }[name]
    },
    propagateInput (input) {
      this.transformed[this.field.name] = this.transformers[this.field.transformer](input)
      this.$emit('input', input)
    }
  }
}
</script>

<style scoped>
</style>
