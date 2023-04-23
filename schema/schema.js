import { dateScalar } from "./customScalar.js";

import Category from "../server/models/category.js";
import Client from "../server/models/client.js";
import Order from "../server/models/order.js";
import Product from "../server/models/product.js";

const typeDefs = `#graphql
  scalar Date

  # Types
  type ContactType {
    phone: String,
    email: String,
  }

  type ClientOrderType {
    _id: ID!,
    date: Date!,
    products: [OrderProductType]!,
    total: Int!
  }

  type OrderProductType {
    _id: ID!,
    title: String!,
    quantity: Int!,
  }

  type ClientType {
    _id: ID!,
    lastName: String!,
    firstName: String!,
    middleName: String,
    birthday: String,
    gender: Boolean,
    contacts: ContactType,
    orders: [ClientOrderType],
  }

  type OrderType {
    _id: ID!,
    date: Date!,
    products: [OrderProductType!]!,
    paymentMethod: String!,
    receivingMethod: String!,
    total: Int!,
    client: ID!,
  }

  type CategoryType {
    _id: ID!,
    title: String!,
    products: [ID]!,
  }

  type ProductType {
    _id: ID!,
    title: String!,
    type: String!,
    model: String!,
    category: String,
    price: Int!,
  }

  union SearchResult = CategoryType | ProductType

  # Input
  input ContactInput {
    phone: String,
    email: String,
  }

  input ClientOrderInput {
    _id: ID!,
    date: Date!,
    products: [OrderProductInput]!,
    total: Int!
  }

  input OrderProductInput {
    _id: ID!,
    title: String!,
    quantity: Int!,
  }

  input ClientInput {
    lastName: String,
    firstName: String,
    middleName: String,
    birthday: String,
    gender: Boolean,
    contacts: ContactInput,
    orders: [ClientOrderInput],
  }

  input OrderInput {
    client: ID,
    date: Date,
    products: [OrderProductInput],
    paymentMethod: String,
    receivingMethod: String,
    total: Int,
  }
  
  # Query
  type Query {
    clients: [ClientType],
    client(id: ID!): ClientType,
    categories: [CategoryType],
    category(id: ID!): CategoryType,
    orders: [OrderType],
    order(id: ID!): OrderType,
    products: [ProductType],
    product(id: ID!): ProductType,
    search(text: String): [SearchResult],
  }

  # Mutation
  type Mutation {
    createClient(client: ClientInput!): ClientType,
    updateClient(id: ID!, client: ClientInput!): ClientType,
    deleteClient(id: ID!): ClientType,
    createOrder(order: OrderInput!): OrderType,
    deleteOrder(id: ID!): OrderType,
  }
`;

const resolvers = {
  Date: dateScalar,

  SearchResult: {
    __resolveType(obj, contextValue, info) {
      if(obj.type){
        return 'ProductType';
      }

      if(obj.title){
        return 'CategoryType';
      }

      return null;
    },
  },

  Query: {
    clients: async () => await Client.find({}),
    client: async (parent, args, contextValue, info) =>
      await Client.findById(args.id),
    categories: async () => await Category.find({}),
    category: async (parent, args, contextValue, info) =>
      await Category.findById(args.id),
    orders: async () => await Order.find({}),
    order: async (parent, args, contextValue, info) =>
      await Order.findById(args.id),
    products: async () => await Product.find({}),
    product: async (parent, args, contextValue, info) =>
      await Product.findById(args.id),
    search: async (parent, args, contextValue, info) => {
      const result = [
        ...await Category.find({ title: { $regex: new RegExp('^' + args.text, 'i') } }),
        ...await Product.find({ type: { $regex: new RegExp('^' + args.text, 'i') } }),
      ];

      return result; 
    },
  },

  Mutation: {
    createClient: async (_, { client }, { dataSources }) => {
      const newClient = new Client(client);

      return await newClient.save();
    },
    updateClient: async (_, { id, client }, { dataSources }) => {
      return await Client.findByIdAndUpdate(
        id,
        { $set: client },
        { returnDocument: "after" }
      );
    },
    deleteClient: async (_, { id }, { dataSources }) => {
      return await Client.findByIdAndDelete(id);
    },
    createOrder: async (_, { order }, { dataSources }) => {
      const newOrder = new Order(order);
      const createdOrder = await newOrder.save();

      await Client.findByIdAndUpdate(createdOrder.client, {
        $push: {
          orders: {
            _id: createdOrder.id,
            date: createdOrder.date,
            products: createdOrder.products,
            total: createdOrder.total,
          },
        },
      });

      return createdOrder;
    },
    deleteOrder: async (_, { id }, { dataSources }) => {
      const deletedOrder = await Order.findByIdAndDelete(id);

      await Client.findByIdAndUpdate(deletedOrder.client, {
        $pull: {
          orders: {
            _id: deletedOrder.id,
            date: deletedOrder.date,
            products: deletedOrder.products,
            total: deletedOrder.total,
          },
        },
      });

      return deletedOrder;
    },
  },
};

export { typeDefs, resolvers };
