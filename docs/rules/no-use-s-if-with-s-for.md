---
pageClass: rule-details
sidebarDepth: 0
title: san/no-use-s-if-with-s-for
description: disallow use s-if on the same element as s-for
---
# san/no-use-s-if-with-s-for
> disallow use s-if on the same element as s-for

- :gear: This rule is included in all of `"plugin:san/essential"`, `"plugin:san/strongly-recommended"` and `"plugin:san/recommended"`.

## :book: Rule Details

This rule is aimed at preventing the use of `s-for` directives together with `s-if` directives on the same element.

There are two common cases where this can be tempting:
 * To filter items in a list (e.g. `s-for="user in users" s-if="user.isActive"`). In these cases, replace `users` with a new computed property that returns your filtered list (e.g. `activeUsers`).
 * To avoid rendering a list if it should be hidden (e.g. `s-for="user in users" s-if="shouldShowUsers"`). In these cases, move the `s-if` to a container element (e.g. `ul`, `ol`).

<eslint-code-block :rules="{'san/no-use-s-if-with-s-for': ['error']}">

```vue
<template>
  <!-- ✓ GOOD -->
  <ul s-if="complete">
    <TodoItem
      s-for="todo in todos"
      :todo="todo"
    />
  </ul>
  <TodoItem
    s-for="todo in shownTodos"
    :todo="todo"
  />

  <!-- ✗ BAD -->
  <TodoItem
    s-if="complete"
    s-for="todo in todos"
    :todo="todo"
  /><!-- ↑ In this case, the `s-if` should be written on the wrapper element. -->
  <TodoItem
    s-for="todo in todos"
    s-if="todo.shown"
    :todo="todo"
  /><!-- ↑ In this case, the `s-for` list variable should be replace with a computed property that returns your filtered list. -->
</template>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "san/no-use-s-if-with-s-for": ["error", {
    "allowUsingIterationVar": false
  }]
}
```

- `allowUsingIterationVar` (`boolean`) ... Enables The `s-if` directive use the reference which is to the variables which are defined by the `s-for` directives. Default is `false`.

### `"allowUsingIterationVar": true`

<eslint-code-block :rules="{'san/no-use-s-if-with-s-for': ['error', {allowUsingIterationVar: true}]}">

```vue
<template>
  <!-- ✓ GOOD -->
  <TodoItem
    s-for="todo in todos"
    s-if="todo.shown"
    :todo="todo"
  />

  <!-- ✗ BAD -->
  <TodoItem
    s-for="todo in todos"
    s-if="shown"
    :todo="todo"
  />
</template>
```

</eslint-code-block>

## :books: Further Reading

- [Style guide - Avoid s-if with s-for](https://v3.vuejs.org/style-guide/#avoid-s-if-with-s-for-essential)
- [Guide - Conditional Rendering / s-if with s-for](https://v3.vuejs.org/guide/conditional.html#s-if-with-s-for)
- [Guide - List Rendering / s-for with s-if](https://v3.vuejs.org/guide/list.html#s-for-with-s-if)

## :mag: Implementation

- [Rule source](https://github.com/vuejs/eslint-plugin-san/blob/master/lib/rules/no-use-s-if-with-s-for.js)
- [Test source](https://github.com/vuejs/eslint-plugin-san/blob/master/tests/lib/rules/no-use-s-if-with-s-for.js)
