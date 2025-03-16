import { useEffect, useState } from "react";
var _ = require("lodash");
type Dates = {
  from: number;
  to: number;
  events: { year: number; description: string }[];
}[];
export const data: Dates = [
  {
    from: 1960,
    to: 1974,
    events: [
      {
        year: 1961,
        description: "Юрий Гагарин стал первым человеком в космосе.",
      },
      {
        year: 1965,
        description: "Разработка первых мини-компьютеров, таких как PDP-8.",
      },
      {
        year: 1969,
        description: "Аполлон-11: первая высадка человека на Луну.",
      },
      {
        year: 1970,
        description: "Создание первых сетевых технологий: начало ARPANET.",
      },
      {
        year: 1971,
        description:
          "Изобретение микропроцессора компанией Intel (Intel 4004).",
      },
      {
        year: 1974,
        description:
          "Создание первых персональных компьютеров, таких как Altair 8800.",
      },
    ],
  },
  {
    from: 1975,
    to: 1986,
    events: [
      {
        year: 1975,
        description: "Основание Microsoft Биллом Гейтсом и Полом Алленом.",
      },
      {
        year: 1976,
        description:
          "Создание компании Apple Стивом Джобсом и Стивом Возняком.",
      },
      {
        year: 1981,
        description:
          "Запуск IBM PC, одного из первых массовых персональных компьютеров.",
      },
      {
        year: 1983,
        description:
          "Создание первых мобильных телефонов (Motorola DynaTAC 8000X).",
      },
      {
        year: 1984,
        description:
          "Создание Apple Macintosh — первого популярного ПК с графическим интерфейсом.",
      },
      {
        year: 1986,
        description: "Запуск космической станции «Мир» Советским Союзом.",
      },
    ],
  },
  {
    from: 1987,
    to: 1996,
    events: [
      {
        year: 1989,
        description:
          "Тим Бернерс-Ли предложил концепцию Всемирной паутины (WWW).",
      },
      { year: 1990, description: "Запуск телескопа Хаббл." },
      {
        year: 1991,
        description:
          "Появление первой версии операционной системы Linux Линуса Торвальдса.",
      },
      {
        year: 1993,
        description:
          "Массовое распространение Интернета, создание первого веб-браузера Mosaic.",
      },
      { year: 1995, description: "Основание компании Amazon Джеффом Безосом." },
      {
        year: 1996,
        description: "Появление первого смартфона (Nokia 9000 Communicator).",
      },
    ],
  },
  {
    from: 1997,
    to: 2006,
    events: [
      {
        year: 1997,
        description:
          "Победа компьютера IBM Deep Blue над чемпионом мира по шахматам Гарри Каспаровым.",
      },
      {
        year: 1998,
        description:
          "Основание компании Google Ларри Пейджем и Сергеем Брином.",
      },
      {
        year: 2000,
        description: "Публикация первой версии карты человеческого генома.",
      },
      {
        year: 2001,
        description: "Запуск Wikipedia как свободной онлайн-энциклопедии.",
      },
      {
        year: 2004,
        description: "Запуск социальной сети Facebook Марком Цукербергом.",
      },
      { year: 2006, description: "Запуск первого видео на YouTube." },
    ],
  },
  {
    from: 2007,
    to: 2015,
    events: [
      { year: 2007, description: "Выпуск первого iPhone компанией Apple." },
      {
        year: 2008,
        description:
          "Запуск Google Chrome, одного из самых популярных браузеров.",
      },
      {
        year: 2010,
        description: "Запуск iPad и развитие рынка планшетных устройств.",
      },
      {
        year: 2012,
        description: "Запуск марсохода Curiosity для исследования Марса.",
      },
      {
        year: 2014,
        description:
          "Революция в биоинженерии благодаря открытию технологии CRISPR.",
      },
      {
        year: 2015,
        description: "Создание первых массовых электромобилей Tesla Model S.",
      },
    ],
  },
  {
    from: 2015,
    to: 2024,
    events: [
      {
        year: 2015,
        description: "Открытие гравитационных волн в рамках эксперимента LIGO.",
      },
      {
        year: 2016,
        description: "Google AlphaGo обыграл чемпиона мира по игре го.",
      },
      { year: 2018, description: "Первый снимок сверхмассивной чёрной дыры." },
      {
        year: 2020,
        description:
          "Разработка вакцин против COVID-19 с использованием mRNA-технологий.",
      },
      { year: 2022, description: "Запуск космического телескопа James Webb." },
      {
        year: 2024,
        description:
          "Планируемая первая пилотируемая миссия на Луну в рамках программы Artemis.",
      },
    ],
  },
];

export const useYear = (initYear: number) => {
    const [year, setYear] = useState(initYear);
    const changeYear = async (newYear: number) => {
        const isGreater = newYear >= year;
        const delta = Math.abs(newYear - year);
        for (let i = 1; i <= delta; i++) {
            await delay(30)
            if (isGreater) {
                setYear(year + i);
            } else {
                setYear(year - i);
            }
        }
    };
    return { year, changeYear };
}
export async function delay(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export const makePoints = (quantity: number, radius: number) => {
  const circleCenter = { x: 300, y: 300 };
  const points = [];


  for (let i = 0; i < quantity; i++) {
    const angle = (i * 360) / quantity;
    const radian = ((angle - 60) * Math.PI) / 180;

    const x = circleCenter.x + radius * Math.cos(radian);
    const y = circleCenter.y + radius * Math.sin(radian);

    points.push({ x, y });
  }
  return points
}
export const useViewportSize = (delay: number = 200) => {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = _.throttle(() => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, delay);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);

  return viewportSize;
};
