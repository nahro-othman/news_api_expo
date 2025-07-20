# News API Expo App

A clean architecture news application built with Expo React Native and the News API.

## 🏗️ Architecture

This project follows Clean Architecture principles with clear separation of concerns:

### Layers:

- **Domain Layer**: Entities, repositories interfaces, and use cases
- **Data Layer**: Repository implementations and data sources
- **Infrastructure Layer**: API clients and external services
- **Application Layer**: Services and providers
- **Presentation Layer**: Screens, components, and navigation

### Key Features:

- 📰 Top headlines with category filtering
- 🔍 Search functionality
- 🎨 Modern UI with React Native Paper
- 📱 Responsive design
- 🔄 Pull-to-refresh
- 🌐 External link handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- News API key from [newsapi.org](https://newsapi.org)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd news_api_expo
```

2. Install dependencies:

```bash
npm install
```

3. Configure API Key:

   - Get your free API key from [newsapi.org](https://newsapi.org)
   - Open `src/infrastructure/api/NewsApiClient.ts`
   - Replace `YOUR_NEWS_API_KEY` with your actual API key

4. Run the application:

```bash
# For iOS
npm run ios

# For Android
npm run android

# For web
npm run web
```

## 📱 Features

### Home Screen

- Displays top headlines by category
- Category filter chips (General, Business, Technology, Sports, etc.)
- Pull-to-refresh functionality
- Loading and error states

### Search Screen

- Search for any news topic
- Real-time search results
- Empty state handling

### Article Cards

- Rich article display with images
- Source and date information
- "Read More" button to open full article
- Responsive design

## 🏛️ Project Structure

```
src/
├── domain/                 # Domain layer
│   ├── entities/          # Business entities
│   ├── repositories/      # Repository interfaces
│   └── usecases/         # Business use cases
├── data/                  # Data layer
│   └── repositories/      # Repository implementations
├── infrastructure/        # Infrastructure layer
│   ├── api/              # API clients
│   └── di/               # Dependency injection
├── application/           # Application layer
│   ├── services/         # Application services
│   └── providers/        # React providers
└── presentation/         # Presentation layer
    ├── components/       # Reusable components
    ├── screens/          # Screen components
    └── navigation/       # Navigation setup
```

## 🛠️ Technologies Used

- **Expo**: React Native development platform
- **TypeScript**: Type safety and better developer experience
- **React Navigation**: Navigation between screens
- **React Native Paper**: Material Design components
- **Axios**: HTTP client for API calls
- **Clean Architecture**: Scalable and maintainable code structure

## 🔧 Configuration

### Environment Variables

The app uses a News API key that should be configured in the `NewsApiClient.ts` file.

### API Endpoints

- Top Headlines: `/top-headlines`
- Everything: `/everything`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
