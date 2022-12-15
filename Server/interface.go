package main

import (
	"encoding/json"
)

type Manager struct {
	Age   string `bson:"age" json:"age"`
	Name  string `bson:"name" json:"name"`
	Intro string `bson:"intro" json:"intro`
	Photo string `bson:"photo" json:"photo"`
}

func (m *Manager) Parse2Json() ([]byte, error) {
	return json.Marshal(m)
}
