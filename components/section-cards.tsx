"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface SectionCard {
  title: string
  value: string | number
  description?: string
  trend?: {
    direction: "up" | "down"
    value: string
    label?: string
  }
  footer?: {
    primary: string
    secondary?: string
  }
  icon?: React.ReactNode
}

interface SectionCardsProps {
  cards: SectionCard[]
  layout?: "1x4" | "2x2" | "1x3" | "auto"
}

export function SectionCards({ cards, layout = "auto" }: SectionCardsProps) {
  const getGridClass = () => {
    switch (layout) {
      case "1x4":
        return "grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
      case "2x2":
        return "grid-cols-1 @xl/main:grid-cols-2"
      case "1x3":
        return "grid-cols-1 @xl/main:grid-cols-2 @4xl/main:grid-cols-3"
      case "auto":
      default:
        return "grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
    }
  }

  return (
    <div
      className={` dark:*:data-[slot=card]:bg-card grid gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ${getGridClass()}`}
    >
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            {card.trend && (
              <CardAction>
                <Badge variant="outline">
                  {card.trend.direction === "up" ? (
                    <IconTrendingUp />
                  ) : (
                    <IconTrendingDown />
                  )}
                  {card.trend.value}
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          {(card.footer || card.trend) && (
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              {card.trend && (
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.trend.label ||
                    `Trending ${card.trend.direction} this period`}
                  {card.trend.direction === "up" ? (
                    <IconTrendingUp className="size-4" />
                  ) : (
                    <IconTrendingDown className="size-4" />
                  )}
                </div>
              )}
              {card.footer && (
                <>
                  {card.footer.primary && (
                    <div className="line-clamp-1 font-medium">
                      {card.footer.primary}
                    </div>
                  )}
                  {card.footer.secondary && (
                    <div className="text-muted-foreground">
                      {card.footer.secondary}
                    </div>
                  )}
                </>
              )}
              {card.description && !card.footer && (
                <div className="text-muted-foreground">{card.description}</div>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}