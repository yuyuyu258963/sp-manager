package main

import (
	"time"
)

// use for test
func RestTask_test() {
	var execTasks *ExesG
	for {
		now := time.Now()
		next := now.Add(time.Second * 20)
		// next = time.Date(next.Year(), next.Month(), next.Day(), 0, 0, 0, 0, next.Location())
		t := time.NewTimer(next.Sub(now))
		<-t.C
		execTasks = parseYaml()
		execTask(execTasks, ExecLogger)
	}
}
