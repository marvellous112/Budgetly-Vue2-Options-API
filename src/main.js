import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueProgressBar from 'vue-progressbar';
import '@/styles.css';

// Init progress bar
const vueProgressBarOptions = {
    color: '#10b981',
    failedColor: '#ef4444',
    thickness: '4px',
    transition: {
        speed: '0.6s',
        opacity: '0.6s',
        termination: 600,
    },
    autoRevert: true,
    location: 'top',
    position: 'fixed',
    inverse: false,
    autoFinish: true,
}
Vue.use(VueProgressBar, vueProgressBarOptions);

// Disable production tips
Vue.config.productionTip = false;

// Create Vue instance
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');