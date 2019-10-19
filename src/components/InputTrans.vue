<template>
  <div class="input-trans">
    <div
      v-for="lang in langs"
      v-show="!lang.hidden"
      :key="lang.code"
      class="input-trans-row"
    >
      <label
        :for="inputId(lang)"
      >{{ lang.name }}</label>
      <div class="cell">
        <input
          v-show="!lang.hidden"
          :id="inputId(lang)"
          :ref="lang.code"
          class="form-control"
          :value="value[lang.code]"
          :placeholder="lang.name + '...'"
          @input="propagateInput"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputTrans',
  props: {
    value: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {
      /**
         * @type {{code: String, name: String}[]}
         */
      langs: []
    }
  },
  created () {
    this.langs = window.langs || []
    this.langs.forEach((lang) => {
      if (!this.value[lang.code]) {
        this.value[lang.code] = ''
      }
    })
  },
  methods: {
    inputId (lang) {
      return this._uid + '-lang-' + lang.code
    },
    collect () {
      return Object.assign({}, ...this.langs.map((lang) => ({ [lang.code]: this.$refs[lang.code][0].value })))
    },
    propagateInput () {
      this.$emit('input', this.collect())
    }
  }
}
</script>

<style scoped>

</style>
