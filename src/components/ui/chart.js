"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, Rectangle, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } from "recharts"

import { cn } from "../../lib/utils"

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => (
  <div
    data-chart={id}
    ref={ref}
    className={cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-polar-grid_[stroke=ccc]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-border [&_.recharts-radial-bar-sector]:fill-primary [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector[stroke*=%23]]:stroke-border [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className)}
    {...props}
  >
    <ChartContext.Provider value={{ id, config }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </ChartContext.Provider>
  </div>
))
ChartContainer.displayName = "Chart"

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef(({
  label,
  labelClassName,
  indicator = "dot",
  hideLabel,
  hideIndicator,
  className,
  ...props
}, ref) => {
  const { config } = useChart()
  const [item] = props.payload ?? []
  const key = `${item?.dataKey}`
  const itemConfig = config?.[key]

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !item) {
      return null
    }
    if (label) {
      return <div className={cn("font-medium", labelClassName)}>{label}</div>
    }
    if (itemConfig?.label) {
      return <div className={cn("font-medium", labelClassName)}>{itemConfig.label}</div>
    }
    return null
  }, [item, label, labelClassName, itemConfig, hideLabel])

  const nestLabel = React.useMemo(() => {
    return (
      item &&
      "payload" in item &&
      typeof item.payload === "object" &&
      item.payload &&
      "nested" in item.payload &&
      Array.isArray(item.payload.nested)
    )
  }, [item])

  if (!props.active || !props.payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}
    >
      {!hideLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {props.payload.map((item, i) => {
          const key = `${item.dataKey}`
          const itemConfig = config?.[key]
          const indicatorColor = itemConfig?.color || item.color

          return (
            <div
              key={item.dataKey}
              className={cn("flex w-full items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", itemConfig?.icon ? "justify-start" : "justify-between")}
            >
              {itemConfig?.icon ? (
                <itemConfig.icon />
              ) : !hideIndicator ? (
                <div
                  className={cn("h-1 w-1 shrink-0 rounded-[2px]", indicator === "dot" && "rounded-full", indicator === "line" && "h-1 w-2.5", indicator === "dashed" && "my-0.5 h-0 w-2.5 border-t border-dashed")}
                  style={{
                    backgroundColor: indicatorColor,
                  }}
                />
              ) : null}
              <div className={cn("flex-1", nestLabel && "[&>div]:pl-2.5")}>
                <div className="grid flex-1 grid-cols-2 justify-between gap-x-2">
                  <span className="font-medium text-muted-foreground">{itemConfig?.label || item.name}</span>
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {item.value.toLocaleString()}
                  </span>
                </div>
                {nestLabel ? item.payload.nested.map((nestedItem) => {
                  const nestedItemConfig = config?.[nestedItem.dataKey] || {}
                  return (
                    <div
                      key={nestedItem.dataKey}
                      className="grid grid-cols-2 gap-x-2"
                    >
                      <span className="font-medium text-muted-foreground">{nestedItemConfig.label || nestedItem.name}</span>
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {nestedItem.value.toLocaleString()}
                      </span>
                    </div>
                  )
                }) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = ChartTooltipContent

const ChartLegendContent = React.forwardRef(({ className, ...props }, ref) => {
  const { config } = useChart()

  if (!config) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-x-4", className)}
      {...props}
    >
      {Object.entries(config).map(([key, itemConfig]) => {
        const { label, color, icon: Icon } = itemConfig
        if (!label) {
          return null
        }

        return (
          <div
            key={key}
            className="flex items-center gap-1.5 text-xs"
          >
            {Icon ? (
              <Icon
                className="h-3 w-3"
                style={{
                  color: color
                }}
              />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: color
                }}
              />
            )}
            {label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"


export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartContext, useChart, Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, Rectangle, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis } 