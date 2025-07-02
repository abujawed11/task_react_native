# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

```
task_react_native_live
├─ app
│  ├─ (admin)
│  │  ├─ manage-tasks.tsx
│  │  └─ manage-users.tsx
│  ├─ (auth)
│  │  ├─ login.tsx
│  │  ├─ signup.tsx
│  │  └─ _layout.tsx
│  ├─ (dashboard)
│  │  ├─ assigned-tasks.tsx
│  │  ├─ create-task.tsx
│  │  ├─ dashboard.tsx
│  │  ├─ index.tsx
│  │  ├─ my-tasks.tsx
│  │  ├─ task-progress
│  │  │  └─ [taskId].tsx
│  │  ├─ update-task
│  │  │  └─ [taskId].tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  ├─ notifications.tsx
│  ├─ profile.tsx
│  ├─ tasks
│  │  └─ [taskId]
│  │     └─ update.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ animations
│  │  └─ mascot.json
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ CustomDrawer.tsx
│  ├─ FloatingButton.tsx
│  ├─ Graph.tsx
│  ├─ NotificationBell.tsx
│  ├─ TaskCard.tsx
│  ├─ TaskFilterMenu.tsx
│  ├─ TaskFilters.tsx
│  ├─ TaskSortMenu.tsx
│  ├─ TaskUpdateCard.tsx
│  └─ UserAvatar.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  └─ ThemeContext.tsx
├─ eslint.config.js
├─ global.css
├─ hooks
│  ├─ useAuth.ts
│  ├─ useFilteredSortedTasks.ts
│  └─ useNotifications.ts
├─ metro.config.js
├─ nativewind-env.d.ts
├─ navigation
│  ├─ AppNavigator.tsx
│  ├─ AuthNavigator.tsx
│  ├─ DashboardTabsNavigator.tsx
│  ├─ DrawerNavigator.tsx
│  └─ navigationTypes.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ services
│  ├─ authService.ts
│  ├─ notificationService.ts
│  └─ taskService.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ index.d.ts
│  ├─ index.ts
│  ├─ notification.types.ts
│  ├─ task.types.ts
│  └─ user.types.ts
└─ utils
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   └─ taskUtils.ts

```
```
task_react_native_live
├─ app
│  ├─ (auth)
│  │  ├─ login.tsx
│  │  ├─ signup.tsx
│  │  └─ _layout.tsx
│  ├─ (dashboard)
│  │  ├─ assigned-tasks.tsx
│  │  ├─ create-task.tsx
│  │  ├─ dashboard.tsx
│  │  ├─ index.tsx
│  │  ├─ manage-tasks.tsx
│  │  ├─ manage-users.tsx
│  │  ├─ my-tasks.tsx
│  │  ├─ task-progress
│  │  │  └─ [taskId].tsx
│  │  ├─ update-task
│  │  │  └─ [taskId].tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  ├─ notifications.tsx
│  ├─ profile.tsx
│  ├─ tasks
│  │  └─ [taskId]
│  │     └─ update.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ animations
│  │  └─ mascot.json
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ CustomDrawer.tsx
│  ├─ FloatingButton.tsx
│  ├─ Graph.tsx
│  ├─ NotificationBell.tsx
│  ├─ TaskCard.tsx
│  ├─ TaskFilterMenu.tsx
│  ├─ TaskFilters.tsx
│  ├─ TaskSortMenu.tsx
│  ├─ TaskUpdateCard.tsx
│  └─ UserAvatar.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  └─ ThemeContext.tsx
├─ eslint.config.js
├─ global.css
├─ hooks
│  ├─ useAuth.ts
│  ├─ useFilteredSortedTasks.ts
│  └─ useNotifications.ts
├─ metro.config.js
├─ nativewind-env.d.ts
├─ navigation
│  ├─ AppNavigator.tsx
│  ├─ AuthNavigator.tsx
│  ├─ DashboardTabsNavigator.tsx
│  ├─ DrawerNavigator.tsx
│  └─ navigationTypes.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ services
│  ├─ authService.ts
│  ├─ notificationService.ts
│  └─ taskService.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ index.d.ts
│  ├─ index.ts
│  ├─ notification.types.ts
│  ├─ task.types.ts
│  └─ user.types.ts
└─ utils
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   └─ taskUtils.ts

```