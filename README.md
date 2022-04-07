# marketing_api_v2

Market model version 2 build with Graphql and Typescript



#### RUN APP LOCALLY

1. clone repo
2. Create a .env file and add content as specified in .env.example
3. On terminal, run npm install
4. run npm run dev (on dev mode)
5. run npm run start (on production mode)

#### API ENDPOINT

```
BASE_URL/api
```

#### HEADERS

// This is general (required) for all requests

```js
header: {
  "token": "strings"
  "content-Type": "application/json"
}
```

#### APP ENTITIES

click on an entity to navigate to it's queries and mutations

1. <a href="#Store">Store</a>
2. <a href="#Region">Region</a>
3. <a href="#Product">Product</a>
4. <a href="#Cart">Cart</a>
5. <a href="#Order">Order</a>

#### QUERIES AND MUTATIONS

<div id="Store">

1. STORE

```js
// Logo and phone_2 are optional
mutation {
  registerStore(
    input: { storeName: "cleavestore", logo: "test.png", phone_1: "08100000000", email: "test@mail.com", category: "category 1", description: "test" }
  ) {
    id
    owner
    storeName
    phone_1
    phone_2
    email
    category
    description
    logo
    createdAt
    updatedAt
  }
}

//All input fields except storeId are option. Pass only the field you need to update
mutation {
  updateStore(
    input: {
      storeId: "103e759b-8de0-4ada-ae65-919b85162a35"
      storeName: "cleavestore 3"
      logo: "test.png"
      phone_1: "08165124558"
      email: "test@mail.com"
      category: "category 1"
      description: "test"
    }
  ) {
    id
    owner
    storeName
    phone_1
    phone_2
    email
    category
    description
    logo
    createdAt
    updatedAt
  }
}

mutation {
  deleteStore(storeId: "7400fd75-e200-41a1-a5e5-fbf8ab935635") {
    id,
    owner,
    storeName,
    phone_1,
    phone_2,
    email,
    category,
    description,
    logo,
    createdAt,
    updatedAt
  }
}
// All arguments are optional, category defaults to all, pageno defaults to 1, limit defaults to 20
query {
  getStores(category: "category 2", pageno: 1, limit: 10) {
    limit,
		currentpage,
    totalpages,
    totalstores,
    stores {
    	id,
        owner,
        storeName,
        phone_1,
        phone_2,
        email,
        category,
        description,
        logo,
        createdAt,
        updatedAt
    }
  }
}

// Therefore, this is also valid
query {
  getStores {
    limit
		currentpage,
    totalpages,
    totalstores,
    stores {
    	id,
      owner,
      storeName,
      phone_1,
      phone_2,
      email,
      category,
      description,
      logo,
      createdAt,
      updatedAt
  }
  }
}

query {
  getStore(storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee") {
	store {
      id,
      owner,
      storeName,
      phone_1,
      phone_2,
      email,
      category,
      description,
      logo,
      createdAt,
      updatedAt,
	}
    supportedRegions {
      id,
      storeId,
      region,
      deliveryFee,
      createdAt,
      updatedAt
    }
  }
  }
// Get store of the login user/owner
  query {
  ownerStore{
	store {
      id,
      owner,
      storeName,
      phone_1,
      phone_2,
      email,
      category,
      description,
      logo,
      createdAt,
      updatedAt,
	}
    supportedRegions {
      id,
      storeId,
      region,
      deliveryFee,
      createdAt,
      updatedAt
    }
  }
  }

// searchterm is required
  query {
  searchStores(searchterm: "cleavestore 3") {
      id,
      owner,
      storeName,
      phone_1,
      phone_2,
      email,
      category,
      description,
      logo,
      createdAt,
      updatedAt,
  }
  }
```

</div>

<div id="Region">

2. REGION (Support regions for specific stores)

```js
mutation {
  addRegion(input: {
    region: "lagos",
    storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee",
    deliveryFee: 3000
  }) {
    id,
    storeId,
    status,
    deliveryFee
  }
}
// only regionId is required. deliveryFee and status are optional. Send aonly what you need to update
// status = active | disabled
mutation {
  updateRegion(input: {
    regionId: "f5233f2c-faef-44ba-92f3-37bb1dff969d",
    deliveryFee: 3500,
    status: "active" // ['active', 'disabled']
  }) {
    id,
    storeId,
    status,
    deliveryFee
  }
}

query {
	getRegion(regionId: "f5233f2c-faef-44ba-92f3-37bb1dff969d") {
    id,
    storeId,
    status,
    deliveryFee
  }
}
// Only storeId is required. use the status to filter. Don't add status to get all
// status = active | disabled
query {
	getRegions(storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee", status: "active"  ) {
    id,
    storeId,
    status,
    deliveryFee
  }
}
```

</div>

<div id="Product">

3. PRODUCTS

```js
mutation {
	addProduct(input: {
    storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee",
    productName: "product two",
    price: 3000,
    weight: 0.1,
    targetAudience: ["processers", "producers"],
    mainImage: "main_image.jpg",
    images: ["imageone.jpg", "imagetwo.jpg"],
    relatedProducts:[],
    quantity: 10,
    description: "product two"
  }) {
    id,
    storeId,
    productName,
    targetAudience,
    weight,
    price,
    mainImage,
    images,
    quantity,
    description,
    createdAt,
    updatedAt
  }
}

mutation {
  updateProduct(input: {
    productId: "9a3b5cfa-fc6e-4d71-9e52-3469f133e7d8",
    relatedProducts: ["9a3b5cfa-fc6e-4d71-9e52-3469f133e7d8", "9a3b5cfa-fc6e-4d71-9e52-3469f133e7d8"],
    price: 2500
  }) {
    id,
    storeId,
    productName,
    targetAudience,
    weight,
    price,
    mainImage,
    images,
    quantity,
    description,
    relatedProducts,
    createdAt,
    updatedAt
  }
}

mutation {
  removeProduct(productId: "9a3b5cfa-fc6e-4d71-9e52-3469f133e7d8") {
    id,
    storeId,
    productName,
    targetAudience,
    weight,
    price,
    mainImage,
    images,
    quantity,
    description,
    relatedProducts,
    createdAt,
    updatedAt
  }
}
// Only storeId is required, pageno defaults to 1, limit defaults to 20
// targetAudience: recievies an array. So you may need to filter based on required criteria
query {
  getProducts(storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee", targetAudience: ["processers", "cooperative"], pageno: 1, limit: 10){
		currentpage,
    limit,
    totalpages,
    totalproducts
    products {
      id,
      storeId,
      productName,
      targetAudience,
      price,
      mainImage,
      images,
      quantity,
      description,
      createdAt,
      updatedAt
    }
  }
}

query {
  getProduct(productId: "41039da3-da59-4517-a57e-f282205aacd0"){
      id,
      storeId,
      productName,
      targetAudience,
      price,
      mainImage,
      images,
      quantity,
      related {
        id,
        storeId,
        productName,
        targetAudience,
        price,
        mainImage,
        quantity,
        description
  	 }
      description,
      createdAt,
      updatedAt
    }
}
// only search term is required
query {
  searchProduct(storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee", searchterm: "four", targetAudience: ["public", "cooperative"], pageno: 1, limit: 100){
    currentpage,
    totalpages,
    totalproducts,
    limit
    products{
          id,
        storeId,
        productName,
        targetAudience,
        price,
        mainImage,
        images,
        quantity,
        description,
        createdAt,
        updatedAt
      }
    }
}
```

</div>
<div id="Cart">

4. Cart

```js
  mutation {
    addItem(input: {
      storeId: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      productId: "ccd73618-262e-454d-b46d-f336f8b43f5d",
      quantity: 2
    }) {
      id,
      storeId,
      customerId,
      quantity
      createdAt,
      updatedAt
    }
  }

  mutation {
  updateItem(cartId: "99bba3bc-970b-4bdf-9f12-1b177ab4f436", quantity: 8) {
    id,
    storeId,
    customerId,
    quantity
    createdAt,
    updatedAt
  }
}

// if product already exist in cart for the store, customer. the quantity will be updated
mutation {
  bulkAdd(input: {
    cartdata: [
    {
      storeId: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      productId: "ccd73618-262e-454d-b46d-f336f8b43f5d",
      quantity: 2
    },
    {
      storeId: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      productId: "1219653c-45a1-448d-a851-4bbb5e7651c0",
      quantity: 2
    },
    {
      storeId: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d",
      productId: "f33c436c-5bf9-49ff-b98d-7f189f06f24e",
      quantity: 2
    }
  ]
  }) {
    id,
    storeId,
    customerId,
    quantity
    createdAt,
    updatedAt
  }
}

mutation {
  removeItem(cartId: "c0f16848-7bdd-48d0-8cda-2c975313f391") {
    id,
    storeId,
    customerId,
    quantity
    createdAt,
    updatedAt
  }
}

// storeId is optional
mutation {
  clearCart(storeId: "8a5c0a7c-e3cd-4bb7-a9c1-baf924974c3d"){
    message
  }
}

//so this is also valid
mutation {
  clearCart{
    message
  }
}

// this gives a grouping of carts by store. You can grab the storeId to get store specific cart
query {
  getcarts {
    id,
    storeId,
    storename,
    customerId,
    productsInCart
  }
}

query {
  getcart(storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee") {
    id,
    storeId,
    customerId,
    quantity,
    product {
      id,
      storeId,
      productName,
      price,
      mainImage,
      weight,
      description
    }
    createdAt,
    updatedAt
  }
}
```

</div>

<div id="Order">

5. Orders

```js
mutation {
  initiateOrder(input: { regionId: "a6f5fdeb-3bb7-4f6a-bc5d-01538fb7594b", storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee"}) {
    vat,
    deliveryFee,
    itemsCost,
    totalAmount
  }
}

mutation {
  completeOrder(input: {
    regionId: "a6f5fdeb-3bb7-4f6a-bc5d-01538fb7594b",
    storeId: "d3ec43d1-0cab-4b09-af09-ee363ca42dee"
    customerName: "cleave owhiroro",
    deliveryAddress: "test address",
    telephone: "08165124558",
    email: "owhiroroeghele@gmail.com"
  }) {
    id,
    storeId,
    customerId,
    customerName,
    telephone,
    email,
    totalAmount,
    deliveryFee,
    vat,
    status,
    deliveryStatus,
    orderDetails {
      quantity,
      product {
        id,
        storeId
        productName,
        mainImage,
        images,
        price,
        weight,
        targetAudience,
        description,
        createdAt,
      }
    }
  }
}

mutation {
  updateOrder(input: {
    orderId: "10daf095-8a9f-49c3-8282-ef2c0dfbbfac", // required
    status: "verified", // optional ['pending', 'verified', 'cancelled']
    deliveryStatus: "shipped" //optional ['pending', 'processing', 'shipped', 'delivered']
  }) {
    id,
    storeId,
    customerId,
    customerName,
    telephone,
    email,
    totalAmount,
    deliveryFee,
    vat,
    status,
    deliveryStatus,
    orderDetails {
      quantity,
      product {
        id,
        storeId
        productName,
        mainImage,
        images,
        price,
        weight,
        targetAudience,
        description,
        createdAt,

      }
    }
  }
}

mutation {
  removeOrder(orderId: "d4c028fb-68c0-4df3-8765-ec95369e2ab8") {
    id,
    storeId,
    customerId,
    customerName,
    telephone,
    email,
    totalAmount,
    deliveryFee,
    vat,
    deliveryStatus
  }
}

query {
  getOrder(orderId: "10daf095-8a9f-49c3-8282-ef2c0dfbbfac") {
    id,
    storeId,
    customerId,
    customerName,
    telephone,
    email,
    totalAmount,
    deliveryFee,
    vat,
    deliveryStatus,
    orderDetails {
      quantity,
      product {
        id,
        storeId
        productName,
        mainImage,
        images,
        price,
        weight,
        targetAudience,
        description,
        createdAt,

      }
    }
  }
}
// All arguments are optional
query {
  getOrders(customerId: "", storeId: "", pageno: 1, limit: 10) {
    currentpage,
    totalpages,
    totalorders,
    limit
    orders {
      id,
      storeId,
      customerId,
      customerName,
      telephone,
      email,
      totalAmount,
      deliveryFee,
      vat,
      deliveryStatus
    }
  }
}
```

</div>
