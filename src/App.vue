<template>
    <main>
        <transition name="slide-fade" mode="out-in">
            <router-view :key="$route.fullPath" />
        </transition>

        <vue-progress-bar />
    </main>
</template>

<script>
export default {
    created() {
        this.$Progress.start(); /* When App.vue is first loaded start the progress bar */
        this.$router.beforeEach((to, from, next) => { /* Hook the progress bar to start before we move router-view */
            if (to.meta.progress !== undefined) { /* If the page we want to go to has a meta.progress object */
                let meta = to.meta.progress;
                this.$Progress.parseMeta(meta); /* Parse meta tags */
            }
            this.$Progress.start();
            next(); /* Continue to next page */
        }), this.$router.afterEach((to, from) => { /* Hook the progress bar to finish after we've finished moving router-view */
            this.$Progress.finish();
        });
    },
    mounted() {
        this.$Progress.finish(); /* When App.vue is finish loading finish the progress bar */
    },
}
</script>

<style>
/* Global transitions for routes */
.slide-fade-enter {
    transform: translateX(-20px);
    opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.15s linear;
}

.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>