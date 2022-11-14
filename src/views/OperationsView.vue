<template>
  <h1 class="operations__title title">
    {{ $t('account.operations_history.title') }}
  </h1>
  <h6 class="operations__topic topic">
    {{ $t('account.operations_history.caption') }}
  </h6>
  <nex-operations-card />
  <nex-operations-list />
</template>

<script>
import NexOperationsCard from '@/components/account/operations/OperationsCard';
import NexOperationsList from '@/components/account/operations/OperationsList';

export default {
  name: 'OperationsView',
  components: {
    NexOperationsCard,
    NexOperationsList,
  },
};
</script>

<style scoped></style>
