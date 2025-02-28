import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex("products").insert([
    { name: "Lasanha", price: 32.0 },
    { name: "Risoto de Camarão", price: 45.9 },
    { name: "Feijoada", price: 29.5 },
    { name: "Filé à Parmegiana", price: 38.0 },
    { name: "Sushi Combo", price: 55.0 },
    { name: "Hambúrguer Artesanal", price: 24.9 },
    { name: "Pizza Calabresa", price: 42.0 },
    { name: "Espaguete ao Pesto", price: 27.5 },
    { name: "Tacos Mexicanos", price: 35.0 },
    { name: "Frango Xadrez", price: 31.5 },
  ]);
}
