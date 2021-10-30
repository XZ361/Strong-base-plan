export default {
    namespaced: true,//设置独立的命名空间,避免命名冲突
    state: {  //保存全局状态
        isLogin: false,
        username: ''
    },
    mutations: {
        login(state,username) {
            state.isLogin = true;
            state.username = username;
        },
        logout(state) {
            state.isLogin = false;
            state.username = '';
        }
    },
    getters:{
        welcome: state => {
            return 'Welcome to here ,' + state.username+'!';
        }
    },
    actions: {
        /*
        *
        *  Action 类似于 mutation，不同在于：
        *  Action 提交的是 mutation，而不是直接变更状态。
        *  Action 可以包含任意异步操作。
        */
        //  Action本身不改变状态，只会通过mutations修改状态，简称mutations的搬运工
        //  参数一是vuex传递的上下文context:{commit,dispatch,state,...}
        // 里面是store可以调用的一些方法和数据
        login({ commit }, username) {
            // 模拟登陆api的调用，1秒钟后，如果判断成功，则登录成功
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login',username);
                        resolve();
                    } else {
                        reject();
                    }
                }, 1000);
            })
        },
        logout({ commit }, token) {
            // 模拟登陆api的调用，1秒钟后，如果判断成功，则登录成功
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (token === 'yes') {
                        commit('logout');
                        resolve();
                    } else {
                        reject();
                    }
                }, 1000);
            })
        }
    },
};