const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
const path = require('path')

const errorMiddleware = require("./middlewares/errors");

// Setting up config file 
//if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
dotenv.config({ path: 'backend/config/config.env' })


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//import all routes from
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);


if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

//make sure to configure middleware after routes
app.use(errorMiddleware);

module.exports = app;
/*
 create mode 100644 .gitignore
 create mode 100644 Procfile
 create mode 100644 backend/app.js
 create mode 100644 backend/config/database.js
 create mode 100644 backend/controllers/authController.js
 create mode 100644 backend/controllers/orderController.js
 create mode 100644 backend/controllers/paymentController.js
 create mode 100644 backend/controllers/productController.js
 create mode 100644 backend/middlewares/auth.js
 create mode 100644 backend/middlewares/catchAsyncErrors.js
 create mode 100644 backend/middlewares/errors.js
 create mode 100644 backend/models/order.js  
 create mode 100644 backend/models/product.js
 create mode 100644 backend/models/user.js   
 create mode 100644 backend/routes/auth.js   
 create mode 100644 backend/routes/order.js  
 create mode 100644 backend/routes/payment.js
 create mode 100644 backend/routes/product.js
 create mode 100644 backend/server.js        
 create mode 100644 backend/utils/apiFeatures.js
 create mode 100644 backend/utils/errorHandler.js
 create mode 100644 backend/utils/jwtToken.js
 create mode 100644 backend/utils/sendEmail.js
 create mode 100644 frontend/.gitignore      
 create mode 100644 frontend/README.md       
 create mode 100644 frontend/package-lock.json
 create mode 100644 frontend/package.json    
 create mode 100644 frontend/public/favicon.ico
 create mode 100644 frontend/public/images/Fresh_Mart.PNG
 create mode 100644 frontend/public/images/default_avatar.jpg
 create mode 100644 frontend/public/images/order_success.png
 create mode 100644 frontend/public/index.html
 create mode 100644 frontend/public/logo192.png
 create mode 100644 frontend/public/logo512.png
 create mode 100644 frontend/public/manifest.json
 create mode 100644 frontend/public/robots.txt
 create mode 100644 frontend/src/App.css     
 create mode 100644 frontend/src/App.js      
 create mode 100644 frontend/src/actions/cartActions.js
 create mode 100644 frontend/src/actions/orderActions.js
 create mode 100644 frontend/src/actions/productActions.js
 create mode 100644 frontend/src/actions/userActions.js
 create mode 100644 frontend/src/components/Home.js
 create mode 100644 frontend/src/components/admin/Dashboard.js
 create mode 100644 frontend/src/components/admin/NewProduct.js
 create mode 100644 frontend/src/components/admin/OrdersList.js
 create mode 100644 frontend/src/components/admin/ProcessOrder.js
 create mode 100644 frontend/src/components/admin/ProductReviews.js
 create mode 100644 frontend/src/components/admin/ProductsList.js
 create mode 100644 frontend/src/components/admin/Sidebar.js
 create mode 100644 frontend/src/components/admin/UpdateProduct.js
 create mode 100644 frontend/src/components/admin/UpdateUser.js
 create mode 100644 frontend/src/components/admin/UsersList.js
 create mode 100644 frontend/src/components/cart/Cart.js
 create mode 100644 frontend/src/components/cart/CheckoutSteps.js
 create mode 100644 frontend/src/components/cart/ConfirmOrder.js
 create mode 100644 frontend/src/components/cart/OrderSuccess.js
 create mode 100644 frontend/src/components/cart/Payment.js
 create mode 100644 frontend/src/components/cart/Shipping.js
 create mode 100644 frontend/src/components/layout/Footer.js
 create mode 100644 frontend/src/components/layout/Header.js
 create mode 100644 frontend/src/components/layout/Loader.js
 create mode 100644 frontend/src/components/layout/MetaData.js
 create mode 100644 frontend/src/components/layout/Search.js
 create mode 100644 frontend/src/components/order/ListOrders.js
 create mode 100644 frontend/src/components/order/OrderDetails.js
 create mode 100644 frontend/src/components/product/Product.js
 create mode 100644 frontend/src/components/product/ProductDetails.js
 create mode 100644 frontend/src/components/review/ListReviews.js
 create mode 100644 frontend/src/components/route/ProtectedRoute.js
 create mode 100644 frontend/src/components/user/ForgotPassword.js
 create mode 100644 frontend/src/components/user/Login.js
 create mode 100644 frontend/src/components/user/NewPassword.js
 create mode 100644 frontend/src/components/user/Profile.js
 create mode 100644 frontend/src/components/user/Register.js
 create mode 100644 frontend/src/components/user/UpdatePassword.js
 create mode 100644 frontend/src/components/user/UpdateProfile.js
 create mode 100644 frontend/src/constants/cartConstants.js
 create mode 100644 frontend/src/constants/orderConstants.js
 create mode 100644 frontend/src/constants/productConstants.js
 create mode 100644 frontend/src/constants/userConstants.js
 create mode 100644 frontend/src/index.js    
 create mode 100644 frontend/src/reducers/cartReducers.js
 create mode 100644 frontend/src/reducers/orderReducers.js
 create mode 100644 frontend/src/reducers/productReducers.js
 create mode 100644 frontend/src/reducers/userReducers.js
 create mode 100644 frontend/src/store.js    
 create mode 100644 package-lock.json        
 create mode 100644 package.json*/