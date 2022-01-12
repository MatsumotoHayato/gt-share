(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artists/ArtistShow.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
  name: 'ArtistShow',
  data: function data() {
    return {
      artist: [],
      songs: [],
      headers: [{
        text: "名前",
        value: "name",
        align: "start"
      }],
      dialog: false,
      search: '',
      newSong: {
        name: ''
      }
    };
  },
  computed: {
    artistId: function artistId() {
      return this.$route.params.artistId;
    }
  },
  methods: {
    getSongs: function getSongs() {
      var _this = this;

      axios.get("/artists/".concat(this.artistId)).then(function (response) {
        _this.artist = response.data.artist;
        _this.songs = response.data.songs; // console.log(response.data)
      });
    },
    close: function close() {
      this.dialog = false;
    },
    save: function save() {
      this.songs.push(this.newSong);
      this.close();
    }
  },
  mounted: function mounted() {
    this.getSongs();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=template&id=267c6e1c&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artists/ArtistShow.vue?vue&type=template&id=267c6e1c& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
          _c("p", { staticClass: "text-h6 font-weight-bold" }, [
            _vm._v(_vm._s(_vm.artist.name)),
          ]),
          _vm._v(" "),
          _c("v-data-table", {
            attrs: {
              items: _vm.songs,
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
                                "\n                            mdi-music-note\n                        "
                              ),
                            ]),
                            _vm._v(
                              "\n                        曲一覧\n                    "
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("v-divider", {
                          staticClass: "ml-4 mr-16",
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
                            label: _vm.artist.name + " の曲名を検索",
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
                                          "\n                                新規曲\n                                "
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
                                    "\n                                " +
                                      _vm._s(_vm.artist.name) +
                                      " の新規曲追加\n                            "
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
                                                  attrs: { label: "曲名" },
                                                  model: {
                                                    value: _vm.newSong.name,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.newSong,
                                                        "name",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "newSong.name",
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/artists/ArtistShow.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/artists/ArtistShow.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ArtistShow_vue_vue_type_template_id_267c6e1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArtistShow.vue?vue&type=template&id=267c6e1c& */ "./resources/js/components/artists/ArtistShow.vue?vue&type=template&id=267c6e1c&");
/* harmony import */ var _ArtistShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArtistShow.vue?vue&type=script&lang=js& */ "./resources/js/components/artists/ArtistShow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ArtistShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ArtistShow_vue_vue_type_template_id_267c6e1c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ArtistShow_vue_vue_type_template_id_267c6e1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/artists/ArtistShow.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/artists/ArtistShow.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/artists/ArtistShow.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistShow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/artists/ArtistShow.vue?vue&type=template&id=267c6e1c&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/artists/ArtistShow.vue?vue&type=template&id=267c6e1c& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_template_id_267c6e1c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistShow.vue?vue&type=template&id=267c6e1c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=template&id=267c6e1c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_template_id_267c6e1c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_template_id_267c6e1c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);