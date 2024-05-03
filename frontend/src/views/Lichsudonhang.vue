<template>
  <section class="order-details shadow rounded-3 p-4 m-3">
    <div class="container">
      <h2 class="mt-3 mb-4 font-weight-bold">Đơn hàng của bạn</h2>
      <p class="text-muted mb-4">
        Kiểm tra trạng thái, quản lý trả lại, và khám phá sản phẩm tương tự.
      </p>

      <div class="order-container">
        <div class="shadow rounded order-item mb-4" v-for="(order, orderIndex) in filteredCarts" :key="order._id">
          <div class="order-header d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">Đơn hàng #{{ order._id }}</h6>
              <p class="text-muted mb-0">
                Mua vào {{ new Date(order.paidAt).toLocaleDateString('vi-VN') }}
              </p>
              <p class="mb-0 text-danger font-weight-bold">
                Tổng tiền: {{ formatNumber(order.totalPrice) }}
              </p>
            </div>
            <div class="d-flex">
              <a href="#" class="me-3 text-decoration-none">Quản lý đơn hàng</a>
              <a href="#" class="text-decoration-none">Xem hóa đơn</a>
            </div>
          </div>

          <hr />

          <div class="order-details-list" v-for="(product, index) in order.products" :key="index">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img :src="product.image" alt="Product Image" style="width: 50px; height: 50px;" class="me-3 rounded-circle">
                <div>
                  <h6 class="mb-1">{{ product.name }}</h6>
                  <p class="text-muted mb-0">{{ formatNumber(product.price) }}</p>
                </div>
              </div>
              <div class="quantity-actions">
                <span class="badge bg-light text-dark me-2">{{ product.quantity }}</span>
              </div>
            </div>
          </div>

          <hr />

          <div class="order-footer d-flex justify-content-between align-items-center">
            <div>
              <p class="text-danger mb-0 font-weight-bold">Trạng thái: {{ order.orderStatus }}</p>
            </div>
            <div class="d-flex">
              <button class="btn btn-primary me-2">Mua lại</button>
              <button class="btn btn-primary">Mua sắm tương tự</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OrderService from "@/services/order.service";
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';

export default {
  components: {},
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.retrieveOrders();
  },
  computed: {
    filteredCarts() {
      const userStore = useUserStore();
      const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';
      return this.orders.filter((order) => order.userId === userId);
    },
  },
  methods: {
    async retrieveOrders() {
      try {
        this.orders = await OrderService.getAll();
        console.log('Orders fetched:', this.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    formatNumber(value) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      return formatter.format(value);
    }
  }
}
</script>

<style scoped>
.order-container {
  margin-bottom: 20px;
}

.order-item {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
