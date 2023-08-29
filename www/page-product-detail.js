class PageProductDetail extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    let id = +location.hash.split('/').pop()
    this.product_id = id
    this.innerHTML = /* html */ `
<style>
page-product-detail .product-cover-image {
  width: 250px;
  height: 250px;
}
</style>
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button default-href="/products"></ion-back-button>
    </ion-buttons>
    <ion-title>Product Detail</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
  <div class="loadingContainer">
    <p class="ion-text-center">
      <ion-note>Loading product details ...</ion-note>
    </p>
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
  </div>
  <div class="product">
    <div class="ion-text-center">
      <img class="product-cover-image" src="https://picsum.photos/seed/picsum/250">
      <h2 class="product-name">Apple</h2>
    </div>
    <p class="product-desc">lorem ipsum d</p>
  </div>
</ion-content>
`
    this.loadingContainer = this.querySelector('.loadingContainer')
    this.product = this.querySelector('.product')
    this.product.hidden = true
    this.loadProductDetail()
  }

  loadProductDetail() {
    setTimeout(() => {
      this.loadingContainer.hidden = true
      let product = samples.products.find(
        product => product.id === this.product_id,
      )
      this.product.hidden = false
      this.product.querySelector('.product-name').textContent = product.name
      this.product.querySelector('.product-desc').textContent = product.desc
      this.product.querySelector('.product-cover-image').src =
        product.cover_image
    }, 500)
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter')
  }
}
customElements.define('page-product-detail', PageProductDetail)
