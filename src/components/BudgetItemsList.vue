<template>
    <section class="px-2 my-3 pb-2.5 overflow-x-hidden bg-slate-900 space-y-6 rounded shadow-xl max-w-sm mx-auto sm:px-4 sm:pt-0.5 sm:max-w-2xl lg:space-y-0 lg:flex lg:justify-between lg:px-2 lg:pt-2 lg:pb-3 lg:h-[385px] lg:items-start lg:max-w-[64rem]">
        <!-- Incomes list -->
        <budget-item :item-type="'inc'" />

        <!-- Expenses list -->
        <budget-item :item-type="'exp'" />
    </section>
</template>

<script>
export default {
    components: {
        'budget-item': () => import(/* webpackPrefetch: true */ '@/components/BudgetItem.vue'),
    },
}
</script>