# Example GraphQL queries:

## Query - get nearby vendors

```
query GetNearbyVendors {
  vendors(
    input: {
      location: { latDegrees: 40.7128, lonDegrees: -74.0060 },
      radiusMeters: 2000,
      cuisineType: "Italian",
      minRating: 3.0,
      isOpenNow: true
    },
    pageInput: {
      page: 1,
      limit: 10,
      sortBy: "rating",
      sortOrder: DESC,
    },
  ) {
    data {
      id
      name
      description
      cuisineType
      rating
      deliveryFee
      deliveryTime
    }
    pagination {
      total
    }
  }
}
```

## Mutation

### Create a new Vendor

```
mutation CreateVendor {
  createVendor(input: {
    name: "Pizza Heaven",
    description: "Authentic Italian pizzas made with love",
    logo: "https://example.com/logo.jpg",
    coverImage: "https://example.com/cover.jpg",
    cuisineType: "Italian",
    deliveryFee: 3.50,
    minOrder: 10.00,
    deliveryTime: "30-45 mins",
    location: { lat: 40.7128, lng: -74.0060 },
    address: "123 Main St, New York, NY",
    openingHours: [
      { day: 0, open: "11:00", close: "22:00" },
      { day: 1, open: "11:00", close: "22:00" }
    ]
  }) {
    id
    name
  }
}
```

### Place an order

```
mutation CreateOrder {
  createOrder(input: {
    vendorId: "123",
    items: [
      {
        itemId: "456",
        quantity: 2,
        options: [
          { name: "Spice Level", choice: "Medium" }
        ]
      }
    ],
    deliveryAddressId: "789",
    paymentMethod: "card_123"
  }) {
    id
    total
    status
  }
}
```

## Subscription - track an order

```
subscription OrderStatus {
  orderStatusChanged(orderId: "123") {
    status
  }
}
```
