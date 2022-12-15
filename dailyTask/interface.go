package main

import (
	"fmt"
	"os/exec"
)

// Exe 文件的配置接口
type Exes struct {
	Name        string `yaml:"name"`
	ExePath     string `yaml:"exePath"`
	Description string `yaml:"description"`
}

// run exe file get output
func (t *Exes) Run(args ...string) (output []byte, err error) {
	args = append([]string{(*t).ExePath}, args...)
	return exec.Command("python", args...).Output()
}

type ExesG []Exes

func (g *ExesG) Len() int { return len(*g) }

// filter unqualified exe file
func (t *ExesG) Filter() {
	for i := t.Len() - 1; i >= 0; i-- {
		if ok := checkFile((*t)[i].ExePath); ok != nil {
			fmt.Printf("please check exe file %+v \n", (*t)[i])
			*t = append((*t)[:i], (*t)[i+1:]...)
		}
	}
}
