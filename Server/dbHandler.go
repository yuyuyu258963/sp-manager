package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func initDB(
	collectionName string,
) *mongo.Collection {
	// 设置客户端连接配置
	clientOptions := options.Client().ApplyURI(linkUrl)

	// 连接到MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// 检查连接
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database(dataBaseName).Collection(collectionName)
	return collection
}

// 查找表中的所有数据
func findAll(m *mongo.Collection) {
	cur, err := m.Find(context.TODO(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.TODO()) {
		var elem Manager
		if err := cur.Decode(&elem); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%+v \n", elem)
	}
}

func findWithPages(m *mongo.Collection, limit, page int64) []Manager {
	var findoptions *options.FindOptions = &options.FindOptions{}
	if limit > 0 {
		findoptions.SetLimit(limit)
		findoptions.SetSkip((limit * page) - page)
	}
	cur, err := m.Find(context.TODO(), bson.D{{}}, findoptions)
	if err != nil {
		log.Fatal(err)
	}
	var managers []Manager
	var elem Manager

	for cur.Next(context.TODO()) {
		if err := cur.Decode(&elem); err != nil {
			log.Fatal(err)
		}
		managers = append(managers, elem)
		fmt.Printf("%+v \n", elem)
	}
	return managers
}
