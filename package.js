Package.describe({
  name: 'dispatch:date-tools',
  summary: 'Timezone aware date helpers.',
  version: '1.3.4',
  git: 'https://github.com/DispatchMe/meteor-date-tools.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.use([
    'tracker',
    'dispatch:time-tracker@1.0.3',
    'mrt:moment-timezone@0.2.1'
  ], 'web');

  api.addFiles([
    'date_tools.js',
    'timezone.js',
    'formatters.js'
  ], 'web');

  api.export('DateTools', 'web');
});

Package.onTest(function (api) {
  api.use([
    'tinytest',
    'dispatch:date-tools'
  ], 'web');

  api.addFiles([
    'date_tools_test.js'
  ], 'web');
});
