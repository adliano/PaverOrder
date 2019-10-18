// Base URL used for image
const CALSTONE_URL = 'https://calstone.com/assets/uploads/products/'

// Patterns
const patterns = {
    QS1: {
      name: 'QS1',
      image: `${CALSTONE_URL}QS_pattern_1.jpg`,
      quantities: [
        {
          size: '6x9',
          percentage: 0.27
        },
        {
          size: '9x9',
          percentage: 0.2
        },
        {
          size: '9x12',
          percentage: 0.53
        }
      ]
    },
    QS2: {
      name: 'QS2',
      image: `${CALSTONE_URL}QS_pattern_2.jpg`,
      quantities: [
        {
          size: '9x9',
          percentage: 0.43
        },
        {
          size: '9x12',
          percentage: 0.57
        }
      ]
    },
    QS3: {
      name: 'QS3',
      image: `${CALSTONE_URL}QS_pattern_3.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.28
        },
        {
          size: '6x9',
          percentage: 0.41
        },
        {
          size: '9x9',
          percentage: 0.31
        }
      ]
    },
    QS4: {
      name: 'QS4',
      image: `${CALSTONE_URL}QS4121213.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.12
        },
        {
          size: '6x9',
          percentage: 0.26
        },
        {
          size: '9x9',
          percentage: 0.27
        },
        {
          size: '9x12',
          percentage: 0.35
        }
      ]
    },
    QS8: {
      name: 'QS8',
      image: `${CALSTONE_URL}QS_pattern_4.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.17
        },
        {
          size: '6x9',
          percentage: 0.26
        },
        {
          size: '9x9',
          percentage: 0.19
        },
        {
          size: '9x12',
          percentage: 0.38
        }
      ]
    },
    twoWaySmall: {
      name: 'Two-Way Running Bond (Small)',
      image: `${CALSTONE_URL}QS_pattern_5.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.4
        },
        {
          size: '6x9',
          percentage: 0.6
        }
      ]
    },
    twoWayLarge: {
      name: 'Two-Way Running Bond (Large)',
      image: `${CALSTONE_URL}QS_pattern_5.jpg`,
      quantities: [
        {
          size: '9x9',
          percentage: 0.43
        },
        {
          size: '9x12',
          percentage: 0.57
        }
      ]
    },
    herringboneSmall: {
      name: 'Herringbone 45 Small',
      image: `${CALSTONE_URL}QS_pattern_7.jpg`,
      quantities: [
        {
          size: '6x9',
          percentage:  1
        }
      ]
    },
    herringboneLarge: {
      name: 'Herringbone 45 Large',
      image: `${CALSTONE_URL}QS_pattern_7.jpg`,
      quantities: [
        {
          size: '9x12',
          percentage:  1
        }
      ]
    },
    oldTownII: {
      name: 'Old Town II',
      image: `${CALSTONE_URL}QS_pattern_8.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.25
        },
        {
          size: '6x9',
          percentage: 0.75
        }
      ]
    },
    oldTownIII: {
      name: 'Old Town III',
      image: `${CALSTONE_URL}cobble_pattern3.jpg`,
      quantities: [
        {
          size: '6x4.5',
          percentage: 0.2
        },
        {
          size: '6x6',
          percentage: 0.25
        },
        {
          size: '6x9',
          percentage: 0.55
        }
      ]
    },
    belgianRandom: {
      name: 'Random',
      image: `${CALSTONE_URL}belgian_pattern_random.jpg`,
      quantities: []
    },
    Versalies1: {
      name: 'Versalies 1',
      image: `${CALSTONE_URL}Versailles_pattern1.jpg`,
      quantities: [
        {
          size: '8x8',
          percentage: 0.11
        },
        {
          size: '8x16',
          percentage: 0.11
        },
        {
          size: '16x16',
          percentage: 0.45
        },
        {
          size: '16x24',
          percentage: 0.33
        }
      ]
    },
    Versalies2: {
      name: 'Versalies 2',
      image: `${CALSTONE_URL}Versailles_pattern2.jpg`,
      quantities: [
        {
          size: '16x16',
          percentage: 0.4
        },
        {
          size: '16x24',
          percentage: 0.6
        }
      ]
    },
    Versalies3: {
      name: 'Versalies 3',
      image: `${CALSTONE_URL}Versailles_pattern3.jpg`,
      quantities: [
        {
          size: '8x8',
          percentage: 0.2
        },
        {
          size: '8x16',
          percentage: 0.4
        },
        {
          size: '16x16',
          percentage: 0.4
        }
      ]
    },
    Versalies4: {
      name: 'Versalies 4',
      image: `${CALSTONE_URL}Versailles_pattern4.jpg`,
      quantities: [
        {
          size: '8x8',
          percentage: 0.06
        },
        {
          size: '8x16',
          percentage: 0.18
        },
        {
          size: '16x16',
          percentage: 0.23
        },
        {
          size: '16x24',
          percentage: 0.53
        }
      ]
    },
    Versalies5: {
      name: 'Versalies 5',
      image: `${CALSTONE_URL}Versailles_pattern5.jpg`,
      quantities: [
        {
          size: '8x16',
          percentage: 0.2
        },
        {
          size: '16x16',
          percentage: 0.2
        },
        {
          size: '16x24',
          percentage: 0.6
        }
      ]
    },
    Pinwheel8: {
      name: 'Pinwheel 8',
      image: `${CALSTONE_URL}Versailles_pattern6.jpg`,
      quantities: [
        {
          size: '8x8',
          percentage: 0.2
        },
        {
          size: '8x16',
          percentage: 0.8
        }
      ]
    },
    RunningBond24: {
      name: 'Running Bond 24',
      image: `${CALSTONE_URL}Versailles_pattern7.jpg`,
      quantities: [
        {
          size: '16x24',
          percentage:  1
        }
      ]
    },
    threeWayRunningBond: {
      name: 'Three-Way RunningBond',
      image: `${CALSTONE_URL}cobble_pattern2.jpg`,
      quantities: [
        {
          size: '6x4.5',
          percentage: 0.23
        },
        {
          size: '6x6',
          percentage: 0.31
        },
        {
          size: '6x9',
          percentage: 0.46
        }
      ]
    },
    twoWayParquet: {
      name: 'Two-Way Parquet',
      image: `${CALSTONE_URL}cobble_pattern4.jpg`,
      quantities: [
        {
          size: '6x4.5',
          percentage: 0.33
        },
        {
          size: '6x9',
          percentage: 0.67
        }
      ]
    },
    megaPattern2: {
      name: 'Mega Pattern 2',
      image: `${CALSTONE_URL}cobble_pattern6.jpg`,
      quantities: [
        {
          size: '6x9',
          percentage: 0.33
        },
        {
          size: '9x12',
          percentage: 0.67
        }
      ]
    },
    megaPattern3: {
      name: 'Mega Pattern 3',
      image: `${CALSTONE_URL}cobble_pattern7.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.1
        },
        {
          size: '6x9',
          percentage: 0.3
        },
        {
          size: '9x12',
          percentage: 0.6
        }
      ]
    },
    megaPattern4: {
      name: 'Mega Pattern 4',
      image: `${CALSTONE_URL}cobble_pattern8.jpg`,
      quantities: [
        {
          size: '6x4.5',
          percentage: 0.23
        },
        {
          size: '6x6',
          percentage: 0.12
        },
        {
          size: '6x9',
          percentage: 0.28
        },
        {
          size: '9x12',
          percentage: 0.37
        }
      ]
    },
    belgianRandom: {
      name: 'Random',
      image: `${CALSTONE_URL}belgian_pattern_random.jpg`,
      quantities: [
        {
          size: '5.2x5.2',
          percentage: 0.25
        },
        {
          size: '5.2x6.5',
          percentage: 0.25
        },
        {
          size: '5.2x7.8',
          percentage: 0.25
        },
        {
          size: '5.2x9.1',
          percentage: 0.25
        }
      ]
    },
    pinwheel6: {
      name: 'Pinwheel 6',
      image: `${CALSTONE_URL}/ant_mission_patterns3.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.20
        },
        {
          size: '6x12',
          percentage: 0.8
        }
      ]
    },
    varozza2: {
      name: 'Varozza 2',
      image: `${CALSTONE_URL}/Varozza_2.jpg`,
      quantities: [
        {
          size: '6x6',
          percentage: 0.55
        },
        {
          size: '6x12',
          percentage: 0.45
        }
      ]
    }
  }
  
  module.exports = patterns