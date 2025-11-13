import React from 'react'
import MainWrapper from './main-wrapper'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { ChartPie } from '@/components/chart'
import { DatePickerWithRange } from '@/components/ui/date-range'

const Reports = () => {
  return (
    <>
      <DatePickerWithRange />
      <div className='mx-4 mt-2'>
        <ChartPie />
      </div>
    </>
  )
}

export default Reports