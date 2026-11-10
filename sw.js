const FILES_TO_CACHE = [
    "/",
    "manifest.json",
    "pwa.webmanifest",
    "TIVarsLib.js",
    "TIVarsLib.wasm",
    "index.html",
    "latealways_patch.js",
    "images/TI-84 Plus Silver Edition @2x.png",
    "images/filetype_program.svg",
    "images/filetype_string.svg",
    "images/filetype_range.svg",
    "images/ticonnect-icon-128.png",
    "images/TI logo @2x.png",
    "images/TI-84 Plus C Silver Edition @2x.png",
    "images/filetype_list.svg",
    "images/animation_files.svg",
    "images/filetype_app.svg",
    "images/filetype_os.svg",
    "images/filetype_certificate.svg",
    "images/filetype_group.svg",
    "images/TI-83 Plus fr @2x.png",
    "images/icon_close.svg",
    "images/splitter_chevron.svg",
    "images/animation_fail.svg",
    "images/toolbar_add_from_comp.svg",
    "images/dialog_warning.svg",
    "images/icon16.png",
    "images/no hh connected.svg",
    "images/animation_arrow.svg",
    "images/lock.svg",
    "images/icon_checkmark_green_hover.svg",
    "images/animation_os.svg",
    "images/filetype_image.svg",
    "images/filetype_matrix.svg",
    "images/toolbar_missing.svg",
    "images/menu.svg",
    "images/no hh connected 2.svg",
    "images/toolbar_settings.svg",
    "images/icon_select.svg",
    "images/toolbar_save.svg",
    "images/toolbar_border.svg",
    "images/file_list_background.png",
    "images/filetype_real.svg",
    "images/toolbar_capture.svg",
    "images/TI-84 Plus @2x.png",
    "images/filetype_equation.svg",
    "images/icon_checkmark.svg",
    "images/toolbar_send_to_comp.svg",
    "images/toolbar_delete.svg",
    "images/toolbar_send_to_hh.svg",
    "images/toolbar_copy.svg",
    "images/toolbar_slide_show.svg",
    "images/ticonnect-icon-16.png",
    "images/animation_calculator.svg",
    "images/ticonnect-icon-48.png",
    "images/icon128.png",
    "images/toolbar_calc.svg",
    "images/ToolbarLogo.svg",
    "images/filetype_graphdb.svg",
    "images/icon48.png",
    "images/icon_checkmark_green.svg",
    "images/animation_sync.svg",
    "images/animation_delete.svg",
    "images/toolbar_styles.svg",
    "images/ScreenCapture.png",
    "images/TI-83 Premium CE @2x.png",
    "images/animation_capture.svg",
    "images/toolbar_refresh.svg",
    "images/TI-84 Plus CE @2x.png",
    "js/screencapture.js",
    "js/device-views-screencapture-slideshow.js",
    "js/device-views.js",
    "js/device-views-screencapture.js",
    "js/developer-options.js",
    "js/app-utilities.js",
    "js/background.js",
    "js/commtest.js",
    "js/device-views-developer-options.js",
    "js/image-utilities.js",
    "js/toolbar-app.js",
    "js/app.js",
    "css/dialog-about.css",
    "css/dialog-duplicates.css",
    "css/dialog-calc-info.css",
    "css/loading-mask.css",
    "css/device-explorer.css",
    "css/dialog-send-files.css",
    "css/ngDialog-theme.css",
    "css/app.css",
    "css/no-device.css",
    "css/toolbar.css",
    "css/screen-captures.css",
    "css/dialog-custom-filename.css",
    "css/commtest.css",
    "css/animations.css",
    "lib/jquery/jquery-1.11.3.js",
    "lib/jsZip/jszip.js",
    "lib/ngDialog/js/ngDialog.js",
    "lib/ngDialog/css/ngDialog.css",
    "lib/ngDialog/css/ngDialog-theme-default.css",
    "lib/angular/angular-animate.js",
    "lib/angular/angular-touch.js",
    "lib/angular/angular-sanitize.js",
    "lib/angular/angular.js",
    "lib/angular/angular-csp.css",
    "lib/analytics/google-analytics-bundle.js",
    "cars/src/js/obfuscatedcars.js",
    "cars/src/js/utilities/ti-logger.js",
    "cars/src/js/utilities/array-extension.js",
    "cars/src/js/utilities/common-utils.js",
    "cars/src/js/utilities/string-extension.js",
    "cars/src/css/main.css",
    "templates/dialog-long-message.html",
    "templates/dialog-about.html",
    "templates/dialog-commtest-config.html",
    "templates/screen-captures-slideshow.html",
    "templates/toolbar-screen-capture.html",
    "templates/dialog-send-files.html",
    "templates/animations.html",
    "templates/dialog-delete-files.html",
    "templates/toolbar-device-explorer.html",
    "templates/dialog-message.html",
    "templates/dialog-calc-info.html",
    "templates/dialog-send-os.html",
    "templates/device-explorer.html",
    "templates/dialog-commtest.html",
    "templates/commtest.html",
    "templates/no-device.html",
    "templates/dialog-duplicate-filenames.html",
    "templates/dialog-custom-filename.html",
    "templates/dialog-developer-options.html",
    "templates/dialog-local-storage.html",
    "templates/loading-mask.html",
    "templates/toolbar-app.html",
    "templates/screen-captures.html",
];

    self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        })
    );
    })

    self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1')
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );
    });

    self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(async response => {
        let response2;
        if(navigator.onLine) {
            response2 = fetch(event.request).then(response => {
            let statuscode = response.status;
            if(statuscode == 200) {
                caches.open('v1').then(cache => {
                    cache.put(event.request, response.clone());
                });
            }
            return response.clone();
            });
        }
        if(response) {
            return response;
        } else {
            return await response2;
        }
        })
    );
    });

    