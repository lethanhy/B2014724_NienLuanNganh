<template>
    <div class=" bg-light">
      <div class="row">
        <div class="col-lg-4 mt-3 bg-white m-auto rounded">
          <h2 class="text-center pt-3 mb-3">Thêm sản phẩm</h2>
          <form @submit.prevent="addUser(docgia)">
            <div class="mb-3">
              <label class="form-label">Họ lót</label>
              <input type="text" class="form-control"
                v-model="docgia.holot">
            </div>
            <div class="mb-3">
              <label class="form-label">Tên độc giả</label>
              <input type="text" class="form-control"
                v-model="docgia.ten">
            </div>
            <div class="mb-3">
              <label class="form-label">Ngày sinh</label>
              <input type="date" class="form-control"
                v-model="docgia.ngaysinh">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Phái</label>
              <input type="text" class="form-control"
                v-model="docgia.phai">
               
            </div>
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
                v-model="docgia.diachi">
            </div>
           
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="number" class="form-control"
                    v-model="docgia.dienthoai">
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input type="password" class="form-control"
                    v-model="docgia.password">
            </div>
            <div class="d-flex">
                <router-link to="/docgia" class="btn btn-primary center text-white">Thoát</router-link>

                <button type="submit" class="btn btn-primary center ml-3">Tạo</button>
              <!-- <p class="text-center">
                Already Have an Account? <router-link to="/users/login">Login</router-link>
              </p> -->
            </div>
          </form>
          <p></p>
        </div>
      </div>
    </div>
   
</template>

<script>
import DocgiaService from '../services/user.service';

export default {
    data() {
        return {
        docgia: {
            holot: '',
            ten: '',
            ngaysinh: '',
            phai: '',
            diachi: '',
            dienthoai: '',
            password:'', 
        }
        };
    },
    methods: {
    async addUser(data) {
            try {
                await DocgiaService.create(data);
                alert("Độc giả đã thêm vào thành công.");
                this.message = "Sản Phẩm đã thêm vào thành công.";
                this.resetForm(); 
                 // Redirect to another page
                 this.$router.push('/docgia'); // Assuming '/sach' is the route you want to redirect to
            } catch (error) {
                console.log('lỗi');
            }
        },
        //         handleImageChange(event) {
        //   const file = event.target.files[0];
          
        //   // Check if a file was selected
        //   if (!file) {
        //     return;
        //   }

        //   // Create a FileReader to read the selected file
        //   const reader = new FileReader();

        //   // When the FileReader loads the file
        //   reader.onload = () => {
        //     const img = new Image();

        //     // When the image loads
        //     img.onload = () => {
        //       const canvas = document.createElement('canvas');
        //       const ctx = canvas.getContext('2d');

        //       // Define the maximum dimensions for the resized image
        //       const maxWidth = 800; // Adjust as needed
        //       const maxHeight = 600; // Adjust as needed

        //       // Calculate the new dimensions while maintaining aspect ratio
        //       let newWidth = img.width;
        //       let newHeight = img.height;
        //       if (newWidth > maxWidth) {
        //         newHeight *= maxWidth / newWidth;
        //         newWidth = maxWidth;
        //       }
        //       if (newHeight > maxHeight) {
        //         newWidth *= maxHeight / newHeight;
        //         newHeight = maxHeight;
        //       }

        //       // Set the canvas dimensions
        //       canvas.width = newWidth;
        //       canvas.height = newHeight;

        //       // Draw the image onto the canvas with the new dimensions
        //       ctx.drawImage(img, 0, 0, newWidth, newHeight);

        //       // Convert the canvas content to a data URL
        //       const resizedDataURL = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

        //       // Set the resized image data URL to the item.image property
        //       this.item.image = resizedDataURL;
        //     };

        //     // Set the source of the image to the file data
        //     img.src = reader.result;
        //   };

        //   // Read the selected file as a data URL
        //   reader.readAsDataURL(file);
        // },
    // handleImageChange(event) {
    //   const file = event.target.files[0];
    //   // Đọc dữ liệu của file hình ảnh và lưu vào thuộc tính image của product
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       this.item.image = reader.result;
    //     };
    //   }
    // },
    resetForm() {
      // Đặt lại giá trị của các trường trong product
      this.docgia.holot = '';
      this.docgia.ten = '';
      this.docgia.ngaysinh = '';
      this.docgia.phai = '';
      this.docgia.diachi = '';
      this.docgia.dienthoai = '';
      this.docgia.password = '';
    }
  }
}
</script>