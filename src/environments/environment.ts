// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spotify: {
    auth: {
      token:
        'BQBMBUzSyNktGg_z03zi9WuNw71RfuSYuuIOvq_YUPXklDMd7P5CryX-CCdgGe19DZo8cbMmfSsnMR1R-v-FRl40tgTgp4CfOVu5uW3XojBeZm9kea9LQ5__FnUiRSXL3iCm2u8mdkQCMEdwMG3tD1mtCtWJGHJgYAIvfw',
      clientId: '09b24f2eda9e45d3a815f95d88a129e1',
      clientSecret: '44d8a4367a164d14b53fa1fda4cce8a4'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
