<template>
  <section class="contacts">
    <div class="contacts__container">
      <div class="contacts__items">
        <div class="contacts__content content-contacts">
          <div class="content-contacts__column">
            <h2 class="content-contacts__subtitle subtitle">
              {{ $t('contacts.support.title') }}
            </h2>
            <ul class="content-contacts__list">
              <li class="content-contacts__item">
                <a href="#" class="content-contacts__link">support@nex.com</a>
              </li>
              <li class="content-contacts__item">
                <a href="#" class="content-contacts__link">Telegram Link</a>
              </li>
            </ul>
          </div>
          <nex-contacts-form v-if="isTablet" />

          <div class="content-contacts__column">
            <h2 class="content-contacts__subtitle subtitle">
              {{ $t('contacts.regulations.title') }}
            </h2>
            <ul class="content-contacts__list">
              <li class="content-contacts__item">
                {{ $t('contacts.regulations.list.item_1') }}
              </li>
              <li class="content-contacts__item">
                {{ $t('contacts.regulations.list.item_2') }}
              </li>
              <li class="content-contacts__item">
                {{ $t('contacts.regulations.list.item_3') }}
              </li>
            </ul>
          </div>
          <div class="content-contacts__column">
            <h2 class="content-contacts__subtitle subtitle">
              {{ $t('contacts.service.title') }}
            </h2>
            <ul class="content-contacts__list">
              <li class="content-contacts__item">
                {{ $t('contacts.service.list.item_1') }}
              </li>
              <li class="content-contacts__item">
                {{ $t('contacts.service.list.item_1') }}
              </li>
              <li class="content-contacts__item">
                {{ $t('contacts.service.list.item_1') }}
              </li>
            </ul>
          </div>
        </div>
        <nex-contacts-form v-if="!isTablet" />
      </div>
      <nex-partners />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import NexContactsForm from '@/components/contacts/ContactsForm';
import NexPartners from '@/components/Partners';

export default {
  name: 'ContactsView',
  components: {
    NexPartners,
    NexContactsForm,
  },
  computed: {
    ...mapGetters({
      isTablet: 'adaptive/isTablet',
    }),
  },
};
</script>

<style scoped></style>
