requirejs.config({
    baseUrl: '/js/app',
    paths: {
        libs: '../libs',
		jquery: '../libs/jquery.min',
        bootstrap: '../libs/bootstrap.min',
        cookie: '../libs/jquery.cookie',
        http: '../libs/http'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        },
        cookie: {
            deps: ['jquery']
        },
        http: {
            deps: ['jquery','cookie']
        }

    }
});
