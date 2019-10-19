# Vue OmniForm

Bootstrap Vue forms generated with JSON/YAML.

The `OmniForm` component provided by this package also provides a RESTful way of posting the form to a remote server using Axios.

Install the package using NPM.

```sh
npm i -D vue-omniform
```

***Documentation WIP***

## Webkit

In a webkit project, it is suggested that the form template be saved in a separate `.json` or `.yaml` file and loaded in the needed `.vue` SFC.

```sh
npm i -D js-yaml js-yaml-loader
```

Then configure the loader as appropriate, e.g.

```javascript
{
  rules: [
    {
      test: /\.yaml$/,
      use: 'js-yaml-loader',
    },
  ]
}
```

Save a form template settings object as a YAML, e.g.:

```yaml
# Create Post Form
---
post_name:
  label: Post Name
  type: input-trans
  required: true

post_slug:
  label: Slug
  required: true
  help: >
    A slug is the part of text in the URL that describes the post. It 
    should only contain lowercase alphanumerical characters and hyphens
    for clarity.
```

Load the form template in a `.vue` component, e.g.:

```vue
<template>
  <div>
    <omni-form :fields="fields" />
  </div>
</template>
<script>
import PostSettings from '../forms/post.yaml'
export default {
  name: 'PostSettings',
  computed: {
    fields: () => PostSettings
  }
}
</script>
```

The above will generate the following DOM representation. (This is simplified for viewing):

```html
<div class="form-group row">
    <div class="col-12 col-sm-3 col-md-2">
        <label for="12-input" class="col-form-label">
            Post Name <span class="text-danger">*</span>
        </label>
    </div>
    <div class="col-12 col-sm-9 col-md-10">
        <div class="input-trans">
            <label for="15-lang-zh-TW">Chinese T.</label>
            <input id="15-lang-zh-TW" placeholder="Chinese T...." class="form-control">
            <label for="15-lang-en">English</label>
            <input id="15-lang-en" placeholder="English..." class="form-control">
        </div>
    </div>
</div>

<div class="form-group row">
    <div class="col-12 col-sm-3 col-md-2">
        <label for="22-input" class="col-form-label">
            Slug <span class="text-danger">*</span>
        </label>
    </div>
    <div class="col-12 col-sm-9 col-md-10">
        <input id="22-input" placeholder="Slug..." class="form-control">
        <div class="form-text small text-muted">
            <div class="omni-row-form-text text-muted">
                <p>
                    A slug is the part of text in the URL that describes the post. It should only contain
                    lowercase alphanumerical characters and hyphens for clarity.
                </p>
            </div>
        </div>
    </div>
</div>
```

This form, without further customization to the post content, will default to posting the following JSON payload to a server when requested:

```json
{
  "post_name": "",
  "post_slug": ""
}
```
