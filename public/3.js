(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumShow.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _posts_DeleteForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../posts/DeleteForm */ "./resources/js/components/posts/DeleteForm.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'ForumShow',
  components: {
    DeleteForm: _posts_DeleteForm__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      currentUser: {
        id: -1,
        name: 'ゲスト'
      },
      forum: [],
      owner: [],
      comments: [],
      snackbar: false,
      timeout: 4000,
      deleteDialog: false,
      search: '',
      newComment: {
        body: ''
      },
      deleteConfirmedComment: null,
      rules: {
        required: function required(value) {
          return !!value || '入力は必須です';
        },
        counter: function counter(value) {
          return (value || '').length <= 4000 || '4000文字以内で入力してください';
        }
      },
      breadCrumbs: [{
        text: 'ホーム',
        disabled: false,
        to: '/',
        exact: true
      }, {
        text: '掲示板',
        disabled: false,
        to: '/vue/forums',
        exact: true
      }]
    };
  },
  computed: {
    forumId: function forumId() {
      return this.$route.params.forumId;
    }
  },
  methods: {
    getForum: function getForum() {
      var _this = this;

      axios.get("/forums/".concat(this.forumId)).then(function (response) {
        if (response.data.user) {
          _this.currentUser = response.data.user;
        }

        _this.forum = response.data.forum;
        _this.owner = response.data.owner;
        _this.comments = response.data.comments;
      });
    },
    setBreadCrumbs: function setBreadCrumbs() {
      var _this2 = this;

      axios.get("/forums/".concat(this.forumId)).then(function (response) {
        _this2.breadCrumbs.push({
          text: response.data.forum.title,
          disabled: true
        });
      });
    },
    save: function save() {
      var _this3 = this;

      if (this.$refs.form.validate()) {
        axios.post("/forums/".concat(this.forumId), this.newComment).then(function (response) {
          if (response.status == 200) {
            _this3.$refs.form.reset();

            _this3.getForum();
          }
        })["catch"](function (error) {
          if (error.response.status == 401) {
            _this3.snackbar = true;
          }
        });
      }
    },
    closeDelete: function closeDelete() {
      this.deleteDialog = false;
      this.deleteConfirmedComment = null;
    },
    openDeleteForum: function openDeleteForum() {
      this.deleteDialog = true;
    },
    openDeleteComment: function openDeleteComment(comment) {
      this.deleteDialog = true;
      this.deleteConfirmedComment = comment;
    },
    deletePost: function deletePost() {
      var _this4 = this;

      // スレッドの削除
      if (this.deleteConfirmedComment === null) {
        axios["delete"]("/forums/".concat(this.forumId), this.forum).then(function (response) {
          if (response.status == 200) {
            _this4.$router.push({
              path: '/vue/forums'
            });
          }
        });
      } else {
        // コメントの削除
        axios["delete"]("/comments/".concat(this.deleteConfirmedComment.id), this.deleteConfirmedComment).then(function (response) {
          if (response.status == 200) {
            _this4.closeDelete();

            _this4.getForum();
          }
        });
      }
    }
  },
  created: function created() {
    this.getForum();
    this.setBreadCrumbs();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/DeleteForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/posts/DeleteForm.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'DeleteForm',
  props: ['deleteDialog', 'post'],
  data: function data() {
    return {
      deleteCheck: false
    };
  },
  methods: {
    close: function close() {
      this.$refs.form.reset();
      this.$emit('close');
    },
    deletePost: function deletePost() {
      this.$refs.form.reset();
      this.$emit('delete');
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.questioner[data-v-f491e1e8] {\n  margin-right: auto;\n}\n.answerer[data-v-f491e1e8] {\n  margin-left: auto;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/forums/ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
          _c("DeleteForm", {
            attrs: { deleteDialog: _vm.deleteDialog },
            on: { delete: _vm.deletePost, close: _vm.closeDelete },
          }),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "align-center" },
            [
              _c(
                "p",
                { staticClass: "text-h5 font-weight-bold" },
                [
                  _c("v-chip", { staticClass: "ma-2", attrs: { large: "" } }, [
                    _vm._v(
                      "\n          " + _vm._s(_vm.forum.genre) + "\n        "
                    ),
                  ]),
                  _vm._v("\n        " + _vm._s(_vm.forum.title) + "\n      "),
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _vm.owner.id === _vm.currentUser.id
                ? _c(
                    "v-btn",
                    {
                      attrs: { outlined: "", color: "red" },
                      on: {
                        click: function ($event) {
                          return _vm.openDeleteForum()
                        },
                      },
                    },
                    [
                      _vm._v("\n        削除\n        "),
                      _c("v-icon", { attrs: { right: "" } }, [
                        _vm._v("\n          mdi-delete\n        "),
                      ]),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "mr-auto",
              staticStyle: {
                border: "1px solid #E0E0E0",
                padding: "32px 48px",
              },
            },
            [
              _c(
                "v-card",
                {
                  staticClass: "mr-auto",
                  attrs: { color: "green accent-1", "max-width": "900" },
                },
                [
                  _c(
                    "v-card-title",
                    [
                      _c("v-icon", { attrs: { left: "", large: "" } }, [
                        _vm._v("\n            mdi-account-circle\n          "),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "font-weight-bold" }, [
                        _vm._v(_vm._s(_vm.owner.name)),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    { staticClass: "text-subtitle-1 black--text" },
                    [
                      _vm._v(
                        "\n          " + _vm._s(_vm.forum.body) + "\n        "
                      ),
                    ]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _vm._l(_vm.comments, function (comment) {
                return _c(
                  "v-card",
                  {
                    key: comment.id,
                    staticClass: "mt-8",
                    class: [
                      comment.user_id === _vm.owner.id
                        ? "questioner"
                        : "answerer",
                    ],
                    attrs: { color: "green accent-1", "max-width": "900" },
                  },
                  [
                    _c(
                      "v-card-title",
                      [
                        _c("v-icon", { attrs: { left: "", large: "" } }, [
                          _vm._v(
                            "\n            mdi-account-circle\n          "
                          ),
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "font-weight-bold" }, [
                          _vm._v(_vm._s(comment.user.name)),
                        ]),
                        _vm._v(" "),
                        _c("v-spacer"),
                        _vm._v(" "),
                        comment.user_id === _vm.currentUser.id
                          ? _c(
                              "v-btn",
                              {
                                attrs: { icon: "" },
                                on: {
                                  click: function ($event) {
                                    return _vm.openDeleteComment(comment)
                                  },
                                },
                              },
                              [_c("v-icon", [_vm._v("mdi-close")])],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-card-text",
                      { staticClass: "text-subtitle-1 black--text" },
                      [
                        _vm._v(
                          "\n          " + _vm._s(comment.body) + "\n        "
                        ),
                      ]
                    ),
                  ],
                  1
                )
              }),
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
                  _c("v-textarea", {
                    staticClass: "mt-16 ml-auto",
                    staticStyle: { "max-width": "900px" },
                    attrs: {
                      "background-color": "grey lighten-5",
                      label: "新しくコメントを入力",
                      rules: [_vm.rules.counter],
                      "auto-grow": "",
                      solo: "",
                    },
                    model: {
                      value: _vm.newComment.body,
                      callback: function ($$v) {
                        _vm.$set(_vm.newComment, "body", $$v)
                      },
                      expression: "newComment.body",
                    },
                  }),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "mr-4",
                          attrs: { color: "primary", rounded: "" },
                          on: { click: _vm.save },
                        },
                        [
                          _vm._v("\n            送信\n            "),
                          _c(
                            "v-icon",
                            { staticClass: "ml-3", attrs: { right: "" } },
                            [_vm._v("\n              mdi-send\n            ")]
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
            2
          ),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/DeleteForm.vue?vue&type=template&id=651a6c94&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/posts/DeleteForm.vue?vue&type=template&id=651a6c94& ***!
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
    "v-dialog",
    {
      attrs: { "max-width": "600px" },
      on: {
        "click:outside": _vm.close,
        keydown: function ($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
          ) {
            return null
          }
          return _vm.close.apply(null, arguments)
        },
      },
      model: {
        value: _vm.deleteDialog,
        callback: function ($$v) {
          _vm.deleteDialog = $$v
        },
        expression: "deleteDialog",
      },
    },
    [
      _c(
        "v-card",
        [
          _c("v-card-title", [
            _c("span", { staticClass: "text-h5" }, [_vm._v("削除確認")]),
          ]),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-form",
                { ref: "form" },
                [
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        [
                          _c("v-checkbox", {
                            attrs: { label: "本当にこの投稿を削除しますか？" },
                            model: {
                              value: _vm.deleteCheck,
                              callback: function ($$v) {
                                _vm.deleteCheck = $$v
                              },
                              expression: "deleteCheck",
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
              _c(
                "v-btn",
                {
                  attrs: { color: "blue darken-1", text: "" },
                  on: { click: _vm.close },
                },
                [_vm._v("\n        キャンセル\n      ")]
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _vm.deleteCheck
                ? _c(
                    "v-btn",
                    {
                      attrs: { color: "red", text: "" },
                      on: { click: _vm.deletePost },
                    },
                    [_vm._v("\n        削除する\n      ")]
                  )
                : _c("v-btn", { attrs: { disabled: "", text: "" } }, [
                    _vm._v("\n        削除する\n      "),
                  ]),
            ],
            1
          ),
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

/***/ "./resources/js/components/forums/ForumShow.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/forums/ForumShow.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForumShow_vue_vue_type_template_id_f491e1e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true& */ "./resources/js/components/forums/ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true&");
/* harmony import */ var _ForumShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForumShow.vue?vue&type=script&lang=js& */ "./resources/js/components/forums/ForumShow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ForumShow_vue_vue_type_style_index_0_id_f491e1e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css& */ "./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ForumShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForumShow_vue_vue_type_template_id_f491e1e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForumShow_vue_vue_type_template_id_f491e1e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "f491e1e8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/forums/ForumShow.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/forums/ForumShow.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/forums/ForumShow.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumShow.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_style_index_0_id_f491e1e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=style&index=0&id=f491e1e8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_style_index_0_id_f491e1e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_style_index_0_id_f491e1e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_style_index_0_id_f491e1e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_style_index_0_id_f491e1e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/forums/ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/forums/ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_template_id_f491e1e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/forums/ForumShow.vue?vue&type=template&id=f491e1e8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_template_id_f491e1e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForumShow_vue_vue_type_template_id_f491e1e8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/posts/DeleteForm.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/posts/DeleteForm.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeleteForm_vue_vue_type_template_id_651a6c94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeleteForm.vue?vue&type=template&id=651a6c94& */ "./resources/js/components/posts/DeleteForm.vue?vue&type=template&id=651a6c94&");
/* harmony import */ var _DeleteForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeleteForm.vue?vue&type=script&lang=js& */ "./resources/js/components/posts/DeleteForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DeleteForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeleteForm_vue_vue_type_template_id_651a6c94___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DeleteForm_vue_vue_type_template_id_651a6c94___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/posts/DeleteForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/posts/DeleteForm.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/posts/DeleteForm.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DeleteForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/DeleteForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/posts/DeleteForm.vue?vue&type=template&id=651a6c94&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/posts/DeleteForm.vue?vue&type=template&id=651a6c94& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteForm_vue_vue_type_template_id_651a6c94___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DeleteForm.vue?vue&type=template&id=651a6c94& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/posts/DeleteForm.vue?vue&type=template&id=651a6c94&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteForm_vue_vue_type_template_id_651a6c94___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DeleteForm_vue_vue_type_template_id_651a6c94___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);