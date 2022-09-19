<template>
    <section @keypress.enter="itemValidation()" class="bg-slate-900 p-[11px] flex justify-center items-center shadow-[inset_0px_0px_5px_5px_#00000050]">
        <!-- Item type identifier -->
        <button :value="itemType" :class="`change-type-btn-${itemType}`" @click="changeItemType(itemType)" type="button" aria-label="Change item type" class="change-type-btn">
            {{ itemType === 'inc' ? '&#43;' : '&#8722;' }}
        </button>

        <div class="flex flex-col justify-center items-center space-y-3 w-full max-w-[290px] mx-[11px] sm:ml-3 sm:mr-2 sm:max-w-[557px] sm:space-y-0 sm:flex-row sm:space-x-3">
            <!-- Item description input -->
            <input v-model.trim="descInput" :class="`desc-input-${itemType}`" type="text" inputmode="text" placeholder="Description" class="desc-input">

            <!-- Item value input -->
            <input v-model.number="numberInput" :class="`value-input-${itemType}`" type="number" inputmode="numeric" min="1" max="999999" placeholder="Value (number)" class="value-input">
        </div>

        <!-- Add item button -->
        <button @click="itemValidation()" type="button" aria-label="Add item" class="min-h-[40px] min-w-[40px] w-11 h-11 duration-200 active:scale-90">
            <svg :class="`add-item-btn-${itemType}`" xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            itemType: 'inc',
            descInput: undefined, /* Description input value */
            numberInput: undefined, /* Number input value */
        }
    },
    methods: {
        changeItemType(type) {
            if (type === 'inc') this.itemType = 'exp';
            if (type === 'exp') this.itemType = 'inc';
            if (this.descInput === undefined || this.descInput == '') this.setFocus('desc-input');
            if (this.descInput !== undefined && this.descInput != '') this.setFocus('value-input');
        },
        itemValidation() {
            if (this.descInput === undefined || this.descInput == '') {
                this.descInput = undefined;
                this.sendNotification('Description Required');
                this.setFocus('desc-input');
            } else if (isNaN(this.numberInput)) {
                this.sendNotification('Value Required');
                this.setFocus('value-input');
            } else if (this.numberInput == '') {
                this.sendNotification('Value Must Be A Number');
                this.setFocus('value-input');
            } else if (Math.round(this.numberInput) > 9999999) {
                this.sendNotification('Value Is Too Big');
                this.setFocus('value-input');
            } else {
                this.sendNotification(null);
                this.addNewItem();
                this.setFocus('desc-input');
            }
        },
        sendNotification(message) { /* Send notification message to the root */
            this.$root.$emit('notification', message);
        },
        setFocus(element) {
            if (element === 'desc-input') document.querySelector('input[type="text"]').focus();
            if (element === 'value-input') document.querySelector('input[type="number"]').focus();
        },
        addNewItem() {
            this.$emit('add-new-item', {
                Type: this.itemType,
                Description: this.descInput,
                Value: Math.round(this.numberInput),
            });

            // Reset inputs
            this.descInput = undefined;
            this.numberInput = undefined;
        },
    },
}
</script>

<style scoped>
/* Dynamic-styled buttons and inputs */
.change-type-btn {
    border-radius: 1px;
    padding: 12px;
    padding-top: 6px;
    background-color: #f1f5f9;
    font-size: 30px;
    line-height: 36px;
    font-weight: 500;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 200ms;
    border: 3px solid;
}

.change-type-btn-inc {
    border-color: #10b981;
    color: #10b981;
}

.change-type-btn-exp {
    border-color: #dc2626;
    color: #dc2626;
}

.desc-input {
    border-radius: 0;
    background-color: #f1f5f9;
    font-weight: 500;
    color: #0f172a;
    font-size: 18px;
    line-height: 28px;
    padding-left: 8px;
    padding-right: 8px;
    height: 32px;
    width: 100%;
    border: none;
}

.desc-input::placeholder {
    color: #94a3b8;
}

.desc-input-inc:hover {
    outline: 2px solid #10b981;
}

.desc-input-inc:focus,
.desc-input-inc:focus-within {
    outline: 3px solid #10b981;
}

.desc-input-exp:hover {
    outline: 2px solid #dc2626;
}

.desc-input-exp:focus,
.desc-input-exp:focus-within {
    outline: 3px solid #dc2626;
}

.value-input {
    border-radius: 0;
    background-color: #f1f5f9;
    font-weight: 500;
    color: #0f172a;
    font-size: 18px;
    line-height: 28px;
    padding-left: 8px;
    padding-right: 8px;
    height: 32px;
    width: 100%;
    border: none;
    text-align: left;
}

.value-input::placeholder {
    text-align: left;
}

.value-input-inc:hover {
    outline: 2px solid #10b981;
}

.value-input-inc:focus,
.value-input-inc:focus-within {
    outline: 3px solid #10b981;
}

.value-input-exp:hover {
    outline: 2px solid #dc2626;
}

.value-input-exp:focus,
.value-input-exp:focus-within {
    outline: 3px solid #dc2626;
}

.add-item-btn-inc {
    stroke: #10b981;
}

.add-item-btn-exp {
    stroke: #dc2626;
}

@media (hover: hover) {
    .change-type-btn-inc:hover {
        color: #059669;
        border-color: #059669;
    }

    .change-type-btn-exp:hover {
        color: #b91c1c;
        border-color: #b91c1c;
    }

    .add-item-btn-inc:hover {
        stroke: #059669;
    }

    .add-item-btn-exp:hover {
        stroke: #b91c1c;
    }
}

@media (min-width: 640px) {
    .change-type-btn {
        padding: 0px;
        border-radius: 4px;
        font-size: 33px;
        width: 44px;
        height: 44px;
    }

    .desc-input {
        height: 44px;
        border-radius: 4px;
    }

    .value-input {
        height: 44px;
        width: 320px;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
    }

    .value-input::placeholder {
        text-align: center;
    }

    .add-item-btn {
        height: 48px;
        width: 48px;
    }
}

@media (min-width: 1024px) {
    .desc-input {
        border-radius: 4px;
    }

    .value-input {
        border-radius: 4px;
    }
}
</style>