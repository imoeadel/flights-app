# Flight Management System

A web application to manage flight records, including creating, editing, deleting, and viewing flights. This application features paginated views for large datasets, image upload and preview functionality, and input validation with error handling.

## Features

### Flight List Display
- **Paginated table view** of flights, displaying each flight's code, capacity, and departure date.
- View the **first page** and a default of **10 items per page**, with options to change the page size and navigate between pages.

### Flight Search and Filtering
- **Search flights** by their unique code.
- **URL parameters** update automatically to reflect search queries and page navigation, preserving state on page refresh.
- **Query parameter validation** redirects to a "Bad Request" page if invalid.

### Add, Edit, and Delete Flights
- **Add Flight**: Open a modal to input details like code, capacity, departure date, and an optional photo.
- **Edit Flight**: Update flight details. Retains the flight photo if not changed.
- **Delete Flight**: Remove a specific flight from the records.

### Image Upload and Preview
- Upload a flight image during creation or editing. Displayed in the list and previewed in a modal.
- Preview the image both **before and after** uploading to the backend.

### Responsive Design
- Optimized for both **desktop and mobile** views.
- On mobile, flights are displayed in a **card format** instead of a table for easy navigation on smaller screens.

## Tech Stack

- **Frontend**: React.js, Ant Design, Tailwind CSS
- **Backend**: Axios (for API requests)
- **State Management**: React Query (for data fetching and caching)
- **Form Handling and Validation**: React Hook Form, Yup
- **Routing**: React Router DOM

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/imoeadel/flights-app.git
   ```
2. **Install dependencies**:

   ```bash
   cd flights-app
   npm install
  
3. **Run the Server**:
   ```bash
   npm run server
   ```
4. **Run the application:**:
    ```bash
    npm start
    ```

The server will be accessible at http://localhost:3000.
The application will be accessible at http://localhost:3001.

### Usage
### Viewing Flights
Navigate through pages using the pagination control at the bottom of the table or cards (mobile view).
Change the page size to view more or fewer items per page.

#### Searching Flights
Use the search bar at the top to search by flight code.
URL parameters automatically update based on search input, preserving the search on page refresh.
#### Adding, Editing, and Deleting Flights
 **Add Flight**: Click "Add Flight" to open a modal for creating a new flight.
 
 **Edit**: Click "Edit" next to a flight to update its details.
 
 **Delete**: Click "Delete" to remove a flight from the list.
 #### Image Upload
When adding or editing a flight, upload an image for the flight.
If editing, the existing image is displayed; you can delete or replace it as needed.

## ⚠️ Known Issues
If the backend API is down or inaccessible, API requests may fail.

Validation errors may occur if the backend does not handle invalid data inputs as expected.

When creating a flight with photo the response doesn't include the img and it is returned as empty string.


