import { ObjectId } from "mongodb";

const rawData = {
  clients: [
    {
      _id: new ObjectId("643da554a399d820fdf9ead6"),
      lastName: "Иванов",
      firstName: "Иван",
      middleName: "Иванович",
      birthday: "1990-02-15",
      gender: true,
      contacts: {
        phone: "8-999-999-99-99",
        email: "ivan@mail.ru",
      },
      orders: [
        {
          _id: new ObjectId("643fe503f3630dbea0c9f213"),
          date: new Date("2023-02-01 11:25"),
          products: [
            {
              _id: new ObjectId("643fe478f3630dbea0c9f20c"),
              title: "Ноутбук Lenovo IdeaPad 3 15IGL05",
              quantity: 1,
            },
            {
              _id: new ObjectId("643fe478f3630dbea0c9f20d"),
              title: "Кресло офисное Бюрократ KB-8/BLACK",
              quantity: 1,
            },
          ],
          total: 31598,
        },
        {
          _id: new ObjectId("643fe503f3630dbea0c9f214"),
          date: new Date("2023-04-05 17:47"),
          products: [
            {
              _id: new ObjectId("643fe478f3630dbea0c9f209"),
              title: "Стиральная машина LG FH0B8LD6",
              quantity: 1,
            },
          ],
          total: 36999,
        },
      ],
    },
    {
      _id: new ObjectId("643da554a399d820fdf9ead7"),
      lastName: "Петров",
      firstName: "Петр",
      middleName: "Петрович",
      birthday: "1976-05-10",
      gender: true,
      contacts: {
        phone: "8-888-888-88-88",
      },
      orders: [],
    },
    {
      _id: new ObjectId("643da554a399d820fdf9ead8"),
      lastName: "Сидорова",
      firstName: "Марина",
      middleName: "Михайловна",
      birthday: "1985-04-09",
      gender: false,
      contacts: {
        email: "sidorovamarina@mail.ru",
      },
      orders: [
        {
          _id: new ObjectId("643fe503f3630dbea0c9f215"),
          date: new Date("2022-11-23 16:31"),
          products: [
            {
              _id: new ObjectId("643fe478f3630dbea0c9f20b"),
              title: "Смартфон Apple iPhone 12",
              quantity: 2,
            },
          ],
          total: 109998,
        },
      ],
    },
  ],

  products: [
    {
      _id: new ObjectId("643fe478f3630dbea0c9f209"),
      title: "Стиральная машина LG FH0B8LD6",
      type: "Стиральная машина",
      model: "LG FH0B8LD6",
      category: "Бытовая техника",
      price: 36999,
    },
    {
      _id: new ObjectId("643fe478f3630dbea0c9f20a"),
      title: "Телевизор LED Samsung UE32T5300AUXRU",
      type: "Телевизор LED",
      model: "Samsung UE32T5300AUXRU",
      category: "Бытовая техника",
      price: 21499,
    },
    {
      _id: new ObjectId("643fe478f3630dbea0c9f20b"),
      title: "Смартфон Apple iPhone 12",
      type: "Смартфон",
      model: "Apple iPhone 12",
      category: "Смартфоны",
      price: 54999,
    },
    {
      _id: new ObjectId("643fe478f3630dbea0c9f20c"),
      title: "Ноутбук Lenovo IdeaPad 3 15IGL05",
      type: "Ноутбук",
      model: "Lenovo IdeaPad 3 15IGL05",
      category: "Компьютеры",
      price: 24199,
    },
    {
      _id: new ObjectId("643fe478f3630dbea0c9f20d"),
      title: "Кресло офисное Бюрократ KB-8/BLACK",
      type: "Кресло офисное",
      model: "Бюрократ KB-8/BLACK",
      category: "Мебель",
      price: 7399,
    },
  ],

  categories: [
    {
        _id: new ObjectId("643fe4bbf3630dbea0c9f20e"),
        title: "Бытовая техника",
        products: [
          new ObjectId("643fe478f3630dbea0c9f209"),
          new ObjectId("643fe478f3630dbea0c9f20a"),
        ],
      },
      {
        _id: new ObjectId("643fe4bbf3630dbea0c9f20f"),
        title: "Смартфоны",
        products: [new ObjectId("643fe478f3630dbea0c9f20b")],
      },
      {
        _id: new ObjectId("643fe4bbf3630dbea0c9f210"),
        title: "Компьютеры",
        products: [new ObjectId("643fe478f3630dbea0c9f20c")],
      },
      {
        _id: new ObjectId("643fe4bbf3630dbea0c9f211"),
        title: "Автотовары",
        products: [],
      },
      {
        _id: new ObjectId("643fe4bbf3630dbea0c9f212"),
        title: "Мебель",
        products: [new ObjectId("643fe478f3630dbea0c9f20d")],
      },
  ],

  orders: [
    {
      _id: new ObjectId("643fe503f3630dbea0c9f213"),
      date: new Date("2023-02-01 11:25"),
      client: new ObjectId("643da554a399d820fdf9ead6"),
      products: [
        {
          _id: new ObjectId("643fe478f3630dbea0c9f20c"),
          title: "Ноутбук Lenovo IdeaPad 3 15IGL05",
          quantity: 1,
        },
        {
          _id: new ObjectId("643fe478f3630dbea0c9f20d"),
          title: "Кресло офисное Бюрократ KB-8/BLACK",
          quantity: 1,
        },
      ],
      paymentMethod: "Банковская карта",
      receivingMethod: "Доставка",
      total: 31598,
    },
    {
      _id: new ObjectId("643fe503f3630dbea0c9f214"),
      date: new Date("2023-04-05 17:47"),
      client: new ObjectId("643da554a399d820fdf9ead6"),
      products: [
        {
          _id: new ObjectId("643fe478f3630dbea0c9f209"),
          title: "Стиральная машина LG FH0B8LD6",
          quantity: 1,
        },
      ],
      paymentMethod: "Наличные",
      receivingMethod: "Доставка",
      total: 36999,
    },
    {
      _id: new ObjectId("643fe503f3630dbea0c9f215"),
      date: new Date("2022-11-23 16:31"),
      client: new ObjectId("643da554a399d820fdf9ead8"),
      products: [
        {
          _id: new ObjectId("643fe478f3630dbea0c9f20b"),
          title: "Смартфон Apple iPhone 12",
          quantity: 2,
        },
      ],
      paymentMethod: "Банковская карта",
      receivingMethod: "Самовывоз",
      total: 109998,
    },
  ],
};

export default rawData;