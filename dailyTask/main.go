package main

import "github.com/sirupsen/logrus"

var (
	ExecLogger *logrus.Logger
)

func init() {
	ExecLogger, _ = getLogger("null")
}

func main() {
	RestTask()
}
