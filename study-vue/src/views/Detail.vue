<template>
    <div>
        <h2>page detail</h2>
        <p>{{$route.params.name}}</p>
    </div>
</template>

<script>
    export default {
        // created(){  //组件created时，发送一次请求
        //     console.log('发送详情请求');
        // }
        // watch: { //当路径的变化，就发起请求
        //     $route() {
        //         console.log('获取数据');
        //     }
        // },
        watch: {//上述程序的简写方式
            $route: {
                immediate: true,
                deep: true,
                handler() {
                    console.log('详情获取');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>