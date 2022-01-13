(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistIndex.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artists/ArtistIndex.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _songs_SongIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../songs/SongIndex */ "./resources/js/components/songs/SongIndex.vue");
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
  name: 'ArtistIndex',
  components: {
    SongIndex: _songs_SongIndex__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      artists: [],
      headers: [{
        text: "名前",
        value: "name",
        align: "start"
      }],
      dialog: false,
      search: '',
      newArtist: {
        // id: ,
        name: ''
      }
    };
  },
  methods: {
    getArtists: function getArtists() {
      var _this = this;

      axios.get('/artists').then(function (response) {
        _this.artists = response.data;
      });
    },
    close: function close() {
      this.dialog = false;
    },
    save: function save() {
      this.artists.push(this.newArtist);
      this.close();
    }
  },
  mounted: function mounted() {
    this.getArtists();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artists/ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
          _c("v-data-table", {
            staticClass: "elevation-1",
            attrs: {
              items: _vm.artists,
              headers: _vm.headers,
              search: _vm.search,
              "sort-by": "name",
              "hide-default-header": "",
            },
            scopedSlots: _vm._u([
              {
                key: "top",
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
                                "\n                                mdi-account-music\n                        "
                              ),
                            ]),
                            _vm._v(
                              "\n                        アーティスト一覧\n                    "
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("v-divider", {
                          staticClass: "mx-4",
                          attrs: { inset: "", vertical: "" },
                        }),
                        _vm._v(" "),
                        _c("v-text-field", {
                          attrs: {
                            clearable: "",
                            flat: "",
                            "solo-inverted": "",
                            "hide-details": "",
                            "prepend-inner-icon": "mdi-magnify",
                            label: "アーティスト名を検索",
                          },
                          model: {
                            value: _vm.search,
                            callback: function ($$v) {
                              _vm.search = $$v
                            },
                            expression: "search",
                          },
                        }),
                        _vm._v(" "),
                        _c("v-spacer"),
                        _vm._v(" "),
                        _c(
                          "v-dialog",
                          {
                            attrs: { "max-width": "500px" },
                            scopedSlots: _vm._u([
                              {
                                key: "activator",
                                fn: function (ref) {
                                  var on = ref.on
                                  var attrs = ref.attrs
                                  return [
                                    _c(
                                      "v-btn",
                                      _vm._g(
                                        _vm._b(
                                          {
                                            staticClass: "ma-2",
                                            attrs: { outlined: "" },
                                          },
                                          "v-btn",
                                          attrs,
                                          false
                                        ),
                                        on
                                      ),
                                      [
                                        _vm._v(
                                          "\n                                新規アーティスト\n                                "
                                        ),
                                        _c("v-icon", { attrs: { right: "" } }, [
                                          _vm._v(
                                            "\n                                    mdi-pencil-plus\n                                "
                                          ),
                                        ]),
                                      ],
                                      1
                                    ),
                                  ]
                                },
                              },
                            ]),
                            model: {
                              value: _vm.dialog,
                              callback: function ($$v) {
                                _vm.dialog = $$v
                              },
                              expression: "dialog",
                            },
                          },
                          [
                            _vm._v(" "),
                            _c(
                              "v-card",
                              [
                                _c("v-card-title", [
                                  _vm._v(
                                    "\n                                新規アーティスト追加\n                            "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-card-text",
                                  [
                                    _c(
                                      "v-container",
                                      [
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "10" } },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "アーティスト名",
                                                  },
                                                  model: {
                                                    value: _vm.newArtist.name,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.newArtist,
                                                        "name",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "newArtist.name",
                                                  },
                                                }),
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
                                _vm._v(" "),
                                _c(
                                  "v-card-actions",
                                  [
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: {
                                          color: "blue darken-1",
                                          text: "",
                                        },
                                        on: { click: _vm.close },
                                      },
                                      [
                                        _vm._v(
                                          "\n                                キャンセル\n                              "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: {
                                          color: "blue darken-1",
                                          text: "",
                                        },
                                        on: { click: _vm.save },
                                      },
                                      [
                                        _vm._v(
                                          "\n                                追加\n                              "
                                        ),
                                      ]
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
                  ]
                },
                proxy: true,
              },
            ]),
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c("v-row", { staticClass: "my-12" }),
      _vm._v(" "),
      _c("SongIndex"),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/artists/ArtistIndex.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/artists/ArtistIndex.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ArtistIndex_vue_vue_type_template_id_212f47a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true& */ "./resources/js/components/artists/ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true&");
/* harmony import */ var _ArtistIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArtistIndex.vue?vue&type=script&lang=js& */ "./resources/js/components/artists/ArtistIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ArtistIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ArtistIndex_vue_vue_type_template_id_212f47a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ArtistIndex_vue_vue_type_template_id_212f47a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "212f47a6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artists/ArtistIndex.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artists/ArtistIndex.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/artists/ArtistIndex.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistIndex.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artists/ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/artists/ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistIndex_vue_vue_type_template_id_212f47a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistIndex.vue?vue&type=template&id=212f47a6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistIndex_vue_vue_type_template_id_212f47a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistIndex_vue_vue_type_template_id_212f47a6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);