<template>
    <div>
        <button @click="login" v-if="!isLogin">登录</button>
        <button @click="logout" v-else>注销</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // isLogin: false
            }
        },
        methods: {
            login() {
                window.isLogin = true;
                //添加动态路由
                this.$router.addRoutes([
                   {
                        path: '/admin',
                        name: 'Admin',
                        component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
                        children:[
                            {
                                path: '/admin/course/:name',
                                name: 'Detail',
                                component: () => import('../views/Detail.vue')
                            }
                        ],
                        meta:{
                            auth: true
                        }
                    }
                ])
                this.$router.push(this.$route.query.redirect);
            },
            logout() {
                window.isLogin = false;
                this.$router.push('/');
            }
        },
        computed: {
            isLogin() {
                return window.isLogin; 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>