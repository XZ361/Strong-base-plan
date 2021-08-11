<template>
    <div>
        <div v-for="item in items" :key="item.key">
            {{item.index}} --{{ item.key }}  --{{item.value}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {key : 'value1'},
                    {key : 'value2'},
                    {key : 'value3'},
                    {key : 'value4'},
                ]
            }
        },
        methods: {
            name() {
                
            }
        },
        computed: {
            name() {
                return this.data 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>