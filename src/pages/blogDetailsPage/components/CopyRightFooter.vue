<template>
    <div id="footer">
        <div id="copyrightContent"> &copy; <span id="copyrightCompany">True Software Scandinavia AB</span></div>
    </div>
</template>

<script>
export default {
    name: 'CopyRightFooter',
}
</script>

<style scoped>
#footer {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0px 25px;
    background-color: #00308F;
}

#copyrightCompany {
    margin-left: 5px;
}

#copyrightContent {
    font-size: 16px;
    margin-left: 5%;
    font-weight: 500;
    color: #FFFFFF;
}

@media only screen and (max-width: 600px) {
    #copyrightContent {

        margin-left: 2%;
    }
}
</style>