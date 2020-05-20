import {Rucksack, Vehicle} from '@sct-myc/api-interfaces';

export const SettingsData = {
  rucksacks: <Rucksack[]>[
    {
      id: 1,
      name: 'MacFlex "Rucksack" Core',
      storage: 60
    },
    {
      id: 2,
      name: 'Novikov Armor',
      storage: 130
    },
    {
      id: 3,
      name: 'Pembroke Armor',
      storage: 130
    },
    {
      id: 4,
      name: 'Prisoner Armor',
      storage: 50
    },
    {
      id: 99,
      name: 'Others',
      storage: 12
    }
  ],
  vehicles: <Vehicle[]>[
    {
      id: 1,
      name: 'Argo Mole',
      cargoCapacity: 8000
    },
    {
      id: 2,
      name: 'Prospector',
      cargoCapacity: 3200
    },
    {
      id: 99,
      name: 'Others',
      cargoCapacity: -1
    }
  ]
};
