// 建立 Vue 環境以及引入本機資料內容
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import products from '../data/products.js';

// 建立 Modal 的預設變數
let productModal = null;
let deleteProductModal = null;

createApp({
  data() {
    return {
      products,
      isCreate: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    // 更新產品列表
    updateProduct(){
      if(this.isCreate) {
        this.products.push({
          id: Date.now(),
          ...this.tempProduct,
        })
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.hide();
      } else {
        const index = this.products.findIndex((item) => item.id === this.tempProduct.id);
        this.products[index] = this.tempProduct;
        productModal.hide();
      }
    },
    // 分辨當下點擊的 button 為哪種功能的按鈕
    openModal(isCreate, item) {
      // 若點擊的為 "Create" button
      if(isCreate === 'create') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isCreate = true;
        productModal.show();
        // 若點擊的為 "Edit" button
      } else if(isCreate === 'edit') {
        this.tempProduct = { ...item };
        this.isCreate = false;
        productModal.show();
        // 若點擊的為 "Delete" button
      } else if(isCreate === 'delete') {
        this.tempProduct = { ...item };
        deleteProductModal.show()
      }
    },
    // 刪除單一產品
    deleteProduct() {
      this.products.splice(this.products.findIndex((item) => item.id === this.tempProduct.id), 1);
      deleteProductModal.hide();
    },
    // 新增圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'), {
      keyboard: false
    });
  }
}).mount('#app');