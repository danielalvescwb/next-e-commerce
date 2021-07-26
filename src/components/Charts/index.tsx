import { Box, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const GetChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Charts({ title, serie }) {
  const options: ApexOptions = {
    title: {
      text: title,
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: true,
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  return (
    <>
      <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
        <GetChart options={options} series={[serie]} type="area" height={200} />
      </Box>
    </>
  );
}

export { Charts };
