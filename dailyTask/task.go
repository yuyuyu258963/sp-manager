package main

import "github.com/sirupsen/logrus"

// run exe tasks
func execTask(exeTasks *ExesG, logger *logrus.Logger) {
	for _, task := range *exeTasks {
		output, err := task.Run()
		if err != nil {
			logger.Infof("| failed | %s | %s | %v |", task.Name, string(output), err.Error())
		} else {
			logger.Infof("|   OK   | %s | %s |", task.Name, string(output))
		}
	}
}
