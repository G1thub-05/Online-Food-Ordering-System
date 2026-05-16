<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=280&color=0:0B0F19,25:101827,50:0F172A,75:111827,100:0B1120&text=🍔%20Foodies&fontSize=75&fontColor=39FF14&animation=fadeIn&fontAlignY=38&desc=Modern%20Online%20Food%20Ordering%20System&descAlignY=58&descAlign=50" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&pause=1000&color=39FF14&center=true&vCenter=true&width=1000&lines=Modern+Food+Ordering+Platform;Client+Panel+%7C+Admin+Panel;React+%2B+Spring+Boot+%2B+MongoDB;Secure+Razorpay+Payments;Responsive+Modern+UI" alt="Typing SVG" />

<br/>
<br/>

<p align="center">
A modern full-stack food ordering platform with user & admin panels,
secure payments, cloud image storage, and real-time order management.
</p>

<br/>

<img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk&logoColor=white" />
<img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />

<br/>
<br/>

<table width="100%">
<tr>
<td width="50%" align="center">

## 🛒 Client Panel

### Order your favorite food online 🍕

<a href="https://client-online-food-ordering-system.vercel.app">
<img src="https://img.shields.io/badge/🌐_Live_Demo-39FF14?style=for-the-badge" />
</a>

<br/>
<br/>

```bash
https://client-online-food-ordering-system.vercel.app
```

</td>

<td width="50%" align="center">

## ⚙️ Admin Panel

### Manage foods, orders & users 👨‍💼

<a href="https://admin-online-food-ordering-system.vercel.app">
<img src="https://img.shields.io/badge/🌐_Live_Demo-8A2BE2?style=for-the-badge" />
</a>

<br/>
<br/>

```bash
https://admin-online-food-ordering-system.vercel.app
```

</td>
</tr>
</table>

<br/>

</div>

---

# 🚀 About The Project

Foodies is a modern full-stack food ordering application where users can browse,
order food online and make secure payments.
Admins can manage foods, orders and users through a dedicated admin dashboard.

---

# ✨ Core Features

<table width="100%">
<tr>
<td align="center">

## 🍽️ Browse Foods

Explore delicious foods with modern responsive UI.

</td>

<td align="center">

## 💳 Secure Payments

Integrated Razorpay payment gateway support.

</td>

<td align="center">

## 📦 Order Tracking

Track orders with real-time status updates.

</td>
</tr>

<tr>
<td align="center">

## ☁️ Cloud Storage

Food image upload using Cloudinary / AWS S3.

</td>

<td align="center">

## 🛠️ Admin Dashboard

Manage foods, orders and application data.

</td>

<td align="center">

## 🔐 Authentication

JWT Authentication with OTP verification.

</td>
</tr>
</table>

---

# 🧠 Tech Stack

<table width="100%">
<tr>
<td width="25%">

## 🖥️ Backend

* Java 21
* Spring Boot
* Spring Security
* Maven
* MongoDB
* JWT

</td>

<td width="25%">

## 🎨 Client Frontend

* React
* Vite
* Axios
* React Router
* CSS

</td>

<td width="25%">

## ⚙️ Admin Frontend

* React
* Vite
* Axios
* Admin Dashboard
* Responsive UI

</td>

<td width="25%">

## ☁️ Services

* Razorpay
* Cloudinary
* Render
* Vercel
* MongoDB Atlas

</td>
</tr>
</table>

---

# 📋 Project Requirements

Before running this project, make sure the following tools and accounts are available:

* ☕ Java 21
* 📦 Maven
* 🟢 Node.js & npm
* 🍃 MongoDB Atlas or MongoDB Compass
* ☁️ Cloudinary or AWS S3 account
* 💻 IntelliJ IDEA & VS Code
* 💳 Razorpay Account

---

# 🛠️ Setup Instructions

<table width="100%">
<tr>
<td width="50%">

# 🛒 Client Panel

### Step 1

```bash
cd My_Online-Food-Delivery-Project/Clientpanel
```

### Step 2

```bash
npm install
```

### Step 3

```bash
npm run dev
```

</td>

<td width="50%">

# ⚙️ Admin Panel

### Step 4

```bash
cd My_Online-Food-Delivery-Project/Adminpanel
```

### Step 5

```bash
npm install
```

### Step 6

```bash
npm run dev
```

</td>
</tr>
</table>

---

# ⚙️ Backend Setup

```bash
git clone https://github.com/G1thub-05/Online-Food-Ordering-System.git

cd foodiesapi

mvn spring-boot:run
```

---

# 💳 Razorpay Test Payment Details

<table width="100%">
<tr>
<td width="70%">

## 🏦 Test Cards For Indian Payments

| Card Network  | Card Number           | CVV            | Expiry Date     |
| ------------- | --------------------- | -------------- | --------------- |
| 💳 Mastercard | `5267 3181 8797 5449` | Any Random CVV | Any Future Date |
| 💳 Visa       | `4386 2894 0766 0153` | Any Random CVV | Any Future Date |

</td>

<td width="30%" align="center">

## 📲 UPI Test Payment

```text
success@razorpay
```

</td>
</tr>
</table>

---

# 🔐 Environment Variables

## Clientpanel `.env`

```env
VITE_API_URL=https://online-food-ordering-system-y2kf.onrender.com
VITE_RAZORPAY_KEY=your_razorpay_key
```

---

## Adminpanel `.env`

```env
VITE_API_URL=https://online-food-ordering-system-y2kf.onrender.com
```

---

## Backend `.env`

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ☁️ Deployment

| Service            | Platform      |
| ------------------ | ------------- |
| 🛒 Client Frontend | Vercel        |
| ⚙️ Admin Frontend  | Vercel        |
| 🚀 Backend API     | Render        |
| 🍃 Database        | MongoDB Atlas |

---

# 📈 Future Improvements

* ✅ Real-Time Order Tracking
* ✅ Coupon System
* ✅ Email Notifications
* ✅ Wishlist Feature
* ✅ Admin Analytics Dashboard
* ✅ Multi Restaurant Support
* ✅ Live Chat Support

---

# 👨‍💻 Developer

<div align="center">

## Digeshwar

### Java Full Stack Developer 🚀

<img src="https://img.shields.io/badge/GitHub-G1thub--05-181717?style=for-the-badge&logo=github" />

</div>

---

<div align="center">

# ⭐ Support The Project

If you like this project:

⭐ Star the repository
🍴 Fork the repository
📢 Share the project

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&height=150&color=0:39FF14,100:0B0F19&section=footer" />

</div>
