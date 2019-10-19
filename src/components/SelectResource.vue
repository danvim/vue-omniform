<template>
  <v-select
    ref="select"
    v-model="storedValue"
    :options="actualOptions"
    :label="label"
    :multiple="multiple"
    :disabled="actualDisabled"
    :clearable="clearable"
    :placeholder="placeholder"
    :components="selectComponents"
    @input="propagateInput"
    @search="onSearch"
  >
    <template
      v-if="get"
      slot="no-options"
    >
      Type to search...
    </template>
    <template v-slot:spinner="slotProps">
      <i
        v-show="slotProps.loading"
        class="fa fa-spin fa-spinner"
      />
    </template>
  </v-select>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
import { debounce, isEqual } from 'lodash'
export default {
  name: 'SelectResource',
  components: { vSelect },
  props: {
    value: {
      type: null,
      default: undefined
    },
    options: {
      type: Array,
      default: Array
    },
    get: {
      type: String,
      default: null
    },
    label: {
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
    placeholder: {
      type: String,
      default: ''
    },
    getAll: {
      type: Boolean,
      default: false
    },
    noRefresh: {
      type: Boolean,
      default: true
    },
    map: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      remoteOptions: null,
      errorDisabled: false,
      storedValue: [],
      selectComponents: {
        OpenIndicator: {
          render: (createElement) => createElement('i', { class: { 'fas fa-chevron-down': true } })
        }
      }
    }
  },
  computed: {
    actualOptions () {
      const options = this.remoteOptions || this.options
      if (options.length > 0 && typeof options[0] === 'object') {
        // i18n
        return options.map((o) => ({
          ...o,
          [this.label]: this.$te(o[this.label]) ? this.$t(o[this.label]) : o[this.label]
        }))
      } else {
        return options
      }
    },
    actualDisabled () {
      return this.disabled || this.errorDisabled
    }
  },
  watch: {
    immediate: true,
    value: {
      handler () {
        if (!isEqual(this.storedValue, this.value)) {
          this.setValue()
        }
      }
    }
  },
  mounted () {
    this.$t = this.$t || (i => i)
    this.$te = this.$te || (_ => false)
    if (this.get && this.getAll) {
      axios.get(this.get)
        .then(({ data }) => {
          this.remoteOptions = data
          const defaultValues = data.filter((datum) => datum.default)
          if (this.multiple) {
            if (!Array.isArray(this.storedValue)) {
              this.storedValue = []
            }
            this.storedValue.push(...defaultValues)
          } else {
            this.storedValue = defaultValues[0]
          }
          if (this.value !== undefined) {
            this.setValue()
          }
          this.propagateInput(this.storedValue)
        })
        .catch(this.onGetError)
    } else if (this.get) {
      // Used to test for error. Return result does not matter.
      axios.get(this.get).catch(this.onGetError)
    }
    if (!this.get && this.value !== undefined) {
      this.setValue()
      this.propagateInput(this.storedValue)
    }
  },
  methods: {
    setValue () {
      if (this.map) {
        if (this.multiple) {
          this.storedValue = this.actualOptions.filter((o) => this.value.indexOf(o[this.map]) > -1)
        } else {
          this.storedValue = this.actualOptions.filter((o) => o[this.map] === this.value)[0]
        }
      } else {
        // TODO query unknown resource
        this.storedValue = this.value
      }
    },
    onSearch (value, loading) {
      if (this.get && !this.getAll && value.trim().length > 0) {
        loading(true)
        this.search(value, loading)
      }
    },
    search: debounce(function (value, loading) {
      // eslint-disable-next-line no-invalid-this
      axios.get(this.get, {
        params: {
          tt: 1,
          q: value.trim()
        }
      })
      // eslint-disable-next-line no-invalid-this
        .then(({ data }) => this.updateRemoteData(data))
      // eslint-disable-next-line no-invalid-this
        .catch(this.onGetError)
        .then(() => loading(false))
    }, 300),
    updateRemoteData (data) {
      this.remoteOptions = data
    },
    propagateInput (value) {
      if (this.multiple) {
        if (this.map) {
          this.$emit('input', value.map((o) => o[this.map]))
        } else {
          this.$emit('input', value)
        }
      } else {
        this.$emit('input', this.map && value ? value[this.map] : value)
      }
    },
    onGetError (err) {
      // console.error(err, this)
      if (err.response.status === 403) {
        this.errorDisabled = true
      }
    }
  }
}
</script>

<style scoped>

</style>
