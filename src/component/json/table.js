
const table = [
  {
    "id": 1,
    "customerName": "John Doe",
    "email": "johndeo.doe@example.com",
    "phone": "123-456-7890",
    "pickupDate": "2024-12-01",
    "pickupTime": "08:30 AM",
    "vehicleType": "Truck",
    "pickupLocation": "123 Main St, City, Cityville, CA, 90001, Cityville, CA, 90001, Cityville, CA, 90001",
    "dropOffLocation": "456 Elm St, City",
    "orderDate": "2024-11-30",
    "orderTime": "05:15 PM",
    "deliveryLocations": [
      "123 Main St, Cityville, CA, 90001"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Alice Green",
        "email": "alice.green@example.com",
        "phone": "111-222-3333",
        "address": "123 Cherry St, Greenfield, CA, 90210"
      },
      {
        "stepNumber": 2,
        "userName": "Bob White",
        "email": "bob.white@example.com",
        "phone": "222-333-4444",
        "address": "456 Oak Ave, Smalltown, TX, 73311"
      },
      {
        "stepNumber": 3,
        "userName": "Carol Black",
        "email": "carol.black@example.com",
        "phone": "333-444-5555",
        "address": "123 Main St, Cityville, CA, 90001"
      }
    ]
  },
  {
    "id": 2,
    "customerName": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "234-567-8901",
    "pickupDate": "2024-12-02",
    "pickupTime": "09:00 AM",
    "vehicleType": "Van",
    "pickupLocation": "789 Oak St, Townsville",
    "dropOffLocation": "321 Pine St, Cityville",
    "orderDate": "2024-12-01",
    "orderTime": "06:45 PM",
    "deliveryLocations": [
      "789 Oak St, Townsville, TX, 73301"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "David Brown",
        "email": "david.brown@example.com",
        "phone": "444-555-6666",
        "address": "123 Palm St, Beachtown, FL, 33001"
      },
      {
        "stepNumber": 2,
        "userName": "Emma White",
        "email": "emma.white@example.com",
        "phone": "555-666-7777",
        "address": "456 Willow Rd, Forestville, CA, 90220"
      },
      {
        "stepNumber": 3,
        "userName": "Frank Gray",
        "email": "frank.gray@example.com",
        "phone": "666-777-8888",
        "address": "789 Oak St, Townsville, TX, 73301"
      }
    ]
  },
  {
    "id": 3,
    "customerName": "Mark Brown",
    "email": "mark.brown@example.com",
    "phone": "345-678-9012",
    "pickupDate": "2024-12-03",
    "pickupTime": "10:30 AM",
    "vehicleType": "Truck",
    "pickupLocation": "234 Maple St, City",
    "dropOffLocation": "567 Birch St, City",
    "orderDate": "2024-12-02",
    "orderTime": "07:00 PM",
    "deliveryLocations": [
      "234 Maple St, City, NY, 10001"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Grace Miller",
        "email": "grace.miller@example.com",
        "phone": "777-888-9999",
        "address": "321 Cedar St, Hillside, TX, 73322"
      },
      {
        "stepNumber": 2,
        "userName": "Henry Scott",
        "email": "henry.scott@example.com",
        "phone": "888-999-0000",
        "address": "654 Maple St, Valleytown, CA, 90222"
      },
      {
        "stepNumber": 3,
        "userName": "Ivy Black",
        "email": "ivy.black@example.com",
        "phone": "999-000-1111",
        "address": "234 Maple St, City, NY, 10001"
      }
    ]
  },
  {
    "id": 4,
    "customerName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "pickupDate": "2024-12-01",
    "pickupTime": "08:30 AM",
    "vehicleType": "Truck",
    "pickupLocation": "123 Main St, City",
    "dropOffLocation": "456 Elm St, City",
    "orderDate": "2024-11-30",
    "orderTime": "05:15 PM",
    "deliveryLocations": [
      "123 Main St, Cityville, CA, 90001"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Alice Green",
        "email": "alice.green@example.com",
        "phone": "111-222-3333",
        "address": "123 Cherry St, Greenfield, CA, 90210"
      },
      {
        "stepNumber": 2,
        "userName": "Bob White",
        "email": "bob.white@example.com",
        "phone": "222-333-4444",
        "address": "456 Oak Ave, Smalltown, TX, 73311"
      },
      {
        "stepNumber": 3,
        "userName": "Carol Black",
        "email": "carol.black@example.com",
        "phone": "333-444-5555",
        "address": "123 Main St, Cityville, CA, 90001"
      }
    ]
  },
  {
    "id": 5,
    "customerName": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "234-567-8901",
    "pickupDate": "2024-12-02",
    "pickupTime": "09:00 AM",
    "vehicleType": "Van",
    "pickupLocation": "789 Oak St, Townsville",
    "dropOffLocation": "321 Pine St, Cityville",
    "orderDate": "2024-12-01",
    "orderTime": "06:45 PM",
    "deliveryLocations": [
      "789 Oak St, Townsville, TX, 73301"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "David Brown",
        "email": "david.brown@example.com",
        "phone": "444-555-6666",
        "address": "123 Palm St, Beachtown, FL, 33001"
      },
      {
        "stepNumber": 2,
        "userName": "Emma White",
        "email": "emma.white@example.com",
        "phone": "555-666-7777",
        "address": "456 Willow Rd, Forestville, CA, 90220"
      },
      {
        "stepNumber": 3,
        "userName": "Frank Gray",
        "email": "frank.gray@example.com",
        "phone": "666-777-8888",
        "address": "789 Oak St, Townsville, TX, 73301"
      }
    ]
  },
  {
    "id": 6,
    "customerName": "Mark Brown",
    "email": "mark.brown@example.com",
    "phone": "345-678-9012",
    "pickupDate": "2024-12-03",
    "pickupTime": "10:30 AM",
    "vehicleType": "Truck",
    "pickupLocation": "234 Maple St, City",
    "dropOffLocation": "567 Birch St, City",
    "orderDate": "2024-12-02",
    "orderTime": "07:00 PM",
    "deliveryLocations": [
      "234 Maple St, City, NY, 10001"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Grace Miller",
        "email": "grace.miller@example.com",
        "phone": "777-888-9999",
        "address": "321 Cedar St, Hillside, TX, 73322"
      },
      {
        "stepNumber": 2,
        "userName": "Henry Scott",
        "email": "henry.scott@example.com",
        "phone": "888-999-0000",
        "address": "654 Maple St, Valleytown, CA, 90222"
      },
      {
        "stepNumber": 3,
        "userName": "Ivy Black",
        "email": "ivy.black@example.com",
        "phone": "999-000-1111",
        "address": "234 Maple St, City, NY, 10001"
      }
    ]
  },
  {
    "id": 7,
    "customerName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "pickupDate": "2024-12-01",
    "pickupTime": "08:30 AM",
    "vehicleType": "Truck",
    "pickupLocation": "123 Main St, City",
    "dropOffLocation": "456 Elm St, City",
    "orderDate": "2024-11-30",
    "orderTime": "05:15 PM",
    "deliveryLocations": [
      "123 Main St, Cityville, CA, 90001"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Alice Green",
        "email": "alice.green@example.com",
        "phone": "111-222-3333",
        "address": "123 Cherry St, Greenfield, CA, 90210"
      },
      {
        "stepNumber": 2,
        "userName": "Bob White",
        "email": "bob.white@example.com",
        "phone": "222-333-4444",
        "address": "456 Oak Ave, Smalltown, TX, 73311"
      },
      {
        "stepNumber": 3,
        "userName": "Carol Black",
        "email": "carol.black@example.com",
        "phone": "333-444-5555",
        "address": "123 Main St, Cityville, CA, 90001"
      }
    ]
  },
  {
    "id": 8,
    "customerName": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "234-567-8901",
    "pickupDate": "2024-12-02",
    "pickupTime": "09:00 AM",
    "vehicleType": "Van",
    "pickupLocation": "789 Oak St, Townsville",
    "dropOffLocation": "321 Pine St, Cityville",
    "orderDate": "2024-12-01",
    "orderTime": "06:45 PM",
    "deliveryLocations": [
      "789 Oak St, Townsville, TX, 73301"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "David Brown",
        "email": "david.brown@example.com",
        "phone": "444-555-6666",
        "address": "123 Palm St, Beachtown, FL, 33001"
      },
      {
        "stepNumber": 2,
        "userName": "Emma White",
        "email": "emma.white@example.com",
        "phone": "555-666-7777",
        "address": "456 Willow Rd, Forestville, CA, 90220"
      },
      {
        "stepNumber": 3,
        "userName": "Frank Gray",
        "email": "frank.gray@example.com",
        "phone": "666-777-8888",
        "address": "789 Oak St, Townsville, TX, 73301"
      }
    ]
  },
  {
    "id": 9,
    "customerName": "Mark Brown",
    "email": "mark.brown@example.com",
    "phone": "345-678-9012",
    "pickupDate": "2024-12-03",
    "pickupTime": "10:30 AM",
    "vehicleType": "Truck",
    "pickupLocation": "234 Maple St, City",
    "dropOffLocation": "567 Birch St, City",
    "orderDate": "2024-12-02",
    "orderTime": "07:00 PM",
    "deliveryLocations": [
      "234 Maple St, City, NY, 10001"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Grace Miller",
        "email": "grace.miller@example.com",
        "phone": "777-888-9999",
        "address": "321 Cedar St, Hillside, TX, 73322"
      },
      {
        "stepNumber": 2,
        "userName": "Henry Scott",
        "email": "henry.scott@example.com",
        "phone": "888-999-0000",
        "address": "654 Maple St, Valleytown, CA, 90222"
      },
      {
        "stepNumber": 3,
        "userName": "Ivy Black",
        "email": "ivy.black@example.com",
        "phone": "999-000-1111",
        "address": "234 Maple St, City, NY, 10001"
      }
    ]
  },
  {
    "id": 10,
    "customerName": "Alice Cooper",
    "email": "alice.cooper@example.com",
    "phone": "456-789-0123",
    "pickupDate": "2024-12-04",
    "pickupTime": "11:00 AM",
    "vehicleType": "SUV",
    "pickupLocation": "678 Birch St, Smalltown",
    "dropOffLocation": "789 Oak St, Cityville",
    "orderDate": "2024-12-03",
    "orderTime": "08:00 PM",
    "deliveryLocations": [
      "678 Birch St, Smalltown, TX, 73321"
    ],
    "steps": [
      {
        "stepNumber": 1,
        "userName": "Laura King",
        "email": "laura.king@example.com",
        "phone": "888-111-2222",
        "address": "456 Pine St, Bigcity, NY, 10011"
      },
      {
        "stepNumber": 2,
        "userName": "Oliver Green",
        "email": "oliver.green@example.com",
        "phone": "999-222-3333",
        "address": "789 Maple St, Forestville, CA, 90230"
      },
      {
        "stepNumber": 3,
        "userName": "Paula Brown",
        "email": "paula.brown@example.com",
        "phone": "000-333-4444",
        "address": "123 Birch St, Townsville, TX, 73331"
      }
    ]
  }
];

export default table;