const { MongoClient } = require("mongodb");

// Docker の MongoDB にローカルから接続
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db("sampleDB");
  const collection = db.collection("fruits");

  // データの初期化（練習するために毎回データをクリアしている。普通はおこなわない処理）
  await collection.deleteMany();

  // データを複数件挿入（Create）
  await collection.insertMany([
    { name: "Apple", color: "Red", sweetness: 7 },
    { name: "Banana", color: "Yellow", sweetness: 8 },
    { name: "Grape", color: "Purple", sweetness: 6 },
  ]);

  // データの更新（Update）
  await collection.updateOne({ name: "Banana" }, { $set: { sweetness: 10 } });

  // データを全件取得（Read）
  const results = await collection
    .find({
      $and: [
        {
          sweetness: { $gte: 7 },
        },
        {
          $or: [{ color: "Red" }, { color: "Yellow" }],
        },
      ],
    })
    .toArray();
  console.log("検索内容に一致したフルーツ一覧", results);

  await client.close();
}

main();
