package main

import "os"

func checkFile(filePath string) error {
	_, err := os.Stat(filePath)
	return err
}
