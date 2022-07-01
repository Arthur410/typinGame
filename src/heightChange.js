export default {
    methods: {
        defaultHeight() {
            const app = document.querySelector('#app')
            app.style.height = "auto"
            app.style.display = "block"
            app.style.flexDirection = "unset"
        },
        homeHeight() {
            const app = document.querySelector('#app')
            app.style.height = "100vh"
            app.style.display = "flex"
            app.style.flexDirection = "column"
        },
    }
}