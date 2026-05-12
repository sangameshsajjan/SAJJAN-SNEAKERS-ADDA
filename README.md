# Sneaker Ecommerce Website

A modern, responsive ecommerce website for browsing and purchasing sneakers. Built with vanilla HTML, CSS, and JavaScript, featuring a clean design, search functionality, pagination, cart/wishlist management, and light/dark theme support.

## Features

### Core Functionality

- **Product Catalog**: Browse a collection of sneakers with images, descriptions, and pricing
- **Search**: Real-time search through product names, brands, and descriptions
- **Pagination**: Navigate through products with page controls and item counts
- **Shopping Cart**: Add/remove items, view cart summary, and proceed to checkout
- **Wishlist**: Save favorite items for later, move items to cart
- **Checkout**: Review order summary and simulate purchase completion

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Theme Toggle**: Switch between light and dark themes with persistence
- **Smooth Animations**: Subtle hover effects and transitions on buttons and cards
- **Toast Notifications**: Feedback messages for user actions
- **Local Storage**: Persistent cart and wishlist data across sessions

### Technical Features

- **Data-Driven**: Products loaded from JSON file with fallback data
- **Modular Code**: Separate JavaScript files for each page/functionality
- **CSS Variables**: Theme-aware styling with custom properties
- **Accessibility**: Proper ARIA attributes and semantic HTML

## Project Structure

```
SneakerEcommerce/
├── data/
│   └── db.json                    # Product data in JSON format
├── landingWebpage/               # Homepage
│   ├── index.html                # Main landing page
│   ├── index.css                 # Landing page styles
│   └── landing.js                # Product loading, search, pagination
├── AddToCart/                    # Shopping cart page
│   ├── AddToCart.html            # Cart page HTML
│   ├── AddToCart.css             # Cart page styles
│   └── AddToCart.js              # Cart management logic
├── AddToWishList/                # Wishlist page
│   ├── AddToWishList.html        # Wishlist page HTML
│   ├── AddToWishList.css         # Wishlist page styles
│   └── AddToWishList.js          # Wishlist management logic
├── BuyWebpage/                   # Checkout page
│   ├── BuyPage.html              # Checkout page HTML
│   ├── BuyPage.css               # Checkout page styles
│   └── BuyPage.js                # Checkout logic
├── theme.js                      # Theme toggle functionality
└── README.md                     # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design, CSS variables, animations
- **JavaScript (ES6+)**: DOM manipulation, localStorage, fetch API
- **JSON**: Product data storage
- **Local Storage**: Client-side data persistence

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended for proper functionality)

### Installation

1. **Clone or Download** the project files to your local machine

2. **Open in Browser**
   - Navigate to the `landingWebpage` folder
   - Open `index.html` in your web browser
   - For best results, use a local server:
     - Python: `python -m http.server 8000`
     - Node.js: `npx serve .`
     - VS Code: Use Live Server extension

### Usage

1. **Browse Products**: View the product grid on the homepage
2. **Search**: Use the search bar to filter products by name or description
3. **Navigate Pages**: Use pagination controls to browse through products
4. **Add to Cart/Wishlist**: Click buttons on product cards
5. **View Cart/Wishlist**: Use navigation links in the header
6. **Checkout**: Review cart and complete purchase
7. **Toggle Theme**: Use the theme button in the header

## Data Structure

The product data is stored in `data/db.json` with the following structure:

```json
{
  "sneakers": [
    {
      "id": 218099,
      "name": "Air Jordan 1 Retro High OG 'Shadow'",
      "retail_price_cents": 16000,
      "details": "Black and grey leather...",
      "main_picture_url": "https://...",
      "brand_name": "Air Jordan",
      "color": "Black",
      "category": "basketball"
    }
  ]
}
```

## Customization

### Adding New Products

1. Edit `data/db.json` to add new sneaker objects
2. Ensure all required fields are present
3. Images should be valid URLs or local paths

### Styling Changes

- Modify CSS variables in `:root` and `body.dark` for theme colors
- Adjust hover effects in individual CSS files
- Update breakpoints in media queries for responsive design

### Functionality Extensions

- Add new pages by following the existing folder structure
- Extend localStorage keys for additional features
- Modify JavaScript functions for new interactions

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Development Notes

- **Fallback Data**: If `db.json` fails to load, the app uses hardcoded fallback products
- **Error Handling**: Graceful degradation for missing images and data
- **Performance**: Efficient DOM manipulation and minimal re-renders
- **Accessibility**: Focus management and keyboard navigation support

## Future Enhancements

- User authentication and accounts
- Product reviews and ratings
- Advanced filtering (by brand, price, color)
- Payment integration
- Order history
- Admin panel for product management
- Progressive Web App features

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ for sneaker enthusiasts
