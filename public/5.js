(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumIndex.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ForumIndex',
  data: function data() {
    return {
      forums: [],
      selectedForums: [],
      headers: [{
        text: 'タイトル',
        value: 'title',
        align: 'start',
        width: '50%',
        sortable: false
      }, {
        text: 'ジャンル',
        value: 'genre',
        align: 'start',
        width: '15%',
        filterable: false,
        sortable: false
      }, {
        text: 'コメント数',
        value: 'comments_count',
        align: 'start',
        width: '15%',
        filterable: false
      }, {
        text: '投稿日時',
        value: 'updated_at',
        align: 'start',
        width: '20%',
        filterable: false
      }],
      genres: [{
        text: '質問',
        value: '質問'
      }, {
        text: 'リクエスト',
        value: 'リクエスト'
      }, {
        text: 'サイトへの要望',
        value: 'サイトへの要望'
      }],
      selectedGenres: ['質問', 'リクエスト', 'サイトへの要望'],
      dialog: false,
      snackbar: false,
      timeout: 4000,
      search: '',
      newForum: {
        title: '',
        genre: '質問',
        body: ''
      },
      rules: {
        required: function required(value) {
          return !!value || '入力は必須です';
        },
        counter: function counter(value) {
          return (value || '').length <= 50 || '50文字以内で入力してください';
        },
        body_counter: function body_counter(value) {
          return (value || '').length <= 4000 || '4000文字以内で入力してください';
        }
      }
    };
  },
  methods: {
    getForums: function getForums() {
      var _this = this;

      axios.get('/forums').then(function (response) {
        _this.forums = response.data;
        _this.selectedForums = response.data;
      });
    },
    fetchForums: function fetchForums() {
      var _this2 = this;

      this.selectedForums = this.forums.filter(function (forum) {
        return _this2.selectedGenres.includes(forum.genre);
      });
    },
    close: function close() {
      this.$refs.form.resetValidation();
      this.newForum = {
        title: '',
        genre: '質問',
        body: ''
      };
      this.dialog = false;
    },
    save: function save() {
      var _this3 = this;

      if (this.$refs.form.validate()) {
        axios.post('/forums', this.newForum).then(function (response) {
          if (response.status == 200) {
            _this3.close();

            _this3.getForums();
          }
        })["catch"](function (error) {
          _this3.snackbar = true;
        });
      }
    },
    clickRow: function clickRow(e) {
      this.$router.push({
        path: "/vue/forums/".concat(e.id)
      });
    },
    forumShowLink: function forumShowLink(item) {
      this.$router.push({
        path: "/vue/forums/".concat(item.id)
      });
    }
  },
  watch: {
    selectedGenres: function selectedGenres() {
      this.fetchForums();
    }
  },
  created: function created() {
    this.getForums();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.forum-index tr:hover td {\n  background: #f0f8ff;\n}\n.forum-index th {\n  background: #f5f5f5;\n}\n.forum-link {\n  text-decoration: none;\n  color: inherit !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumIndex.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=template&id=751bd953&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumIndex.vue?vue&type=template&id=751bd953& ***!
  \********************************************************************************************************************************************************************************************************************/
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
          _c("p", { staticClass: "text-h5 font-weight-bold" }, [
            _vm._v("掲示板"),
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "5" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.genres,
                      "item-text": "text",
                      "item-value": "value",
                      label: "表示するジャンル",
                      chips: "",
                      "deletable-chips": "",
                      outlined: "",
                      multiple: "",
                    },
                    model: {
                      value: _vm.selectedGenres,
                      callback: function ($$v) {
                        _vm.selectedGenres = $$v
                      },
                      expression: "selectedGenres",
                    },
                  }),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("v-data-table", {
            staticClass: "elevation-1 forum-index",
            attrs: {
              items: _vm.selectedForums,
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
                              _vm._v("\n              mdi-forum\n            "),
                            ]),
                            _vm._v("\n            スレッド一覧\n          "),
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
                            label: "タイトルを検索",
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
                            attrs: { "max-width": "800px", persistent: "" },
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
                                          "\n                新規スレッド\n                "
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
                                    _vm._v("新規スレッド追加"),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-form",
                                  {
                                    ref: "form",
                                    on: {
                                      submit: function ($event) {
                                        $event.preventDefault()
                                      },
                                    },
                                  },
                                  [
                                    _c(
                                      "v-card-text",
                                      [
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "8" } },
                                              [
                                                _c("v-text-field", {
                                                  attrs: {
                                                    label: "タイトル",
                                                    rules: [
                                                      _vm.rules.required,
                                                      _vm.rules.counter,
                                                    ],
                                                    autofocus: "",
                                                  },
                                                  model: {
                                                    value: _vm.newForum.title,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.newForum,
                                                        "title",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "newForum.title",
                                                  },
                                                }),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c("v-spacer"),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "3" } },
                                              [
                                                _c("v-select", {
                                                  attrs: {
                                                    items: _vm.genres,
                                                    "item-text": "text",
                                                    "item-value": "value",
                                                    label: "ジャンル",
                                                  },
                                                  model: {
                                                    value: _vm.newForum.genre,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.newForum,
                                                        "genre",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "newForum.genre",
                                                  },
                                                }),
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c("v-spacer"),
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-row",
                                          [
                                            _c(
                                              "v-col",
                                              { attrs: { cols: "12" } },
                                              [
                                                _c("v-textarea", {
                                                  attrs: {
                                                    label: "内容",
                                                    rules: [
                                                      _vm.rules.required,
                                                      _vm.rules.body_counter,
                                                    ],
                                                    "auto-grow": "",
                                                    counter: "4000",
                                                  },
                                                  model: {
                                                    value: _vm.newForum.body,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.newForum,
                                                        "body",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "newForum.body",
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
                key: "item.title",
                fn: function (ref) {
                  var item = ref.item
                  return [
                    _c(
                      "a",
                      {
                        staticClass: "font-weight-bold forum-link",
                        on: {
                          click: function ($event) {
                            $event.stopPropagation()
                            return _vm.forumShowLink(item)
                          },
                        },
                      },
                      [_vm._v(_vm._s(item.title))]
                    ),
                  ]
                },
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

/***/ "./resources/js/components/forums/ForumIndex.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/forums/ForumIndex.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForumIndex_vue_vue_type_template_id_751bd953___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForumIndex.vue?vue&type=template&id=751bd953& */ "./resources/js/components/forums/ForumIndex.vue?vue&type=template&id=751bd953&");
/* harmony import */ var _ForumIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForumIndex.vue?vue&type=script&lang=js& */ "./resources/js/components/forums/ForumIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ForumIndex_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ForumIndex.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ForumIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForumIndex_vue_vue_type_template_id_751bd953___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForumIndex_vue_vue_type_template_id_751bd953___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/forums/ForumIndex.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/forums/ForumIndex.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/forums/ForumIndex.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumIndex.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumIndex.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/forums/ForumIndex.vue?vue&type=template&id=751bd953&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/forums/ForumIndex.vue?vue&type=template&id=751bd953& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_template_id_751bd953___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumIndex.vue?vue&type=template&id=751bd953& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumIndex.vue?vue&type=template&id=751bd953&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_template_id_751bd953___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumIndex_vue_vue_type_template_id_751bd953___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);