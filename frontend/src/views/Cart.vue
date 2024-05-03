<template>
  <section class="h-100 h-custom shadow rounded-3">
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-7">
          <h1 class="text-danger m-3">GIỎ HÀNG</h1>

          <!-- Lặp qua danh sách giỏ hàng -->
          <div v-for="(cart, cartIndex) in filteredCarts" :key="cartIndex" class="card mb-3 shadow">
            <div class="card-body">
              <!-- <div v-for="(sach, sachIndex) in cart.sach" :key="sachIndex"> -->
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <div>
                      <!-- Hiển thị hình ảnh -->
                      <img :src="cart.products.image" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                    </div>
                    <div class="ms-3">
                      <!-- Hiển thị tên sách -->
                      <h5>{{ cart.products.name }}</h5>
                      <!-- Hiển thị giá -->
                      <p class="small mb-0 text-danger ">Giá: {{ formatNumber(cart.products.price) }} VND</p>
                      <!-- Hiển thị số lượng -->
                      <p class="small mb-0 mr-2">Số lượng:</p>
                      <input type="number" min="1" v-model="cart.products.quantity" @change="updateQuantity(cart._id, cart.products.quantity)">
                      <!-- Hiển thị số lượng -->
                      <p class="small mb-0">Tổng tiền: {{ formatNumber(cart.products.price* cart.products.quantity * 1000) }} VND</p>

                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <!-- Nút xóa sách khỏi giỏ hàng -->
                    <button @click="deleteCart(cart._id)" style="color: red;"><i class="fas fa-trash-alt"></i></button>
                  </div>
                </div>
              <!-- </div> -->
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <div class="me-auto mt-2">
              <!-- Nút tiếp tục mua sắm -->
              <button type="button" class="btn btn-primary">Tiếp tục mua sắm</button>
            </div>
            <div class="">
              <!-- Nút tiến hành đặt hàng -->
              <button type="submit" class="btn btn-success m-2" @click="addOrder" >Tiến hành đặt hàng</button>
              <!-- Nút thanh toán qua VNPAY -->
              <button type="button" class="btn btn-warning m-2">Thanh toán qua VNPAY</button>
            </div>
          </div>
        </div>
        <div class="col-lg-5  rounded-1 shadow mt-3 text-dark bg-light" style=" font-size: 20px;">
          <h5 class="mt-3 text-center">Thông tin khách hàng</h5>
          <div clas="mt-3">
            <thongtin></thongtin>
            <p class="text-danger">Tổng tiền:  {{ formatNumber(total) }} VND</p>

                    <!-- <p>Giảm giá: </p>
                    <p>Phí vận chuyển:</p> -->
                    <!-- <p>Total: {{ formatNumber(total) }}</p> -->


                </div>
        </div>
      </div>
    </div>
  </section>
</template>





<script>
import CartService from "@/services/cart.service";
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import Thongtin from '../components/Thongtin.vue';

export default {
  components: { Thongtin },
  component: {
    Thongtin

  },
  data() {
    return {
      carts: [],
    };
  },
  created() {
    this.retrieveCarts();
  },
  computed: {

    // Tính tổng tiền cho tất cả sản phẩm trong giỏ hàng
    total() {
    // Calculate the total price by summing individual product prices
    let total = 0;
    for (const cart of this.filteredCarts) {
      
        total += cart.products.price * cart.products.quantity;
      
    }
    return total;
  },


    filteredCarts() {
      const userStore = useUserStore();
      const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';
      return this.carts.filter((cart) => cart.userId === userId);
      
    },
    
  },
    
  methods: {


    async retrieveCarts() {
  try {
  
    this.carts = await CartService.getAll();
    console.log('Carts fetched:', this.carts);
    
  } catch (error) {
    console.log('Lỗi khi lấy giỏ hàng');
  }

    },
    formatNumber(value) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
},
        async deleteCart(id) {
        if (confirm("Bạn muốn xóa sản phẩm này không ?")) {
            try {
                // Delete the cart item from the server
                await CartService.delete(id);
                // Update the local list of carts by filtering out the deleted item
                // this.carts = this.carts.filter(cart => cart._id !== id);
            } catch (error) {
                console.log('lỗi');
                // window.alert("Đã xảy ra lỗi khi xóa sản phẩm.");
            }
        }
        this.retrieveCarts();
    },
    async deleteAll() {
  try {
    if (confirm("Bạn muốn xóa tất cả các sản phẩm khỏi giỏ hàng không ?")) {
      const userStore = useUserStore();
      const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';

      const filteredCarts = this.carts.filter((cart) => cart.userId === userId);
      
     
      // Call CartService to delete all carts for the current user
      await CartService.deleteAll(filteredCarts);
      
      
      
      // // Optionally, inform the user that all items have been deleted
      // window.alert("Tất cả các sản phẩm đã được xóa khỏi giỏ hàng.");
    }
    this.retrieveCarts();
  } catch (error) {
    console.error("Lỗi khi xóa tất cả các sản phẩm khỏi giỏ hàng:", error);
    window.alert("Đã xảy ra lỗi khi xóa tất cả các sản phẩm khỏi giỏ hàng.");
  }
},

      async updateQuantity(cartId, newQuantity) {
        if (newQuantity < 1) {
          window.alert("Số lượng sản phẩm phải lớn hơn hoặc bằng 1.");
          return;
        }

        try {
          // Update the quantity in the cart data
          const cartIndex = this.filteredCarts.findIndex(cart => cart._id === cartId);
          if (cartIndex !== -1) {
            this.filteredCarts[cartIndex].products.quantity = newQuantity;

            // Update the cart item on the server
            const updatedCart = {
              _id: cartId,
              userId: this.userId,
              products: {
                productId: this.filteredCarts[cartIndex].products.productId,
                quantity: newQuantity,
              },
            };

            await CartService.update(updatedCart);

            // Recalculate the total price
            this.total = 0;
            for (const cart of this.filteredCarts) {
              this.total += cart.products.price * cart.products.quantity;
            }
          }
        } catch (error) {
          console.log("Lỗi khi cập nhật số lượng:");
          window.alert("Đã xảy ra lỗi khi cập nhật số lượng sản phẩm.");
        }
      },


    async addOrder() {
  try {
    // Gather user information
    const userStore = useUserStore();
    const userId = userStore.userInfo ? userStore.userInfo.docgiaId : "";
    const username = userStore.userInfo ? userStore.userInfo.ten : "";
    const phone = userStore.userInfo ? userStore.userInfo.dienthoai : "";
    const address = userStore.userInfo ? userStore.userInfo.diachi : "";

    // Initialize an object to hold total order information
    const order = {
      userId,
      phone,
      username,
      address,
      products: {}, // Initialize as an empty object
      totalPrice: 0, // Initialize total price
    };

    // Iterate over filtered carts and add items to the products object
    let productIndex = 0; // Counter for product index
    for (const cart of this.filteredCarts) {
      const name = cart.products.name;
      const image = cart.products.image;
      const quantity = cart.products.quantity;
      const price = cart.products.price;

      order.products[productIndex] = { // Use productIndex as the key
        name,
        image,
        quantity,
        price,
        subtotal: quantity * price, // Calculate subtotal for each item
      };

      // Update total price
      order.totalPrice += order.products[productIndex].subtotal;

      productIndex++; // Increment product index
    }

    // Call the API to add the order (including user and order details)
    const response = await CartService.addOrder(order);

    // Check the response and show appropriate message
    if (response.success) {
      window.alert("Đặt hàng thành công!");
      // Clear the cart after successful order
      // this.carts = [];
      this.deleteAll();
    } else {
      window.alert("Đã xảy ra lỗi khi đặt hàng.");
    }
  } catch (error) {
    console.log("Lỗi khi thêm đơn hàng:", error);
    window.alert("Đã xảy ra lỗi khi đặt hàng.");
  }
},
 
// async addOrder() {
//   try {
//     // Gather user information
//     const userStore = useUserStore();
//     const userId = userStore.userInfo ? userStore.userInfo.docgiaId : "";
//     const username = userStore.userInfo ? userStore.userInfo.ten : "";
//     const phone = userStore.userInfo ? userStore.userInfo.dienthoai : "";
//     const address = userStore.userInfo ? userStore.userInfo.diachi : "";

    

//     // Initialize an array to hold all order items
//     const orderItems = [];


//     // Iterate over filtered carts and create order items
//     for (const cart of this.filteredCarts) {
//       const orderItem = {
//         productId: cart.products.productId,
//         name: cart.products.name,
//         image: cart.products.image,
//         quantity: cart.products.quantity,
//         price: cart.products.price,
        
//       };

//       // Push the order item to the orderItems array
//       orderItems.push(orderItem);
//     }
//     // Create the user object with order items as an array
//     const user = {
//       userId: userId,
//       phone: phone,
//       username: username,
//       address: address,  // Include total price
//       products: orderItems, // Array of order items
//     };
//     // // Push the order item to the orderItems array
   
//     console.log(user); 

//     // Call the API to add all order items
//     const response = await CartService.addOrder(user);

//     // Check the response and show appropriate message
//     if (response.success) {
//       window.alert("Đặt hàng thành công!");
//       // Clear the cart after successful order
//       this.carts = [];
//     } else {
//       window.alert("Đã xảy ra lỗi khi đặt hàng.");
//     }
//   } catch (error) {
//     console.log("Lỗi khi thêm đơn hàng:");
//     window.alert("Đã xảy ra lỗi khi thêm đơn hàng.");
//   }
// }





  },

      
  
};
</script>
