export const Placeholders = [
  {
    id: "one",
    droppedItem: null,
    position: {
      top: null,
      left: null,
    },
  },
  {
    id: "two",
    droppedItem: null,
    position: {
      top: null,
      left: null,
    },
  },
  {
    id: "three",
    droppedItem: null,
    position: {
      top: null,
      left: null,
    },
  },
  {
    id: "four",
    droppedItem: null,
    position: {
      top: null,
      left: null,
    },
  },
  {
    id: "five",
    droppedItem: null,
    position: {
      top: null,
      left: null,
    },
  },
  {
    id: "six",
    droppedItem: null,
    position: {
      top: null,
      left: null,
    },
  },
];

export const Supermarket = [
  {
    name: "Drinks",
    id: 1,
  },
  {
    name: "Vegetable",
    id: 2,
  },
  {
    name: "Fruits",
    id: 3,
  },
  {
    name: "Milk",
    id: 4,
  },
  {
    name: "Grains",
    id: 5,
  },
];

const data = {
  _id: "6193ca56c63c455561f919e4", //id for a particular question
  Instruction: "Drop the elements you want to keep in each place",
  BlockedZones: ["2", "3", "5", "8"], //blocked zones for a particular question
  PrefixEnvironment: {
    Zones: [
      {
        index: "1",
        option: "Chocolates",
        _id: "6193ca56c63c455561f919df",
      },
    ],
    _id: "6193ca56c63c455561f919dd",
  },
  Options: ["FreshProduce", "Kids Section", "Restraunt", "Biscuits"],
  correctEnvironment: "6193e6e2518a41a001e90c1f",
  __v: 0,
  UnblockedZones: ["4", "6", "7"],
  Zones: [
    { isDroppable: "no", element: "Grains" },
    { isDroppable: "yes", element: "" },
    { isDroppable: "no", element: "" },
  ],
};
