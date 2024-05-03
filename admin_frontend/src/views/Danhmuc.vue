<template>
    <div class="mt-5 container">
         <!-- Search Input -->
         <div class="col-md-10 mb-3">
            <input-search v-model="searchText" />
        </div>


        <div class="card">
            <div class="card-header">
                <h4>
                    Quản lý danh mục
                    <router-link to="/category/add" class="btn btn-primary float-end">
                        Thêm danh mục
                    </router-link>
                </h4>
            </div>
            <div class="card-body">
                <table class="table text-center ">
                    <thead class="table-dark">
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên danh mục </th>
                        <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <div v-if="displayedProducts.length === 0" class="text-center mt-3">
                        Không có danh mục đó.
                    </div>
                    <tbody v-for="(item, index) in displayedProducts
                    "       :key="item._id" class="">
                        <tr>
                        <th scope="row">{{ index+1 }}</th>
                        <td>{{ item.name }}</td>
                        <td >
                            <router-link :to="{ name: 'editProduct', params: { id: item._id } }" class="btn btn-success btn-sm">Chỉnh sửa</router-link>
                            <button type="button" class="btn btn-danger btn-sm ml-2" @click="deleteProduct(item._id)">Xóa</button>
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>

            </div>

        </div>

    </div>
 
    
</template>

<script>
import CategoryService from '@/services/category.service';
import InputSearch from '@/components/InputSearch.vue';

export default {
    components: {
        InputSearch,

    },
    data() {
        return {
            category: [],
            searchText: '',
        displayedProducts: [],
            
        };
    },
    created() {
        this.showProducts();
        
    },
    watch: {
        searchText() {
            this.displayedProducts = this.filteredProducts;
        },
    },

    computed: {
        filteredProducts() {
        const searchTerm = this.searchText.toLowerCase().trim(); // Normalize and trim search term
        if (!searchTerm) return this.category; // Return all products if search term is empty
            return this.category.filter(product => {
                return (
                    product.name.toLowerCase().includes(searchTerm)
                    // product.tacgia.toLowerCase().includes(searchTerm)
                    // Add other relevant search criteria here
                );
            });
        },

    },

    methods: {
        shortenProductName(name) {
        // You can adjust the length of the product name as needed
            const maxLength = 20; // Maximum length of the product name
            if (name.length > maxLength) {
                return name.substring(0, maxLength) + '...'; // Truncate the name if it exceeds maxLength
            }
            return name;
        },
        async showProducts() {
            try {
                this.category = await CategoryService.getAll();
                this.displayedProducts = this.category;

            } catch (error) {
                console.log(error);


            }
        },
        async deleteProduct(id) {
           
            if (confirm("Bạn muốn xóa sản phẩm này không ?")) {
                try {
                    await CategoryService.delete(id);

                    
                  
                } catch (error) {
                    console.log(error);
                }

               
            }this.showProducts();
        } 
    }
}



</script>