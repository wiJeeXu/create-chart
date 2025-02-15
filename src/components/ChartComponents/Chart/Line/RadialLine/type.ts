export type TRadialLineConfig = {
  grid: ComponentData.ComponentGrid;
  legend: Omit<ComponentData.ComponentLegend, 'type'>;
  xAxis: ComponentData.ComponentXAxis;
  yAxis: ComponentData.ComponentYAxis & {
    splitLine: {
      show: boolean;
      lineStyle: ComponentData.ComponentLineGroupConfig;
    };
  };
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  series: {
    smooth: boolean;
    label: ComponentData.ComponentSeriesLabelConfig & {
      rotate: number;
    };
    itemStyle: {
      color: ComponentData.TColorConfig[];
      decal: {
        symbol: ComponentData.ComponentSymbol;
        symbolSize: number;
      }[];
    };
    areaStyle: {
      color: ComponentData.TColorConfig[];
    };
    lineStyle: {
      color: ComponentData.TGradientColorConfig;
      width: number;
      type: ComponentData.ComponentLineStyle;
    }[];
  };
  animation: ComponentData.ComponentChartAnimationConfig;
  condition: ComponentData.ComponentConditionConfig;
};
