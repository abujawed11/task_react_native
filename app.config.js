export default ({ config }) => {
  return {
    name: "Sun-Rack Task",
    slug: "task_react_native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app_icon.png",
    scheme: "taskreactnative",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,

    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
      icon: "./assets/images/app_icon.png",
    },

    android: {
      package: "com.abujawed11.task_react_native",
      adaptiveIcon: {
        foregroundImage: "./assets/images/app_icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      permissions: [
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "POST_NOTIFICATIONS",
      ],
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/app_icon.png",
    },

    plugins: [
      "expo-router",
      "expo-av",
      "expo-notifications",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          resizeMode: "cover",
          backgroundColor: "#ffffff",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      router: {},
      eas: {
        projectId: "a44e4291-089e-49ca-aef4-f11a71c88b0f",
      },
    },
  };
};
