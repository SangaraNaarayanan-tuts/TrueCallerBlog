<template>
    <nav class="topnav">
        <img id="logo" src="../assets/images/truecaller.svg" alt="logo" @click="redirectToHome" />
    </nav>
</template>

<script>
export default {
    name: 'NavBarComponent',
    methods: {
        redirectToHome: function () {
            if (this.$route.path !== '/') {
                window.scrollTo(0, 0);
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>
.topnav {
    height: 60px;

    display: flex;
    align-items: center;
    padding: 10px 25px;
    background-color: #FFFFFF;
}

#logo {
    height: 30px;
    width: 140px;
}
</style>