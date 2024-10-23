# CakeIT
Your favorite bakery, and more, just a tap away!

![image](https://github.com/user-attachments/assets/b9c52f98-b5eb-471e-a5ce-310456237b65)

## Project Proposal
### 1. Problem Statement
In our town, there is no centralized platform for customers to easily view offerings from multiple bakeries, place custom orders, or arrange convenient delivery or pickup. Bakeries, in turn, lack a platform to manage orders, especially custom ones, and to communicate directly with customers.

### 2. Proposed Solution
CakeIt will be a mobile app where:
- **Customers** can browse bakeries, view products, place custom cake orders, and choose delivery or pickup options.
- **Bakeries** can manage orders, propose changes, and reserve a slot in a shared easybox for customer pickup.
- **Admins** oversee all orders and manage the easybox system.

### 3. Target Audience
- **Customers** who want an easy way to explore and order from local bakeries.
- **Bakeries** that need a better system to manage orders and communicate with clients.

### 4. Tools & Technologies
<img width="452" alt="image" src="https://github.com/user-attachments/assets/8fc6d259-b55a-459f-a67b-f89ca31be116">

### 5. Timeline & Milestones
- **Week 3**: Requirements Gathering & Design.
- **Week 4-5**: Implement Customer and Bakery roles.
- **Week 6**: Integrate Easybox feature.
- **Week 7**: Admin Dashboard & Testing.
- **Week 8**: Final Testing & Submission.

## Requirements Gathering

### 1. Functional Requirements

#### Customer Role:
- Browse through multiple bakeries and their products.
- Place standard or custom cake orders.
- Communicate with bakeries via a message thread.
- Choose delivery, in-store collection, or pickup from shared easybox.
- View real-time availability of easybox slots and reserve one.
- Receive notifications for order updates (accepted, declined, modified).

#### Bakery Role:
- Upload and update product listings.
- Manage orders (accept, decline, propose changes).
- Reserve a slot in the easybox for customer orders.
- Receive notifications for new orders and customer messages.

#### Admin Role:
- Monitor all orders placed via the app.
- Manage easybox reservations to prevent overbooking.
- View details of any specific order or easybox reservation.

### 2. Non-Functional Requirements

#### Performance:
- The app must handle 1000+ concurrent users with < 2s delay for real-time updates.

#### Reliability:
- The app must have 99% uptime, ensuring continuous access to order management.

#### Usability:
- The user interface must be intuitive and simple for both Android and iOS users.

#### Security:
- All sensitive data must be encrypted, and only authenticated users should access their roles.

### 3.Techniques to Gather Requirements

#### Use Cases/User Stories
- **Customer**: “As a customer, I want to browse bakeries and place a custom order.”
- **Bakery**: “As a bakery owner, I want to manage all incoming orders and communicate with customers.”
- **Admin**: “As an admin, I want to monitor easybox reservations and ensure smooth operation.”

#### Stakeholder Interviews
- Conduct interviews with bakery owners, customers, and admin personnel.
- **Example Questions**:
  - For bakeries: “How do you handle custom orders, and would a messaging feature help?”
  - For customers: “Would you prefer picking up from an easybox, and what would make the process more convenient?”

#### Workshops & Focus Groups
- Host workshops with bakery owners to co-design the order management interface.
- Organize focus groups with customers to refine the app’s user experience.
- **Example**: Bakery owners test a prototype of order management and easybox reservations.

#### Surveys & Questionnaires
- Distribute surveys to gather broad user preferences.
- **Example Questions**:
  - For customers: “How often would you use an easybox for pickup?”
  - For bakeries: “Would you prefer real-time notifications for new/updated orders?”

## High-Level Architecture:
### Monolithic Architecture for CakeIt

#### Architecture Overview
- **Single Codebase**: All components (mobile app, backend logic, database) are integrated into one application.

#### Components

##### Mobile App
- **Framework**: React Native.
- **User Roles**:
  - **Customer**: Browse bakeries, place orders, communicate.
  - **Bakery**: Manage products and orders.
  - **Admin**: Monitor orders and manage easybox reservations.

##### Backend Logic
- **Framework**: Firebase Cloud Functions for business logic (e.g., order processing, user authentication).

##### Database
- **Service**: Firebase Firestore or Realtime Database for storing user and order data.

##### Real-Time Communication
- **Service**: Firebase Cloud Messaging for notifications.

#### Component Interactions
- Users interact with the mobile app, triggering Firebase Cloud Functions.
- Cloud Functions read/write data from Firestore and send notifications via Firebase Cloud Messaging.

#### Deployment
- **Hosting**: Use Firebase Hosting for the frontend and Firebase services for backend functionality.
- **CI/CD**: Automate deployments with tools like GitHub Actions.

#### Development Steps
1. **Set Up React Native Project**.
2. **Integrate Firebase**: Firestore for data, Authentication for user management, Cloud Functions for logic.
3. **Implement Features**: Develop UIs for all user roles and add real-time functionalities.
4. **Testing**: Ensure all features function correctly.
5. **Deployment**: Deploy to Firebase Hosting.

#### Benefits
- **Simplicity**: Easy to develop and maintain due to a single application structure.
- **Faster Iteration**: Quick development cycles with reduced complexity.
