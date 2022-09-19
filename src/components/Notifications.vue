<template>
    <transition name="scale" mode="out-in" appear>
        <div v-show="isVisible" @click="isVisible = false" class="flex justify-between items-center shadow-2xl px-3 py-2 bg-red-100 text-red-600 fill-red-600 font-medium rounded cursor-pointer absolute z-50 top-[61%] max-w-fit left-0 right-3 mx-auto md:top-2 md:right-3 md:mx-auto md:left-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-inherit" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>

            <p class="w-full mx-3 text-center text-inherit">{{ notification }}</p>

            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-inherit" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            notification: null,
            isVisible: false,
        }
    },
    created() {
        this.$root.$on('notification', (msg) => {
            this.notification = msg;
            if (msg === null) this.isVisible = false;
            if (msg !== null) {
                this.isVisible = true;
                setTimeout(() => {
                    this.isVisible = false;
                }, 3000);
            }
        });
    },
}
</script>

<style scoped>
/* Pop-up notification transitions */
.scale-enter {
    scale: 0;
    translate: 100%;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.2s linear;
}

.scale-leave-to {
    scale: 0;
    translate: 100%;
}
</style>