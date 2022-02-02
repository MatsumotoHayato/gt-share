<template >
  <div>
    <div id="chart">
    <GChart
      :settings="{ packages: ['vegachart'], callback: ()=>{this.drawChart()} }"
      type="VegaChart"
      :data="chartData"
      :options="chartOptions"
    />
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

  export default {
    components: {
      GChart
    },
    data () {
      return {
              // Array will be automatically processed with visualization.arrayToDataTable function
        chartData: null,
        chartOptions: {
          'vega': {
            "$schema": "https://vega.github.io/schema/vega/v5.json",
            "width": 250,
            "height": 300,
            "autosize": "none",
            "signals": [
              {"name": "radius", "update": "90"}
            ],
            "data": [
              {
                "name": "table",
                "source": "datatable",
              },
              {
                "name": "keys",
                "source": "table",
                "transform": [
                  {
                    "type": "aggregate",
                    "groupby": ["key"]
                  }
                ]
              }
            ],
            "scales": [
              {
                "name": "angular",
                "type": "point",
                "range": {"signal": "[-PI, PI]"},
                "padding": 0.5,
                "domain": {"data": "table", "field": "key"}
              },
              {
                "name": "radial",
                "type": "linear",
                "range": {"signal": "[0, radius]"},
                "zero": true,
                "nice": false,
                "domain": [0, 5],
              }
            ],
            "encode": {
              "enter": {
                "x": {"signal": "width/2"},
                "y": {"signal": "height/2 + 20"}
              }
            },
            "marks": [
              {
                "type": "group",
                "name": "categories",
                "zindex": 1,
                "from": {
                  "facet": {"data": "table", "name": "facet", "groupby": ["category"]}
                },
                "marks": [
                  {
                    "type": "line",
                    "name": "category-line",
                    "from": {"data": "facet"},
                    "encode": {
                      "enter": {
                        "interpolate": {"value": "linear-closed"},
                        "x": {"signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))"},
                        "y": {"signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))"},
                        "stroke": {"value": "#B82E2E"},
                        "strokeWidth": {"value": 1.5},
                        "fill": {"value": "#B82E2E"},
                        "fillOpacity": {"value": 0.1}
                      }
                    }
                  },
                  // {
                  //   "type": "text",
                  //   "name": "value-text",
                  //   "from": {"data": "category-line"},
                  //   "encode": {
                  //     "enter": {
                  //       "x": {"signal": "datum.x + 14 * cos(scale('angular', datum.datum.key))"},
                  //       "y": {"signal": "datum.y + 14 * sin(scale('angular', datum.datum.key))"},
                  //       "text": {"signal": "datum.datum.value"},
                  //       "opacity": {"signal": "datum.datum.value > 0.01 ? 1 : 0"},
                  //       "align": {"value": "center"},
                  //       "baseline": {"value": "middle"},
                  //       "fontWeight": {"value": "bold"},
                  //       "fill": {"value": "#B82E2E"},
                  //     }
                  //   }
                  // }
                ]
              },
              {
                "type": "rule",
                "name": "radial-grid",
                "from": {"data": "keys"},
                "zindex": 0,
                "encode": {
                  "enter": {
                    "x": {"value": 0},
                    "y": {"value": 0},
                    "x2": {"signal": "radius * cos(scale('angular', datum.key))"},
                    "y2": {"signal": "radius * sin(scale('angular', datum.key))"},
                    "stroke": {"value": "lightgray"},
                    "strokeWidth": {"value": 1}
                  }
                }
              },
              {
                "type": "text",
                "name": "key-label",
                "from": {"data": "keys"},
                "zindex": 1,
                "encode": {
                  "enter": {
                    "x": {"signal": "(radius + 11) * cos(scale('angular', datum.key))"},
                    "y": [
                      {
                        "test": "sin(scale('angular', datum.key)) > 0",
                        "signal": "5 + (radius + 11) * sin(scale('angular', datum.key))"
                      },
                      {
                        "test": "sin(scale('angular', datum.key)) < 0",
                        "signal": "-5 + (radius + 11) * sin(scale('angular', datum.key))"
                      },
                      {
                        "signal": "(radius + 11) * sin(scale('angular', datum.key))"
                      }
                    ],
                    "text": {"field": "key"},
                    "align":
                      {
                        "value": "center"
                      },
                    "baseline": [
                      {
                        "test": "scale('angular', datum.key) > 0", "value": "top"
                      },
                      {
                        "test": "scale('angular', datum.key) == 0", "value": "middle"
                      },
                      {
                        "value": "bottom"
                      }
                    ],
                    "fill": {"value": "black"},
                    "fontSize": {"value": 12}
                  }
                }
              },
              {
                "type": "line",
                "name": "twenty-line",
                "from": {"data": "keys"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "linear-closed"},
                    "x": {"signal": "0.2 * radius * cos(scale('angular', datum.key))"},
                    "y": {"signal": "0.2 * radius * sin(scale('angular', datum.key))"},
                    "stroke": {"value": "lightgray"},
                    "strokeWidth": {"value": 1}
                  }
                }
              },
              {
                "type": "line",
                "name": "fourty-line",
                "from": {"data": "keys"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "linear-closed"},
                    "x": {"signal": "0.4 * radius * cos(scale('angular', datum.key))"},
                    "y": {"signal": "0.4 * radius * sin(scale('angular', datum.key))"},
                    "stroke": {"value": "lightgray"},
                    "strokeWidth": {"value": 1}
                  }
                }
              },
              {
                "type": "line",
                "name": "sixty-line",
                "from": {"data": "keys"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "linear-closed"},
                    "x": {"signal": "0.6 * radius * cos(scale('angular', datum.key))"},
                    "y": {"signal": "0.6 * radius * sin(scale('angular', datum.key))"},
                    "stroke": {"value": "lightgray"},
                    "strokeWidth": {"value": 1}
                  }
                }
              },
              {
                "type": "line",
                "name": "eighty-line",
                "from": {"data": "keys"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "linear-closed"},
                    "x": {"signal": "0.8 * radius * cos(scale('angular', datum.key))"},
                    "y": {"signal": "0.8 * radius * sin(scale('angular', datum.key))"},
                    "stroke": {"value": "lightgray"},
                    "strokeWidth": {"value": 1}
                  }
                }
              },
              {
                "type": "line",
                "name": "outer-line",
                "from": {"data": "radial-grid"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "linear-closed"},
                    "x": {"field": "x2"},
                    "y": {"field": "y2"},
                    "stroke": {"value": "lightgray"},
                    "strokeWidth": {"value": 1}
                  }
                }
              }
            ]
          }
        }
      }
    },
    methods: {
          drawChart() {
            this.chartData = new google.visualization.DataTable()
            this.chartData.addColumn({type: 'string', 'id': 'key'})
            this.chartData.addColumn({type: 'number', 'id': 'value'})

            // For each orgchart box, provide the name, manager, and tooltip to show.
            this.chartData.addRows([
              ["簡単さ", 4.0],
              ["耳コピしやすさ", 5.0],
              ["覚えやすさ", 3.0],
              ["必要機材の揃えやすさ", 1.0],
              ["演奏時の楽しさ", 2.5],
            ])

                // Create the chart.
            var chart = new google.visualization.VegaChart(document.getElementById('chart'));
            // Draw the chart, setting the allowHtml option to true for the tooltips.
            chart.draw(this.chartData, {allowHtml:true});

          }
      },

  }

</script>