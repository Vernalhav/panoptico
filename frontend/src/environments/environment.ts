// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  services: {
    backend: {
      BASE_URL: 'http://localhost:3000',
      GET_PARTIES_PATH: '/party',
      GET_PARTIES_WITH_MEMBERS_PATH: '/party?members=1',
      GET_CONGRESSPEOPLE_PATH: '/congressperson',
      GET_MONITOR_VOTINGS: '/monitor',
      GET_MONITOR_SUBJECTS: '/subjects-monitor/',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
