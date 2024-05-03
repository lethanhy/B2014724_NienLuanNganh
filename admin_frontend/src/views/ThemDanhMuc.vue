<template>
    <div class=" bg-light">
      <div class="row">
        <div class="col-lg-4 mt-3 bg-white m-auto rounded">
          <h2 class="text-center pt-3 mb-3">Thêm danh mục</h2>
          <form @submit.prevent="addProduct(category)">
            <div class="mb-3">
              <label class="form-label">Tên danh mục</label>
              <input type="text" class="form-control"
                v-model="category.name">
            </div>
           
            <div class="d-flex">
                <router-link to="/category" class="btn btn-primary center text-white">Thoát</router-link>

                <button type="submit" class="btn btn-primary center ml-3">Tạo</button>
            </div>
          </form>
          <p></p>
        </div>
      </div>
    </div>
   
</template>

<script>
import CategoryService from '../services/category.service';

export default {
    data() {
        return {
        category: {
           // Tạo mã sách ngẫu nhiên khi tạo một cuốn sách mới
            name: '',
        }
        };
    },
    methods: {
    async addProduct(data) {
            try {
                await CategoryService.create(data);
                alert("Danh mục đã thêm vào thành công.");
                 this.$router.push('/category'); // Assuming '/sach' is the route you want to redirect to
            } catch (error) {
                console.log('lỗi');
            }
        },
                
    resetForm() {
      // Đặt lại giá trị của các trường trong product
      
      this.item.name = '';
    }
  }
}
</script>