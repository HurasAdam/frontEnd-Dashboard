const getLegendColor = (themeMode) => {
  switch (themeMode) {
    case "light":
      return "black";
    case "dark":
      return "white";
    case "purple":
      return "orange";
    case "green":
      return "white";
    default:
      return "black";
  }
};

export const chartConfig = (chartType,labels, theme) => {
  let initialState;

  switch (chartType) {
    case "donut-dashboard":
      initialState = {
        dataLabels: {
          enabled: true,
          style: {
            colors: theme?.mode === "dark" ? ["white"] : ["rgb(212, 81, 81);"], // Tutaj ustaw kolory dla labeli
            background: {
              borderColor: "gray", // Kolor obramowania tła
            },
          },
        },
        legend: {
          position: "bottom",
          fontSize: "13px",
          labels: {
            colors: getLegendColor(theme?.mode),
          },
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 3000,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 1000,
            options: {
              chart: {
                width: 350,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 900,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 700,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        maintainAspectRatio: false,
      };

      break;
    default:
      initialState = {
        options: {},
        series: [],
      };
  }
  return initialState;
};
