<template>
    <div>
        <NavBarComponent></NavBarComponent>
        <div id="mainContent">
            <img id="notFoundImage" src="../../assets/images/notfoundImagesvg.svg" alt="404 Not Found"
                @click="redirectToHome" />
            <div id="notFoundText">
                Page Not Found
            </div>
        </div>
    </div>
</template>

<script>
import NavBarComponent from '../../components/NavBar.vue';

export default {
    name: "NotFoundPage",
    components: {
        NavBarComponent
    }
}
</script>

<style scoped>
#mainContent {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
    justify-content: center;
    align-items: center;
}

#notFoundImage {
    width: 300px;
}

#notFoundText {
    margin-top: 40px;
    font-size: 35px;
    font-weight: 500;
}
</style>