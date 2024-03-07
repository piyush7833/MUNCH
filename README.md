# M.U.N.C.H. (Mobile Utility for Nourishing Campus Hunger)

MUNCH: A pioneering web app tailored for college students, MUNCH redefines campus dining. Seamlessly order delicious meals from your hostel, customize your preferences, and enjoy hassle-free transactions. Real-time tracking, dietary accommodations, and record maintenance ensure a delightful experience. Explore the future of food convenience!

## Deployed Link

https://munchh.vercel.app/

## Features

1. **Dual Interfaces**: M.U.N.C.H. provides separate interfaces for consumers and shop owners, accessible through the profile page and auth page.

### Seller Side

2. **Shop Management**: ShopOwners can easily add shop, including images, description, slug(unique identifier) etc. which can be edited and deleted further.

2. **Product Management**: ShopOwners can easily add products, including images, description, type, product options (e.g. small, medium, large) etc. which can be edited and deleted further.

3. **Order Management**: Sellers have access to a dashboard displaying order requests, including order location coordinates on a map.

4. **Analytics**: ShopOwners can browse through analytics exclusively from them like best selling product by quantity and value, product sales graph by value and by quantity, shop sales graph by value and quantity, best seller product of a shop and all shops by value and quantity.

### Consumer Side

5. **User-Friendly Consumer Interface**: Consumers can browse offer, featured products, shops on homepage and users can also browse through all products, shops and apply filter and search there.

6. **Detailed Product Dashboard**: Product details, including product type, product option, are displayed prominently. Users can add products to their cart directly from the dashboard.

7. **Review System**: Users can leave reviews for products, enhancing transparency and trust after ordering the product from orders page.

8. **Contact Form**: A contact form allows users to inquire about products, shops directly, with answered queries becoming part of the FAQ section.

9. **Dynamic Cart Functionality**: Users can manage product quantities in the cart, with limitations that a person can order from only one shop at once.

10. **Seamless Checkout**: The checkout process allows users to review orders, including delivery charges, select delivery locations, and place orders securely.

11. **Analytics**: Best selling product over all the products and particular category or food e.g.(veg, biryani) to get best out of money you spent.

## Technologies Used

- Docker
- Prisma
- PostresSql
- NodeJS
- ExpressJS
- NextJS
- Zustand
- Tailwind CSS
- Recharts (for charts and graphs)
- Firebase (for image storage)
- Leaflet (for map)
- Other supporting technologies

## Installation

To run M.U.N.C.H. locally, ensure you have NodeJS and Docker installed. Follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd munch
    ```
2. Prerequisites

- Docker
- Node.js
- npm or yarn

3. **Project Setup**:
    - Create a `.env` file in the root directory of the Frontend folder.
    - Add the following environment variables to the `.env` file:
        ```bash

        BASEEURL :- "http://localhost:3000",
        JWT :- "Your JWTS secret key"

        <!-- Database setup -->
        DATABASE_URL:- " Your PostgresSql database url",
        POSTRGRES_DB :- "Your PostgresSql database name",
        POSTRGRES_USER :- "Your PostgresSql database user",
        POSTRGRES_PASSWORD :- "Your PostgresSql database password",

        <!-- Email setup -->
        HOST:- "Your email host",
        PORT:- "Your email port",
        SERVICE:- "Your email service",
        USER:- "Your email user",
        PASS:- "Your email password",

        <!-- Firebase setup -->
        SERVER_KEY :- "Your firebase server key",

        <!-- Razorpay Setup -->
        RAZORPAY_KEY_ID :- "Your razorpay key id (test key)",
        RAZORPAY_KEY_SECRET :- "Your razorpaye key secret (test key)"
        ```



    - To run app :-
        ```bash
        # Install dependencies
        npm install
        # Run the docker
        cd src
        cd docker
        # Set up the database
        npx prisma migrate dev
        docker-compose up -d
        # Run the app
        npm run dev
        ```

By following these steps, you'll have the M.U.N.C.H. application running locally on your machine. Adjust configurations as needed for your development environment.

## Contribution

M.U.N.C.H. welcomes contributions from the community. Feel free to open issues or submit pull requests to help improve the platform.


**If you find this project helpful, we'd appreciate it if you could give it a star ⭐.**