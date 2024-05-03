<template>
    <h4 class="pt-3">Product News</h4>
    <hr class="mb-4">
    <div id="appp">
        <div class="Product"
                v-for="(item, index ) in products"
                :key="item._id"
                
        >
            <img src="../assets/product1.jpg" alt="Product Image">
            <router-link :to="{name: 'showProduct', params:{id: item._id}} ">
            <h3>{{ item.tensach }}</h3>
            </router-link>
            <p>{{ item.soquyen }}</p>
            <button class="btn btn-dark" @click="addToCart(item)">Thêm vào giỏ hàng</button>
        </div>
        <!-- <div class="product">
            <img src="../assets/product1.jpg" alt="Product Image">
            <h3>Nhẫn Vàng</h3>
            <p>350.000Đ</p>
            <button class="btn btn-dark">Thêm vào giỏ hàng</button>
        </div>
        <div class="product">
            <img src="../assets/product1.jpg" alt="Product Image">
            <h3>Nhẫn Vàng</h3>
            <p>350.000Đ</p>
            <button class="btn btn-dark">Thêm vào giỏ hàng</button>
        </div>
        <div class="product">
            <img src="../assets/product1.jpg" alt="Product Image">
            <h3>Nhẫn</h3>
            <p>500.000đ</p>
            <button class="btn btn-dark">Thêm vào giỏ hàng</button>
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        sach: { type: Array, default: [] },
       
       
        
    },
   
    methods: {
        addToCart(sach) {
            
        }
        // updateActiveIndex(index) {
        //     this.$emit("update:activeIndex", index);
        // }
    }
};

</script>

<style>
#appp {
  display: flex;
  flex-wrap: wrap;
}
.Product {
  width: 25%; /* Chia cột 25% cho mỗi sản phẩm */
  padding: 10px;
  box-sizing: border-box;
}
.Product img {
  max-width: 80%;
  height: auto;
}
</style>