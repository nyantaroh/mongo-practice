const { MongoClient } = require("mongodb");

// Docker の MongoDB にローカルから接続
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db("sampleDB");
  const collection = db.collection("fruits");

  // データを複数件挿入（Create）
  await collection.insertMany([
    { name: "Apple", color: "Red", sweetness: 7 },
    { name: "Banana", color: "Yellow", sweetness: 8 },
    { name: "Grape", color: "Purple", sweetness: 6 },
  ]);

  // データを全件取得（Read）
  const allFruits = await collection.find().toArray();
  console.log("登録済みフルーツ一覧", allFruits);

  // データの更新（Update）
  await collection.updateOne({ name: "Banana" }, { $set: { sweetness: 10 } });

  // データの削除（Delete）
  await collection.deleteOne({ name: "Grape" });

  const updatedResults = await collection.find().toArray();
  console.log("データ削除まで進んだ時のフルーツ一覧", updatedResults);

  await client.close();
}

main();
