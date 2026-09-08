// Fichier généré automatiquement - Ne pas modifier à la main
export interface TidePoint {
  type: "PM" | "BM";
  time: string;
  height: number;
  coef?: number;
}

export interface DayTides {
  date: string;
  extrema: TidePoint[];
}

export const TIDES_DATABASE: Record<string, DayTides[]> = {
  "la-rochelle": [
    {
      "date": "2026-09-08",
      "extrema": [
        {
          "type": "PM",
          "time": "03:24",
          "height": 5.189,
          "coef": 60
        },
        {
          "type": "BM",
          "time": "09:02",
          "height": 1.777
        },
        {
          "type": "PM",
          "time": "15:42",
          "height": 5.614,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "21:37",
          "height": 1.336
        }
      ]
    },
    {
      "date": "2026-09-09",
      "extrema": [
        {
          "type": "PM",
          "time": "04:14",
          "height": 5.458,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "09:58",
          "height": 1.307
        },
        {
          "type": "PM",
          "time": "16:29",
          "height": 5.904,
          "coef": 84
        },
        {
          "type": "BM",
          "time": "22:28",
          "height": 0.899
        }
      ]
    },
    {
      "date": "2026-09-10",
      "extrema": [
        {
          "type": "PM",
          "time": "04:57",
          "height": 5.667,
          "coef": 90
        },
        {
          "type": "BM",
          "time": "10:46",
          "height": 0.888
        },
        {
          "type": "PM",
          "time": "17:11",
          "height": 6.102,
          "coef": 96
        },
        {
          "type": "BM",
          "time": "23:13",
          "height": 0.581
        }
      ]
    },
    {
      "date": "2026-09-11",
      "extrema": [
        {
          "type": "PM",
          "time": "05:35",
          "height": 5.788,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "11:31",
          "height": 0.595
        },
        {
          "type": "PM",
          "time": "17:49",
          "height": 6.18,
          "coef": 102
        },
        {
          "type": "BM",
          "time": "23:56",
          "height": 0.432
        }
      ]
    },
    {
      "date": "2026-09-12",
      "extrema": [
        {
          "type": "PM",
          "time": "06:09",
          "height": 5.813,
          "coef": 103
        },
        {
          "type": "BM",
          "time": "12:13",
          "height": 0.47
        },
        {
          "type": "PM",
          "time": "18:24",
          "height": 6.129,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-13",
      "extrema": [
        {
          "type": "BM",
          "time": "00:37",
          "height": 0.469
        },
        {
          "type": "PM",
          "time": "06:40",
          "height": 5.748,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "12:54",
          "height": 0.527
        },
        {
          "type": "PM",
          "time": "18:57",
          "height": 5.959,
          "coef": 97
        }
      ]
    },
    {
      "date": "2026-09-14",
      "extrema": [
        {
          "type": "BM",
          "time": "01:18",
          "height": 0.681
        },
        {
          "type": "PM",
          "time": "07:10",
          "height": 5.607,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "13:35",
          "height": 0.751
        },
        {
          "type": "PM",
          "time": "19:28",
          "height": 5.69,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-09-15",
      "extrema": [
        {
          "type": "BM",
          "time": "01:58",
          "height": 1.034
        },
        {
          "type": "PM",
          "time": "07:36",
          "height": 5.408,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "14:17",
          "height": 1.111
        },
        {
          "type": "PM",
          "time": "19:58",
          "height": 5.351,
          "coef": 76
        }
      ]
    },
    {
      "date": "2026-09-16",
      "extrema": [
        {
          "type": "BM",
          "time": "02:38",
          "height": 1.48
        },
        {
          "type": "PM",
          "time": "07:58",
          "height": 5.168,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "14:59",
          "height": 1.556
        },
        {
          "type": "PM",
          "time": "20:26",
          "height": 4.97,
          "coef": 63
        }
      ]
    },
    {
      "date": "2026-09-17",
      "extrema": [
        {
          "type": "BM",
          "time": "03:20",
          "height": 1.961
        },
        {
          "type": "PM",
          "time": "08:09",
          "height": 4.902,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "15:44",
          "height": 2.029
        },
        {
          "type": "PM",
          "time": "20:41",
          "height": 4.576,
          "coef": 48
        },
        {
          "type": "BM",
          "time": "20:50",
          "height": 4.576
        },
        {
          "type": "PM",
          "time": "21:23",
          "height": 4.577,
          "coef": 48
        }
      ]
    },
    {
      "date": "2026-09-18",
      "extrema": [
        {
          "type": "BM",
          "time": "04:05",
          "height": 2.419
        },
        {
          "type": "PM",
          "time": "08:28",
          "height": 4.609,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "09:32",
          "height": 4.594
        },
        {
          "type": "PM",
          "time": "09:57",
          "height": 4.595,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "16:36",
          "height": 2.463
        },
        {
          "type": "PM",
          "time": "20:52",
          "height": 4.187,
          "coef": 35
        },
        {
          "type": "BM",
          "time": "21:08",
          "height": 4.187
        },
        {
          "type": "PM",
          "time": "23:06",
          "height": 4.289,
          "coef": 35
        }
      ]
    },
    {
      "date": "2026-09-19",
      "extrema": [
        {
          "type": "BM",
          "time": "04:59",
          "height": 2.789
        },
        {
          "type": "PM",
          "time": "11:37",
          "height": 4.454,
          "coef": 28
        },
        {
          "type": "BM",
          "time": "17:40",
          "height": 2.769
        }
      ]
    },
    {
      "date": "2026-09-20",
      "extrema": [
        {
          "type": "PM",
          "time": "00:23",
          "height": 4.205,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "06:08",
          "height": 2.985
        },
        {
          "type": "PM",
          "time": "12:49",
          "height": 4.504,
          "coef": 22
        },
        {
          "type": "BM",
          "time": "18:57",
          "height": 2.833
        }
      ]
    },
    {
      "date": "2026-09-21",
      "extrema": [
        {
          "type": "PM",
          "time": "01:28",
          "height": 4.309,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "07:26",
          "height": 2.91
        },
        {
          "type": "PM",
          "time": "13:50",
          "height": 4.703,
          "coef": 29
        },
        {
          "type": "BM",
          "time": "20:13",
          "height": 2.618
        }
      ]
    },
    {
      "date": "2026-09-22",
      "extrema": [
        {
          "type": "PM",
          "time": "02:23",
          "height": 4.545,
          "coef": 35
        },
        {
          "type": "BM",
          "time": "08:35",
          "height": 2.591
        },
        {
          "type": "PM",
          "time": "14:43",
          "height": 4.989,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "21:11",
          "height": 2.245
        }
      ]
    },
    {
      "date": "2026-09-23",
      "extrema": [
        {
          "type": "PM",
          "time": "03:10",
          "height": 4.851,
          "coef": 49
        },
        {
          "type": "BM",
          "time": "09:26",
          "height": 2.169
        },
        {
          "type": "PM",
          "time": "15:29",
          "height": 5.307,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "21:55",
          "height": 1.84
        }
      ]
    },
    {
      "date": "2026-09-24",
      "extrema": [
        {
          "type": "PM",
          "time": "03:53",
          "height": 5.174,
          "coef": 63
        },
        {
          "type": "BM",
          "time": "10:09",
          "height": 1.74
        },
        {
          "type": "PM",
          "time": "16:11",
          "height": 5.608,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "22:33",
          "height": 1.458
        }
      ]
    },
    {
      "date": "2026-09-25",
      "extrema": [
        {
          "type": "PM",
          "time": "04:32",
          "height": 5.469,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "10:47",
          "height": 1.354
        },
        {
          "type": "PM",
          "time": "16:50",
          "height": 5.857,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "23:09",
          "height": 1.133
        }
      ]
    },
    {
      "date": "2026-09-26",
      "extrema": [
        {
          "type": "PM",
          "time": "05:10",
          "height": 5.7,
          "coef": 88
        },
        {
          "type": "BM",
          "time": "11:24",
          "height": 1.042
        },
        {
          "type": "PM",
          "time": "17:28",
          "height": 6.022,
          "coef": 92
        },
        {
          "type": "BM",
          "time": "23:45",
          "height": 0.895
        }
      ]
    },
    {
      "date": "2026-09-27",
      "extrema": [
        {
          "type": "PM",
          "time": "05:47",
          "height": 5.843,
          "coef": 96
        },
        {
          "type": "BM",
          "time": "12:01",
          "height": 0.827
        },
        {
          "type": "PM",
          "time": "18:05",
          "height": 6.082,
          "coef": 98
        }
      ]
    },
    {
      "date": "2026-09-28",
      "extrema": [
        {
          "type": "BM",
          "time": "00:22",
          "height": 0.77
        },
        {
          "type": "PM",
          "time": "06:22",
          "height": 5.882,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "12:39",
          "height": 0.731
        },
        {
          "type": "PM",
          "time": "18:41",
          "height": 6.023,
          "coef": 100
        }
      ]
    },
    {
      "date": "2026-09-29",
      "extrema": [
        {
          "type": "BM",
          "time": "01:00",
          "height": 0.776
        },
        {
          "type": "PM",
          "time": "06:56",
          "height": 5.814,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "13:18",
          "height": 0.766
        },
        {
          "type": "PM",
          "time": "19:16",
          "height": 5.841,
          "coef": 96
        }
      ]
    },
    {
      "date": "2026-09-30",
      "extrema": [
        {
          "type": "BM",
          "time": "01:40",
          "height": 0.92
        },
        {
          "type": "PM",
          "time": "07:28",
          "height": 5.645,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "14:01",
          "height": 0.936
        },
        {
          "type": "PM",
          "time": "19:54",
          "height": 5.545,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-10-01",
      "extrema": [
        {
          "type": "BM",
          "time": "02:23",
          "height": 1.19
        },
        {
          "type": "PM",
          "time": "07:54",
          "height": 5.389,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "14:47",
          "height": 1.221
        },
        {
          "type": "PM",
          "time": "21:01",
          "height": 5.167,
          "coef": 75
        }
      ]
    },
    {
      "date": "2026-10-02",
      "extrema": [
        {
          "type": "BM",
          "time": "03:11",
          "height": 1.55
        },
        {
          "type": "PM",
          "time": "08:05",
          "height": 5.064,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "08:34",
          "height": 5.062
        },
        {
          "type": "PM",
          "time": "09:33",
          "height": 5.076,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "15:40",
          "height": 1.575
        },
        {
          "type": "PM",
          "time": "22:32",
          "height": 4.843,
          "coef": 60
        }
      ]
    },
    {
      "date": "2026-10-03",
      "extrema": [
        {
          "type": "BM",
          "time": "04:06",
          "height": 1.93
        },
        {
          "type": "PM",
          "time": "11:05",
          "height": 4.891,
          "coef": 53
        },
        {
          "type": "BM",
          "time": "16:41",
          "height": 1.908
        },
        {
          "type": "PM",
          "time": "23:53",
          "height": 4.702,
          "coef": 46
        }
      ]
    },
    {
      "date": "2026-10-04",
      "extrema": [
        {
          "type": "BM",
          "time": "05:11",
          "height": 2.224
        },
        {
          "type": "PM",
          "time": "12:22",
          "height": 4.899,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "17:53",
          "height": 2.091
        }
      ]
    },
    {
      "date": "2026-10-05",
      "extrema": [
        {
          "type": "PM",
          "time": "01:07",
          "height": 4.753,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "06:25",
          "height": 2.299
        },
        {
          "type": "PM",
          "time": "13:32",
          "height": 5.07,
          "coef": 43
        },
        {
          "type": "BM",
          "time": "19:09",
          "height": 2.012
        }
      ]
    },
    {
      "date": "2026-10-06",
      "extrema": [
        {
          "type": "PM",
          "time": "02:13",
          "height": 4.941,
          "coef": 48
        },
        {
          "type": "BM",
          "time": "07:39",
          "height": 2.094
        },
        {
          "type": "PM",
          "time": "14:33",
          "height": 5.331,
          "coef": 55
        },
        {
          "type": "BM",
          "time": "20:19",
          "height": 1.707
        }
      ]
    },
    {
      "date": "2026-10-07",
      "extrema": [
        {
          "type": "PM",
          "time": "03:10",
          "height": 5.185,
          "coef": 62
        },
        {
          "type": "BM",
          "time": "08:43",
          "height": 1.707
        },
        {
          "type": "PM",
          "time": "15:27",
          "height": 5.599,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "21:16",
          "height": 1.327
        }
      ]
    },
    {
      "date": "2026-10-08",
      "extrema": [
        {
          "type": "PM",
          "time": "03:57",
          "height": 5.413,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "09:36",
          "height": 1.287
        },
        {
          "type": "PM",
          "time": "16:12",
          "height": 5.812,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "22:05",
          "height": 0.994
        }
      ]
    }
  ],
  "brest": [
    {
      "date": "2026-09-08",
      "extrema": [
        {
          "type": "PM",
          "time": "03:30",
          "height": 5.404,
          "coef": 60
        },
        {
          "type": "BM",
          "time": "09:41",
          "height": 1.763
        },
        {
          "type": "PM",
          "time": "15:52",
          "height": 5.838,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "22:14",
          "height": 1.276
        }
      ]
    },
    {
      "date": "2026-09-09",
      "extrema": [
        {
          "type": "PM",
          "time": "04:23",
          "height": 5.884,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "10:34",
          "height": 1.258
        },
        {
          "type": "PM",
          "time": "16:41",
          "height": 6.312,
          "coef": 84
        },
        {
          "type": "BM",
          "time": "23:01",
          "height": 0.822
        }
      ]
    },
    {
      "date": "2026-09-10",
      "extrema": [
        {
          "type": "PM",
          "time": "05:07",
          "height": 6.292,
          "coef": 90
        },
        {
          "type": "BM",
          "time": "11:19",
          "height": 0.848
        },
        {
          "type": "PM",
          "time": "17:23",
          "height": 6.666,
          "coef": 96
        },
        {
          "type": "BM",
          "time": "23:43",
          "height": 0.522
        }
      ]
    },
    {
      "date": "2026-09-11",
      "extrema": [
        {
          "type": "PM",
          "time": "05:46",
          "height": 6.565,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "11:59",
          "height": 0.6
        },
        {
          "type": "PM",
          "time": "18:02",
          "height": 6.852,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-12",
      "extrema": [
        {
          "type": "BM",
          "time": "00:22",
          "height": 0.415
        },
        {
          "type": "PM",
          "time": "06:23",
          "height": 6.678,
          "coef": 103
        },
        {
          "type": "BM",
          "time": "12:37",
          "height": 0.541
        },
        {
          "type": "PM",
          "time": "18:38",
          "height": 6.854,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-13",
      "extrema": [
        {
          "type": "BM",
          "time": "00:58",
          "height": 0.499
        },
        {
          "type": "PM",
          "time": "06:57",
          "height": 6.632,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "13:12",
          "height": 0.66
        },
        {
          "type": "PM",
          "time": "19:13",
          "height": 6.689,
          "coef": 97
        }
      ]
    },
    {
      "date": "2026-09-14",
      "extrema": [
        {
          "type": "BM",
          "time": "01:31",
          "height": 0.745
        },
        {
          "type": "PM",
          "time": "07:29",
          "height": 6.452,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "13:45",
          "height": 0.925
        },
        {
          "type": "PM",
          "time": "19:45",
          "height": 6.392,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-09-15",
      "extrema": [
        {
          "type": "BM",
          "time": "02:03",
          "height": 1.104
        },
        {
          "type": "PM",
          "time": "08:01",
          "height": 6.173,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "14:18",
          "height": 1.289
        },
        {
          "type": "PM",
          "time": "20:16",
          "height": 6.006,
          "coef": 76
        }
      ]
    },
    {
      "date": "2026-09-16",
      "extrema": [
        {
          "type": "BM",
          "time": "02:33",
          "height": 1.526
        },
        {
          "type": "PM",
          "time": "08:31",
          "height": 5.827,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "14:51",
          "height": 1.705
        },
        {
          "type": "PM",
          "time": "20:48",
          "height": 5.569,
          "coef": 63
        }
      ]
    },
    {
      "date": "2026-09-17",
      "extrema": [
        {
          "type": "BM",
          "time": "03:05",
          "height": 1.97
        },
        {
          "type": "PM",
          "time": "09:04",
          "height": 5.44,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "15:27",
          "height": 2.137
        },
        {
          "type": "PM",
          "time": "21:24",
          "height": 5.112,
          "coef": 48
        }
      ]
    },
    {
      "date": "2026-09-18",
      "extrema": [
        {
          "type": "BM",
          "time": "03:41",
          "height": 2.406
        },
        {
          "type": "PM",
          "time": "09:43",
          "height": 5.033,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "16:13",
          "height": 2.548
        },
        {
          "type": "PM",
          "time": "22:12",
          "height": 4.667,
          "coef": 35
        }
      ]
    },
    {
      "date": "2026-09-19",
      "extrema": [
        {
          "type": "BM",
          "time": "04:33",
          "height": 2.803
        },
        {
          "type": "PM",
          "time": "10:43",
          "height": 4.65,
          "coef": 28
        },
        {
          "type": "BM",
          "time": "17:27",
          "height": 2.866
        },
        {
          "type": "PM",
          "time": "23:43",
          "height": 4.328,
          "coef": 24
        }
      ]
    },
    {
      "date": "2026-09-20",
      "extrema": [
        {
          "type": "BM",
          "time": "06:04",
          "height": 3.059
        },
        {
          "type": "PM",
          "time": "12:38",
          "height": 4.456,
          "coef": 22
        },
        {
          "type": "BM",
          "time": "19:17",
          "height": 2.906
        }
      ]
    },
    {
      "date": "2026-09-21",
      "extrema": [
        {
          "type": "PM",
          "time": "01:49",
          "height": 4.369,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "07:56",
          "height": 2.968
        },
        {
          "type": "PM",
          "time": "14:19",
          "height": 4.65,
          "coef": 29
        },
        {
          "type": "BM",
          "time": "20:44",
          "height": 2.61
        }
      ]
    },
    {
      "date": "2026-09-22",
      "extrema": [
        {
          "type": "PM",
          "time": "03:02",
          "height": 4.703,
          "coef": 35
        },
        {
          "type": "BM",
          "time": "09:08",
          "height": 2.605
        },
        {
          "type": "PM",
          "time": "15:18",
          "height": 5.03,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "21:38",
          "height": 2.18
        }
      ]
    },
    {
      "date": "2026-09-23",
      "extrema": [
        {
          "type": "PM",
          "time": "03:48",
          "height": 5.115,
          "coef": 49
        },
        {
          "type": "BM",
          "time": "09:55",
          "height": 2.162
        },
        {
          "type": "PM",
          "time": "16:01",
          "height": 5.458,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "22:18",
          "height": 1.733
        }
      ]
    },
    {
      "date": "2026-09-24",
      "extrema": [
        {
          "type": "PM",
          "time": "04:25",
          "height": 5.533,
          "coef": 63
        },
        {
          "type": "BM",
          "time": "10:32",
          "height": 1.72
        },
        {
          "type": "PM",
          "time": "16:36",
          "height": 5.879,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "22:53",
          "height": 1.32
        }
      ]
    },
    {
      "date": "2026-09-25",
      "extrema": [
        {
          "type": "PM",
          "time": "04:58",
          "height": 5.923,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "11:06",
          "height": 1.318
        },
        {
          "type": "PM",
          "time": "17:10",
          "height": 6.26,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "23:26",
          "height": 0.976
        }
      ]
    },
    {
      "date": "2026-09-26",
      "extrema": [
        {
          "type": "PM",
          "time": "05:29",
          "height": 6.256,
          "coef": 88
        },
        {
          "type": "BM",
          "time": "11:39",
          "height": 0.987
        },
        {
          "type": "PM",
          "time": "17:42",
          "height": 6.562,
          "coef": 92
        },
        {
          "type": "BM",
          "time": "23:59",
          "height": 0.734
        }
      ]
    },
    {
      "date": "2026-09-27",
      "extrema": [
        {
          "type": "PM",
          "time": "06:01",
          "height": 6.504,
          "coef": 96
        },
        {
          "type": "BM",
          "time": "12:13",
          "height": 0.761
        },
        {
          "type": "PM",
          "time": "18:15",
          "height": 6.748,
          "coef": 98
        }
      ]
    },
    {
      "date": "2026-09-28",
      "extrema": [
        {
          "type": "BM",
          "time": "00:33",
          "height": 0.623
        },
        {
          "type": "PM",
          "time": "06:33",
          "height": 6.638,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "12:47",
          "height": 0.668
        },
        {
          "type": "PM",
          "time": "18:49",
          "height": 6.784,
          "coef": 100
        }
      ]
    },
    {
      "date": "2026-09-29",
      "extrema": [
        {
          "type": "BM",
          "time": "01:07",
          "height": 0.663
        },
        {
          "type": "PM",
          "time": "07:07",
          "height": 6.635,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "13:23",
          "height": 0.725
        },
        {
          "type": "PM",
          "time": "19:25",
          "height": 6.653,
          "coef": 96
        }
      ]
    },
    {
      "date": "2026-09-30",
      "extrema": [
        {
          "type": "BM",
          "time": "01:43",
          "height": 0.855
        },
        {
          "type": "PM",
          "time": "07:43",
          "height": 6.485,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "14:02",
          "height": 0.933
        },
        {
          "type": "PM",
          "time": "20:03",
          "height": 6.356,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-10-01",
      "extrema": [
        {
          "type": "BM",
          "time": "02:22",
          "height": 1.18
        },
        {
          "type": "PM",
          "time": "08:22",
          "height": 6.196,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "14:45",
          "height": 1.269
        },
        {
          "type": "PM",
          "time": "20:46",
          "height": 5.925,
          "coef": 75
        }
      ]
    },
    {
      "date": "2026-10-02",
      "extrema": [
        {
          "type": "BM",
          "time": "03:07",
          "height": 1.6
        },
        {
          "type": "PM",
          "time": "09:08",
          "height": 5.8,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "15:37",
          "height": 1.683
        },
        {
          "type": "PM",
          "time": "21:39",
          "height": 5.418,
          "coef": 60
        }
      ]
    },
    {
      "date": "2026-10-03",
      "extrema": [
        {
          "type": "BM",
          "time": "04:02",
          "height": 2.047
        },
        {
          "type": "PM",
          "time": "10:06",
          "height": 5.363,
          "coef": 53
        },
        {
          "type": "BM",
          "time": "16:45",
          "height": 2.074
        },
        {
          "type": "PM",
          "time": "22:54",
          "height": 4.959,
          "coef": 46
        }
      ]
    },
    {
      "date": "2026-10-04",
      "extrema": [
        {
          "type": "BM",
          "time": "05:19",
          "height": 2.397
        },
        {
          "type": "PM",
          "time": "11:34",
          "height": 5.042,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "18:17",
          "height": 2.256
        }
      ]
    },
    {
      "date": "2026-10-05",
      "extrema": [
        {
          "type": "PM",
          "time": "00:40",
          "height": 4.793,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "06:57",
          "height": 2.446
        },
        {
          "type": "PM",
          "time": "13:18",
          "height": 5.081,
          "coef": 43
        },
        {
          "type": "BM",
          "time": "19:50",
          "height": 2.081
        }
      ]
    },
    {
      "date": "2026-10-06",
      "extrema": [
        {
          "type": "PM",
          "time": "02:11",
          "height": 5.032,
          "coef": 48
        },
        {
          "type": "BM",
          "time": "08:22",
          "height": 2.144
        },
        {
          "type": "PM",
          "time": "14:37",
          "height": 5.43,
          "coef": 55
        },
        {
          "type": "BM",
          "time": "21:01",
          "height": 1.678
        }
      ]
    },
    {
      "date": "2026-10-07",
      "extrema": [
        {
          "type": "PM",
          "time": "03:14",
          "height": 5.452,
          "coef": 62
        },
        {
          "type": "BM",
          "time": "09:24",
          "height": 1.691
        },
        {
          "type": "PM",
          "time": "15:33",
          "height": 5.862,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "21:54",
          "height": 1.25
        }
      ]
    },
    {
      "date": "2026-10-08",
      "extrema": [
        {
          "type": "PM",
          "time": "04:02",
          "height": 5.879,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "10:14",
          "height": 1.258
        },
        {
          "type": "PM",
          "time": "16:19",
          "height": 6.243,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "22:39",
          "height": 0.91
        }
      ]
    }
  ],
  "saint-malo": [
    {
      "date": "2026-09-08",
      "extrema": [
        {
          "type": "PM",
          "time": "05:45",
          "height": 10.043,
          "coef": 60
        },
        {
          "type": "BM",
          "time": "12:34",
          "height": 3.538
        },
        {
          "type": "PM",
          "time": "18:09",
          "height": 10.714,
          "coef": 68
        }
      ]
    },
    {
      "date": "2026-09-09",
      "extrema": [
        {
          "type": "BM",
          "time": "01:09",
          "height": 2.689
        },
        {
          "type": "PM",
          "time": "06:38",
          "height": 11.039,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "13:34",
          "height": 2.489
        },
        {
          "type": "PM",
          "time": "18:58",
          "height": 11.699,
          "coef": 84
        }
      ]
    },
    {
      "date": "2026-09-10",
      "extrema": [
        {
          "type": "BM",
          "time": "02:01",
          "height": 1.693
        },
        {
          "type": "PM",
          "time": "07:23",
          "height": 11.889,
          "coef": 90
        },
        {
          "type": "BM",
          "time": "14:22",
          "height": 1.63
        },
        {
          "type": "PM",
          "time": "19:40",
          "height": 12.46,
          "coef": 96
        }
      ]
    },
    {
      "date": "2026-09-11",
      "extrema": [
        {
          "type": "BM",
          "time": "02:45",
          "height": 1.019
        },
        {
          "type": "PM",
          "time": "08:02",
          "height": 12.466,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "15:04",
          "height": 1.125
        },
        {
          "type": "PM",
          "time": "20:19",
          "height": 12.895,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-12",
      "extrema": [
        {
          "type": "BM",
          "time": "03:25",
          "height": 0.762
        },
        {
          "type": "PM",
          "time": "08:39",
          "height": 12.721,
          "coef": 103
        },
        {
          "type": "BM",
          "time": "15:41",
          "height": 1.018
        },
        {
          "type": "PM",
          "time": "20:55",
          "height": 12.977,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-13",
      "extrema": [
        {
          "type": "BM",
          "time": "04:01",
          "height": 0.912
        },
        {
          "type": "PM",
          "time": "09:13",
          "height": 12.667,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "16:16",
          "height": 1.271
        },
        {
          "type": "PM",
          "time": "21:28",
          "height": 12.738,
          "coef": 97
        }
      ]
    },
    {
      "date": "2026-09-14",
      "extrema": [
        {
          "type": "BM",
          "time": "04:33",
          "height": 1.387
        },
        {
          "type": "PM",
          "time": "09:45",
          "height": 12.356,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "16:47",
          "height": 1.785
        },
        {
          "type": "PM",
          "time": "22:00",
          "height": 12.245,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-09-15",
      "extrema": [
        {
          "type": "BM",
          "time": "05:02",
          "height": 2.06
        },
        {
          "type": "PM",
          "time": "10:15",
          "height": 11.852,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "17:15",
          "height": 2.442
        },
        {
          "type": "PM",
          "time": "22:30",
          "height": 11.576,
          "coef": 76
        }
      ]
    },
    {
      "date": "2026-09-16",
      "extrema": [
        {
          "type": "BM",
          "time": "05:29",
          "height": 2.806
        },
        {
          "type": "PM",
          "time": "10:44",
          "height": 11.212,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "17:42",
          "height": 3.14
        },
        {
          "type": "PM",
          "time": "22:59",
          "height": 10.793,
          "coef": 63
        }
      ]
    },
    {
      "date": "2026-09-17",
      "extrema": [
        {
          "type": "BM",
          "time": "05:54",
          "height": 3.543
        },
        {
          "type": "PM",
          "time": "11:14",
          "height": 10.475,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "18:11",
          "height": 3.825
        },
        {
          "type": "PM",
          "time": "23:29",
          "height": 9.939,
          "coef": 48
        }
      ]
    },
    {
      "date": "2026-09-18",
      "extrema": [
        {
          "type": "BM",
          "time": "06:24",
          "height": 4.241
        },
        {
          "type": "PM",
          "time": "11:44",
          "height": 9.665,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "18:46",
          "height": 4.476
        }
      ]
    },
    {
      "date": "2026-09-19",
      "extrema": [
        {
          "type": "PM",
          "time": "00:03",
          "height": 9.043,
          "coef": 35
        },
        {
          "type": "BM",
          "time": "07:04",
          "height": 4.886
        },
        {
          "type": "PM",
          "time": "12:22",
          "height": 8.807,
          "coef": 28
        },
        {
          "type": "BM",
          "time": "19:35",
          "height": 5.051
        }
      ]
    },
    {
      "date": "2026-09-20",
      "extrema": [
        {
          "type": "PM",
          "time": "00:52",
          "height": 8.15,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "07:59",
          "height": 5.418
        },
        {
          "type": "PM",
          "time": "13:42",
          "height": 8.004,
          "coef": 22
        },
        {
          "type": "BM",
          "time": "20:42",
          "height": 5.434
        }
      ]
    },
    {
      "date": "2026-09-21",
      "extrema": [
        {
          "type": "PM",
          "time": "04:19",
          "height": 7.888,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "09:19",
          "height": 5.669
        },
        {
          "type": "PM",
          "time": "16:50",
          "height": 8.336,
          "coef": 29
        },
        {
          "type": "BM",
          "time": "22:28",
          "height": 5.374
        }
      ]
    },
    {
      "date": "2026-09-22",
      "extrema": [
        {
          "type": "PM",
          "time": "05:26",
          "height": 8.595,
          "coef": 35
        },
        {
          "type": "BM",
          "time": "11:27",
          "height": 5.307
        },
        {
          "type": "PM",
          "time": "17:43",
          "height": 9.139,
          "coef": 42
        }
      ]
    },
    {
      "date": "2026-09-23",
      "extrema": [
        {
          "type": "BM",
          "time": "00:17",
          "height": 4.612
        },
        {
          "type": "PM",
          "time": "06:08",
          "height": 9.448,
          "coef": 49
        },
        {
          "type": "BM",
          "time": "12:42",
          "height": 4.385
        },
        {
          "type": "PM",
          "time": "18:22",
          "height": 10.038,
          "coef": 56
        }
      ]
    },
    {
      "date": "2026-09-24",
      "extrema": [
        {
          "type": "BM",
          "time": "01:07",
          "height": 3.633
        },
        {
          "type": "PM",
          "time": "06:43",
          "height": 10.336,
          "coef": 63
        },
        {
          "type": "BM",
          "time": "13:25",
          "height": 3.399
        },
        {
          "type": "PM",
          "time": "18:56",
          "height": 10.939,
          "coef": 70
        }
      ]
    },
    {
      "date": "2026-09-25",
      "extrema": [
        {
          "type": "BM",
          "time": "01:46",
          "height": 2.696
        },
        {
          "type": "PM",
          "time": "07:15",
          "height": 11.188,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "14:03",
          "height": 2.501
        },
        {
          "type": "PM",
          "time": "19:29",
          "height": 11.76,
          "coef": 82
        }
      ]
    },
    {
      "date": "2026-09-26",
      "extrema": [
        {
          "type": "BM",
          "time": "02:23",
          "height": 1.91
        },
        {
          "type": "PM",
          "time": "07:47",
          "height": 11.929,
          "coef": 88
        },
        {
          "type": "BM",
          "time": "14:40",
          "height": 1.79
        },
        {
          "type": "PM",
          "time": "20:02",
          "height": 12.416,
          "coef": 92
        }
      ]
    },
    {
      "date": "2026-09-27",
      "extrema": [
        {
          "type": "BM",
          "time": "03:00",
          "height": 1.365
        },
        {
          "type": "PM",
          "time": "08:19",
          "height": 12.483,
          "coef": 96
        },
        {
          "type": "BM",
          "time": "15:17",
          "height": 1.344
        },
        {
          "type": "PM",
          "time": "20:35",
          "height": 12.828,
          "coef": 98
        }
      ]
    },
    {
      "date": "2026-09-28",
      "extrema": [
        {
          "type": "BM",
          "time": "03:36",
          "height": 1.12
        },
        {
          "type": "PM",
          "time": "08:52",
          "height": 12.785,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "15:53",
          "height": 1.205
        },
        {
          "type": "PM",
          "time": "21:09",
          "height": 12.945,
          "coef": 100
        }
      ]
    },
    {
      "date": "2026-09-29",
      "extrema": [
        {
          "type": "BM",
          "time": "04:13",
          "height": 1.198
        },
        {
          "type": "PM",
          "time": "09:26",
          "height": 12.796,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "16:31",
          "height": 1.374
        },
        {
          "type": "PM",
          "time": "21:44",
          "height": 12.747,
          "coef": 96
        }
      ]
    },
    {
      "date": "2026-09-30",
      "extrema": [
        {
          "type": "BM",
          "time": "04:50",
          "height": 1.572
        },
        {
          "type": "PM",
          "time": "10:02",
          "height": 12.509,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "17:09",
          "height": 1.805
        },
        {
          "type": "PM",
          "time": "22:21",
          "height": 12.249,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-10-01",
      "extrema": [
        {
          "type": "BM",
          "time": "05:28",
          "height": 2.174
        },
        {
          "type": "PM",
          "time": "10:39",
          "height": 11.946,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "17:48",
          "height": 2.422
        },
        {
          "type": "PM",
          "time": "23:00",
          "height": 11.49,
          "coef": 75
        }
      ]
    },
    {
      "date": "2026-10-02",
      "extrema": [
        {
          "type": "BM",
          "time": "06:08",
          "height": 2.912
        },
        {
          "type": "PM",
          "time": "11:21",
          "height": 11.151,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "18:32",
          "height": 3.129
        },
        {
          "type": "PM",
          "time": "23:46",
          "height": 10.54,
          "coef": 60
        }
      ]
    },
    {
      "date": "2026-10-03",
      "extrema": [
        {
          "type": "BM",
          "time": "06:55",
          "height": 3.681
        },
        {
          "type": "PM",
          "time": "12:12",
          "height": 10.208,
          "coef": 53
        },
        {
          "type": "BM",
          "time": "19:26",
          "height": 3.813
        }
      ]
    },
    {
      "date": "2026-10-04",
      "extrema": [
        {
          "type": "PM",
          "time": "00:47",
          "height": 9.541,
          "coef": 46
        },
        {
          "type": "BM",
          "time": "07:55",
          "height": 4.346
        },
        {
          "type": "PM",
          "time": "13:27",
          "height": 9.337,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "20:37",
          "height": 4.301
        }
      ]
    },
    {
      "date": "2026-10-05",
      "extrema": [
        {
          "type": "PM",
          "time": "02:32",
          "height": 8.928,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "09:20",
          "height": 4.672
        },
        {
          "type": "PM",
          "time": "15:25",
          "height": 9.176,
          "coef": 43
        },
        {
          "type": "BM",
          "time": "22:17",
          "height": 4.266
        }
      ]
    },
    {
      "date": "2026-10-06",
      "extrema": [
        {
          "type": "PM",
          "time": "04:20",
          "height": 9.311,
          "coef": 48
        },
        {
          "type": "BM",
          "time": "11:05",
          "height": 4.294
        },
        {
          "type": "PM",
          "time": "16:50",
          "height": 9.864,
          "coef": 55
        },
        {
          "type": "BM",
          "time": "23:48",
          "height": 3.525
        }
      ]
    },
    {
      "date": "2026-10-07",
      "extrema": [
        {
          "type": "PM",
          "time": "05:25",
          "height": 10.161,
          "coef": 62
        },
        {
          "type": "BM",
          "time": "12:20",
          "height": 3.371
        },
        {
          "type": "PM",
          "time": "17:47",
          "height": 10.781,
          "coef": 70
        }
      ]
    },
    {
      "date": "2026-10-08",
      "extrema": [
        {
          "type": "BM",
          "time": "00:50",
          "height": 2.56
        },
        {
          "type": "PM",
          "time": "06:14",
          "height": 11.048,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "13:13",
          "height": 2.425
        },
        {
          "type": "PM",
          "time": "18:33",
          "height": 11.627,
          "coef": 82
        }
      ]
    }
  ],
  "arcachon": [
    {
      "date": "2026-09-08",
      "extrema": [
        {
          "type": "PM",
          "time": "03:54",
          "height": 3.09,
          "coef": 60
        },
        {
          "type": "BM",
          "time": "10:24",
          "height": 0.793
        },
        {
          "type": "PM",
          "time": "16:20",
          "height": 3.333,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "23:00",
          "height": 0.565
        }
      ]
    },
    {
      "date": "2026-09-09",
      "extrema": [
        {
          "type": "PM",
          "time": "04:50",
          "height": 3.282,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "11:23",
          "height": 0.56
        },
        {
          "type": "PM",
          "time": "17:13",
          "height": 3.522,
          "coef": 84
        },
        {
          "type": "BM",
          "time": "23:54",
          "height": 0.346
        }
      ]
    },
    {
      "date": "2026-09-10",
      "extrema": [
        {
          "type": "PM",
          "time": "05:40",
          "height": 3.437,
          "coef": 90
        },
        {
          "type": "BM",
          "time": "12:13",
          "height": 0.384
        },
        {
          "type": "PM",
          "time": "18:00",
          "height": 3.646,
          "coef": 96
        }
      ]
    },
    {
      "date": "2026-09-11",
      "extrema": [
        {
          "type": "BM",
          "time": "00:39",
          "height": 0.219
        },
        {
          "type": "PM",
          "time": "06:24",
          "height": 3.525,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "12:56",
          "height": 0.299
        },
        {
          "type": "PM",
          "time": "18:42",
          "height": 3.686,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-12",
      "extrema": [
        {
          "type": "BM",
          "time": "01:20",
          "height": 0.194
        },
        {
          "type": "PM",
          "time": "07:05",
          "height": 3.538,
          "coef": 103
        },
        {
          "type": "BM",
          "time": "13:36",
          "height": 0.306
        },
        {
          "type": "PM",
          "time": "19:21",
          "height": 3.645,
          "coef": 102
        }
      ]
    },
    {
      "date": "2026-09-13",
      "extrema": [
        {
          "type": "BM",
          "time": "01:57",
          "height": 0.257
        },
        {
          "type": "PM",
          "time": "07:42",
          "height": 3.484,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "14:12",
          "height": 0.386
        },
        {
          "type": "PM",
          "time": "19:57",
          "height": 3.538,
          "coef": 97
        }
      ]
    },
    {
      "date": "2026-09-14",
      "extrema": [
        {
          "type": "BM",
          "time": "02:31",
          "height": 0.378
        },
        {
          "type": "PM",
          "time": "08:16",
          "height": 3.378,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "14:46",
          "height": 0.511
        },
        {
          "type": "PM",
          "time": "20:31",
          "height": 3.384,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-09-15",
      "extrema": [
        {
          "type": "BM",
          "time": "03:04",
          "height": 0.531
        },
        {
          "type": "PM",
          "time": "08:49",
          "height": 3.237,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "15:19",
          "height": 0.658
        },
        {
          "type": "PM",
          "time": "21:03",
          "height": 3.198,
          "coef": 76
        }
      ]
    },
    {
      "date": "2026-09-16",
      "extrema": [
        {
          "type": "BM",
          "time": "03:37",
          "height": 0.697
        },
        {
          "type": "PM",
          "time": "09:21",
          "height": 3.07,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "15:52",
          "height": 0.812
        },
        {
          "type": "PM",
          "time": "21:35",
          "height": 2.989,
          "coef": 63
        }
      ]
    },
    {
      "date": "2026-09-17",
      "extrema": [
        {
          "type": "BM",
          "time": "04:10",
          "height": 0.867
        },
        {
          "type": "PM",
          "time": "09:55",
          "height": 2.886,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "16:29",
          "height": 0.967
        },
        {
          "type": "PM",
          "time": "22:13",
          "height": 2.762,
          "coef": 48
        }
      ]
    },
    {
      "date": "2026-09-18",
      "extrema": [
        {
          "type": "BM",
          "time": "04:47",
          "height": 1.038
        },
        {
          "type": "PM",
          "time": "10:42",
          "height": 2.693,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "17:14",
          "height": 1.119
        },
        {
          "type": "PM",
          "time": "23:21",
          "height": 2.538,
          "coef": 35
        }
      ]
    },
    {
      "date": "2026-09-19",
      "extrema": [
        {
          "type": "BM",
          "time": "05:35",
          "height": 1.201
        },
        {
          "type": "PM",
          "time": "12:08",
          "height": 2.54,
          "coef": 28
        },
        {
          "type": "BM",
          "time": "18:14",
          "height": 1.245
        }
      ]
    },
    {
      "date": "2026-09-20",
      "extrema": [
        {
          "type": "PM",
          "time": "00:56",
          "height": 2.412,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "06:43",
          "height": 1.324
        },
        {
          "type": "PM",
          "time": "13:32",
          "height": 2.519,
          "coef": 22
        },
        {
          "type": "BM",
          "time": "19:34",
          "height": 1.286
        }
      ]
    },
    {
      "date": "2026-09-21",
      "extrema": [
        {
          "type": "PM",
          "time": "02:13",
          "height": 2.44,
          "coef": 24
        },
        {
          "type": "BM",
          "time": "08:07",
          "height": 1.335
        },
        {
          "type": "PM",
          "time": "14:41",
          "height": 2.63,
          "coef": 29
        },
        {
          "type": "BM",
          "time": "20:58",
          "height": 1.182
        }
      ]
    },
    {
      "date": "2026-09-22",
      "extrema": [
        {
          "type": "PM",
          "time": "03:16",
          "height": 2.581,
          "coef": 35
        },
        {
          "type": "BM",
          "time": "09:26",
          "height": 1.197
        },
        {
          "type": "PM",
          "time": "15:38",
          "height": 2.823,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "22:07",
          "height": 0.968
        }
      ]
    },
    {
      "date": "2026-09-23",
      "extrema": [
        {
          "type": "PM",
          "time": "04:08",
          "height": 2.781,
          "coef": 49
        },
        {
          "type": "BM",
          "time": "10:27",
          "height": 0.974
        },
        {
          "type": "PM",
          "time": "16:27",
          "height": 3.048,
          "coef": 56
        },
        {
          "type": "BM",
          "time": "23:00",
          "height": 0.73
        }
      ]
    },
    {
      "date": "2026-09-24",
      "extrema": [
        {
          "type": "PM",
          "time": "04:54",
          "height": 2.996,
          "coef": 63
        },
        {
          "type": "BM",
          "time": "11:17",
          "height": 0.74
        },
        {
          "type": "PM",
          "time": "17:11",
          "height": 3.262,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "23:45",
          "height": 0.521
        }
      ]
    },
    {
      "date": "2026-09-25",
      "extrema": [
        {
          "type": "PM",
          "time": "05:35",
          "height": 3.193,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "12:01",
          "height": 0.542
        },
        {
          "type": "PM",
          "time": "17:51",
          "height": 3.436,
          "coef": 82
        }
      ]
    },
    {
      "date": "2026-09-26",
      "extrema": [
        {
          "type": "BM",
          "time": "00:26",
          "height": 0.373
        },
        {
          "type": "PM",
          "time": "06:13",
          "height": 3.348,
          "coef": 88
        },
        {
          "type": "BM",
          "time": "12:41",
          "height": 0.405
        },
        {
          "type": "PM",
          "time": "18:29",
          "height": 3.551,
          "coef": 92
        }
      ]
    },
    {
      "date": "2026-09-27",
      "extrema": [
        {
          "type": "BM",
          "time": "01:05",
          "height": 0.297
        },
        {
          "type": "PM",
          "time": "06:49",
          "height": 3.448,
          "coef": 96
        },
        {
          "type": "BM",
          "time": "13:20",
          "height": 0.34
        },
        {
          "type": "PM",
          "time": "19:04",
          "height": 3.598,
          "coef": 98
        }
      ]
    },
    {
      "date": "2026-09-28",
      "extrema": [
        {
          "type": "BM",
          "time": "01:42",
          "height": 0.293
        },
        {
          "type": "PM",
          "time": "07:23",
          "height": 3.491,
          "coef": 100
        },
        {
          "type": "BM",
          "time": "13:58",
          "height": 0.345
        },
        {
          "type": "PM",
          "time": "19:39",
          "height": 3.58,
          "coef": 100
        }
      ]
    },
    {
      "date": "2026-09-29",
      "extrema": [
        {
          "type": "BM",
          "time": "02:19",
          "height": 0.352
        },
        {
          "type": "PM",
          "time": "07:56",
          "height": 3.48,
          "coef": 99
        },
        {
          "type": "BM",
          "time": "14:36",
          "height": 0.408
        },
        {
          "type": "PM",
          "time": "20:13",
          "height": 3.503,
          "coef": 96
        }
      ]
    },
    {
      "date": "2026-09-30",
      "extrema": [
        {
          "type": "BM",
          "time": "02:57",
          "height": 0.459
        },
        {
          "type": "PM",
          "time": "08:30",
          "height": 3.42,
          "coef": 93
        },
        {
          "type": "BM",
          "time": "15:15",
          "height": 0.515
        },
        {
          "type": "PM",
          "time": "20:49",
          "height": 3.373,
          "coef": 88
        }
      ]
    },
    {
      "date": "2026-10-01",
      "extrema": [
        {
          "type": "BM",
          "time": "03:35",
          "height": 0.598
        },
        {
          "type": "PM",
          "time": "09:09",
          "height": 3.313,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "15:57",
          "height": 0.652
        },
        {
          "type": "PM",
          "time": "21:33",
          "height": 3.193,
          "coef": 75
        }
      ]
    },
    {
      "date": "2026-10-02",
      "extrema": [
        {
          "type": "BM",
          "time": "04:18",
          "height": 0.759
        },
        {
          "type": "PM",
          "time": "09:58",
          "height": 3.163,
          "coef": 68
        },
        {
          "type": "BM",
          "time": "16:46",
          "height": 0.806
        },
        {
          "type": "PM",
          "time": "22:32",
          "height": 2.985,
          "coef": 60
        }
      ]
    },
    {
      "date": "2026-10-03",
      "extrema": [
        {
          "type": "BM",
          "time": "05:09",
          "height": 0.925
        },
        {
          "type": "PM",
          "time": "11:09",
          "height": 3.005,
          "coef": 53
        },
        {
          "type": "BM",
          "time": "17:47",
          "height": 0.949
        },
        {
          "type": "PM",
          "time": "23:56",
          "height": 2.82,
          "coef": 46
        }
      ]
    },
    {
      "date": "2026-10-04",
      "extrema": [
        {
          "type": "BM",
          "time": "06:15",
          "height": 1.063
        },
        {
          "type": "PM",
          "time": "12:35",
          "height": 2.932,
          "coef": 42
        },
        {
          "type": "BM",
          "time": "19:02",
          "height": 1.023
        }
      ]
    },
    {
      "date": "2026-10-05",
      "extrema": [
        {
          "type": "PM",
          "time": "01:20",
          "height": 2.795,
          "coef": 41
        },
        {
          "type": "BM",
          "time": "07:35",
          "height": 1.101
        },
        {
          "type": "PM",
          "time": "13:53",
          "height": 2.994,
          "coef": 43
        },
        {
          "type": "BM",
          "time": "20:24",
          "height": 0.959
        }
      ]
    },
    {
      "date": "2026-10-06",
      "extrema": [
        {
          "type": "PM",
          "time": "02:32",
          "height": 2.907,
          "coef": 48
        },
        {
          "type": "BM",
          "time": "08:56",
          "height": 0.992
        },
        {
          "type": "PM",
          "time": "15:00",
          "height": 3.152,
          "coef": 55
        },
        {
          "type": "BM",
          "time": "21:39",
          "height": 0.77
        }
      ]
    },
    {
      "date": "2026-10-07",
      "extrema": [
        {
          "type": "PM",
          "time": "03:35",
          "height": 3.091,
          "coef": 62
        },
        {
          "type": "BM",
          "time": "10:05",
          "height": 0.785
        },
        {
          "type": "PM",
          "time": "15:59",
          "height": 3.338,
          "coef": 70
        },
        {
          "type": "BM",
          "time": "22:39",
          "height": 0.549
        }
      ]
    },
    {
      "date": "2026-10-08",
      "extrema": [
        {
          "type": "PM",
          "time": "04:29",
          "height": 3.282,
          "coef": 76
        },
        {
          "type": "BM",
          "time": "11:01",
          "height": 0.578
        },
        {
          "type": "PM",
          "time": "16:50",
          "height": 3.494,
          "coef": 82
        },
        {
          "type": "BM",
          "time": "23:29",
          "height": 0.376
        }
      ]
    }
  ]
};
