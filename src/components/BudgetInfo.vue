<template>
    <section class="m-3 mt-4 text-center text-slate-50 lg:mt-4">
        <!-- Website name -->
        <h1 class="text-[20px] min-w-max mx-auto font-bold -mt-2 mb-5 tracking-wide sm:text-[25px]">
            <router-link exact :to="{ name: 'home' }" class="italic text-2xl text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-400 sm:text-[26px]">Budgetly</router-link>
            &#8226; Expense Tracker
        </h1>

        <div class="-mt-2.5 text-sm lg:text-base">
            <p>Available Budget on</p>
            <time>{{ todaysFormattedDate }}</time>
        </div>

        <!-- Current available budget -->
        <p :class="budgetNumberColor" class="text-4xl font-medium tracking-widest mt-4 mb-5">
            {{ animatedBudgetNumber }}
        </p>

        <!-- Total amount of incomes/expenses -->
        <div class="space-y-3 max-w-sm mx-auto sm:flex sm:justify-center sm:items-center sm:space-x-3 sm:max-w-2xl sm:space-y-0">
            <!-- Total amount of incomes -->
            <div class="rounded bg-emerald-500 flex items-center justify-between font-medium py-2.5 pl-3 pr-16 text-xl sm:px-3 sm:space-x-7 sm:w-1/2">
                <h2>Incomes</h2>

                <p class="font-semibold text-[21px] tracking-wider">{{ animatedTotalIncomesNumber }}</p>
            </div>

            <!-- Total amount of expenses -->
            <div class="rounded relative bg-red-500 flex items-center justify-between font-medium py-2.5 pl-3 pr-16 text-xl sm:space-x-7 sm:w-1/2">
                <h2>Expenses</h2>

                <p class="font-semibold text-[21px] tracking-wider">{{ animatedTotalExpensesNumber }}</p>

                <!-- Percentage of expenses to the total income -->
                <span class="bg-gray-300 bg-opacity-40 px-1 mt-0.5 overflow-hidden max-w-[55px] rounded text-sm leading-5 absolute right-1.5 top-3 lg:text-[15px] lg:top-[12px]">
                    {{ animatedPercentageNumber }}
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import gsap from 'gsap';

export default {
    props: {
        budgetData: {
            type: Object,
            required: true,
            default: () => {
                return {
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
                }
            },
        },
    },
    data() {
        return {
            budgetNumber: 0,
            totalIncomesNumber: 0,
            totalExpensesNumber: 0,
            percentageNumber: '--',
        }
    },
    watch: {
        'budgetData.budget'(newValue) {
            gsap.to(this.$data, { duration: 0.8, budgetNumber: newValue });
        },
        'budgetData.percentage'(newValue) {
            gsap.to(this.$data, { duration: 0.8, percentageNumber: newValue });
        },
        budgetTotalIncsToWatch: function (newValue) {
            gsap.to(this.$data, { duration: 0.8, totalIncomesNumber: newValue });
        },
        budgetTotalExpsToWatch(newValue) {
            gsap.to(this.$data, { duration: 0.8, totalExpensesNumber: newValue });
        },
    },
    computed: {
        currentFullDate() { /* Today's full data */
            return new Date();
        },
        allMonths() { /* List of all months */
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        },
        currentMonth() { /* Returns the current month */
            return this.allMonths[this.currentFullDate.getMonth()];
        },
        todaysFormattedDate() { /* Today's formatted date. E.g. July 13, 2022 */
            return `${this.currentMonth} ${this.currentFullDate.getDate()}, ${this.currentFullDate.getFullYear()}`;
        },
        budgetNumberColor() {
            if (this.budgetData.budget < 0) return 'text-red-500';
            if (this.budgetData.budget === 0) return 'text-inherit';
            if (this.budgetData.budget > 0) return 'text-emerald-400';
        },
        animatedBudgetNumber() {
            if (this.budgetData.budget === 0 || this.budgetData.budget < 0) {
                return this.budgetNumber.toLocaleString('en-US', { maximumFractionDigits: 0 });
            } else if (this.budgetData.budget > 0) {
                return `+${this.budgetNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
            }
        },
        budgetTotalIncsToWatch() {
            return this.budgetData.totals['inc'];
        },
        budgetTotalExpsToWatch() {
            return this.budgetData.totals['exp'];
        },
        animatedTotalIncomesNumber() {
            if (this.budgetData.totals.inc > 0) return `+${this.totalIncomesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
            return this.totalIncomesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 });
        },
        animatedTotalExpensesNumber() {
            if (this.budgetData.totals.exp > 0) return `-${this.totalExpensesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
            return this.totalExpensesNumber.toLocaleString('en-US', { maximumFractionDigits: 0 });
        },
        animatedPercentageNumber() {
            if (this.budgetData.percentage > 100) return '+100%';
            if (this.budgetData.percentage === '--' || this.budgetData.totals['inc'] === 0) return '--';
            return `${this.percentageNumber.toLocaleString('en-US', { maximumFractionDigits: 0 })}%`;
        },
    },
}
</script>