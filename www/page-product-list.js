class PageProductList extends HTMLElement {
  files = []
  connectedCallback() {
    this.innerHTML = /* html */ `
<style>
page-product-list ion-list img {
  width: 64px;
  height: 64px;
}
</style>
<ion-header>
  <ion-toolbar>
    <ion-title>Products</ion-title>
    <ion-buttons slot="end">
      <ion-button id="navbar-cart">
        <ion-icon name="cart"></ion-icon>
      </ion-button>
      <ion-popover trigger="navbar-cart" trigger-action="hover">
        <ion-content class="ion-padding">
          This can link to another page by setting "href" on ion-button.
        </ion-content>
      </ion-popover>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
  <div class="loading-container">
    <p class="ion-text-center">
      <ion-note>Loading product list ...</ion-note>
    </p>
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
  </div>
  <ion-list class="product-list">
    <ion-item class="product-item" href="/products/1">
      <img slot="start" src="https://picsum.photos/seed/picsum/64">
      <ion-label>Apple</ion-label>
    </ion-item>
  </ion-list>
  <div class='preview-image-container'></div>
  <div>
    <ion-button class='upload-button'>
      <ion-icon name='cloud-upload'></ion-icon>
    </ion-button>
  </div>
  <ion-fab horizontal='end' vertical='bottom'>
    <ion-fab-button class='pick-image-button'>
      <ion-icon name="images-outline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</ion-content>
`
    this.loadingContainer = this.querySelector('.loading-container')
    this.productList = this.querySelector('.product-list')
    this.productItem = this.querySelector('.product-item')
    this.previewImageContainer = this.querySelector('.preview-image-container')
    this.querySelector('.pick-image-button').addEventListener('click', () =>
      this.pickImage(),
    )
    this.querySelector('.upload-button').addEventListener('click', () =>
      this.upload(),
    )
    this.loadProductList()
  }
  pickImage() {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = () => {
      console.log(input.files)
      for (let file of input.files) {
        this.files.push(file)
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        let figcaption = document.createElement('figcaption')
        figcaption.textContent = file.name
        let reader = new FileReader()
        reader.onload = () => {
          img.src = reader.result
        }
        reader.readAsDataURL(file)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        figure.addEventListener('click', () => {
          figure.remove()
          let index = this.files.indexOf(file)
          this.files.splice(index, 1)
        })
        this.previewImageContainer.appendChild(figure)
      }
    }
    input.click()
  }
  upload() {
    let formData = new FormData()
    for (let file of this.files) {
      formData.append('image', file)
    }
    fetch('/upload', { method: 'POST', body: formData })
  }
  loadProductList() {
    this.loadingContainer.hidden = false
    this.productList.hidden = true
    this.productList.textContent = ''
    setTimeout(() => {
      let products = samples.products
      this.loadingContainer.hidden = true
      this.productList.hidden = false
      this.productList.textContent = ''
      for (let product of products) {
        let ionItem = this.productItem.cloneNode(true)
        ionItem.querySelector('ion-label').textContent = product.name
        ionItem.querySelector('img').src = product.image
        ionItem.href = '/products/' + product.id
        this.productList.appendChild(ionItem)
      }
    }, 500)
  }
}
customElements.define('page-product-list', PageProductList)
