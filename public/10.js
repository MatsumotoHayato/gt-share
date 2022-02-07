(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/MyFavorite.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/posts/MyFavorite.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'MyFavorite',
  data: function data() {
    return {
      posts: [],
      user: [],
      headers: [{
        text: "名前",
        value: "body",
        align: "start"
      }],
      dialog: false,
      snackbar: false,
      timeout: 4000
    };
  },
  methods: {
    getPosts: function getPosts() {
      var _this = this;

      axios.get('/myfavorite').then(function (response) {
        _this.posts = response.data.posts, _this.user = response.data.user;
      })["catch"](function (error) {
        _this.snackbar = true;
      });
    }
  },
  created: function created() {
    this.getPosts();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/MyFavorite.vue?vue&type=template&id=3c108b8f&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/posts/MyFavorite.vue?vue&type=template&id=3c108b8f& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-container",
        [
          _c(
            "v-snackbar",
            {
              attrs: {
                timeout: _vm.timeout,
                color: "deep-purple accent-4",
                centered: "",
                "min-width": "0",
                width: "169",
              },
              model: {
                value: _vm.snackbar,
                callback: function ($$v) {
                  _vm.snackbar = $$v
                },
                expression: "snackbar",
              },
            },
            [_vm._v("\n      ログインが必要です\n    ")]
          ),
          _vm._v(" "),
          _c("v-row", [
            _c("p", { staticClass: "text-h5 font-weight-bold" }, [
              _vm._v("いいねマイリスト"),
            ]),
          ]),
          _vm._v(" "),
          _c("v-data-iterator", {
            staticClass: "elevation-1",
            attrs: { items: _vm.posts, "hide-default-footer": "" },
            scopedSlots: _vm._u([
              {
                key: "header",
                fn: function () {
                  return [
                    _c(
                      "v-toolbar",
                      {
                        staticClass: "mb-1",
                        attrs: { flat: "", dark: "", color: "blue darken-3" },
                      },
                      [
                        _c(
                          "v-toolbar-title",
                          [
                            _c("v-icon", [
                              _vm._v(
                                "\n              mdi-thumb-up\n            "
                              ),
                            ]),
                            _vm._v("\n            レビュー一覧\n          "),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("v-divider", {
                          staticClass: "ml-4 mr-12",
                          attrs: { inset: "", vertical: "" },
                        }),
                        _vm._v(" "),
                        _c("v-spacer"),
                      ],
                      1
                    ),
                  ]
                },
                proxy: true,
              },
              {
                key: "default",
                fn: function () {
                  return [
                    _c(
                      "v-row",
                      _vm._l(_vm.posts, function (post) {
                        return _c(
                          "v-col",
                          { key: post.id, attrs: { cols: "12" } },
                          [
                            _c(
                              "v-card",
                              [
                                _c(
                                  "v-row",
                                  [
                                    _c(
                                      "v-col",
                                      { attrs: { cols: "4" } },
                                      [
                                        _c(
                                          "v-list",
                                          { attrs: { dense: "" } },
                                          [
                                            _c(
                                              "v-list-item",
                                              [
                                                _c("v-list-item-content", [
                                                  _vm._v(
                                                    _vm._s(post.song.name) +
                                                      " / " +
                                                      _vm._s(
                                                        post.song.artist.name
                                                      )
                                                  ),
                                                ]),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-item",
                                              [
                                                _c("v-list-item-content", [
                                                  _vm._v(
                                                    "ユーザー名: " +
                                                      _vm._s(post.user.name)
                                                  ),
                                                ]),
                                              ],
                                              1
                                            ),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("v-divider", {
                                      attrs: { vertical: "" },
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "v-col",
                                      { attrs: { cols: "6" } },
                                      [
                                        _c(
                                          "v-list",
                                          { attrs: { dense: "" } },
                                          [
                                            _c(
                                              "v-list-item",
                                              [
                                                _c("v-list-item-content", [
                                                  _vm._v(
                                                    "\n                        楽器: " +
                                                      _vm._s(
                                                        post.instrument.name
                                                      ) +
                                                      "\n                      "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-item",
                                              [
                                                _c("v-list-item-content", [
                                                  _vm._v(
                                                    "\n                        難易度: " +
                                                      _vm._s(post.difficulty) +
                                                      "\n                      "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-item",
                                              [
                                                _c("v-list-item-content", [
                                                  _vm._v(
                                                    "\n                        " +
                                                      _vm._s(post.updated_at) +
                                                      "\n                      "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-list-item",
                                              [
                                                _c("v-list-item-content", [
                                                  _vm._v(
                                                    "\n                        内容: " +
                                                      _vm._s(post.body) +
                                                      "\n                      "
                                                  ),
                                                ]),
                                              ],
                                              1
                                            ),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                  ],
                                  1
                                ),
                              ],
                              1
                            ),
                          ],
                          1
                        )
                      }),
                      1
                    ),
                  ]
                },
                proxy: true,
              },
            ]),
          }),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/posts/MyFavorite.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/posts/MyFavorite.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyFavorite_vue_vue_type_template_id_3c108b8f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyFavorite.vue?vue&type=template&id=3c108b8f& */ "./resources/js/components/posts/MyFavorite.vue?vue&type=template&id=3c108b8f&");
/* harmony import */ var _MyFavorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyFavorite.vue?vue&type=script&lang=js& */ "./resources/js/components/posts/MyFavorite.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MyFavorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MyFavorite_vue_vue_type_template_id_3c108b8f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MyFavorite_vue_vue_type_template_id_3c108b8f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/posts/MyFavorite.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/posts/MyFavorite.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/posts/MyFavorite.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyFavorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MyFavorite.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/MyFavorite.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyFavorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/posts/MyFavorite.vue?vue&type=template&id=3c108b8f&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/posts/MyFavorite.vue?vue&type=template&id=3c108b8f& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyFavorite_vue_vue_type_template_id_3c108b8f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MyFavorite.vue?vue&type=template&id=3c108b8f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/MyFavorite.vue?vue&type=template&id=3c108b8f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyFavorite_vue_vue_type_template_id_3c108b8f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyFavorite_vue_vue_type_template_id_3c108b8f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);