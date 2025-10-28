<template>
  <div>
    <Phones />
    <PlusButton @click="router.push('/add')" class="fixed bottom-6 right-6"/>
    <MainButton text="Рассылка" @click="router.push('/spam')" />
  </div>
</template>

<script setup>
import { MainButton } from 'vue-tg'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>