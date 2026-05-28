import React, { useEffect, useRef, useState, type ChangeEventHandler } from 'react';
import NotiImg from '../assets/notification.png'
import CourseIcon from '../assets/online-learning.png'
import { Button, Card, Progress, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts'
import { CardHeader } from '@/components/tailgrids/core/card';
import ComputerCourseIcon from '../assets/course.webp'
import type { ComponentRef, ElementRef } from 'react'


interface SwitchProps {
  checked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
}

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <label className="inline-flex items-center relative scale-50 cursor-pointer">
      <input className="peer hidden" id="toggle" type="checkbox" checked={checked} onChange={onChange} />
      <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md" />
      <svg height={0} width={100} viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]">
        <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z" />
      </svg>
      <svg height={512} width={512} viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]">
        <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z" />
      </svg>
    </label>
  );
}

const OverviewCard = () => {

  return (
    <Card className='bg-green-200 dark:bg-green-300 hover:scale-105
      transition shadow-md
      '>
      <h2 className='text-md flex gap-2 items-center'>
        <img
          src={CourseIcon}
          className='w-4'
        />
        <p>Courses Completed</p>
      </h2>
      <p className='text-3xl font-bold'>12</p>
      <div className='w-full bg-gray-200 h-2 rounded-full'>
        <div className='w-[30%] h-2 bg-green-400 rounded-full'></div>
      </div>
    </Card>
  )
}

const Overview = () => {

  return (
    <div className=''>
      <h2 className='font-bold text-2xl mb-4 '>
        Overview
      </h2>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
    </div>
  )
}

const ActivityBarChart = () => {

  return (
    <Card className='flex-1 rounded-xl shadow-md'>
      <div>Activity Hours</div>
      <div className='h-[250px] flex gap-4'>
        <div className='flex flex-col justify-between h-full
          text-gray-400
          '>
          <span>8h</span>
          <span>6h</span>
          <span>4h</span>
          <span>2h</span>
          <span>0</span>
        </div>
        <div className='flex gap-5 sm:gap-10'>

          <div className='h-[250px] transition hover:scale-105 w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>

          <div className='h-[250px] w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>
          <div className='h-[250px] w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>
          <div className='h-[250px] w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>
          <div className='h-[250px] w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>
          <div className='h-[250px] w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>
          <div className='h-[250px] w-2 bg-gray-200 rounded-full flex'>
            <div className='h-[50%] w-2 bg-blue-500 self-end rounded-full'>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between px-4'>
          <div>
            <h1 className='text-gray-400 text-sm'>Time Spent</h1>
            <span className='flex gap-2 items-center mt-2'>
              <span className='font-semibold text-lg'>60h</span>
              <span className='text-sm px-1.5 py-0.5 bg-gray-200 rounded-xl
                text-green-500
                '>75%</span>
            </span>
          </div>
          <div>
            <h1 className='text-gray-400 text-sm'>Time Spent</h1>
            <span className='flex gap-2 items-center mt-2'>
              <span className='font-semibold text-lg'>60h</span>
              <span className='text-sm px-1.5 py-0.5 bg-gray-200 rounded-xl
                text-green-500
                '>75%</span>
            </span>
          </div>
          <div>
            <h1 className='text-gray-400 text-sm'>Time Spent</h1>
            <span className='flex gap-2 items-center mt-2'>
              <span className='font-semibold text-lg'>60h</span>
              <span className='text-sm px-1.5 py-0.5 bg-gray-200 rounded-xl
                text-green-500
                '>75%</span>
            </span>
          </div>
        </div>

      </div>

      <div className=' hidden sm:flex gap-5 text-gray-400'>
        <span></span>
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className='flex sm:hidden gap-4.5 pl-3 text-gray-400'>
        <span></span>
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>
    </Card>
  )
}

type CoordinatePoint = [number, number];

const ActivityLineChart = () => {

  // 3. Generate data with explicit tuple return type
  const generateCoordinateData = (): CoordinatePoint[] => {
    return Array.from({ length: 30 }, (_, i) => [
      i + 1,
      parseFloat((Math.random() * 8).toFixed(1))
    ]);
  };

  // 4. Type your state using ApexOptions and ApexAxisChartSeries
  const [series] = useState<ApexCharts.ApexAxisChartSeries>([
    {
      name: 'Hours Worked',
      data: generateCoordinateData()
    }
  ]);

  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      id: 'strict-intervals',
      type: 'line',
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#3b82f6'],
    xaxis: {
      type: 'numeric',
      min: 0,
      max: 30,
      tickAmount: 3,
      labels: {
        style: { colors: '#6b7280' },
        formatter: (val) => Math.round(Number(val)).toString() // Safely cast and return string
      }
    },
    yaxis: {
      min: 0,
      max: 8,
      tickAmount: 4,
      labels: {
        style: { colors: '#6b7280' },
        formatter: (val) => `${val}h`
      }
    },
    tooltip: {
      x: {
        formatter: (val) => `Day ${val}`
      },
      y: {
        formatter: (val) => `${val} hours`
      }
    }
  });

  return (
    <Card className='lg:flex-1'>
      <CardHeader className='font-semibold text-xl '>Performance</CardHeader>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', maxWidth: '700px' }}>
        <Chart
          options={options}
          series={series}
          type="line"
          height={250}
          width={300}

        />
      </div>
      <div className='text-center text-gray-500'>January</div>
    </Card>
  )
}

const Activity = () => {

  return (
    <div className='flex flex-col lg:flex-row gap-4 '>
      <ActivityBarChart />
      <ActivityLineChart />
    </div>
  )
}

const CourseCard = () => {

  return (

    <Card
      className='shrink-0 cursor-pointer 
      hover:bg-slate-100 dark:hover:bg-slate-700 transition ease-in-out duration-300 
      relative group 
      '
    >
      <div>
        <img className='w-full group-hover:opacity-50 transition ease-in-out rounded-xl h-[250px] object-cover'
          src={ComputerCourseIcon}
        />
      </div>
      <div className='rounded-full self-start px-4 py-1 text-purple-400
            bg-gray-200'>
        frontend
      </div>
      <div className='w-full'>
        <div className='w-fit font-semibold text-lg'>
          Beginner Courses for Web Development
        </div>
      </div>
      <div>
        <Progress progress={45} color='purple'></Progress>
      </div>
      <div className='flex gap-4'>
        <div>
          <img src={CourseIcon}
            className='w-12 h-12 rounded-full'
          />
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold'>James</span>
          <span className='text-sm text-gray-400'>Software Development</span>
        </div>
      </div>
      <div className='absolute transition ease-in-out
        left-28 top-52 hidden group-hover:block
        '>
        <Button className='cursor-pointer'>Continue</Button>
      </div>
    </Card>
  )
}

const IncompleteCourses = () => {
  const scrollRef = useRef<ComponentRef<'div'>>(null);

  const handleScroll = (movement: 'left' | 'right') => {
    if (scrollRef.current) {
      if (movement === 'left')
        scrollRef.current.scrollLeft -= 350 + 16;
      else scrollRef.current.scrollLeft += 350 + 16;
    }

  }


  return (
    <div className=''>
      <div className='flex justify-between xl:max-w-274.5 xl:px-2 items-center'>
        <h1 className='font-semibold text-xl my-4'>Continue Courses</h1>

        <div className='xl:flex hidden gap-4 text-2xl text-gray-400'>
          <button
            onClick={() => { handleScroll('left'); }}
            className='border border-gray-300 hover:bg-gray-200 w-8 h-8 
            rounded-full flex justify-center items-center'> <span> &larr; </span> </button>
          <button
            onClick={() => { handleScroll('right'); }}
            className='border border-gray-300 hover:bg-gray-200 w-8 h-8
            rounded-full flex justify-center items-center'> <span> &rarr; </span> </button>
        </div>
      </div>
      <div ref={scrollRef} className='grid grid-cols-1 md:grid-cols-2
        xl:grid-cols-3 gap-5
        '>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  )
}

const AssignmentTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Test</TableHeadCell>
            <TableHeadCell>Grade</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <div>Todo Website</div>
              <div className='text-gray-300 font-normal text-sm'>Yesterday 3pm</div>
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <div>Todo Website</div>
              <div className='text-gray-300 font-normal text-sm'>Yesterday 3pm</div>
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <div>Todo Website</div>
              <div className='text-gray-300 font-normal text-sm'>Yesterday 3pm</div>
            </TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const DashBoard = () => {

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-1 md:ml-64 dark:bg-gray-700">
      <div className="flex-5 flex-col gap-4 flex px-8 pt-4 pb-8">
        <div className='flex items-center justify-between'>
          <span>
            <h2 className="font-semibold text-xl">Hello James Taylor</h2>
            <span className="text-gray-400 text-sm">Let learn somethig new today</span>
          </span>

          <div className='flex gap-2 '>
            <div>
              <Switch checked={darkMode}
                onChange={() => { setDarkMode(!darkMode) }}
              />
            </div>
            <button className="p-2 bg-gray-100 rounded-lg dark:bg-white relative
            hover:bg-gray-200 hover:scale-105 dark:hover:bg-gray-100
            h-10 cursor-pointer active:scale-95 duration-400 
            ">
              <img
                className='w-6'
                src={NotiImg} />

              <div className='absolute right-2 top-2'>
                <div className='w-2 h-2 rounded-full animate-ping bg-blue-500'></div>
              </div>
            </button>
          </div>
        </div>
        <Overview />
        <Activity />
        <IncompleteCourses />
        <AssignmentTable />
      </div>
      <div className="hidden xl:block xl:flex-2 xl:bg-gray-400"></div>
    </div>
  )
}

export default DashBoard
