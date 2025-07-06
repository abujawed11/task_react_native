import appJson from './app.json';

export default ({ config }) => {
  return {
    ...appJson.expo,
    android: {
      ...appJson.expo.android,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json"
    },
    extra: {
      ...appJson.expo.extra,
      eas: {
        ...appJson.expo.extra.eas
      }
    }
  };
};
