import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.less';
import { Card } from '@/src/components';
import mapData from '@/src/utils/map';
import { useEchart } from '@/src/hooks';
const GeographicalDistribution = () => {
  const { ref, setOption } = useEchart();
  useEffect(() => {
    echarts.registerMap('china', mapData as any);


    // const data = [
    //   {
    //     'name': '梅州',
    //     'value': [
    //       116.1,
    //       24.55,
    //       25,
    //     ],
    //   },
    // ];

    // const option = {
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: function(params) {
    //       return `${params.name } : ${ params.value[2]}`;
    //     },
    //   },
    //   visualMap: {
    //     min: 0,
    //     max: 200,
    //     left: 20,
    //     bottom: 20,
    //     calculable: true,
    //     text: ['高', '低'],
    //     inRange: {
    //       color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)'],
    //     },
    //     textStyle: {
    //       color: '#fff',
    //     },
    //   },
    //   geo: {
    //     map: 'china',
    //     label: {
    //       emphasis: {
    //         show: false,
    //       },
    //     },
    //     itemStyle: {
    //       normal: {
    //         areaColor: 'rgb(19, 91, 153)',
    //         borderColor: 'rgb(9, 54, 95)',
    //       },
    //       emphasis: {
    //         areaColor: 'rgb(10, 105, 187)',
    //       },
    //     },
    //   },
    //   series: [
    //     {
    //       name: '人数',
    //       type: 'scatter',
    //       coordinateSystem: 'geo',
    //       data: data,
    //       symbolSize: 12,
    //       label: {
    //         normal: {
    //           show: false,
    //         },
    //         emphasis: {
    //           show: false,
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: '#05C3F9',
    //           },
    //         },
    //       },
    //       itemStyle: {
    //         emphasis: {
    //           borderColor: '#fff',
    //           borderWidth: 1,
    //         },
    //       },
    //     },

    //     {
    //       type: 'map',
    //       map: 'china',
    //       geoIndex: 0,
    //       aspectScale: 1, // 长宽比
    //       tooltip: {
    //         show: false,
    //       },
    //     },
    //   ],
    // };

    // setOption(option);
    const data = [
      {
        'name': '梅州',
        'value': [
          116.1,
          24.55,
          2500000,
        ],
      },
    ];

    const option = {
      backgroundColor: '#0F1C3C',
      tooltip: {
        show: true,
        formatter: function(params) {
          if (params.value && params.value.length > 1) {
            return `&nbsp;&nbsp;${ params.name }&nbsp;&nbsp;&nbsp;${ params.value[2] }人&nbsp;&nbsp;`;
          } else {
            return null;
          }
        },

      },

      geo: {
        map: 'china',
        show: true,
        roam: false,
        label: {
          emphasis: {
            show: false,
          },
        },
        layoutSize: '100%',
        itemStyle: {
          normal: {
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#00F6FF',
            }, {
              offset: 1,
              color: '#53D9FF',
            }], false),
            borderWidth: 3,
            shadowColor: 'rgba(10,76,139,1)',
            shadowOffsetY: 0,
            shadowBlur: 60,
          },
        },
      },
      series: [{
        type: 'map',
        map: 'china',
        aspectScale: 0.75,
        label: {
          normal: {
            show: false,
            color: 'white',
          },
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#073684', // 0% 处的颜色
              }, {
                offset: 1,
                color: '#061E3D', // 100% 处的颜色
              }],
            },
            borderColor: '#215495',
            borderWidth: 1,
          },
          emphasis: {
            areaColor: {

              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#073684', // 0% 处的颜色
              }, {
                offset: 1,
                color: '#061E3D', // 100% 处的颜色
              }],
            },
          },
        },
      },
      // {
      //   type: 'scatter',
      //   coordinateSystem: 'geo',
      //   rippleEffect: {
      //     brushType: 'stroke',
      //   },
      //   showEffectOn: 'render',
      //   itemStyle: {
      //     normal: {
      //       color: {
      //         type: 'radial',
      //         x: 0.5,
      //         y: 0.5,
      //         r: 0.5,
      //         colorStops: [{
      //           offset: 0,
      //           color: 'rgba(5,80,151,0.2)',
      //         }, {
      //           offset: 0.8,
      //           color: 'rgba(5,80,151,0.8)',
      //         }, {
      //           offset: 1,
      //           color: 'rgba(0,108,255,0.7)',
      //         }],
      //         global: false, // 缺省为 false
      //       },
      //     },
      //   },
      //   label: {
      //     normal: {
      //       show: true,
      //       color: '#fff',
      //       fontWeight: 'bold',
      //       position: 'inside',
      //       formatter: function(para) {
      //         return `{cnNum|${ para.data.value[2] }}`;
      //       },
      //       rich: {
      //         cnNum: {
      //           fontSize: 10,
      //           color: '#D4EEFF',
      //         },
      //       },
      //     },
      //   },
      //   symbol: 'circle',
      //   symbolSize: function(vals) {
      //     return `${vals[2]}`.length * 6.2 + 10;
      //   },
      //   data: data,
      //   zlevel: 1,
      // },
      {

        // 设置为分散点
        type: 'scatter',
        // series坐标系类型
        coordinateSystem: 'geo',
        // 设置图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        symbol: 'pin',
        // //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10
        // 气泡字体设置
        label: {
          normal: {
            show: true, // 是否显示
            textStyle: {
              color: '#fff', // 字体颜色
              fontSize: 8, // 字体大小
            },
            // 返回气泡数据
            formatter(value){
              return value.data.value[2];
            },
          },
        },
        itemStyle: {
          normal: {
            color: '#1E90FF', // 标志颜色
          },
        },
        // 给区域赋值
        data: data,
        symbolSize: function(vals) {
          return `${vals[2]}`.length * 7 + 10;
        },
        showEffectOn: 'render', // 配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
        rippleEffect: { // 涟漪特效相关配置。
          brushType: 'stroke', // 波纹的绘制方式，可选 'stroke' 和 'fill'
        },
        hoverAnimation: true, // 是否开启鼠标 hover 的提示动画效果。
        zlevel: 1, // 所属图形的 zlevel 值
      },
      ],
    };

    setOption(option);

  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.map}>
        <Card title="省份排行榜">
          <div
            className={styles.body}
            ref={ref} />
        </Card>
      </div>
      <div className={styles.top}>
        <Card title="省份排行榜">
          <div
            className={styles.body}/>
        </Card>
      </div>
    </div>
  );
};

export default GeographicalDistribution;
