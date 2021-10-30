export default store => {
    // 当store初始化时，将存储在localStore中的状态还原
    if(localStorage){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            store.commit('user/login',user.username);
        }
    }
    // 若用户状态发生变化，则存入localStore中
    store.subscribe((mutation,state)=>{
        // {type:'user/login'}
        // {type:'user/logout'}
        if(mutation.type==='user/login'){
            const user = JSON.stringify(state.user);
            localStorage.setItem('user',user);
        }else if(mutation.type === 'user/logout'){
            localStorage.removeItem('user');
        }
    })
}