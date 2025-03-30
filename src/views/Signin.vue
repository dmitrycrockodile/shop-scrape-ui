<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            email: '',
            password: null
        }
    },
    methods: {
        ...mapActions('auth', ['login']),
        handleSubmit() {
            this.login({email: this.email, password: this.password})
            .then((res) => {
                if (!res.response) {
                    this.$router.push({ name: 'Dashboard' });
                }
            });
        }
    },
    components: {
        ArgonInput,
        ArgonButton
    },
    computed: {
        ...mapState('ui', [
        'hideConfigButton',
        'showNavbar',
        'showSidenav',
        'showFooter'
        ]),
        ...mapState('auth', ['user', 'token'])
    },
    beforeMount() {
        const body = document.getElementsByTagName("body")[0];
        this.$store.state.ui.hideConfigButton = true;
        this.$store.state.ui.showNavbar = false;
        this.$store.state.ui.showSidenav = false;
        this.$store.state.ui.showFooter = false;
        body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
        const body = document.getElementsByTagName("body")[0];
        this.$store.state.ui.hideConfigButton = false;
        this.$store.state.ui.showNavbar = true;
        this.$store.state.ui.showSidenav = true;
        this.$store.state.ui.showFooter = true;
        body.classList.add("bg-gray-100");
    }
};
</script>
<template>
    <main class="mt-0 main-content">
        <section>
        <div class="page-header min-vh-100">
            <div class="container">
            <div class="row">
                <div
                class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
                >
                <div class="card card-plain">
                    <div class="pb-0 card-header text-start">
                    <h4 class="font-weight-bolder">Sign In</h4>
                    <p class="mb-0">Enter your email and password to sign in</p>
                    </div>
                    <div class="card-body">
                    <form method="post" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                        <argon-input
                            id="email"
                            type="email"
                            placeholder="Email"
                            size="lg"
                            v-model.trim.lazy="email"
                            isRequired
                        />
                        </div>
                        <div class="mb-3">
                        <argon-input
                            id="password"
                            type="password"
                            placeholder="Password"
                            size="lg"
                            v-model.trim.lazy="password"
                            isRequired
                        />
                        </div>

                        <div class="text-center">
                        <argon-button
                            class="mt-4"
                            variant="gradient"
                            color="success"
                            fullWidth
                            size="lg"
                            >Sign in</argon-button
                        >
                        </div>
                    </form>
                    </div>
                </div>
                </div>
                <div
                class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
                >
                <div
                    class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                    style="
                    background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg&quot;);
                    background-size: cover;
                    "
                >
                    <span class="mask bg-gradient-success opacity-6"></span>
                    <h4
                    class="mt-5 text-white font-weight-bolder position-relative"
                    >
                    "Attention is the new currency"
                    </h4>
                    <p class="text-white position-relative">
                    The more effortless the writing looks, the more effort the
                    writer actually put into the process.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    </main>
</template>
