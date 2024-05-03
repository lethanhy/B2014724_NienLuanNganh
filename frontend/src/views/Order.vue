<template>
    <div>
      <div class="row mt-3 mb-3">
        <div class="col-lg-4 bg-light m-auto rounded bg-light">
          <h2 class="text-center pt-3">Mượn sách</h2>
          <form @submit.prevent="addUser">
            <div v-for="(sach, index) in filteredCarts" :key="index">
              <div class="mb-3">
                <label class="form-label">Tên sách</label>
                <input type="text" class="form-control" :value="formattedBookName(sach.tensach)" disabled>
              </div>
              <div class="mb-3">
                <label class="form-label">Tổng tiền</label>
                <input type="text" class="form-control" v-model="sach.tongtien">
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control" v-model="user.tendocgia">
            </div>
            <div class="mb-3">
              <label class="form-label">Thời gian mượn</label>
              <input type="text" class="form-control" v-model="user.thoigianmuon">
            </div>
            <div class="d-grid d-flex center">
              <router-link to="/carts" class="btn btn-success m-2">Trở về</router-link>
              <button type="submit" class="btn btn-success m-2">Tiến hành mượn</button>
            </div>
          </form>
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TheodoimuonsachService from '@/services/theodoimuonsach.service';
  import CartService from '@/services/cart.service'; // Import CartService
  import { useUserStore } from '../stores/userStore';
  
  export default {
    data() {
      return {
        user: {
          tendocgia: '',
          thoigianmuon: ''
        },
        carts: [], // Store all books in a flat array
        message: ''
      };
    },
    computed: {
      filteredCarts() {
        const userStore = useUserStore();
        const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';
        return this.carts.filter((cart) => cart.userId === userId);
      }
    },
    methods: {
      async addUser() {
        try {
          // Assuming you want to send user data and selected books to the backend
          const theodoimuonsach = {
            userId: userId.value,
            tendocgia: this.user.tendocgia,
            thoigianmuon: this.user.thoigianmuon,
            books: this.filteredCarts
          };
          await TheodoimuonsachService.create(theodoimuonsach);
          this.message = 'User created successfully.';
        } catch (error) {
          console.error('Error creating user:');
          this.message = 'Error creating user.';
        }
      },
      async retrieveCarts() {
        try {
          this.carts = await CartService.getAll();
          console.log('All books:', this.carts);
        } catch (error) {
          console.error('Error fetching carts:');
          this.message = 'Error fetching carts.';
        }
      },
      formattedBookName(bookName) {
        // Transform the book name to the desired format, e.g., "địa lí", "lịch sử", etc.
        // You can customize this logic based on your specific requirements
        return bookName.toLowerCase(); // Example: Convert book name to lowercase
      }
    },
    mounted() {
      this.retrieveCarts(); // Fetch carts when the component is mounted
    }
  };
  </script>
  