const { MongoClient } = require("mongodb");

// Docker の MongoDB にローカルから接続
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("MongoDB への接続成功");

    const db = client.db("sampleDB");
    const collection = db.collection("fruits");

    // データを1件挿入
    await collection.insertOne({ name: "Banana", color: "Yellow" });

    // データを全件取得
    const results = await collection.find().toArray();
    console.log("登録済みフルーツ一覧", results);
  } catch (err) {
    console.error("エラー", err);
  } finally {
    await client.close();
  }
}

main();
