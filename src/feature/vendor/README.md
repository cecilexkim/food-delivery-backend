# Example GraphQL queries:

## Query - get nearby vendors

```
query GetNearbyVendors {
  vendors(location: { lat: 40.7128, lng: -74.0060 }, limit: 5) {
    data {
      id
      name
      cuisineType
      deliveryFee
      rating
      deliveryTime
    }
    pagination {
      total
    }
  }
}
```

## Mutation - place an order

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
