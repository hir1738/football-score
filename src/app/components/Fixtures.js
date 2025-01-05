'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchFixturesByDate } from '../utils/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar as CalendarIcon, MapPin, Timer, Trophy, Users } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

export default function Fixtures() {
  const [date, setDate] = useState(new Date())

  const { data, isLoading, isError } = useQuery({
    queryKey: ['fixtures', format(date, 'yyyy-MM-dd')],
    queryFn: () => fetchFixturesByDate(format(date, 'yyyy-MM-dd')),
    enabled: !!date,
    retry: 1,
  })

  const formatMatchTime = (dateString) => {
    return format(new Date(dateString), 'h:mm a')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid gap-6 md:grid-cols-[350px_1fr]">
          <div className="space-y-6">
            <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CalendarIcon className="h-6 w-6 text-blue-500" />
                  <span>Match Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-xl">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
                      {data?.data?.length || 0}
                    </div>
                    <div className="text-sm text-center text-blue-600 dark:text-blue-400 font-medium">
                      Matches
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-xl">
                    <div className="flex items-center justify-center mb-2">
                      <Timer className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="text-3xl font-bold text-center text-purple-600 dark:text-purple-400">
                      90
                    </div>
                    <div className="text-sm text-center text-purple-600 dark:text-purple-400 font-medium">
                      Minutes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-500" />
                    <span>Fixtures for {format(date, 'EEEE, MMMM d, yyyy')}</span>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    {data?.data?.length || 0} Matches
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {!data?.data?.length ? (
                  <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                    No fixtures scheduled for this date
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
                    {data.data.map((fixture) => (
                      <Card key={fixture.id} className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-4">
                            <Badge className="w-fit" variant="secondary">
                              <Clock className="h-3 w-3 mr-1 text-blue-500" />
                              {formatMatchTime(fixture.starting_at)}
                            </Badge>

                            <div className="space-y-3">
                              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {fixture.name.split(' vs ')[0]}
                                </div>
                                <div className="text-sm text-blue-500 font-medium my-1">vs</div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {fixture.name.split(' vs ')[1]}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <Timer className="h-4 w-4 mr-1 text-blue-500" />
                                  {fixture.length}min
                                </div>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                  {fixture.leg}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}