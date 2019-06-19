// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spotify: {
    auth: {
      token:
        'BQBb9OSKNBIKSvZ698PcRK95WXLUK7GIXKlikimAsQiKt9ORZNXykNNnjBw2v9x-Z8PaT5NL4saTskW1omdHWO2NDgyDMrpX-63X_abhYrokDvqv7O9_QBgx1UdxWknMgoeHyB1e6mPBlZpfNMWUp8mkCtb86adljGytDg',
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
