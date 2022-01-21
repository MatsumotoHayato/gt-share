(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/songs/Ranking.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/songs/Ranking.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Ranking',
  data: function data() {
    return {
      songs: [],
      selectedSongs: [],
      selectedInstrumentId: 1,
      instruments: [],
      headers: [{
        text: '',
        value: 'rank',
        align: 'start',
        width: '5%',
        sortable: false
      }, {
        text: '曲名',
        value: 'name',
        align: 'start',
        width: '30%',
        sortable: false
      }, {
        text: 'アーティスト名',
        value: 'artist.name',
        align: 'start',
        width: '45%',
        sortable: false
      }, {
        text: '難易度',
        value: 'average_difficulty',
        align: 'start',
        width: '20%',
        sortable: false
      }]
    };
  },
  methods: {
    getSongs: function getSongs() {
      var _this = this;

      axios.get('/ranking').then(function (response) {
        _this.songs = response.data.songs;
        _this.instruments = response.data.instruments;

        _this.initFetchSongs();
      });
    },
    clickRow: function clickRow(e) {
      this.$router.push({
        path: "/vue/songs/".concat(e.id)
      });
    },
    fetchSongs: function fetchSongs(e) {
      this.selectedSongs = this.songs.filter(function (song) {
        return song.instrument_id === e;
      });
    },
    initFetchSongs: function initFetchSongs() {
      if (this.songs.length > 0) {
        this.selectedSongs = this.songs.filter(function (song) {
          return song.instrument_id === 1;
        });
      }
    }
  },
  mounted: function mounted() {
    this.getSongs();
  },
  watch: {
    selectedInstrumentId: function selectedInstrumentId(newValue) {
      this.fetchSongs(newValue);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/songs/Ranking.vue?vue&type=template&id=1dfb7b6c&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/songs/Ranking.vue?vue&type=template&id=1dfb7b6c& ***!
  \****************************************************************************************************************************************************************************************************************/
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
          _c("v-row", [
            _c("p", { staticClass: "text-h5 font-weight-bold" }, [
              _vm._v("簡単な曲ランキング"),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "3" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.instruments,
                      "item-value": "id",
                      "item-text": "name",
                      "prepend-icon": "mdi-guitar-acoustic",
                      label: "楽器を選択",
                      outlined: "",
                    },
                    model: {
                      value: _vm.selectedInstrumentId,
                      callback: function ($$v) {
                        _vm.selectedInstrumentId = $$v
                      },
                      expression: "selectedInstrumentId",
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
            staticClass: "elevation-1",
            attrs: { items: _vm.selectedSongs, headers: _vm.headers },
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
                                "\n                            mdi-crown\n                        "
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
                          staticClass: "mx-4",
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
                key: "item.rank",
                fn: function (ref) {
                  var index = ref.index
                  return [
                    _vm._v(
                      "\n                " +
                        _vm._s(index + 1) +
                        "\n            "
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

/***/ "./resources/js/components/songs/Ranking.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/songs/Ranking.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Ranking_vue_vue_type_template_id_1dfb7b6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ranking.vue?vue&type=template&id=1dfb7b6c& */ "./resources/js/components/songs/Ranking.vue?vue&type=template&id=1dfb7b6c&");
/* harmony import */ var _Ranking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ranking.vue?vue&type=script&lang=js& */ "./resources/js/components/songs/Ranking.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Ranking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Ranking_vue_vue_type_template_id_1dfb7b6c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Ranking_vue_vue_type_template_id_1dfb7b6c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/songs/Ranking.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/songs/Ranking.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/songs/Ranking.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Ranking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Ranking.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/songs/Ranking.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Ranking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/songs/Ranking.vue?vue&type=template&id=1dfb7b6c&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/songs/Ranking.vue?vue&type=template&id=1dfb7b6c& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Ranking_vue_vue_type_template_id_1dfb7b6c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Ranking.vue?vue&type=template&id=1dfb7b6c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/songs/Ranking.vue?vue&type=template&id=1dfb7b6c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Ranking_vue_vue_type_template_id_1dfb7b6c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Ranking_vue_vue_type_template_id_1dfb7b6c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);