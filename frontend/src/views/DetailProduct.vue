<template>
    <div class="container mt-5 mb-5 ">
        <div class="row">
            <div class="col-lg-6   d-flex justify-content-center align-items-center">
                <img class="anh" :src="products.image" alt="">
            </div>
            <div class="col-lg-6 bg-light ">
                <div>
                    <h2>{{ products.name }}</h2>
                    <p>Danh mục sản phẩm: {{ products.category }}<br>
                        <!-- <p>Tác giả: {{ products.tacgia }}</p> -->
                    </p>
                    <p class="text-warning">Kho hàng: {{ products.quantity }} / Đã bán: 0</p>
                    <h1 class="text-danger">{{ formatNumber(products.price) }} VND</h1>

                    <p>{{ products.description }}</p>

                    <div class="d-flex">
                        <div>
                            <input class="number" type="number" name="" id="" min="1" max="10" placeholder="Số lượng" required step="1">
                        </div>
                        <!-- <select name="size" id="size">
                            <option value="small">S</option>
                            <option value="medium">M</option>
                            <option value="large">L</option>
                        </select> -->
                        
                        
                    </div>

                    <button type="button" class="btn btn-success mt-3" @click="addToCart(products)"  >Thêm vào giỏ hàng</button>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import ProductService from '@/services/product.service';
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';
export default {
  props: {
    products: { type: Array, default: [] },

  },
  setup() {
    const userStore = useUserStore();
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const userInfo = computed(() => userStore.userInfo);
    const username = computed(() => userInfo.value ? userInfo.value.ten : '');
    const Id = computed(() => userInfo.value ? userInfo.value.docgiaId : '');

    // const shortenProductName = (name) => {
    //   const maxLength = 40;
    //   if (name.length > maxLength) {
    //     return name.substring(0, maxLength) + '...';
    //   }
    //   return name;
    // };
    

    const addToCart = async (products) => {
      if (!isLoggedIn.value) {
        // Redirect or show login modal if not logged in
        window.alert('Vui lòng đăng nhập để mua hàng!!!');
        return;
      }

      // Logic for adding to cart
      try {
            // const userId = "1234800";
            const cartItem = {
              userId: Id.value,
              productId: products._id,
              name:products.name,
              image: products.image,
              quantity: 1,
              price: products.price,
            };
            const response = await ProductService.addCart(cartItem);

            console.log(cartItem)
            
            if(response.success) {
              // this.$emit('productAddedToCart', cartItem); // Gửi sự kiện lên component cha để cập nhật giỏ hàng
              // // this.cart.push(cartItem);
              // this.message = 'Sản phẩm được thêm vào giỏ hàng';
              window.alert('Sản phẩm được thêm vào giỏ hàng');
            } else {
              window.alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
            }
            
          } catch (error) {
            console.log('Error adding product to cart:');
            window.alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
            // this.message = 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng';
          }

    };

    return { isLoggedIn, username, addToCart };
  },
  data() {
        return {
            products: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {

        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.products = await ProductService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
        formatNumber(value) {
            const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            });
                return formatter.format(value);
        }
    }
};


</script>

<!-- <script>
import ProductService from '@/services/product.service';

export default {
    data() {
        return {
            products: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {
        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.products = await ProductService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
        formatNumber(value) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'decimal',
                minimumFractionDigits: 0,
            });
            return formatter.format(value);
        },
        // addToCart() {
        //     // Thực hiện logic thêm sản phẩm vào giỏ hàng ở đây
        //     console.log("Thêm sản phẩm vào giỏ hàng");
        //     console.log("ID sản phẩm:", this.sach.id);
        // },
    },
    filters: {
        
    },
}
</script> -->



<style scoped>

.d-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.number {
    width: 100px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    width: 120px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
/* CSS hiển thị ảnh */
.anh {
  max-width: 100%; /* Ảnh không vượt quá chiều rộng của cột */
  height: 400px; /* Duy trì tỷ lệ khung hình */
}

</style>