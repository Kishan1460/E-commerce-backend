#  Ecommerce Website — Backend (Module 4)

A complete **Node.js + Express + MongoDB** backend for the Ecommerce Website project.  
Includes REST APIs for products, cart, and favourites, with Swagger docs, Winston logging, and Jest tests.

---

##  Project Structure

```
ecommerce-backend/
├── src/
│   ├── index.js                 # Entry point: DB connect + server start
│   ├── app.js                   # Express app: middleware + routes only
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   ├── logger.js            # Winston logger setup
│   │   └── swagger.js           # Swagger config
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── Favourite.js         # Favourite schema
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── favouriteController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── favouriteRoutes.js
│   └── middleware/
│       └── errorMiddleware.js   # 404 + global error handler
├── scripts/
│   └── seed.js                  # Seed sample products into DB
├── tests/
│   └── api.test.js              # Jest + Supertest API tests
├── .env.example
├── .gitignore
├── render.yaml                  # Render.com deployment config
└── package.json
```

---

##  Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/Kishan1460/E-commerce-backend
cd ecommerce-backend
npm install
```

### 2. Configure Environment

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce
NODE_ENV=development
```

### 3. Seed Sample Data
```bash
node scripts/seed.js
```

### 4. Start Development Server
```bash
npm run dev     # with nodemon (auto-reload)
npm start       # production mode
```

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:category` | Get products by category (e.g. `/products/electronics`) |
| POST | `/api/cart` | Add product to cart |
| GET | `/cart` | Get all cart items |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/favorites` | Add product to favourites |
| GET | `/favorites` | Get all favourite items |
| DELETE | `/api/favorites/:id` | Remove item from favourites |
| GET | `/api-docs` |  Swagger UI Documentation |

### Example: Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{ "productId": "<product_id_from_db>" }'
```

**Response:**
```json
{
  "success": true,
  "message": "\"Wireless Headphones\" added to cart!",
  "data": { "productId": "...", "name": "Wireless Headphones", "price": 2999, "quantity": 1 }
}
```

---

##  API Documentation (Swagger)

Visit **`http://localhost:3000/api-docs`** after starting the server.

The Swagger UI provides interactive documentation for all endpoints — you can test requests directly from the browser.

---

##  Testing

```bash
npm test
```

Tests use **Jest + Supertest** and cover:
- GET all products
- GET products by category (valid + invalid)
- POST to cart (success, missing productId, invalid productId)
- GET cart items
- POST to favourites (success, duplicate, missing productId)
- GET favourites

---

##  Logging

Uses **Winston** for structured logging with:
- `logs/error.log` — error-level logs only
- `logs/combined.log` — all log levels
- Console output with colour-coding

Log levels: `error`, `warn`, `info`, `http`, `debug`

---

##  Deployment

### Using Render.com
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set environment variables in the Render dashboard:
   - `MONGODB_URI` = your Atlas connection string
   - `NODE_ENV` = production
5. Render auto-deploys on every GitHub push 


---

##  Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with nodemon (hot-reload) |
| `npm test` | Run Jest test suite |
| `node scripts/seed.js` | Seed 12 sample products |

---

##  Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Logging**: Winston + Morgan
- **API Docs**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Testing**: Jest + Supertest
- **Hosting**: Render
