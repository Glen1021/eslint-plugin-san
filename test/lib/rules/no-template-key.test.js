/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const requireRule = require('../../../lib/utils/utils').requireRule;
const rule = requireRule('no-template-key');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
    parser: require.resolve('san-eslint-parser'),
    parserOptions: {ecmaVersion: 2015}
});

tester.run('no-template-key', rule, {
    valid: [
        {
            filename: 'test.san',
            code: ''
        },
        {
            filename: 'test.san',
            code: '<template><template></template></template>'
        },
        {
            filename: 'test.san',
            code: '<template><div key="foo"></div></template>'
        },
        {
            filename: 'test.san',
            code: '<template><div s-bind:key="foo"></div></template>'
        },
        {
            filename: 'test.san',
            code: '<template><div :key="foo"></div></template>'
        },
        {
            filename: 'test.san',
            code: '<template><template s-for="item in list" :key="item.id"><div /></template></template>'
        },
        {
            filename: 'test.san',
            code: '<template><template s-for="(item, i) in list" :key="i"><div /></template></template>'
        },
        {
            filename: 'test.san',
            code: '<template><template s-for="item in list" :key="foo + item.id"><div /></template></template>'
        },
        {
            filename: 'test.san',
            // It is probably not valid, but it works as the Vue.js 3.x compiler.
            // We can prevent it with other rules. e.g. san/require-s-for-key
            code: '<template><template s-for="item in list" key="foo"><div /></template></template>'
        }
    ],
    invalid: [
        {
            filename: 'test.san',
            code: '<template><div><template key="foo"></template></div></template>',
            errors: ["'<template>' cannot be keyed. Place the key on real elements instead."]
        },
        {
            filename: 'test.san',
            code: '<template><div><template s-bind:key="foo"></template></div></template>',
            errors: ["'<template>' cannot be keyed. Place the key on real elements instead."]
        },
        {
            filename: 'test.san',
            code: '<template><div><template :key="foo"></template></div></template>',
            errors: ["'<template>' cannot be keyed. Place the key on real elements instead."]
        },
        {
            filename: 'test.san',
            code: '<template><template s-slot="item" :key="item.id"><div /></template></template>',
            errors: ["'<template>' cannot be keyed. Place the key on real elements instead."]
        },
        {
            filename: 'test.san',
            code:
                '<template><template s-for="item in list"><template :key="item.id"><div /></template></template></template>',
            errors: ["'<template>' cannot be keyed. Place the key on real elements instead."]
        }
    ]
});
