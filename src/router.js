import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () =>
                import ('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: '',
                    name: 'page-login',
                    component: () =>
                        import ('@/views/pages/Login.vue')
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () =>
                        import ('@/views/pages/Error404.vue')
                }
            ]
        },

        //=====HOSPITAL====
        {
            path: "",
            component: () =>
                import ("./layouts/main/Main.vue"),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: "/hospital/visitas",
                    name: "hospital visitas",
                    component: () =>
                        import ("./views/northospital/visitas/screen.vue")
                },
                {
                    path: "/northospital/home",
                    name: "northospital",
                    component: () =>
                        import ("@/views/northospital/bienvenidos.vue"),
                    meta: {
                        breadcrumb: [
                            // { title: 'Home', url: '/' },
                            { title: "Login North Hospital", active: true }
                        ]
                    }
                },
                {
                    path: "/reporte/visitas",
                    name: "northospital",
                    component: () =>
                        import ("@/views/northospital/visitas/components/ReporteVisitas.vue"),
                    meta: {
                        breadcrumb: [
                            // { title: 'Home', url: '/' },
                            { title: "Login North Hospital", active: true }
                        ]
                    }
                },
            ]
        },

        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ]
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

export default router