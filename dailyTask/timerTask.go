package main

import (
	"time"
)

func RestTask() {
	var execTasks *ExesG
	for {
		now := time.Now()
		next := now.Add(time.Hour * 24)
		next = time.Date(next.Year(), next.Month(), next.Day(), 0, 0, 0, 0, next.Location())
		t := time.NewTimer(next.Sub(now))
		<-t.C
		execTasks = parseYaml()
		execTask(execTasks, ExecLogger)
	}
}
