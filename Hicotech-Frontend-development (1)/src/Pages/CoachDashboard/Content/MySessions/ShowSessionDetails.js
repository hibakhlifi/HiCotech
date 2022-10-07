import { EyeOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Badge, Image, Button, Col, Divider, Row, Rate, Tag, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getSeanceApi } from "../../../../Services/SeancesService";
import "./ShowSessionDetail.css";
import Map from "../../../../Components/Map";

const ShowSessionDetails = ({ SessionId }) => {
  const [openMap, setOpenMap] = useState(false);
  const data = {
    feedback: {
      goalAcheived: false,
      description: "Dans cette séance je n'ai pas atteint mes objectifs",
    },
    _id: "625252c7bdb157e8832dbe8b",
    seanceName: "Préparation physique ",
    dateSeance: "2022-04-03T23:00:00.000Z",
    createdAt: "2022-04-08T20:52:57.904Z",
    SessionStatus: "Planifié",
    creactedBy: {
      _id: "6248cc7d5c813ecf19b27257",
      firstName: "Hassene",
      lastName: "Ayoub",
      email: "hassene.ayoub@yahoo.fr",
      role: "coach",
      dateOfBirth: "2022-04-07T22:21:38.223Z",
      city: "Mahdia",
      subscription: "Premium",
      sexe: "Homme",
      myPlayers: [
        "621aa022e64b3cedfd69845b",
        "6224e51271b53ad1b4a2ac43",
        "6224ded071b53ad1b4a2ac30",
        "6224de0c71b53ad1b4a2ac23",
      ],
      inviteNumber: 10000000,
      createdAt: "2022-04-02T22:21:49.889Z",
      __v: 0,
      discipline: "6231bf826725280bf7288f03",
    },
    player: {
      myPlayers: [],
      inviteNumber: 0,
      _id: "621aa022e64b3cedfd69845b",
      firstName: "Marouene",
      lastName: "Ayoub",
      email: "marouene.ayoub@test1.fr",
      role: "joueur",
      subscription: "Free",
      sexe: "Homme",
      createdAt: "2022-02-26T21:48:18.392Z",
      __v: 0,
      city: "Mahdia",
      dateOfBirth: "1998-07-20T00:19:28.160Z",
      height: 175,
      weight: 62,
      active: false,
      sessionPrice: 32,
      IMC: {
        value: 0.002024489795918367,
        name: "Very Severely Underweight",
      },
    },
    statistics: [
      {
        statistic: {
          _id: "6235046bea1da8a92a87d655",
          statisticName: "Poids",
          statisticType: "compteur",
          unit: "Kg",
          description:
            "Cette statistique permet de mesurer le poids poids soulevé par un joueurs",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 4,
          alerted: true,
          discipline: "6231bf826725280bf7288f03",
          createdAt: "2022-03-18T22:15:07.946Z",
          updatedAt: "2022-04-09T16:51:47.271Z",
          __v: 0,
        },
        value: 5,
        _id: "625252c7bdb157e8832dbe8c",
      },
      {
        statistic: {
          _id: "6235046bea1da8a92a87d655",
          statisticName: "Poids",
          statisticType: "compteur",
          unit: "Kg",
          description:
            "Cette statistique permet de mesurer le poids poids soulevé par un joueurs",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 4,
          alerted: true,
          discipline: "6231bf826725280bf7288f03",
          createdAt: "2022-03-18T22:15:07.946Z",
          updatedAt: "2022-04-09T16:51:47.271Z",
          __v: 0,
        },
        value: 2.3,
        _id: "625252c7bdb157e8832dbe8d",
      },
    ],
    skills: [
      {
        skill: {
          _id: "62351ac393cd3c8d4c84c595",
          skillName: "Jonglage",
          description: "dddd",
          lien: "https://www.youtube.com/watch?v=mkwqWlllfPI",
          alerted: false,
          createdAt: "2022-03-18T23:50:27.532Z",
          updatedAt: "2022-04-09T20:48:23.504Z",
          __v: 0,
        },
        value: 5,
        _id: "625252c7bdb157e8832dbe8e",
      },
      {
        skill: {
          _id: "6235136178e6cfabb67274b4",
          skillName: "Indurance",
          description:
            "Cette compétence permet de mesurer l'indurance d'un joueur",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 3,
          alerted: false,
          createdAt: "2022-03-18T23:18:57.640Z",
          updatedAt: "2022-04-09T20:48:48.322Z",
          __v: 0,
        },
        value: 4,
        _id: "625252c7bdb157e8832dbe8f",
      },
      {
        skill: {
          _id: "6235132b78e6cfabb67274b1",
          skillName: "Dribblage",
          description:
            "Cette compétence permet de mesurer le driblage d'un joueur",
          lien: "https://www.alloprof.qc.ca/fr/eleves/bv/sciences/la-masse-et-le-poids-s1004",
          max: true,
          nbreFois: 2,
          alerted: true,
          createdAt: "2022-03-18T23:18:03.840Z",
          updatedAt: "2022-04-09T20:48:36.941Z",
          __v: 0,
        },
        value: 3,
        _id: "625252c7bdb157e8832dbe90",
      },
    ],
    updatedAt: "2022-04-12T01:46:50.823Z",
    __v: 0,
    sessionCancelled: {
      isCancelled: true,
      reason: "Mauvais temps",
    },
    programme: {
      _id: "6231073a02fdd3b485096006",
      title: "title of prog",
      description: "description of prog",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFHBEQW9KQzlSS3FUZkhpMGowYXhfHAIoAGJGQk1EMGEwMDBhODgwMTAwMDA2ZjAzMDAwMDU2MDYwMDAwMWUwNzAwMDBkMjA3MDAwMGYzMDkwMDAwMGUwZDAwMDA4YTBkMDAwMDVkMGUwMDAwMWUwZjAwMDAzMzE0MDAwMP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAKAAoAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xAAZAQADAQEBAAAAAAAAAAAAAAAAAgMBBAX/2gAMAwEAAhADEAAAAfVAAAATldZUPOulc8c1fQrLzZS09wd8d9gzVAZuXtVzKQcAncAAAAAArLPmr5ZMt8pj6BECFHoc3/n+urDVAatLKsBpgC0AAAAAAAAylFeUiWWmDKWj1lTadpaQB5AAAAAAeZu1sF/G09TSRp9Wpdx6sfct5TRnTJTCRPts9pgYdeP05zEaHFuFV7hs3sVe7IGlG4iodoN82rcafR+kuPlXLOm11aSX1a9Oun8o0GO6eLWIpZ8n21v5jspmjdrHTbJde7m+TOWF3Xk8+mQZEa8g852YrWVdqxXb1zDm5xCkCdcR0J9rm5U99Il5G/53tXoDw3n1hn5nX5VPbVlxw+tRImRO2W5xO4xr5614/vvPsZKkq2Z1CtXqkhmimV7HnU3LtXYNXzxFw10ctbY8Tz98CNLb6JaujmwLJyn7wXoGqlbLqt3vOst1Ir7Tznevc5aZSE0qJ1wkd69HpqYs+JdV1Eqvoi1IUL3nDRpxvqO640pkkWlPcwx6+zl1Kvo3mDmdzomP0ziNJeqrnpjmkbCnYqziKwVxHM04Oo6nWuujv0F8+bKTeqmT0fPX/8QAKxAAAQQCAQMCBgMBAQAAAAAAAQACAwQFERIQEyEgMQYUIyQwMjM0QRU1/9oACAEBAAEFAvQRtZaoHsxNFsbL2Ur0nv8AiJvKnnIJVFI2VnXNtmdFj+78t+HKODaly0KuOkMliZtGcj5OYKlempytPJvS/wD1Gfp+G/WFqLN1zFLHG2PoVkGg18TJ3Mf0ykUs0NJkscP4s5FyszSyF1Od0kUrpkPuK/w3/wCd+bJy8rHZaog1rREHItawYV5iZ+bKRHvuOkXxOLJG6O3rHVXNk/BLkpWirlZeE+Tl7YzNrTczYX/bmCZmZCXnkRGHJzWsVQ/cCfa7q5rktrfou1+JZ/E6TbXO8BcdmEae3RZqUIskcY28TPbfXfUyHNMlDkHLktra2tpn1Y7/ABAf7hvhrUdtUI2qQe6YEqCF0x7MVSO1P8w+roh9l8M1W0JGh6DkHLa2obHJls+Qdpo2Wt2pU2cMWElBbj21rMwAaM/f70qgn4IkSJsjon1bAkaHIOQcg5QyFonYREFXO3SynmTtBZGA1cdiIrDrOXvmCl1B0hYKgmDXRS8gHIFAqnCAL9bVEFVf3PusTD3rvxDPylxsXZqZyx3rhQ9Fc/UZNwdHJsNcgVFMVk5pewFAwamGplg2CGm97pZrEvy1Nx2f99AOj/lafTwgVF+1xxcAFF+s4+sfe39t8P0W87nxJPqModD6IPMMwLX1Ze5GmnSeS5zW8lH4Fvwdbk+JHajwTeWUyk/zF7q70UXbjKqu4EFCIcZI0yPQ2Vb8sqDla+JHbuYh/acUOr/YdaR+o/w7/Wv8H9eS0g1XW6gx3i5mzvIxP1H/AL1em+2+kJ4yul5OY/yzXFx8FN9gr/8AXxQ5ZDJO532+Gj0FN9l5Tfd1eRNikBAk4yVoZBl67allsoA7wVmcCPBj72V3KT0lA6Qd0Cj/AI9dLGTtEzPfK7j0mbtmG8NGLgeLtJ9Ura2toDa4LS9kPKfkbrFi7E8rGuK//8QAJBEAAgIBBQABBQEAAAAAAAAAAAECESEDEBIxQSATIiMyYUL/2gAIAQMBAT8B21UuJDCqJwmL+7KP5L+LVqmaNQ6G6NT9tuC5cvlDaVe/G322KXLNkZYyaUs7a8nGRyLLLEuSyQhgeiKk1Q9ReE9S5F85HRZY3SsWa2fTF9kSqGyOq/d3fM0oejxKifiNTuhjERYz6aWUQxHJPs/0f3ZrGyEaSnF2i7JHu1Hg0c0uyE4v0immOKHG3SJaMo5KKLS7HRF8RSTP/8QAIxEAAgIBAwQDAQAAAAAAAAAAAAECERADITEgIkFREhMjMv/aAAgBAgEBPwHEHuPd2y4jw32dKdGpchIjxj5bV1SwumSHJlnKxFWsWXiW/Ixb7C02fW/JGFIcfiuhRvCVIXI+54o1NJcnGIvsGR3jZEXsWf5k4iKZJGnweM3vjWX6EH7JTQzS6PJZqwtpocZeiUk0WzSdK2LUjLFm7FZqM+xXR//EADEQAAEDAQQIBgICAwAAAAAAAAEAAhEDEBIhMQQgIjBBUWFxEzJCUoGRI2IzoYLB0f/aAAgBAQAGPwLVvOQqEY8EGVLxdyatijs9SgKv43f0g+m4OaeOp+N0M4pvjZ7oyhUaRlATnYuc7FeVeVU2VCRTByQIyNtRN7boMPNaPo7XG4cVDREWmc1RPSLQyiYnNBtZ147vQz+xCfcdF3HALEkp9QPdcbwTp5L/ADO/psjyOmfix2ICxWCZRwumfvfh442Tz6INYQoHFeJUEcp3MCoZW2ZUtes7cleHFcuywTOQK4bnxAslCjUuqAsSupQAUOWeuJV1ijUvJ7jN1rVC2B8o1ah8oxdyTnxG1I7WYZa+GCJBx1YaLxWkVa11tMQ3on+HWvtb6cioaIC8Ckfxsz6m29mpbrYCVeu2m6sbKNMZXpd1cm1KGzc9S2dmq/Z7amC2hKBbkdUOKLieFp72MwlrdoplFvoxPdMHFXR5aeHzrAc0NQQg29s2Sn2VtJfl/wARe7zOKe8+lqJOZ1pCBV06gE297KbOL4H+1QbzeFSoDjtHcN+kHNQslSbWlRzK0amOpVLpiqr+EwNw5vKyLBqA8iqQ5vCY32sWk1uLKRjckc9XG0qmeqqdAB/SqN925adwe6pBaQf3O6C/jd9LyO+l5HfSh9Np+Fdadk42kZyi72hPdzJO7b2tIFb6V6o4uPW3sq7vhbNZ0r3M924wsi/AHRTVfeWJX//EACcQAQACAgAFAwUBAQAAAAAAAAEAESExEEFRYXGBkaEgMLHB8NHx/9oACAEBAAE/IfoHaJbsalkZG0aBeabrzDK3ocntNmzmxooEPoGNCe6Nox5fH2ml1miWEgfJFrbWxLJj2WG5SWVI+vcHQizjz3T9zlOj7Sg1VoiyVred1Hq+iGDUDupXoolMI9tLvJxzUCBZjpOn28V5sPzOvNCxryzOJq7TMEBtmH4m4Xdhqs+J/L4+/g2G52r/ANjZfXpLITXN5SyRURaFS1KbKsn3ww1D05xbXFKRpTFsDxCgCqoInSTTq+y7w+JVq7wFIPSBshi91BGQhoqwdQZTLZXdUIcIF7zEDSC3SEk1lPoSssTUvZgLMDBFeCXoJVDLq2dy/Y14mQcx1ug8x4LtqmYA0wbHAEEknAYwYiwcZYhdbnwQV3HdtzaYD6oRph6xKWhtaJQYtifhAW2S6KM6TIi9MFZz9EBJJV4KhqKLFsasmleSFClx1YWfACMkWi46n9QlfOKtHftCJB0EvsyzP7ol1NWq8RzI8IQ1dITzn6ZCp3HlLopc55cwxugasjK0rLuDcuetb6h+orbZb2dO9zFf/QVFl2wjq0jMQI/McvtQhb+gXmAQyy8pVcWU1XYpyJX0bB2hur+W5e35g0+hcvW/uYgzLc+Bw7UiiGpRPEUpWCNdkhgOpKh3iUhOok9oyKW3ysDsK88vmI5tLWOacTU5xh2EM9QXwHfB0xT6RhzNUrK6jaxouBT1ynl0e85236Zr5/EVEGO/DXiMbY5RyBoaucGYkcmEQWS9LL90hhOhOVI+CieGX4SpGz6MxHL4nrwVQ4cpYW1ZBeJ2FwSXzFjUs0eAVSCm5fyJS2g+Vn+uCUCLnBR9FpxI5gYhyQwEjUmAiKqMjHBufci7Nb4leZZyOm/A3N06cWaRYMOB+8zxEJENSkCHmZ8IXR0TGF7Z/IlYmxNc74c48f8AnkT0xbOsD/qhxPfSlgZhosXTpfKbxDqR+FjQS5GrZ/VQwyhyOFy8xeD0kB0k5a4AOE0/Ep0JR0ItAO0J3OKpapmpk+agzAXWcAHtDATdvIfmLGKcCvoSl4lR1iU/omY74jydYYxB7FGQ/9oADAMBAAIAAwAAABAAAAnkACUAAAAXyx4BEAAAAABCkAAAA2WYl52YP0OY3cxX940Q5C8anu/4lvwO9OUh66Mgsz2cGj1KhMsU5wo/CWsvyCwvLBn+Ic//xAAhEQEBAQACAwABBQAAAAAAAAABABEhQRAxUSBhcZGh8P/aAAgBAwEBPxDwhLDEI9kn0OfAj11+Jt6IaAwJBrLg/p4C+/5AOTud9x5Pt+IZrGXa69T8l/dic9NzCQ7jqx5gaC/YxBq8SJ6cyDec/wBssayKyKTaEzAhV1ibRfb7gQQ2JxyIdNhgxjxpYm7SfFyZWj4l0Q0vScd6hlhOSaBDrf8AdTzuVV8OHB9jphPTGRTrk3KzlJznglG7IIHgfzCUMO4vKX22DURqG2DIH6j3xGDl/8QAHhEBAAIDAAMBAQAAAAAAAAAAAQARECExIEFRYZH/2gAIAQIBAT8QwwQm5H1wBs5i0H74orJQFey1qHfFvz8kumVG8PEDcU8izbLucPaS3uS5baO6IraXKquiANSNOLTV5Y7lfYNRL0lePItwtFlNVE9OSoKtbibqKj6mls5ge4aY7g2P3Bqq5t1OZCK9YILFsHvcS6jlZSaRdQlwYIYFbAN2/koUOQw4CgDFqUJWwiHYercR/8QAKBABAAICAQQBAwUBAQAAAAAAAQARITFBUWFxgZEQobEwwdHh8CDx/9oACAEBAAE/EP8AgvDPWMojOjKPZUWjrUEElio+SV4gw9WYc8KCvVwe45EF7G+LIGobbY/8HGugGctsYkAuFOGL/SAWEWcrF7LFcNMEBBqpZVYTIt0DLq5HRuKoklgbFu+vVsbewN1Ev6geFX8IALQo+P0m8AB+JeddM29fg/MphuEy1LNbCKFYdYnqU5huV8665gT608VBNvT1KQkgNU0vP6SXDLVuxgD+GLO2NHwVKF6FsUJTFj2gVwHN21hZYkwXMkpnPBsiWz+vEQpQsgCV0w+JbWb2tVx5HWoB6FjaKHh3KoAKyGpNKozNX9v1zY1aL40NVzQfeJq1EUXbKld8Q7UBwsldR1A6IBtt1AgW0qVlLXQPz+jUTeURhLhwuOzAunMVCusMt1/3aDLh6j2sc0Sogmp0tyemEVUZdiEQC5Vy/MeqIGusZm8KdJFvBBeCDQTmWdfrqIjC67wnENOzKxZ4KeJWlGR7ImJuWetuaInCnXH8QeStQwNVcUGotPZW1WA9sfi8glpSvmHEl6XDTD9LvzuTuwmg0QyktZXR6hzLe1t7IYJhrc08M3KY1R6JpBIDFWj2LuIRYv8A8S6kKxvO9exbFSzE0DmnXjqxlzLpsYHx+8pGWodNyeyNobkvq2G8zuQXmdyOMRhWyU0RzTHpLZkTW5lYoCyA5KI5YNqw1u2uG7V3sRZJi2uu2W2LN4urg+NodB4Ilw5qwHH+M28Eu7reM5KhVsPXIPUKnAzbUu0G29RFXgi1udyd2Wcy2k2nM2DeXmGrcQOyjdWkmV5i5Yza3MA1TQG1dEaoAA4YW+wKIO/sxh5VfAmpnm7uvWS5xdPEyK28vLNqkDrMIfCORqGBlp1/aPrsp0R5HvCZkn0bs3O9FRFphlBFVP2JUF4qANdZiTnA+Y/Yiog16Vpfupb8BTsFekKIDJeDP3uZLgSDh2f4PUOcq6Qq3Z+nJnMoS5PuaisFePEAV3ATcz7lYmjExAIsOb4imLhqmRKIMKfv/c7SAQxqdRenb8uI6j+Nh95RUaPUFD3SLEYVyra/MxuBl88TUuhZqmKeJuWRJhJYA8OZWtV6uKAjiKcxoZZFTNNShwvihCOX3/iO3cLFarp1v+AmPrHDsBZfsMJ3oD5SwCLxKrO2WXFS7wg5lmNEUcqK9OPtUuqt3icCBmBENV1EYINRykAdhH0Fc+0o81J9tQ8aGg7B/eVZLPDIv5j+gCsb5bfcFZxk+ZUNcNsoD3IrCXtjiB1M+JP6l9R6l3qnUtBuU8tQuGBIQrNXSUtAwrP7ILtAD1lir+SV+xAtK/ycsspFNv5ZsNuWYixQ8PELwG+WJVHzHfyfTf5lcNMtwKMuGKn0Jh65TikGtQOgfng7ZYncVfdiuLUPIF+7LmzGvRfIRaOGT5lxQqKZInpUS7qpirnRJV8OIgN0MMA7sWVASgFphAbxcQCRlRiG6d8XNQAp2xOVRA8L+EpZ6QJbZllxcYpmRiB4ag1SlwFs34TNCkD95Z4y9yryx/1iNItrqj9gVdBPCTAehVvawoQYvSWiSqff1KrbJ6Wn8REd/KJ/eCv157suNCOCdGPENI5tcyQb4cMt6B1XEebsfHEasDx9kB18RP8AzJYy9RF6ljMYcJlAiMzPAq94lwsouBptv3MAIBbNetRU2tFCnoOPOpQXAvLMm420LMk7jCst7jzCwortdQ2rXOxKiNoQd45PCuAwRLqwjUw+IEqT/9k=",
      videoLink: "https://hicotech.com/video/125487",
      skills: ["622fcbc4097bc9f85e3d21a4", "622fe775097bc9f85e3d2271"],
      statistics: ["622fcbc4097bc9f85e3d21a4"],
      createdAt: "2022-03-15T21:38:02.846Z",
      updatedAt: "2022-04-06T22:21:13.080Z",
      __v: 0,
    },
    trainingGround: {
      _id: "6248db1e1bc9bd0e10d40263",
      createdBy: "6248cc7d5c813ecf19b27257",
      city: "Mahdia",
      addres: "zone touristique",
      coordinates: [35.54172500018384, 11.028771400451662],
      createdAt: "2022-04-02T23:24:14.958Z",
      updatedAt: "2022-04-11T03:08:58.750Z",
      __v: 0,
    },
  };
  const [loading, setLoading] = useState(false);
  const [SessionData, setSessionData] = useState(data);
  useEffect(() => {
    setLoading(true);
    getSeanceApi(SessionId).then(({ data }) => {
      setSessionData({ ...data });
      setLoading(false);
    });
  }, []);
  const [visible, setVisible] = useState(false);
  const newLocal = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const DescriptionItem = newLocal;
  return (
    <Spin spinning={loading}>
      <Row
        gutter={[24, 24]}
        justify={
          SessionData.sessionCancelled.isCancelled ? "start" : "space-around"
        }
      >
        <Col
          span={
            SessionData.sessionCancelled &&
            SessionData.sessionCancelled.isCancelled
              ? 24
              : 11
          }
          style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
        >
          <p className="site-description-item-profile-p">Les Infos Générales</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Nom Séance"
                content={SessionData.seanceName}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Joueur attribué"
                content={`${SessionData.player.firstName} ${SessionData.player.lastName}`}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Date Séance"
                content={`${moment(SessionData.dateSeance).format(
                  "DD-MM-YYYY"
                )}`}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Etat Séance"
                content={
                  <Badge
                    status={
                      SessionData.sessionCancelled &&
                      SessionData.sessionCancelled.isCancelled
                        ? "error"
                        : SessionData.SessionStatus === "Planifié"
                        ? "processing"
                        : "success"
                    }
                    text={
                      SessionData.sessionCancelled.isCancelled
                        ? "Annuler"
                        : SessionData.SessionStatus === "Planifié"
                        ? "Planifié"
                        : SessionData.SessionStatus === "Terminé"
                        ? "Terminé"
                        : "Planifié"
                    }
                  />
                }
              />
            </Col>
          </Row>
          {SessionData.sessionCancelled.isCancelled && (
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Raison"
                  content={SessionData.sessionCancelled.reason}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!SessionData.sessionCancelled.isCancelled && (
          <Col
            span={12}
            offset={8}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              marginLeft: "1px",
            }}
          >
            <p className="site-description-item-profile-p">
              Lieu d&apos;entrainement
            </p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Ville"
                  content={SessionData.trainingGround.city}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Adresse"
                  content={SessionData.trainingGround.address}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Lieu dans le map"
                  content={
                    <>
                      <Button
                        icon={<FullscreenOutlined />}
                        size="small"
                        type="primary"
                        onClick={() => setOpenMap(true)}
                      >
                        Consulter
                      </Button>
                      <Map
                        visible={openMap}
                        editable={false}
                        setvisibility={setOpenMap}
                        initialPosition={
                          SessionData?.trainingGround?.coordinates
                        }
                      />
                    </>
                  }
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      {!SessionData.sessionCancelled.isCancelled && (
        <>
          <>
            <Divider />
            <Row gutter={[24, 24]} justify="space-between">
              <Col
                span={11}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                }}
              >
                <p className="site-description-item-profile-p">
                  Le programme de la séance
                </p>
                {SessionData.programme ? (
                  <>
                    <Row>
                      <Col span={12}>
                        <DescriptionItem
                          title="Titre"
                          content={SessionData.programme.title}
                        />
                      </Col>
                      <Col span={24}>
                        <DescriptionItem
                          title="Description"
                          content={SessionData.programme.description}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <DescriptionItem
                          title="Image Programme"
                          content={
                            <>
                              <Button
                                icon={<EyeOutlined />}
                                size="small"
                                type="primary"
                                onClick={() => setVisible(true)}
                              >
                                Consulter
                              </Button>
                              <Image
                                width={200}
                                style={{ display: "none" }}
                                src={SessionData.programme.image}
                                preview={{
                                  visible,
                                  onVisibleChange: (value) => {
                                    setVisible(value);
                                  },
                                }}
                              />
                            </>
                          }
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <p>Pas de programme</p>
                )}
              </Col>
              <Col
                span={12}
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                }}
              >
                <p className="site-description-item-profile-p">
                  Le feedback de la séance
                </p>
                {SessionData.feedback ? (
                  <Row>
                    <Col span={16}>
                      <DescriptionItem
                        title="Objectif atteint"
                        content={
                          <Badge
                            status={
                              SessionData.feedback.goalAcheived
                                ? "success"
                                : "error"
                            }
                            text={
                              SessionData.feedback.goalAcheived ? "Oui" : "Non"
                            }
                          />
                        }
                      />
                    </Col>
                    <Col span={16}>
                      <DescriptionItem
                        title="Le feedback"
                        content={SessionData.feedback.description}
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row justify="start">
                    <Col span={16}>
                      <p>{`pas ${
                        SessionData.SessionStatus === "Planifié" ? "encore" : ""
                      } de feedback`}</p>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </>
          <Divider />
          <Row gutter={[24, 24]} justify="space-between">
            <Col
              span={11}
              style={{
                minHeight: "110px",
                backgroundColor: "#f5f5f5",
                padding: "20px",
              }}
            >
              <p className="site-description-item-profile-p">
                {`Les Statistiques ${
                  SessionData.SessionStatus === "Planifié" ? "à" : ""
                } mesurées`}
              </p>
              {SessionData.statistics.length > 0 ? (
                SessionData.SessionStatus === "Terminé" ? (
                  SessionData.statistics.map((el) => (
                    <Row key={el._id}>
                      <DescriptionItem
                        title={el.statistic.statisticName}
                        content={`${el.value ? el.value : "non mesurée"} ${
                          el.value ? el.statistic.unit : ""
                        }`}
                      />
                    </Row>
                  ))
                ) : (
                  SessionData.statistics.map((el) => (
                    <Tag color="blue">{el.statistic.statisticName}</Tag>
                  ))
                )
              ) : (
                <p>Non mesuré</p>
              )}
            </Col>
            <Col
              span={12}
              style={{
                backgroundColor: "#f5f5f5",
                padding: "20px",
              }}
            >
              <p className="site-description-item-profile-p">
                {`Les Compétences ${
                  SessionData.SessionStatus === "Planifié" ? "à" : ""
                } mesurées`}
              </p>
              {SessionData.skills && SessionData.skills.length > 0 ? (
                SessionData.SessionStatus === "Terminé" ? (
                  SessionData.skills.map((el) => (
                    <Row key={el._id}>
                      <DescriptionItem
                        title={el.skill.skillName}
                        content={<Rate allowHalf value={el.value} />}
                      />
                    </Row>
                  ))
                ) : (
                  SessionData.skills.map((el) => (
                    <Tag color="blue">{el.skill.skillName}</Tag>
                  ))
                )
              ) : (
                <p>non mesuré</p>
              )}
            </Col>
          </Row>
        </>
      )}
    </Spin>
  );
};

export default ShowSessionDetails;
