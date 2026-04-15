# TO DO

- state persistence (RTK)

### **FEATURES**

- Products
- Product detail
- Shopping cart
- Checkout flow
- Search and Sort
- Contact form (validated)

--

**The application allows users to:**

- Browse a list of products
- View detailed information about each product
- Search for products from the homepage
- Add and remove items from a shopping cart
- Adjust quantities and view total cost
- Complete a checkout flow
- Send a message through a validated contact form

--

## Technical requirements

**Language/Framework:**

- React or React meta-frameworks such as Next.js.
- TypeScript.
- Use TypeScript with strict type checking throughout the application.
- Define clear interfaces/types for API responses, components, and state management.
- Ensure all API calls and props use well-defined TypeScript types.
- Ensure full responsiveness across desktop, tablet, and mobile devices.
- You may use a CSS framework (e.g., Tailwind CSS, Bootstrap, or Material-UI).
- Hosting: Live demo must be deployed (e.g., Vercel, Netlify, or similar)
- Styling: You may use a CSS framework (Tailwind CSS, Material UI, Bootstrap, etc.)
- API usage: All API calls must follow the provided API documentation [API DOC](https://docs.noroff.dev/docs/v2/basic/online-shop)
- TypeScript rules: Use strict type checking and define clear types/interfaces for API data, components, and state

--

## Fetch and Display Products

- Use the API endpoint GET /online-shop to retrieve product data.

**Display each product with:**

- Image
- Title
- Price (show both original and discounted if available; apply a strike-through style to the original price).
- Rating
- If a product has a discount, display a discount sticker on the card showing the discount percentage.
- Ensure an aesthetically pleasing, user-friendly grid layout.

--

## Product Details Page

- Clicking on a product navigates to a detailed view page.
- Use GET /online-shop/<id> to fetch detailed product data.

**Display the following information:**

- Title
- Description
- Price (original and discounted)
- Product image
- Reviews (if available)
- Tags (if available)
- Include an “Add to Cart” button.

--

## Search and Sort Functionality

- Implement a search bar on the homepage that allows a user to search for items.
- A list of items that match the search should appear in a container, which a user can click on to take them to that product.

--

## Shopping Cart System

- Implement a cart state (define clear types/interfaces).
- Display the cart item count in the header.

**On the Cart Page, include:**

- Product title
- Price
- Quantity (adjustable)
- Remove item option
- Total cost calculation
- Provide a “Checkout” button.

--

## Checkout Success

- After clicking “Checkout,” navigate to a success page.
- Display a confirmation message and clear the cart state.

--

## Contact Page

- Implement a contact form with TypeScript-based validation.

**Required fields:**

- Full Name (minimum 3 characters)
- Subject (minimum 3 characters)
- Email (valid format)
- Message (minimum 10 characters)
- Display appropriate validation error messages.
