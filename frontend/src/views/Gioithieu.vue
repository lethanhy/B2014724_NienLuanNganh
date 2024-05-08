<template>
    <div class="heading">
        <h1>About Us</h1>
        <p>Giải trí ngay trong tầm tay của bạn</p>
    </div>
    <section class="about-us">
        <img src="../assets/banner.jpg" alt="">
        <div class="content">
            <h2>Tiện ích phù hợp với nhu cầu sử dụng</h2>
            <p>Hãy để thế giới lắng nghe câu chuyện của bạn và thể hiện cá tính riêng cùng những thiết kế trang sức tuyệt mỹ từ thương hiệu Pandora.
            Thành lập từ năm 1982 tại Copenhagen (Đan Mạch), Pandora đã thiết kế nên những món trang sức mang giá trị thẩm mỹ tinh tế,
             được hoàn thiện thủ công từ chất liệu cao cấp để truyền cảm hứng cho phái đẹp tự tin thể hiện chính mình một cách sáng tạo.
             Tính bền vững là cốt lõi trong hoạt động kinh doanh của Pandora. Chúng tôi cam kết giảm thiểu tác động đến môi trường và hướng tới mục tiêu trở thành doanh nghiệp carbon trung tính vào năm 2025. 
            </p>
            <button class="read-more-btn">Xem thêm</button>
        </div>
    </section>
</template>

<style>
       .heading{
        text-align: center;
        margin-top: 50px;
        
       }
       .heading h1{
        font-size: 50px;
        color: #36455c;
        margin-bottom: 10px;
       }
       .heading p{
        font-size: 20px;
        color: #36455c;
        margin-bottom: 20px;
       }
       .about-us{
        display: flex;align-items: center;
        width: 85%;
        margin: auto;
        margin-bottom: 25px;
       }
       .about-us img{
        flex: 0 50%;
        max-width: 50%;
        height: auto;
       }
       .content{
        padding: 35px;
       }
       .content h2{
        color: #36455c;
        font-size: 24px;
        margin: 10px 0;
       }
       .content p{
        font-size: 18px;
        line-height: 1.5;
        margin: 15px 0;
       }
       .read-more-btn{
        display: inline-block;
        color: #fff;
        background-color: #0084ff;
        border: none;
        border-radius: 5px;
        padding: 12px 20px;
        font-size: 18px;
        cursor: pointer;
        transition: 0.2s ease;
       }
       .read-more-btn:hover{
        background-color: #006dd6;
       }
       @media(max-width:768px){
        .about-us{
            flex-direction: column;
        }
        .about-us img{
            flex: 0 100%;
            max-width: 100%;
        }
        .content{
            flex: 0 100%;
            max-width: 100%;
            padding: 15px;
        }
       }
    </style>