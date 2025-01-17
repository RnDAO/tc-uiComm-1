import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { StatisticsProps } from '../../../utils/interfaces';

const defaultOptions = {
  title: {
    text: '',
  },
  xAxis: {
    categories: ['03 May', '04 May', '05 May', '06 May'],
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  series: [
    {
      name: 'Joined',
      data: [2, 4, 56, 233],
      color: '#4368F1',
    },
    {
      name: 'Newly active',
      data: [22, 43, 156, 233],
      color: '#FF9022',
    },
    {
      name: 'Still active',
      data: [12, 14, 52, 23],
      color: '#FBD13E',
    },
    {
      name: 'Dropped',
      data: [25, 43, 16, 33],
      color: '#FB3E56',
    },
  ],
  legend: {
    enabled: false,
  },
};

export default function Onboarding() {
  const { interactions } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    // const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    // const newSeries = interactions?.series?.map((interaction: any) => {
    //   if (interaction.name === 'messages') {
    //     return {
    //       ...interaction,
    //       color: '#804EE1',
    //     };
    //   } else if (interaction.name === 'emojis') {
    //     return {
    //       ...interaction,
    //       color: '#FF9022',
    //     };
    //   }
    //   return interaction;
    // });

    // newOptions.series = newSeries;
    // newOptions.xAxis.categories = interactions.categories;

    // setOptions(newOptions);

    setStatistics([
      {
        label: 'Joined',
        description: 'All members that joined in the last 7 days',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-info',
        hasTooltip: false,
      },
      {
        label: 'Newly active',
        description:
          'Started interacting for the first time in the last 7 days',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
      {
        label: 'Still active',
        description:
          'New members that remain interacting 2 weeks after their first interaction',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-yellow',
        hasTooltip: false,
      },
      {
        label: 'Dropped',
        description:
          "Were newly active within the last 2 weeks, but didn't interact in the last 7 days",
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
      },
    ]);
  }, [interactions]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-lg font-medium text-lite-black">Onboarding</h3>
          </div>
          <p className="text-sm text-gray-custom">New members retention</p>
        </div>
      </div>
      <StatisticalData statistics={[...statistics]} />
      <LineGraph options={options} />
    </>
  );
}
