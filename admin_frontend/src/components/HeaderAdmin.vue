<template>
    <div class="main--content">
        <div class="header--wrapper">
            <div class="header--title">
                <span>Primary</span>
                <h2>Dashboard</h2>
            </div>
            <div v-if="!isLoggedIn">
                <router-link to="users/add" class="btn btn-primary mr-3">Đăng ký</router-link>
                <router-link to="users/login" class="btn btn-primary">Đăng Nhập</router-link>
            </div>
            <div v-else class="dropdown">
                <a class="btn btn-info dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ username }}
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item" href="#">Thông tin cá nhân</a></li>
                    <li><a class="dropdown-item" @click='logout' href="#">Đăng xuất</a></li>
                    <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
                </ul>
            </div>
            <!-- <div class="user--info">
                <div class="searh--box">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search">
                </div>
                <img src="" alt="">
           </div> -->
        </div>
     </div>
</template>
<script>
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    // Sử dụng computed để lấy giá trị isLoggedIn từ store
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const userInfo = computed(() => userStore.userInfo);
    const username = computed(() => userInfo.value ? userInfo.value.ten : null);

    // Define the method to logout the user
    const logout = () => {
      userStore.clearUser(); // Call the logout method from the user store
    };

    return {
      isLoggedIn,
      username,
      logout,
    };
  }
};

</script>

<style scoped>


/***main body**/
.main--content{
    position: relative;
    background: #ebe9e9;
    width: 100%;
    padding: 0.5rem;
}
.header--wrapper img{
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;

}
.header--wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 5px;
    padding: 10px 2rem;
    margin-bottom: 0.5rem;
}
.header--title{
    color: rgb(113,99,186,255);
}
.user--info{
    display: flex;
    align-items: center;
    gap: 1rem;
}
.user--info p{
    margin-bottom: 0;
}
.searh--box{
    background: rgb(237, 237,237);
    border-radius: 15px;
    color: rgb(113,99,186,255);
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
}
.searh--box input{
    background: transparent;
    padding: 10px;

}
.searh--box i{
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
}
.searh--box i:hover{
    transform: scale(1.2);
}

/******** trang chủ ****/
</style>