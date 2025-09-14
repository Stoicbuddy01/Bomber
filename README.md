# P3 - Pig & Poultry Protection Platform

A comprehensive SaaS web application for biosecurity management in the livestock sector, built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Multi-Role Support
- **Ministry Administrators**: Emergency response, compliance tracking, notification management
- **Veterinarians**: Risk assessment, health prediction, image classification, protection hub
- **Farmers**: Disease detection, compliance tracking, farmer network, training modules

### Key Capabilities
- 🔐 Role-based authentication and authorization
- 📊 Real-time dashboards with interactive charts
- 🚨 Emergency response management
- 📋 Compliance tracking and document management
- 🤖 AI-powered disease image classification
- 📱 Responsive design for mobile and desktop
- 🌐 Multilingual support (English/Hindi)
- 🔔 Real-time notifications
- 📈 Advanced analytics and reporting

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Heroicons** - Icon library
- **Axios** - HTTP client

### Backend Integration
- **RESTful API** - Backend communication
- **JWT Authentication** - Secure token-based auth
- **File Upload** - Document and image handling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   
   

2. **Install dependencies**
   ```bash
   npm install
   ```


3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/                 # Authentication components
│   ├── Dashboard/            # Role-specific dashboards
│   ├── Layout/               # Layout components (Header, Sidebar)
│   └── Common/               # Shared components
├── services/
│   └── apiService.js         # API service layer
├── locales/                  # Internationalization files
├── theme.js                  # Material-UI theme configuration
├── i18n.js                   # i18next configuration
├── api.js                    # Axios configuration
├── App.jsx                   # Main application component
└── main.jsx                  # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Blue (#1a2b4e)
- **Secondary**: Teal (#26a69a)
- **Admin**: Blue tones (#2196f3)
- **Vet**: Purple tones (#7b1fa2)
- **Farmer**: Green tones (#388e3c)

### Components
- **Cards**: Consistent card-based layout
- **Buttons**: Role-specific color coding
- **Forms**: Unified input styling
- **Charts**: Dark theme data visualization

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application is designed to work with a RESTful backend API. Update the `API_BASE_URL` in `src/api.js` to point to your backend server.

### Required Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user

#### Admin Endpoints
- `GET /admin/dashboard` - Dashboard data
- `GET /admin/emergency` - Emergency response data
- `GET /admin/compliance` - Compliance tracking data
- `POST /admin/alerts` - Create alert
- `GET /admin/alerts` - Get alerts

#### Vet Endpoints
- `GET /vet/dashboard` - Vet dashboard data
- `GET /vet/appointments` - Appointments
- `GET /vet/risk-assessments` - Risk assessments
- `POST /vet/risk-assessments` - Create risk assessment
- `POST /vet/image-classifier` - Classify disease image
- `POST /vet/health-predictor` - Health predictions

#### Farmer Endpoints
- `GET /farmer/dashboard` - Farmer dashboard data
- `GET /farmer/profile` - Farm profile
- `PUT /farmer/profile` - Update farm profile
- `GET /farmer/compliance` - Compliance status
- `POST /farmer/documents` - Upload documents
- `GET /farmer/network` - Network connections
- `POST /farmer/image-classifier` - Classify disease image
- `GET /farmer/training` - Training modules

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🔒 Security Features

- JWT token-based authentication
- Role-based access control
- Secure API communication
- Input validation and sanitization
- XSS protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🌍 Internationalization

Supports multiple languages with easy addition of new locales:
- English (en)
- Hindi (hi)

Add new languages by creating translation files in `src/locales/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added image classification
- **v1.2.0** - Enhanced mobile responsiveness
- **v1.3.0** - Added multilingual support

---

Built with ❤️ for livestock biosecurity management


