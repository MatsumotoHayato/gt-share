(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ArtistShow',
  data: function data() {
    var _this = this;

    return {
      artist: [],
      songs: [],
      headers: [{
        text: "曲名",
        value: "name",
        align: "start",
        width: '80%'
      }, {
        text: 'レビュー数',
        value: 'posts_count',
        align: 'start',
        width: '20%'
      }],
      dialog: false,
      search: '',
      newSong: {
        name: ''
      },
      rules: {
        required: function required(value) {
          return !!value || '入力は必須です';
        },
        counter: function counter(value) {
          return value.length <= 100 || '100文字以内で入力してください';
        },
        exists: function exists(value) {
          return !_this.songs.some(function (object) {
            if (object.name === value) {
              return true;
            }
          }) || '既に登録済みです';
        }
      },
      breadCrumbs: [{
        text: 'ホーム',
        disabled: false,
        to: '/'
      }]
    };
  },
  computed: {
    artistId: function artistId() {
      return this.$route.params.artistId;
    }
  },
  methods: {
    getSongs: function getSongs() {
      var _this2 = this;

      axios.get("/artists/".concat(this.artistId)).then(function (response) {
        _this2.artist = response.data.artist;
        _this2.songs = response.data.songs;
      });
    },
    setBreadCrumbs: function setBreadCrumbs() {
      var _this3 = this;

      axios.get("/artists/".concat(this.artistId)).then(function (response) {
        _this3.breadCrumbs.push({
          text: response.data.artist.name,
          disabled: true
        });
      });
    },
    close: function close() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    save: function save() {
      var _this4 = this;

      if (this.$refs.form.validate()) {
        axios.post("/artists/".concat(this.artistId, "/songs"), this.newSong).then(function (response) {
          if (response.status == 200) {
            _this4.close();

            _this4.getSongs();
          }
        });
      }
    },
    clickRow: function clickRow(e) {
      this.$router.push({
        path: "/vue/songs/".concat(e.id)
      });
    },
    postIndexLink: function postIndexLink(item) {
      this.$router.push({
        path: "/vue/songs/".concat(item.id)
      });
    }
  },
  mounted: function mounted() {
    this.getSongs();
    this.setBreadCrumbs();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.artist-show tr:hover td {\n  background: #f0f8ff;\n}\n.artist-show th {\n  background: #f5f5f5;\n}\n.song-link {\n  text-decoration: none;\n  color: inherit !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistShow.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

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
          _c("p", { staticClass: "text-h5 font-weight-bold" }, [
            _vm._v(_vm._s(_vm.artist.name)),
          ]),
          _vm._v(" "),
          _c("v-data-table", {
            staticClass: "elevation-1 artist-show",
            attrs: {
              items: _vm.songs,
              headers: _vm.headers,
              search: _vm.search,
              "sort-by": "name",
            },
            on: { "click:row": _vm.clickRow },
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
                                "\n              mdi-music-note\n            "
                              ),
                            ]),
                            _vm._v("\n            曲一覧\n          "),
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
                            on: {
                              "click:outside": _vm.close,
                              keydown: function ($event) {
                                if (
                                  !$event.type.indexOf("key") &&
                                  _vm._k(
                                    $event.keyCode,
                                    "esc",
                                    27,
                                    $event.key,
                                    ["Esc", "Escape"]
                                  )
                                ) {
                                  return null
                                }
                                return _vm.close.apply(null, arguments)
                              },
                            },
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
                                          "\n                新規曲\n                "
                                        ),
                                        _c("v-icon", { attrs: { right: "" } }, [
                                          _vm._v(
                                            "\n                  mdi-pencil-plus\n                "
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
                                  _c("span", { staticClass: "text-h5" }, [
                                    _vm._v(
                                      _vm._s(_vm.artist.name) + " の新規曲追加"
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-form",
                                  { ref: "form" },
                                  [
                                    _c(
                                      "v-card-text",
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
                                                    label: "曲名",
                                                    rules: [
                                                      _vm.rules.required,
                                                      _vm.rules.counter,
                                                      _vm.rules.exists,
                                                    ],
                                                    autofocus: "",
                                                  },
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
                                          "\n                  キャンセル\n                "
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
                                          "\n                  追加\n                "
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
              {
                key: "item.name",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "a",
                      {
                        staticClass: "font-weight-bold song-link",
                        on: {
                          click: function ($event) {
                            $event.stopPropagation()
                            return _vm.postIndexLink(item)
                          },
                        },
                      },
                      [_vm._v(_vm._s(item.name))]
                    ),
                  ]
                },
              },
            ]),
          }),
          _vm._v(" "),
          _c("v-breadcrumbs", {
            attrs: { items: _vm.breadCrumbs },
            scopedSlots: _vm._u([
              {
                key: "divider",
                fn: function () {
                  return [_c("v-icon", [_vm._v("mdi-chevron-right")])]
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
/* empty/unused harmony star reexport *//* harmony import */ var _ArtistShow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ArtistShow.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
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

/***/ "./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistShow.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/artists/ArtistShow.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistShow_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


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