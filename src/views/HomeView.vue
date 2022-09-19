<template>
    <div class="bg-slate-800 w-screen h-screen relative">
        <notifications />

        <budget-info :budget-data="data" />
        <add-budget-item @add-new-item="addItem($event.Type, $event.Description, $event.Value)" />
        <budget-item-list :budget-data="data" />
    </div>
</template>

<script>
import BudgetInfo from '@/components/BudgetInfo.vue';
import AddBudgetItem from '@/components/AddBudgetItem.vue';
import BudgetItemsList from '@/components/BudgetItemsList.vue';

export default {
    components: {
        'budget-info': BudgetInfo,
        'add-budget-item': AddBudgetItem,
        'budget-item-list': BudgetItemsList,
        'notifications': () => import(/* webpackPrefetch: true */ '@/components/Notifications.vue'),
    },
    data() {
        return {
            data: {
                allItems: {
                    inc: [], /* All income items => {id: 1, description: 'lorem ipsum', value: 25238} */
                    exp: [], /* All expense items => {id: 1, description: 'lorem ipsum', value: 25238} */
                },
                totals: {
                    inc: 0, /* Total of all income items */
                    exp: 0, /* Total of all expense items */
                },
                budget: 0,
                percentage: '--', /* Percentage => 25 */
            },
        }
    },
    mounted() {
        this.$root.$on('removeItem', (props) => {
            this.deleteItem(props.type, props.id);
        });
    },
    methods: {
        addItem(type, desc, value) {
            // Generate unique id for each item
            const id = this.data.allItems[type].length + 1;

            // Income function consctructor
            const Income = function (Id, Description, Value) {
                this.id = Id;
                this.description = Description;
                this.value = Value;
            }

            // Expense function consctructor
            const Expense = function (Id, Description, Value) {
                this.id = Id;
                this.description = Description;
                this.value = Value;
            }

            // Create a new item based on the item type
            let newItem = undefined;
            if (type === 'inc') { /* New item contains: id, description, and value */
                newItem = new Income(id, desc, value);
            } else if (type === 'exp') {
                newItem = new Expense(id, desc, value);
            }

            // Place the new item in the correct array based on the item type
            this.data.allItems[type].unshift(newItem);

            // Recalculate the budget
            this.calculateBudget();
        },
        calculateBudget() {
            // Calculate total incomes and expenses
            this.calculateTotal('inc');
            this.calculateTotal('exp');

            // Calculate the current budget (income - expense)

            this.data.budget = this.data.totals.inc - this.data.totals.exp;

            // Calculate the percentage ((expense / income) * 100)
            const percentage = Math.round((this.data.totals.exp / this.data.totals.inc) * 100);
            if (percentage !== Infinity && percentage !== undefined) {
                this.data.percentage = percentage;
            } else {
                this.data.percentage = '--';
            }
        },
        calculateTotal(type) {
            let sum = 0;
            this.data.allItems[type].forEach((current) => { sum += current.value });

            // Store the sum of all items into corresponding arrays in 'totals' object
            this.data.totals[type] = sum;

            // Send 'data' object to the root
            this.$root.$emit('budget-data', this.data);
        },
        deleteItem(type, id) {
            // Create a new array containing ids of all items in the inc/exp arrays
            const ids = this.data.allItems[type].map((current) => current.id);

            const index = ids.indexOf(id);

            if (index !== -1) { /* -1 => id is not found in the ids array */
                this.data.allItems[type].splice(index, 1); /* Delete one item from the specified index position */
            }

            // Recalculate the budget
            this.calculateBudget();
        },
    },
}
</script>