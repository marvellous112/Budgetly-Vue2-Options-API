<template>
    <article class="h-full overflow-x-hidden lg:relative lg:overflow-y-auto lg:min-w-[480px] lg:mx-3 hidden-scrollbar">
        <h2 :class="itemTypeColor" class="font-bold pb-1.5 text-[25px] tracking-wider pt-1 bg-slate-900 lg:sticky lg:top-0 lg:left-0 lg:right-0 lg:text-3xl lg:block lg:pt-0 lg:text-center lg:pb-2.5">
            {{ itemTypeName }}
        </h2>

        <transition-group :name="`slide-${itemType}`" tag="div" appear class="overflow-hidden rounded divide-y divide-slate-600">
            <div v-for="item in budgetData.allItems[itemType]" :id="item.id" :key="item.id" class="flex justify-between items-center group bg-slate-800 w-full py-2.5 px-1.5 lg:mr-6 lg:px-2.5 xl:mr-11">
                <!-- Item description -->
                <p class="break-words w-44 text-slate-200 sm:pr-2 sm:w-[350px] lg:w-[300px] lg:font-medium">{{ item.description }}</p>

                <!-- Item value -->
                <span :class="itemTypeColor" class="font-semibold tracking-wider min-w-max mx-1 lg:text-xl">
                    {{ `${itemType === 'inc' ? '+' : '-'}${item.value.toLocaleString('en-US')}` }}
                </span>

                <!-- Item remove button -->
                <button @click="removeItem(itemType, item.id)" type="button" aria-label="Remove item">
                    <svg v-if="itemType === 'inc'" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 stroke-emerald-400 stroke-2 fill-transparent support:invisible support:group-hover:visible" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-if="itemType === 'exp'" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 stroke-red-500 stroke-2 fill-transparent support:invisible support:group-hover:visible" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </transition-group>
    </article>
</template>

<script>
export default {
    props: {
        itemType: {
            type: String,
            required: true,
            default: null,
        },
    },
    data() {
        return {
            budgetData: {
                allItems: {
                    inc: [],
                    exp: [],
                },
                totals: {
                    inc: 0,
                    exp: 0,
                },
                budget: 0,
                percentage: '--',
            },
        }
    },
    created() {
        this.$root.$on('budget-data', (data) => {
            this.budgetData = data;
        });
    },
    methods: {
        removeItem(type, id) {
            this.$root.$emit('removeItem', { type, id });
        },
    },
    computed: {
        itemTypeName() {
            return this.itemType === 'inc' ? 'Incomes' : 'Expenses';
        },
        itemTypeColor() {
            return this.itemType === 'inc' ? 'text-emerald-400' : 'text-red-500';
        },
    },
}
</script>

<style scoped>
/* Add/remove item animations */
.slide-inc-enter,
.slide-exp-enter {
    opacity: 0;
    translate: 0 -100%;
}

.slide-inc-enter-to,
.slide-exp-enter-to {
    opacity: 1;
    translate: 0;
    transition: all 0.6s;
}

.slide-inc-leave-active,
.slide-exp-leave-active {
    /* Moves all elements smoothly after deleting one */
    transition: all 0.6s linear;
    position: absolute;
}

.slide-inc-move,
.slide-exp-move {
    transition: all 0.6s;
}

.slide-inc-leave-to {
    translate: -100%;
    opacity: 0;
}

.slide-exp-leave-to {
    translate: 100%;
    opacity: 0;
}
</style>