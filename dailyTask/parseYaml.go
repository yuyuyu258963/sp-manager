package main

import (
	"io/ioutil"

	"gopkg.in/yaml.v3"
)

// parse yaml config file
func parseYaml() (exeTasks *ExesG) {
	file, err := ioutil.ReadFile(yamlPath)

	if err != nil {
		panic(err)
	}

	if err = yaml.Unmarshal(file, &exeTasks); err != nil {
		panic(err)
	}
	exeTasks.Filter()
	return exeTasks
}
