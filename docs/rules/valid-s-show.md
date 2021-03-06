---
pageClass: rule-details
sidebarDepth: 0
title: san/valid-s-show
description: enforce valid `s-show` directives
---
# san/valid-s-show
> enforce valid `s-show` directives

- :gear: This rule is included in all of `"plugin:san/essential"`, `"plugin:san/strongly-recommended"` and `"plugin:san/recommended"`.

This rule checks whether every `s-show` directive is valid.

## :book: Rule Details

This rule reports `s-show` directives in the following cases:

- The directive has that argument. E.g. `<div s-show:aaa></div>`
- The directive has that modifier. E.g. `<div s-show.bbb></div>`
- The directive does not have that attribute value. E.g. `<div s-show></div>`

<eslint-code-block :rules="{'san/valid-s-show': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <div s-show="foo"/>

  <!-- ✗ BAD -->
  <div s-show/>
  <div s-show:aaa="foo"/>
  <div s-show.bbb="foo"/>
</template>
```

</eslint-code-block>

::: warning Note
This rule does not check syntax errors in directives because it's checked by [san/no-parsing-error] rule.
:::

## :wrench: Options

Nothing.

## :couple: Related Rules

- [san/no-parsing-error]

[san/no-parsing-error]: ./no-parsing-error.md

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-san/blob/master/lib/rules/valid-s-show.js)
- [Test source](https://github.com/vuejs/eslint-plugin-san/blob/master/tests/lib/rules/valid-s-show.js)
