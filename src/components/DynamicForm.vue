<template>
  <Form>
    <div
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name">
      <label :for="name" class="label">{{ label }}</label>
      <Field :as="as" :id="name" :name="name" v-bind="attrs" class="input">
        <template v-if="children && children.length">
          <component
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            :is="tag"
            v-bind="childAttrs">
            {{ text }}
          </component>
        </template>
      </Field>
      <ErrorMessage :name="name" class="error-alert" />
    </div>
    <slot></slot>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'DynamicForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
