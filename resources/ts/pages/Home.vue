<script lang="ts">
import { defineComponent } from 'vue'
import ProductList from '@/components/ProductList.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductList,
  },
  setup() {},
})
</script>

<template>
  <div>
    <ProductList></ProductList>
  </div>
</template>
