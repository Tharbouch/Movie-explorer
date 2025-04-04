# Movie Explorer

Movie Explorer is a Vue.js-based web application that allows users to explore and search for movies. It uses Vue Router for navigation and Pinia for state management.

## Features

- Browse a collection of movies.
- Search for movies by title.
- View detailed information about a selected movie.

## Technologies Used

- [Vue.js](https://vuejs.org/) - Frontend framework.
- [Vue Router](https://router.vuejs.org/) - For client-side routing.
- [Pinia](https://pinia.vuejs.org/) - For state management.

## Project Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movie-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

## Known Limitations

Image Loading Performance: Since the API doesn't offer limit and pagination parameters, pagination is implemented on the frontend. This may cause performance issues with image loading, especially when browsing large collections of movies.

## Build for Production

To build the project for production, run:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## License

This project is licensed under the MIT License.
