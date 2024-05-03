<template>
    <div class="" >
      <div class="row mt-3 mb-3">
        <div class="col-lg-4 bg-light m-auto rounded bg-light">
          <h2 class="text-center pt-3">Thông tin tài khoản</h2>
          <form @submit.prevent="updateUser">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control"
               v-model="users.username">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="text" class="form-control"
               v-model="users.email">
            </div>
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="text" class="form-control"
               v-model="users.phone">
            </div>
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
               v-model="users.address">
            </div>
            <!-- <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input type="text" class="form-control"
               v-model="docgia.password">
            </div> -->
            <div class="d-grid">
            <router-link to="/" class="btn btn-dark">Quay lại</router-link>
            <button type="submit" class="btn btn-success">Cập nhật</button>
          </div>
          </form>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
import UserService from '@/services/user.service';

export default {
    data() {
        return {
            users: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {
        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.users = await UserService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
        async updateUser() {
            try {
                const userId = this.users._id;
                const updatedData = this.users;
                await UserService.update(userId, updatedData);
                alert("Thông tin đã được cập nhật thành công.");
                this.$router.push('/');
            } catch (error) {
                console.error('Lỗi khi cập nhật thông tin:', error);
                // Handle error gracefully, you can display an error message to the user
            }
        }
       
    },
}
</script>
